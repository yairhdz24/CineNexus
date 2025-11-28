import { useEffect, useRef, useState } from 'react';
import { Spotlight } from './ui/Spotlight';
import { BackgroundBeams } from './ui/BackgroundBeams';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { Sparkles } from './ui/Sparkles';
import { Meteors } from './ui/Meteors';

export default function ParallaxHeader({ title, subtitle, image }) {
    const [scrollY, setScrollY] = useState(0);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const rect = headerRef.current.getBoundingClientRect();
                setScrollY(-rect.top);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            ref={headerRef}
            className="relative h-[50vh] md:h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Parallax */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${scrollY * 0.5}px)`,
                    transition: 'transform 0.1s ease-out',
                }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
            
            {/* Background Effects */}
            <BackgroundBeams className="z-10" />
            <Sparkles id="header-sparkles" className="z-10" sparklesCount={30} />
            <div className="absolute inset-0 z-10 overflow-hidden">
                <Meteors number={15} />
            </div>
            
            {/* Spotlight Effect */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-30" fill="white" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 w-full max-w-6xl mx-auto">
                <div className="animate-slide-up">
                    <TextGenerateEffect 
                        words={title} 
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
                        duration={0.3}
                    />
                    {subtitle && (
                        <p className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
