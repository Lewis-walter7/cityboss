import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-[var(--color-accent)] text-white hover:shadow-[0_0_20px_var(--color-accent-glow)] hover:brightness-110',
        secondary: 'bg-white text-black hover:bg-zinc-200',
        outline: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/40',
        ghost: 'text-white/70 hover:text-white hover:bg-white/10',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
