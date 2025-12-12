'use client';

import React from 'react';
import '@google/model-viewer';

interface Featured3DViewerProps {
    modelPath: string;
}

const Featured3DViewer: React.FC<Featured3DViewerProps> = ({ modelPath }) => {
    return (
        <div className="w-full h-full min-h-[500px] flex items-center justify-center relative bg-transparent">
            <model-viewer
                src={modelPath}
                camera-controls
                auto-rotate
                shadow-intensity="1"
                shadow-softness="0.5"
                exposure="1"
                ar
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    minHeight: '500px',
                    '--poster-color': 'transparent'
                } as React.CSSProperties}
                alt="3D Car Model"
            >
                {/* Custom Loading Bar */}
                <div slot="progress-bar" className="w-full h-1 bg-white/10 absolute top-0 left-0">
                    <div className="h-full bg-[var(--color-accent)] transition-all duration-300" style={{ width: '0%' }} id="progress"></div>
                </div>
            </model-viewer>
        </div>
    );
};

export default Featured3DViewer;
