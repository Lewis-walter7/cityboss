export interface Vehicle {
    _id?: string;
    make: string;
    vehicleModel: string;
    year: number;
    price: number;
    mileage: number;
    bodyType: 'SUV' | 'Sedan' | '4x4' | 'Luxury' | 'Coupe' | 'Truck' | 'Convertible';
    transmission: 'Automatic' | 'Manual';
    fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
    drivetrain: 'FWD' | 'RWD' | 'AWD' | '4WD';
    exteriorColor: string;
    interiorColor: string;
    engine: string;
    horsepower: number;
    description: string;
    features: string[];
    images: string[];
    isFeatured: boolean;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface VehicleFilters {
    make?: string;
    vehicleModel?: string;
    bodyType?: string;
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    transmission?: string;
    fuelType?: string;
    search?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface VehiclesResponse {
    vehicles: Vehicle[];
    total: number;
    page: number;
    totalPages: number;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    vehicleId?: string;
}

export interface SellCarFormData {
    make: string;
    vehicleModel: string;
    year: number;
    mileage: number;
    price: number;
    condition: 'Excellent' | 'Good' | 'Fair';
    description: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    images: string[];
}

export interface Testimonial {
    id: number;
    name: string;
    rating: number;
    content: string;
    date: string;
    avatar?: string;
    role: string;
}

export interface Category {
    name: string;
    slug: string;
    image: string;
    count: number;
}
