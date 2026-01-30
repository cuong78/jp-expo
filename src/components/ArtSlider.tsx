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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [dragCurrent, setDragCurrent] = useState<number | null>(null);

    // Khoảng cách tối thiểu để kích hoạt swipe (50px)
    const minSwipeDistance = 50;

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

    // Touch handlers cho mobile
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        }
        if (isRightSwipe) {
            handlePrev();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    // Mouse drag handlers cho desktop
    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart(e.clientX);
        setDragCurrent(e.clientX);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || dragStart === null) return;
        setDragCurrent(e.clientX);
    };

    const onMouseUp = () => {
        if (!isDragging || dragStart === null || dragCurrent === null) {
            setIsDragging(false);
            setDragStart(null);
            setDragCurrent(null);
            return;
        }

        const distance = dragStart - dragCurrent;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        }
        if (isRightSwipe) {
            handlePrev();
        }

        setIsDragging(false);
        setDragStart(null);
        setDragCurrent(null);
    };

    const onMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setDragStart(null);
            setDragCurrent(null);
        }
        setIsHovered(false);
    };

    // Tự động chuyển slide sau 5s (chỉ khi không hover và không đang drag)
    useEffect(() => {
        if (!isHovered && !isDragging && !touchStart) {
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
    }, [isHovered, isDragging, touchStart]);

    // Chiều cao nhỏ hơn để hiển thị theo tỷ lệ rộng
    const heightClass = "h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh]";

    return (
        <div
            className={`relative min-h-[300px] ${heightClass} max-h-[700px] w-full overflow-hidden bg-black rounded-3xl transition-all duration-300 group cursor-grab active:cursor-grabbing select-none`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
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

            {/* Navigation Arrows - Ẩn trên mobile */}
            <div className="hidden sm:flex absolute inset-x-0 top-1/2 -translate-y-1/2 z-[100] items-center justify-between px-3 sm:px-4 md:px-6 pointer-events-none">
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

            {/* Bullet Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2">
                {initialItems.map((item, index) => {
                    const isActive = items[0].id === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                // Tìm vị trí của item trong mảng items hiện tại
                                const currentIndex = items.findIndex(i => i.id === item.id);
                                if (currentIndex === -1) return;

                                // Xoay mảng để đưa item lên đầu
                                if (currentIndex > 0) {
                                    const newItems = [...items];
                                    const [targetItem] = newItems.splice(currentIndex, 1);
                                    setItems([targetItem, ...newItems]);
                                }
                            }}
                            className={`transition-all duration-300 rounded-full ${isActive
                                ? 'w-8 h-2 bg-white'
                                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                                }`}
                            aria-label={`Chuyển đến slide ${index + 1}`}
                            type="button"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ArtSlider;
