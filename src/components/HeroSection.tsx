import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";

interface HeroSlide {
    id: number;
    title: string;
    description: string;
    ctaText: string;
    ctaSecondaryText: string;
    image: string;
    imageMobile?: string;
}

const slides: HeroSlide[] = [
    {
        id: 1,
        title: "LIGHT CITY",
        description: "Thành phố ánh sáng kết hợp giáo dục STEM, tương tác cảm biến và trải nghiệm AR.",
        ctaText: "Đặt Vé Nhanh",
        ctaSecondaryText: "Xem Chi Tiết",

        image: "/Img/Slide/slide_1_img_master.jpg",
        imageMobile: "/Img/Slide/slide_1_mb_master.jpg",
    },
    {
        id: 2,
        title: "VAN GOGH & MONET",
        description: "Triển lãm đa giác quan, tái hiện bức tranh kinh điển với mapping 360°.",
        ctaText: "Đặt Vé Nhanh",
        ctaSecondaryText: "Tìm Hiểu Thêm",

        image: "/Img/Slide/slide_2_img_master.jpg",
        imageMobile: "/Img/Slide/slide_2_mb_master.jpg",
    },
    {
        id: 3,
        title: "FLY OVER THE WORD",
        description: "Hòa trộn mapping 360° và âm thanh 3D để đắm chìm trong từng nét cọ.",
        ctaText: "Đặt Vé Nhanh",
        ctaSecondaryText: "Lịch Trình & Giá",

        image: "/Img/Slide/slide_3_img_master.jpg",
        imageMobile: "/Img/Slide/slide_3_mb_master.png",
    },
];

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

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
                            alt={s.title}
                            className="absolute inset-0 hidden h-full w-full transition-transform duration-700 sm:block"
                            loading={index === activeIndex ? "eager" : "lazy"}
                        />
                        <img
                            src={s.imageMobile ?? s.image}
                            alt={s.title}
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

            <div className="relative z-20 w-full px-4 sm:px-6 md:px-10">
                <div className="max-w-xl space-y-3 pl-2 sm:pl-3 md:pl-12">
                    <h1
                        key={`title-${slide.id}`}
                        className="text-3xl leading-tight font-black text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl"
                    >
                        {slide.title}
                    </h1>

                    <p
                        key={`desc-${slide.id}`}
                        className="text-sm font-medium text-white/90 drop-shadow-md sm:text-base md:text-lg"
                    >
                        {slide.description}
                    </p>

                    <div
                        key={`cta-${slide.id}`}
                        className="flex flex-wrap gap-2.5 pt-1.5"
                    >
                        <button
                            type="button"
                            className={[
                                "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                                "bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/35",
                                "hover:translate-y-[-1px] hover:bg-amber-200 active:scale-[0.98]",
                            ].join(" ")}
                        >
                            <Ticket className="h-5 w-5" />
                            {slide.ctaText}
                        </button>

                        <button
                            type="button"
                            className={[
                                "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                                "border border-gray-200/70 bg-amber-300/15 text-white backdrop-blur-sm",
                                "hover:translate-y-[-1px] hover:bg-amber-300/25 active:scale-[0.98]",
                            ].join(" ")}
                        >
                            {slide.ctaSecondaryText}
                        </button>
                    </div>
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
