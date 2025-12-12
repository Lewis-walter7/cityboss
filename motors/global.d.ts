import React from 'react';

// Strategy 1: Augment Global JSX
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                alt?: string;
                poster?: string;
                loading?: 'auto' | 'lazy' | 'eager';
                reveal?: 'auto' | 'interaction' | 'manual';
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                'shadow-intensity'?: string | number;
                'shadow-softness'?: string | number;
                exposure?: string | number;
                ar?: boolean;
                'ar-modes'?: string;
                'ar-scale'?: string;
                'ar-placement'?: 'floor' | 'wall';
                style?: React.CSSProperties;
                [key: string]: any;
            };
        }
    }
}

// Strategy 2: Augment React module (for newer React versions/Next.js)
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                alt?: string;
                poster?: string;
                loading?: 'auto' | 'lazy' | 'eager';
                reveal?: 'auto' | 'interaction' | 'manual';
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                'shadow-intensity'?: string | number;
                'shadow-softness'?: string | number;
                exposure?: string | number;
                ar?: boolean;
                'ar-modes'?: string;
                'ar-scale'?: string;
                'ar-placement'?: 'floor' | 'wall';
                style?: React.CSSProperties;
                [key: string]: any;
            };
        }
    }
}
