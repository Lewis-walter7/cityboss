import React from 'react';

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
    return <div className={`skeleton ${className}`} />;
};

export const VehicleCardSkeleton: React.FC = () => {
    return (
        <div className="card overflow-hidden">
            <LoadingSkeleton className="w-full h-64" />
            <div className="p-6 space-y-4">
                <LoadingSkeleton className="h-6 w-3/4" />
                <LoadingSkeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                    <LoadingSkeleton className="h-8 w-20" />
                    <LoadingSkeleton className="h-8 w-20" />
                    <LoadingSkeleton className="h-8 w-20" />
                </div>
                <div className="flex items-center justify-between pt-4">
                    <LoadingSkeleton className="h-8 w-32" />
                    <LoadingSkeleton className="h-10 w-28" />
                </div>
            </div>
        </div>
    );
};

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <VehicleCardSkeleton key={i} />
            ))}
        </div>
    );
};
