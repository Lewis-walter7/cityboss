import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined!");
const key = new TextEncoder().encode(SECRET_KEY);

/**
 * Hash a plain password
 */
export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

/**
 * Compare plain password to hashed password
 */
export async function comparePassword(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed);
}

/**
 * Sign a JWT token
 */
export async function signToken(payload: Record<string, any>) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
        return payload;
    } catch (err) {
        return null;
    }
}

/**
 * Set a cookie with the JWT token
 */
export async function setTokenCookie(token: string, response?: any) {
    const cookieOptions: any = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
        domain: process.env.NODE_ENV === 'production' ? 'cityboss-dashboard.vercel.app' : undefined,
    };

    if (response && response.cookies) {
        response.cookies.set('admin_token', token, cookieOptions);
    } else {
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, cookieOptions);
    }
}


/**
 * Get the session from cookie
 */
export async function getAdminSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return null;
    return await verifyToken(token);
}
