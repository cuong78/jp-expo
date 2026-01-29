import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";

interface HeroSlide {
    id: number;
    ctaText: string;
    image: string;
    imageMobile?: string;
}

const slides: HeroSlide[] = [
    {
        id: 1,
        ctaText: "Đặt Vé Nhanh",
        image: "/Img/Slide/slide_1_img_master.jpg",
        imageMobile: "/Img/Slide/slide_1_mb_master.jpg",
    },
    {
        id: 2,
        ctaText: "Đặt Vé Nhanh",
        image: "/Img/Slide/slide_2_img_master.jpg",
        imageMobile: "/Img/Slide/slide_2_mb_master.jpg",
    },
    {
        id: 3,
        ctaText: "Đặt Vé Nhanh",
        image: "/Img/Slide/slide_3_img_master.jpg",
        imageMobile: "/Img/Slide/slide_3_mb_master.png",
    },
];

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);

    const totalSlides = slides.length;
    const slide = slides[activeIndex];

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAnimating(false), 450);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAnimating(false), 450);
    };

    useEffect(() => {
        if (isHovered) return;

        const autoNext = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalSlides);
        }, 6500);

        return () => clearInterval(autoNext);
    }, [isHovered, totalSlides]);

    const heightClass = "min-h-[420px] h-[68vh] sm:h-[72vh] md:h-[78vh] lg:h-[82vh] max-h-[920px]";

    return (
        <section
            className={["relative flex w-full flex-col justify-center overflow-hidden", "transition-all duration-500", heightClass, "group"].join(
                " ",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={(e) => {
                const t = e.touches[0];
                if (!t) return;
                touchStartRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
            }}
            onTouchEnd={(e) => {
                const start = touchStartRef.current;
                if (!start) return;
                const t = e.changedTouches[0];
                if (!t) return;

                const dx = t.clientX - start.x;
                const dy = t.clientY - start.y;
                const dt = Date.now() - start.t;
                touchStartRef.current = null;

                // Horizontal swipe only (avoid hijacking vertical scroll).
                const absX = Math.abs(dx);
                const absY = Math.abs(dy);
                const minSwipe = 36;
                if (absX < minSwipe) return;
                if (absX < absY * 1.2) return;
                if (dt > 900) return;

                if (dx < 0) handleNext();
                else handlePrev();
            }}
        >
            <div className="absolute inset-0">
                {slides.map((s, index) => (
                    <div
                        key={s.id}
                        className={[
                            "absolute inset-0 transition-opacity duration-700 ease-in-out",
                            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
                        ].join(" ")}
                    >
                        <img
                            src={s.image}
                            alt="Hero banner"
                            className="absolute inset-0 hidden h-full w-full transition-transform duration-700 sm:block"
                            loading={index === activeIndex ? "eager" : "lazy"}
                        />
                        <img
                            src={s.imageMobile ?? s.image}
                            alt="Hero banner"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 sm:hidden"
                            loading={index === activeIndex ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-black/12 transition-colors duration-500 group-hover:bg-black/18" />
                    </div>
                ))}
            </div>

            <div
                className={["absolute inset-0 transition-colors duration-700", "bg-gradient-to-r from-black/55 via-black/10 to-transparent"].join(
                    " ",
                )}
            />

            {/* Mobile CTA: bottom-left, compact + polished */}
            <div className="absolute bottom-16 left-4 z-30 sm:hidden">
                <button
                    type="button"
                    className={[
                        "hero-cta-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-4 py-2.5 text-sm font-semibold",
                        "border border-white/25 bg-black/35 text-white shadow-lg shadow-black/25 backdrop-blur-md",
                        "transition-all duration-300",
                        "active:scale-[0.98]",
                    ].join(" ")}
                >
                    <Ticket className="h-5 w-5" />
                    {slide.ctaText}
                </button>
            </div>

            {/* Desktop CTA (optional): keep subtle on larger screens */}
            <div className="relative z-20 hidden w-full px-4 sm:block sm:px-6 md:px-10">
                <div className="max-w-xl space-y-3 pl-2 sm:pl-3 md:pl-12">
                    <button
                        type="button"
                        className={[
                            "hero-cta-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                            "border border-amber-200/60 bg-white/10 text-white shadow-lg shadow-black/15 backdrop-blur-sm",
                            "hover:-translate-y-0.5 hover:border-amber-200/85 hover:bg-white/15 hover:shadow-amber-500/20",
                            "active:scale-[0.98]",
                        ].join(" ")}
                    >
                        <Ticket className="h-5 w-5" />
                        {slide.ctaText}
                    </button>
                </div>
            </div>

            <div
                className={[
                    "pointer-events-none absolute inset-x-0 z-30 flex items-center justify-between",

                    "bottom-5 px-4",

                    "sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:px-5 md:px-6",
                ].join(" ")}
            >
                <button
                    onClick={handlePrev}
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white/80 shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-x-0.5 hover:border-white/50 hover:bg-black/55 hover:text-white active:scale-95 md:h-10 md:w-10"
                    aria-label="Slide trước"
                    type="button"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                    onClick={handleNext}
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white/80 shadow-md backdrop-blur-md transition-all duration-200 hover:translate-x-0.5 hover:border-white/50 hover:bg-black/55 hover:text-white active:scale-95 md:h-10 md:w-10"
                    aria-label="Slide tiếp theo"
                    type="button"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:gap-3">
                {slides.map((s, index) => (
                    <button
                        key={`dot-${s.id}`}
                        onClick={() => setActiveIndex(index)}
                        className={[
                            "h-2.5 rounded-full transition-all duration-200",
                            index === activeIndex ? "w-8 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)]" : "w-2.5 bg-white/40 hover:bg-white/75",
                        ].join(" ")}
                        aria-label={`Chuyển đến slide ${index + 1}`}
                        type="button"
                    />
                ))}
            </div>

            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
        </section>
    );
};

export default HeroSection;
