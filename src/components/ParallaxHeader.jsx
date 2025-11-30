export default function ParallaxHeader({ title, subtitle, image }) {
    return (
        <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 parallax-bg z-0"
                style={{
                    backgroundImage: `url(${image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop'})`
                }}
            />
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="relative z-20 text-center px-4 animate-slide-up">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
