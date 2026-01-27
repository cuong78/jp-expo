import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/effect-fade";
// import { ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        desktop: "/Img/Slide/slide_1_img_master.jpg",
        mobile: "/Img/Slide/slide_1_mb_master.jpg",
        title: "Light City",
        subtitle: "Trải nghiệm nghệ thuật đa giác quan",
        description: "Bước vào thế giới hội họa ấn tượng với công nghệ mapping 360°",
        cta: "Khám phá ngay",
    },
    {
        id: 2,
        desktop: "/Img/Slide/slide_2_img_master.jpg",
        mobile: "/Img/Slide/slide_2_mb_master.jpg",
        title: "Monet",
        subtitle: "Thành phố ánh sáng kỳ diệu",
        description: "Khám phá thế giới tương tác với công nghệ AR và STEM",
        cta: "Đặt vé ngay",
    },
];

export const HeroSwiper = () => {
    return (
        <div className="relative h-[calc((100vh-80px)/2)] md:h-[calc(100vh-80px)] w-full min-h-[250px] md:min-h-[500px]">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
                effect="fade"
                speed={1200}
                parallax={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletActiveClass: "!bg-amber-400 !w-8 sm:!w-10",
                    bulletClass: "inline-block w-2 h-2 sm:w-3 sm:h-3 mx-1 sm:mx-1.5 rounded-full bg-white/40 transition-all duration-300 cursor-pointer hover:bg-white/60",
                }}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            {/* Background Image */}
                            <picture>
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={slide.desktop}
                                />
                                <img
                                    src={slide.mobile}
                                    alt={slide.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    data-swiper-parallax="-20%"
                                />
                            </picture>

                            {/* Overlay Gradient */}
                            <div className="absolute -inset-0.5 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-end pb-24 sm:items-center sm:pb-0">
                                <div className="w-full px-6 sm:px-8 md:px-10 lg:px-16">
                                    <div className="max-w-xl space-y-4 sm:space-y-5 md:max-w-2xl lg:space-y-7">
                                        {/* <div
                                            className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 backdrop-blur-sm sm:px-5 sm:py-2"
                                            data-swiper-parallax="-100"
                                        >
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 sm:text-xs">
                                                {slide.subtitle}
                                            </span>
                                        </div> */}

                                        {/* <h1
                                            className="text-3xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                                            data-swiper-parallax="-200"
                                        >
                                            {slide.title}
                                        </h1> */}

                                        {/* <p
                                            className="max-w-lg text-sm font-medium leading-relaxed text-white/90 sm:text-base md:max-w-xl md:text-lg lg:text-xl"
                                            data-swiper-parallax="-300"
                                        >
                                            {slide.description}
                                        </p>

                                        <div
                                            data-swiper-parallax="-400"
                                            className="pt-2 sm:pt-3 md:pt-4"
                                        >
                                            <button className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-500/40 sm:px-7 sm:py-3.5 sm:text-sm md:px-9 md:py-4 md:text-base">
                                                {slide.cta}
                                                <ChevronRight
                                                    size={18}
                                                    className="transition-transform group-hover:translate-x-1 sm:size-5"
                                                />
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom group absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-md transition hover:bg-white/20 md:left-4 md:p-3 lg:block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white transition-transform group-hover:-translate-x-0.5 md:size-6"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>
            <button className="swiper-button-next-custom group absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-md transition hover:bg-white/20 md:right-4 md:p-3 lg:block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white transition-transform group-hover:translate-x-0.5 md:size-6"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 z-10 hidden -translate-x-1/2 md:bottom-16 lg:block">
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Cuộn xuống</span>
                    <div className="mx-auto h-7 w-4 rounded-full border-2 border-white/30">
                        <div className="mx-auto mt-1 h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                    </div>
                </div>
            </div>
        </div>
    );
};
