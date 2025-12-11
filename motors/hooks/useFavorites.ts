'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cityboss_favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load favorites from localStorage on mount
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Save favorites to localStorage whenever they change
        if (isLoaded) {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const toggleFavorite = (vehicleId: string) => {
        setFavorites((prev) =>
            prev.includes(vehicleId)
                ? prev.filter((id) => id !== vehicleId)
                : [...prev, vehicleId]
        );
    };

    const isFavorite = (vehicleId: string) => {
        return favorites.includes(vehicleId);
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        isLoaded,
    };
}
