import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className,
    id,
    ...props
}) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-[var(--color-text-secondary)]"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={cn(
                    'w-full px-4 py-3 bg-[var(--color-gunmetal)] text-white rounded-lg',
                    'border border-transparent focus:border-[var(--color-accent)] focus:outline-none',
                    'transition-all duration-300',
                    'placeholder:text-[var(--color-silver)]',
                    error && 'border-[var(--color-racing-red)]',
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-sm text-[var(--color-racing-red)]">{error}</span>
            )}
        </div>
    );
};
