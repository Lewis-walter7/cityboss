export default {
    start: {
        // This is used for `prisma db push`, `prisma migrate`, etc.
        connect: {
            url: process.env.MONGODB_URI,
        },
    },
}
