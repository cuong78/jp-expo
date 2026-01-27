import { useState, useEffect } from 'react';

const initialItems = [
    {
        id: 1,
        img: '/Img/Slide/slide_1_img_master.jpg',
        imgMobile: '/Img/Slide/slide_1_mb_master.jpg',
        title: 'VAN GOGH & MONET',
        des: 'Triển lãm đa giác quan, tái hiện bức tranh kinh điển với mapping 360°.',
    },
    {
        id: 2,
        img: '/Img/Slide/slide_2_img_master.jpg',
        imgMobile: '/Img/Slide/slide_2_mb_master.jpg',
        title: 'LIGHT CITY',
        des: 'Thành phố ánh sáng kết hợp giáo dục STEM, tương tác cảm biến và trải nghiệm AR.',
    },
];

const ArtSlider = () => {
    const [items, setItems] = useState(initialItems);
    const [isHovered, setIsHovered] = useState(false);

    const handleNext = () => {
        setItems((prev) => {
            const first = prev[0];
            const rest = prev.slice(1);
            return [...rest, first];
        });
    };

    const handlePrev = () => {
        setItems((prev) => {
            const last = prev[prev.length - 1];
            const rest = prev.slice(0, prev.length - 1);
            return [last, ...rest];
        });
    };

    // Tự động chuyển slide sau 5s (chỉ khi không hover)
    useEffect(() => {
        if (!isHovered) {
            const autoNext = setInterval(() => {
                setItems((prev) => {
                    const first = prev[0];
                    const rest = prev.slice(1);
                    return [...rest, first];
                });
            }, 5000);
            return () => {
                clearInterval(autoNext);
            };
        }
    }, [isHovered]);

    // Chiều cao nhỏ hơn để hiển thị theo tỷ lệ rộng
    const heightClass = "h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh]";

    return (
        <div 
            className={`relative min-h-[300px] ${heightClass} max-h-[700px] w-full overflow-hidden bg-black rounded-3xl transition-all duration-300 group cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Danh sách các slide chính */}
            <div className="relative z-10 w-full h-full">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === 0 ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'
                            }`}
                    >
                        {/* Desktop Image */}
                        <img
                            src={item.img}
                            alt={item.title}
                            className="hidden sm:block absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        {/* Mobile Image */}
                        <img
                            src={item.imgMobile}
                            alt={item.title}
                            className="sm:hidden absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        {/* Overlay mờ khi hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[100] flex items-center justify-between px-3 sm:px-4 md:px-6 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/30 text-white/70 transition-all duration-200 ease-out hover:bg-black/50 hover:border-white/50 hover:text-white hover:scale-105 active:scale-95 pointer-events-auto shadow-md"
                    aria-label="Slide trước"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/30 text-white/70 transition-all duration-200 ease-out hover:bg-black/50 hover:border-white/50 hover:text-white hover:scale-105 active:scale-95 pointer-events-auto shadow-md"
                    aria-label="Slide tiếp theo"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ArtSlider;
