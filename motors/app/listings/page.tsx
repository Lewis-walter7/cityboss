'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { GridSkeleton } from '@/components/ui/LoadingSkeleton';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Vehicle } from '@/lib/types';
import { useFavorites } from '@/hooks/useFavorites';
import { IoSearch, IoClose } from 'react-icons/io5';
import { seedVehicles } from '@/lib/seed-data';

const makes = ['All', 'BMW', 'Mercedes-Benz', 'Ford', 'Porsche', 'Tesla', 'Jeep', 'Audi', 'Lexus', 'Chevrolet', 'Toyota', 'Land Rover', 'Honda'];
const bodyTypes = ['All', 'SUV', 'Sedan', '4x4', 'Luxury', 'Coupe', 'Truck', 'Convertible'];
const transmissions = ['All', 'Automatic', 'Manual'];
const fuelTypes = ['All', 'Gasoline', 'Diesel', 'Electric', 'Hybrid'];

export default function ListingsPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 9;

    // Filters
    const [make, setMake] = useState('All');
    const [bodyType, setBodyType] = useState('All');
    const [transmission, setTransmission] = useState('All');
    const [fuelType, setFuelType] = useState('All');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState('');

    const { toggleFavorite, isFavorite } = useFavorites();

    React.useEffect(() => {
        filterVehicles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, make, bodyType, transmission, fuelType, minPrice, maxPrice, search]);

    const filterVehicles = async () => {
        setLoading(true);
        // Simulate network delay for realistic feel
        await new Promise(resolve => setTimeout(resolve, 300));

        // Cast seed data to Vehicle type since it's missing _id
        let filtered = seedVehicles.map((v, i) => ({ ...v, _id: `seed-${i}` } as unknown as Vehicle));

        if (make !== 'All') {
            filtered = filtered.filter(v => v.make === make);
        }
        if (bodyType !== 'All') {
            filtered = filtered.filter(v => v.bodyType === bodyType);
        }
        if (transmission !== 'All') {
            filtered = filtered.filter(v => v.transmission === transmission);
        }
        if (fuelType !== 'All') {
            filtered = filtered.filter(v => v.fuelType === fuelType);
        }
        if (minPrice) {
            filtered = filtered.filter(v => v.price >= parseInt(minPrice));
        }
        if (maxPrice) {
            filtered = filtered.filter(v => v.price <= parseInt(maxPrice));
        }
        if (search) {
            const query = search.toLowerCase();
            filtered = filtered.filter(v =>
                v.make.toLowerCase().includes(query) ||
                v.model.toLowerCase().includes(query) ||
                (v.description && v.description.toLowerCase().includes(query))
            );
        }

        setTotal(filtered.length);
        setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));

        const start = (page - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

        setVehicles(paginated);
        setLoading(false);
    };

    const clearFilters = () => {
        setMake('All');
        setBodyType('All');
        setTransmission('All');
        setFuelType('All');
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
        setPage(1);
    };

    const hasActiveFilters = make !== 'All' || bodyType !== 'All' || transmission !== 'All' ||
        fuelType !== 'All' || minPrice || maxPrice || search;


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        scrollToTop();
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-16 bg-[var(--color-background)]">
                <div className="container mx-auto px-6">
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="heading-2 mb-2">Browse Our Inventory</h1>
                            <p className="text-[var(--color-silver)]">
                                {total} {total === 1 ? 'vehicle' : 'vehicles'} available
                            </p>
                        </div>

                        {/* Search Bar Mobile/Desktop */}
                        <div className="w-full md:w-auto min-w-[300px]">
                            <div className="relative">
                                <Input
                                    placeholder="Search by make, model, or keywords..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    className="pl-10 h-12 bg-white/5 border-white/10 hover:border-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
                                />
                                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-silver)]" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="glass-strong p-6 rounded-xl sticky top-32">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="heading-4">Filters</h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
                                        >
                                            <IoClose size={18} />
                                            Clear
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <Select
                                        label="Make"
                                        value={make}
                                        onChange={(e) => {
                                            setMake(e.target.value);
                                            setPage(1);
                                        }}
                                        options={makes.map(m => ({ value: m, label: m }))}
                                    />

                                    <Select
                                        label="Body Type"
                                        value={bodyType}
                                        onChange={(e) => {
                                            setBodyType(e.target.value);
                                            setPage(1);
                                        }}
                                        options={bodyTypes.map(b => ({ value: b, label: b }))}
                                    />

                                    <Select
                                        label="Transmission"
                                        value={transmission}
                                        onChange={(e) => {
                                            setTransmission(e.target.value);
                                            setPage(1);
                                        }}
                                        options={transmissions.map(t => ({ value: t, label: t }))}
                                    />

                                    <Select
                                        label="Fuel Type"
                                        value={fuelType}
                                        onChange={(e) => {
                                            setFuelType(e.target.value);
                                            setPage(1);
                                        }}
                                        options={fuelTypes.map(f => ({ value: f, label: f }))}
                                    />

                                    <div>
                                        <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2 block">
                                            Price Range
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                placeholder="Min"
                                                type="number"
                                                value={minPrice}
                                                onChange={(e) => {
                                                    setMinPrice(e.target.value);
                                                    setPage(1);
                                                }}
                                            />
                                            <Input
                                                placeholder="Max"
                                                type="number"
                                                value={maxPrice}
                                                onChange={(e) => {
                                                    setMaxPrice(e.target.value);
                                                    setPage(1);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Vehicles Grid */}
                        <div className="lg:col-span-3">
                            {loading ? (
                                <GridSkeleton count={9} />
                            ) : vehicles.length === 0 ? (
                                <div className="glass p-12 rounded-xl text-center">
                                    <div className="text-[var(--color-silver)] mb-4 text-6xl opacity-20 mx-auto w-fit">
                                        <IoSearch />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">No Match Found</h3>
                                    <p className="text-[var(--color-silver)] mb-6">
                                        We couldn't find any vehicles matching your current filters.
                                    </p>
                                    {hasActiveFilters && (
                                        <Button onClick={clearFilters} variant="outline">
                                            Clear All Filters
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                                        {vehicles.map((vehicle) => (
                                            <VehicleCard
                                                key={vehicle._id?.toString()}
                                                vehicle={vehicle}
                                                onFavoriteToggle={toggleFavorite}
                                                isFavorite={isFavorite(vehicle._id?.toString() || '')}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 pb-8">
                                            <Button
                                                variant="secondary"
                                                disabled={page === 1}
                                                onClick={() => handlePageChange(Math.max(1, page - 1))}
                                            >
                                                Previous
                                            </Button>

                                            <div className="flex gap-2">
                                                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                                    let pageNum;
                                                    if (totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (page <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (page >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = page - 2 + i;
                                                    }

                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-10 h-10 rounded-lg transition-all font-medium ${page === pageNum
                                                                ? 'bg-[var(--color-accent)] text-black shadow-lg scale-110'
                                                                : 'glass hover:bg-white/10 text-white'
                                                                }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <Button
                                                variant="secondary"
                                                disabled={page === totalPages}
                                                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
