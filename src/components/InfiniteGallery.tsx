import { useState } from "react";

const images = [
    "/Img/Wingalimage/wingalimage1_large.png",
    "/Img/Wingalimage/wingalimage2_large.png",
    "/Img/Wingalimage/wingalimage3_large.png",
    "/Img/Wingalimage/wingalimage4_large.png",
    "/Img/Wingalimage/wingalimage5_large.png",
    "/Img/Wingalimage/wingalimage6_large.png",
    "/Img/Wingalimage/wingalimage7_large.png",
    "/Img/Wingalimage/wingalimage8_large.png",
    "/Img/Wingalimage/wingalimage9_large.png",
    "/Img/Wingalimage/wingalimage10_large.png",
    "/Img/Wingalimage/wingalimage11_large.png",
    "/Img/Wingalimage/wingalimage12_large.png",
];

export const InfiniteGallery = () => {
    const [isPaused, setIsPaused] = useState(false);

    // Split images into 2 rows
    const row1Images = images.slice(0, 6);
    const row2Images = images.slice(6, 12);

    return (
        <section className="relative flex w-full flex-col justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900" style={{ height: 'calc(100vh - 80px)', minHeight: '550px' }}>
            <div className="relative z-20 px-4 text-center" style={{ marginBottom: 'calc(4vh + 1rem)' }}>
                <p className="font-bold uppercase tracking-[0.3em] text-amber-400" style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.875rem)' }}>
                    Gallery
                </p>
                <h2 className="mt-3 font-black text-white" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3.75rem)' }}>
                    Những khoảnh khắc đáng nhớ
                </h2>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative flex-shrink-0">
                {/* Left Gradient Overlay */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" style={{ width: 'clamp(3rem, 8vw, 8rem)' }} />

                {/* Right Gradient Overlay */}
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent" style={{ width: 'clamp(3rem, 8vw, 8rem)' }} />

                {/* Scrolling Images Row 1 - Left to Right */}
                <div
                    className="flex"
                    style={{ marginBottom: 'calc(1.5vh + 0.5rem)' }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className="flex shrink-0"
                        style={{
                            gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
                            animation: "scroll-left 40s linear infinite",
                            animationPlayState: isPaused ? "paused" : "running",
                        }}
                    >
                        {[...row1Images, ...row1Images].map((image, index) => (
                            <div
                                key={`row1-${index}`}
                                className="group relative aspect-[4/3] shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-2xl transition hover:border-amber-400/50 md:rounded-xl"
                                style={{ height: 'calc((100vh - 80px - 12vh) / 2.5)' }}
                            >
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrolling Images Row 2 - Right to Left */}
                <div
                    className="flex"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className="flex shrink-0"
                        style={{
                            gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
                            animation: "scroll-right 40s linear infinite",
                            animationPlayState: isPaused ? "paused" : "running",
                        }}
                    >
                        {[...row2Images, ...row2Images].map((image, index) => (
                            <div
                                key={`row2-${index}`}
                                className="group relative aspect-[4/3] shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-2xl transition hover:border-amber-400/50 md:rounded-xl"
                                style={{ height: 'calc((100vh - 80px - 12vh) / 2.5)' }}
                            >
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 7}`}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
