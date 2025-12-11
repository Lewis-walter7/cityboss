import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatMileage(mileage: number): string {
    return new Intl.NumberFormat('en-US').format(mileage);
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

export function generateVehicleSlug(vehicle: { make: string; model: string; year: number }): string {
    return `${vehicle.year}-${slugify(vehicle.make)}-${slugify(vehicle.model)}`;
}
