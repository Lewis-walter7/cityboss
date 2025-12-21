'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse favorites:', e);
            }
        }
    }, []);

    // Debounced save to localStorage
    const saveToLocalStorage = useCallback((newFavorites: string[]) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }, 500); // Wait 500ms before saving
    }, []);

    const toggleFavorite = useCallback((vehicleId: string) => {
        setFavorites((prev) => {
            const newFavorites = prev.includes(vehicleId)
                ? prev.filter((id) => id !== vehicleId)
                : [...prev, vehicleId];

            saveToLocalStorage(newFavorites);
            return newFavorites;
        });
    }, [saveToLocalStorage]);

    const isFavorite = useCallback((vehicleId: string) => {
        return favorites.includes(vehicleId);
    }, [favorites]);

    return { favorites, toggleFavorite, isFavorite };
}
