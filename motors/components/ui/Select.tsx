import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
    label,
    error,
    options,
    className,
    id,
    ...props
}) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={selectId}
                    className="text-sm font-medium text-[var(--color-text-secondary)]"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={cn(
                    'w-full px-4 py-3 bg-[var(--color-gunmetal)] text-white rounded-lg',
                    'border border-transparent focus:border-[var(--color-accent)] focus:outline-none',
                    'transition-all duration-300',
                    'cursor-pointer',
                    error && 'border-[var(--color-racing-red)]',
                    className
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <span className="text-sm text-[var(--color-racing-red)]">{error}</span>
            )}
        </div>
    );
};
