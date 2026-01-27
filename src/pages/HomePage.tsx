import { cn } from "@/utils/cn";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Globe2,
    Mail,
    Menu,
    MessageCircle,
    Phone,
    ShoppingCart,
    UserRound,
    X,
} from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { InfiniteGallery } from "@/components/InfiniteGallery";
import { Footer } from "@/layouts/footer";
import ArtSlider from "@/components/ArtSlider";

type NavItem = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    { label: "Trang chủ", href: "#home" },
    {
        label: "Giới thiệu",
        href: "#gioi-thieu",
        children: [
            { label: "Van Gogh & Monet Expo", href: "#van-gogh" },
            { label: "Light City", href: "#light-city" },
            { label: "Infinity World & Fly Over The World 12D", href: "#infinity" },
        ],
    },
    {
        label: "Mua vé",
        href: "#mua-ve",
        children: [
            { label: "Van Gogh & Monet Expo", href: "#mua-ve" },
            { label: "Light City", href: "#mua-ve" },
            { label: "Fly & Infinity 12D", href: "#mua-ve" },
        ],
    },
    { label: "Review", href: "#review" },
    { label: "Tin tức", href: "#tin-tuc" },
];

const HomePage = () => {
    const [activeNav, setActiveNav] = useState<string>(navItems[0]?.href ?? "#home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
    const [showHeader, setShowHeader] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [currentGallery, setCurrentGallery] = useState<string[]>([]);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [touchEnd, setTouchEnd] = useState<number>(0);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
    const [isLightCityExpanded, setIsLightCityExpanded] = useState<boolean>(false);
    const [isFlyOverExpanded, setIsFlyOverExpanded] = useState<boolean>(false);

    // Refs for sliders
    const reviewSliderRef = useRef<HTMLDivElement>(null);
    const newsSliderRef = useRef<HTMLDivElement>(null);
    const promoSliderRef = useRef<HTMLDivElement>(null);

    const galleryImages = [
        '/Img/Ingohartimage1/ingohartimage1.png',
        '/Img/Ingohartimage1/ingohartimage2.png',
        '/Img/Ingohartimage1/ingohartimage3.png',
        '/Img/Ingohartimage1/ingohartimage4.png',
        '/Img/Ingohartimage1/ingohartimage5.png',
        '/Img/Ingohartimage1/ingohartimage6.png',
        '/Img/Ingohartimage1/ingohartimage7.png',
        '/Img/Ingohartimage1/ingohartimage8.png',
        '/Img/Ingohartimage1/ingohartimage9.png',
        '/Img/Ingohartimage1/ingohartimage10.png',
        '/Img/Ingohartimage1/ingohartimage11.png',
        '/Img/Ingohartimage1/ingohartimage12.png',
        '/Img/Ingohartimage1/ingohartimage13.png',
    ];

    const lightCityImages = [
        '/Img/Ingohartimage2/ingohartimage1_2.png',
        '/Img/Ingohartimage2/ingohartimage2_2.png',
        '/Img/Ingohartimage2/ingohartimage3_2.png',
        '/Img/Ingohartimage2/ingohartimage5_2.png',
        '/Img/Ingohartimage2/ingohartimage6_2.png',
        '/Img/Ingohartimage2/ingohartimage7_2.png',
        '/Img/Ingohartimage2/ingohartimage8_2.png',
        '/Img/Ingohartimage2/ingohartimage9_2.png',
        '/Img/Ingohartimage2/ingohartimage10_2.png',
        '/Img/Ingohartimage2/ingohartimage11_2.png',
        '/Img/Ingohartimage2/ingohartimage12_2.png',
    ];

    const isNavActive = useMemo(
        () => (item: NavItem) => item.href === activeNav || item.children?.some((c) => c.href === activeNav),
        [activeNav]
    );

    const scrollTo = (href: string) => {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setActiveNav(href);
        setIsMobileMenuOpen(false);
    };

    const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
        if (ref.current) {
            const scrollAmount = 350; // width of card + gap
            const newScrollLeft = direction === 'left' 
                ? ref.current.scrollLeft - scrollAmount 
                : ref.current.scrollLeft + scrollAmount;
            
            ref.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentGallery.length > 0) {
            // Swipe left - next image
            const newIndex = selectedImageIndex === currentGallery.length - 1 ? 0 : selectedImageIndex + 1;
            setSelectedImageIndex(newIndex);
            setSelectedImage(currentGallery[newIndex]);
        }

        if (isRightSwipe && currentGallery.length > 0) {
            // Swipe right - previous image
            const newIndex = selectedImageIndex === 0 ? currentGallery.length - 1 : selectedImageIndex - 1;
            setSelectedImageIndex(newIndex);
            setSelectedImage(currentGallery[newIndex]);
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const toggleMenu = (label: string) => {
        setExpandedMenus((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(label)) {
                newSet.delete(label);
            } else {
                newSet.add(label);
            }
            return newSet;
        });
    };

    // Disable body scroll khi modal mở
    useEffect(() => {
        if (isCartOpen || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup khi component unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isCartOpen, isMobileMenuOpen]);

    // Ẩn/hiện header khi scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hiện header khi ở top
            if (currentScrollY < 10) {
                setShowHeader(true);
            }
            // Ẩn khi scroll xuống, hiện khi scroll lên
            else if (currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-transform duration-300",
                showHeader ? "translate-y-0" : "-translate-y-full"
            )}>
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:py-5">
                    <div className="flex items-center gap-3">
                        <img
                            src="/main-logo/logo.png"
                            alt="JP Art Expo Logo"
                            className="h-12 w-auto"
                        />
                        <div className="hidden sm:block">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Immersive</p>
                            <p className="text-lg font-bold">JP Art Expo</p>
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-2 lg:flex">
                        {navItems.map((item) => {
                            const active = isNavActive(item);
                            return (
                                <div
                                    key={item.label}
                                    className="group relative"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!item.children) {
                                                scrollTo(item.href);
                                            }
                                        }}
                                        className={cn(
                                            "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition",
                                            active
                                                ? "bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/40"
                                                : "text-white/80 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                        {item.children && <ChevronDown size={16} />}
                                    </button>
                                    {item.children && (
                                        <>
                                            {/* Invisible bridge to prevent dropdown from closing */}
                                            <div className="invisible absolute left-0 top-full h-3 w-64 group-hover:visible" />
                                            <div className="invisible absolute left-0 top-[calc(100%+0.75rem)] w-64 rounded-2xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                                                <div className="flex flex-col gap-2">
                                                    {item.children.map((child) => (
                                                        <button
                                                            key={child.label}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                scrollTo(child.href);
                                                            }}
                                                            className="rounded-xl px-3 py-2 text-left text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                                                        >
                                                            {child.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button className="hidden items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:border-amber-400 hover:text-amber-300 md:flex">
                            <Globe2 size={16} />
                            VN / EN
                        </button>
                        <button className="hidden rounded-full bg-white/5 p-2 transition hover:bg-white/10 lg:inline-flex">
                            <UserRound size={18} />
                        </button>
                        <button 
                            className="hidden rounded-full bg-white/5 p-2 transition hover:bg-white/10 lg:inline-flex"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Giỏ hàng"
                        >
                            <ShoppingCart size={18} />
                        </button>
                        {/* Mobile Shopping Cart */}
                        <button 
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 p-2 transition hover:bg-white/10 lg:hidden"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Giỏ hàng"
                        >
                            <ShoppingCart size={20} />
                        </button>
                        <button
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 p-2 transition hover:bg-white/10 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Mở menu"
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition",
                    isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-full w-80 max-w-[80vw] flex-col bg-white text-slate-900 shadow-2xl transition-transform duration-200",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">Danh mục</p>
                        <p className="text-xl font-extrabold text-slate-900">JP Art Expo</p>
                    </div>
                    <button
                        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Đóng menu"
                    >
                        <X />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    <ul className="space-y-4">
                        {navItems.map((item) => {
                            const isExpanded = expandedMenus.has(item.label);
                            return (
                                <li key={item.label}>
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!item.children) {
                                                    scrollTo(item.href);
                                                }
                                            }}
                                            className="flex-1 text-left text-base font-semibold text-slate-900 transition hover:text-amber-600"
                                        >
                                            {item.label}
                                        </button>
                                        {item.children && (
                                            <button
                                                onClick={() => toggleMenu(item.label)}
                                                className="rounded-full p-2 transition hover:bg-slate-100"
                                                aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
                                            >
                                                <ChevronDown
                                                    size={18}
                                                    className={cn(
                                                        "text-slate-600 transition-transform duration-200",
                                                        isExpanded && "rotate-180"
                                                    )}
                                                />
                                            </button>
                                        )}
                                    </div>
                                    {item.children && isExpanded && (
                                        <ul className="mt-2 space-y-2 border-l border-slate-200 pl-3 text-sm font-medium text-slate-700 animate-in slide-in-from-top-2">
                                            {item.children.map((child) => (
                                                <li key={child.label}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            scrollTo(child.href);
                                                        }}
                                                        className="w-full text-left transition hover:text-amber-600"
                                                    >
                                                        {child.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="space-y-3 border-t border-slate-200 px-5 py-4 text-sm font-medium text-slate-700">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Bạn cần hỗ trợ?</p>
                    <a
                        href="tel:0939733991"
                        className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 transition hover:border-amber-400 hover:text-amber-600"
                    >
                        <Phone size={18} /> 093 973 3991
                    </a>
                    <a
                        href="mailto:info@jp-expo.vn"
                        className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 transition hover:border-amber-400 hover:text-amber-600"
                    >
                        <Mail size={18} /> info@jp-expo.vn
                    </a>
                    <button className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 transition hover:border-amber-400 hover:text-amber-600">
                        <MessageCircle size={18} /> Messenger
                    </button>
                </div>
            </aside>

            {/* Shopping Cart Modal */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition",
                    isCartOpen ? "visible opacity-100" : "invisible opacity-0"
                )}
                onClick={() => setIsCartOpen(false)}
            />
            <aside
                className={cn(
                    "fixed right-0 top-0 z-50 flex h-full w-96 max-w-[90vw] flex-col bg-white text-slate-900 shadow-2xl transition-transform duration-300",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">Giỏ hàng</p>
                        <p className="text-xl font-extrabold text-slate-900">0 sản phẩm</p>
                    </div>
                    <button
                        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Đóng giỏ hàng"
                    >
                        <X />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                            <ShoppingCart size={48} className="text-slate-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-slate-900">Giỏ hàng trống</h3>
                        <p className="text-sm text-slate-600">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                    </div>
                </div>

                {/* Cart Footer */}
                <div className="border-t border-slate-200 px-5 py-4">
                    <div className="mb-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Tạm tính</span>
                            <span className="font-semibold text-slate-900">0₫</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Phí vận chuyển</span>
                            <span className="font-semibold text-slate-900">Miễn phí</span>
                        </div>
                        <div className="border-t border-slate-200 pt-2">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-slate-900">Tổng cộng</span>
                                <span className="text-xl font-bold text-amber-600">0₫</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50" disabled>
                        Thanh toán
                    </button>
                    <button 
                        className="mt-3 w-full rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-amber-400 hover:text-amber-600"
                        onClick={() => setIsCartOpen(false)}
                    >
                        Tiếp tục mua hàng
                    </button>
                </div>
            </aside>

            {/* Hero Swiper */}
            {/* <section id="home" className="pt-20">
                <HeroSwiper />
            </section> */}

            <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-24 pt-3 lg:pt-5">
                <div className="absolute left-1/2 top-10 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-10 top-40 -z-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

                {/* Giới thiệu */}
                {/* <section
                    id="gioi-thieu"
                    className="mt-20 space-y-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Giới thiệu</p>
                            <h2 className="text-3xl font-bold text-white">Ba không gian nghệ thuật chủ đạo</h2>
                        </div>
                        <button
                            onClick={() => scrollTo("#mua-ve")}
                            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-amber-400 hover:text-amber-300 md:inline-flex"
                        >
                            Đặt vé ngay
                        </button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                id: "van-gogh",
                                title: "Van Gogh & Monet Expo",
                                desc: "Triển lãm đa giác quan, tái hiện bức tranh kinh điển với mapping 360°.",
                                tag: "Immersive Art",
                            },
                            {
                                id: "light-city",
                                title: "Light City",
                                desc: "Thành phố ánh sáng kết hợp giáo dục STEM, tương tác cảm biến và trải nghiệm AR.",
                                tag: "New update",
                            },
                            {
                                id: "infinity",
                                title: "Infinity World & Fly Over The World 12D",
                                desc: "Hành trình bay vòng quanh thế giới 12D và không gian thị giác vô cực.",
                                tag: "Signature ride",
                            },
                        ].map((item) => (
                            <div
                                key={item.id}
                                id={item.id}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-400/60 hover:bg-white/10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-indigo-500/10 opacity-0 transition group-hover:opacity-100" />
                                <div className="relative flex items-center justify-between">
                                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
                                        {item.tag}
                                    </span>
                                    <Sparkles className="text-amber-200" size={18} />
                                </div>
                                <h3 className="relative mt-4 text-xl font-bold text-white">{item.title}</h3>
                                <p className="relative mt-3 text-sm text-white/75">{item.desc}</p>
                                <button
                                    onClick={() => scrollTo("#mua-ve")}
                                    className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300"
                                >
                                    <Ticket size={16} />
                                    Xem vé
                                </button>
                            </div>
                        ))}
                    </div>
                </section> */}

                {/* Art Slider */}
                <section className="mt-20">
                    <ArtSlider />
                </section>

                {/* Sự kiện nổi bật */}
                <section className="mt-12 space-y-6 md:mt-16">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Sự kiện</p>
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">Trải nghiệm nghệ thuật đa chiều</h2>
                    </div>
                    
                    {/* Grid 2 cột */}
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        {/* Card 1: Van Gogh & Monet - Enhanced */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:-translate-y-1 hover:border-amber-400/60 hover:bg-slate-900/80">
                            {/* Video Section */}
                            <div className="aspect-video overflow-hidden bg-black">
                                <iframe
                                    className="h-full w-full"
                                    src="https://www.youtube.com/embed/wqzWu4UIVHg?autoplay=0&mute=1&controls=1&rel=0"
                                    title="Vincent Van Gogh & Claude Monet – Limited Version"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <div className="p-5 sm:p-6">
                                {/* Title */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold leading-tight sm:text-2xl" style={{ color: '#4DEDFF' }}>
                                        Vincent Van Gogh & Claude Monet – Limited Version
                                    </h3>
                                </div>

                                {/* Image Carousel */}
                                <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#4DEDFF] scrollbar-track-white/10 hover:scrollbar-thumb-[#4DEDFF]/80">
                                    {galleryImages.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Van Gogh Gallery ${idx + 1}`}
                                            className="h-20 w-28 flex-shrink-0 rounded-lg object-cover transition-transform hover:scale-105 cursor-pointer"
                                            onClick={() => {
                                                setSelectedImage(img);
                                                setSelectedImageIndex(idx);
                                                setCurrentGallery(galleryImages);
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Description with Expand */}
                                <div className="mb-4">
                                    <p className={`text-sm leading-relaxed text-white/75 sm:text-base ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                                        Bắt đầu một cuộc phiêu lưu đa giác quan độc đáo tại Van Gogh & Monet Art Lighting Experience, nơi nghệ thuật và công nghệ hoà quyện. Sự kết hợp hoàn hảo giữa các tác phẩm cổ điển và công nghệ hiện đại như màn chiếu kỹ thuật số, công nghệ thực tế ảo, 3D mapping…mang đến một trải nghiệm đầy thú vị và sáng tạo.
                                    </p>
                                    <button
                                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                        className="mt-2 text-sm font-semibold transition"
                                        style={{ color: '#4DEDFF' }}
                                    >
                                        {isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => scrollTo("#mua-ve")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg transition hover:opacity-90 sm:px-6 sm:text-base"
                                        style={{ backgroundColor: '#4DEDFF' }}
                                    >
                                        ĐẶT VÉ NGAY
                                    </button>
                                    <button
                                        onClick={() => scrollTo("#van-gogh")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:bg-white/10 sm:px-6 sm:text-base"
                                    >
                                        XEM THÊM
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Light City */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:-translate-y-1 hover:border-amber-400/60 hover:bg-slate-900/80">
                            {/* Video Section */}
                            <div className="aspect-video overflow-hidden bg-black">
                                <iframe
                                    className="h-full w-full"
                                    src="https://www.youtube.com/embed/fCfoU2s5kjM?autoplay=0&mute=1&controls=1&rel=0"
                                    title="Light City Tầng 6"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <div className="p-5 sm:p-6">
                                {/* Title */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold leading-tight sm:text-2xl" style={{ color: '#4DEDFF' }}>
                                        LIGHT CITY - KHU GIÁO DỤC GIẢI TRÍ CÔNG NGHỆ CAO
                                    </h3>
                                </div>

                                {/* Image Carousel */}
                                <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#4DEDFF] scrollbar-track-white/10 hover:scrollbar-thumb-[#4DEDFF]/80">
                                    {lightCityImages.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Light City Gallery ${idx + 1}`}
                                            className="h-20 w-28 flex-shrink-0 rounded-lg object-cover transition-transform hover:scale-105 cursor-pointer"
                                            onClick={() => {
                                                setSelectedImage(img);
                                                setSelectedImageIndex(idx);
                                                setCurrentGallery(lightCityImages);
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Description with Expand */}
                                <div className="mb-4">
                                    <p className={`text-sm leading-relaxed text-white/75 sm:text-base ${!isLightCityExpanded ? 'line-clamp-3' : ''}`}>
                                        Khu giáo dục giải trí công nghệ cao mang đến trải nghiệm tương tác đa giác quan, kết hợp STEM với các hoạt động giáo dục sáng tạo. Không cần đến Singapore & Thái Lan, lần đầu tiên có mặt tại Việt Nam, chính thức đón khách tháng 04/2025.
                                    </p>
                                    <button
                                        onClick={() => setIsLightCityExpanded(!isLightCityExpanded)}
                                        className="mt-2 text-sm font-semibold transition"
                                        style={{ color: '#4DEDFF' }}
                                    >
                                        {isLightCityExpanded ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => scrollTo("#mua-ve")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg transition hover:opacity-90 sm:px-6 sm:text-base"
                                        style={{ backgroundColor: '#4DEDFF' }}
                                    >
                                        ĐẶT VÉ NGAY
                                    </button>
                                    <button
                                        onClick={() => scrollTo("#light-city")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:bg-white/10 sm:px-6 sm:text-base"
                                    >
                                        XEM THÊM
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Fly Over The World */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:-translate-y-1 hover:border-amber-400/60 hover:bg-slate-900/80">
                            {/* Main Image */}
                            <div className="aspect-video overflow-hidden bg-black">
                                <img 
                                    src="/Img/ingohartimg3.png"
                                    alt="Fly Over The World & Infinity World 12D"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-5 sm:p-6">
                                {/* Title */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold leading-tight sm:text-2xl" style={{ color: '#4DEDFF' }}>
                                        Fly Over The World & Infinity World 12D
                                    </h3>
                                </div>

                                {/* Image Carousel */}
                                <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#4DEDFF] scrollbar-track-white/10 hover:scrollbar-thumb-[#4DEDFF]/80">
                                    {[
                                        'https://theme.hstatic.net/200000815177/1001237592/14/ingohartimage1_3.png?v=2819',
                                        'https://theme.hstatic.net/200000815177/1001237592/14/ingohartimage2_3.png?v=2819',
                                        'https://theme.hstatic.net/200000815177/1001237592/14/ingohartimage3_3.png?v=2819',
                                    ].map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`Fly Over Gallery ${idx + 1}`}
                                            className="h-20 w-28 flex-shrink-0 rounded-lg object-cover transition-transform hover:scale-105 cursor-pointer"
                                            onClick={() => {
                                                setSelectedImage(img);
                                                setSelectedImageIndex(idx);
                                                setCurrentGallery([
                                                    'https://theme.hstatic.net/200000815177/1001237592/14/ingohartimage1_3.png?v=2819',
                                                    'https://theme.hstatic.net/200000815177/1001237592/14/ingohartimage2_3.png?v=2819',
                                                    'https://theme.hstatic.net/200000815177/1001237592/14/ingohartimage3_3.png?v=2819',
                                                ]);
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Description with Expand */}
                                <div className="mb-4">
                                    <p className={`text-sm leading-relaxed text-white/75 sm:text-base ${!isFlyOverExpanded ? 'line-clamp-3' : ''}`}>
                                        Hành trình 360 độ bay vòng quanh thế giới với công nghệ 12D và hiệu ứng chuyển động mượt mà. Kết hợp cùng không gian thị giác vô cực Infinity World với LED và gương phản chiếu vô tận, mang đến trải nghiệm đa chiều độc đáo.
                                    </p>
                                    <button
                                        onClick={() => setIsFlyOverExpanded(!isFlyOverExpanded)}
                                        className="mt-2 text-sm font-semibold transition"
                                        style={{ color: '#4DEDFF' }}
                                    >
                                        {isFlyOverExpanded ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => scrollTo("#mua-ve")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg transition hover:opacity-90 sm:px-6 sm:text-base"
                                        style={{ backgroundColor: '#4DEDFF' }}
                                    >
                                        ĐẶT VÉ NGAY
                                    </button>
                                    <button
                                        onClick={() => scrollTo("#infinity")}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:bg-white/10 sm:px-6 sm:text-base"
                                    >
                                        XEM THÊM
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </main>

            {/* Infinite Gallery - Full Width */}
            <InfiniteGallery />

            <main className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-24">
                {/* Review */}
                <section
                    id="review"
                    className="mt-20 space-y-6"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Review</p>
                        <h2 className="text-3xl font-bold text-white">Khách tham quan nói gì?</h2>
                    </div>
                    
                    {/* Review Cards Slider */}
                    <div className="relative group">
                        {/* Previous Button */}
                        <button
                            onClick={() => scrollSlider(reviewSliderRef, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition hover:bg-black/70 opacity-0 group-hover:opacity-100"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div 
                            ref={reviewSliderRef}
                            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
                        >
                            {[
                                {
                                    name: "Trải nghiệm đáng nhớ",
                                    image: "/Img/galinvidimage1.png",
                                    quote: "Không gian triển lãm được thiết kế rất ấn tượng với công nghệ ánh sáng hiện đại. Mình và gia đình đã có những khoảnh khắc tuyệt vời.",
                                },
                                {
                                    name: "Nghệ thuật sống động",
                                    image: "/Img/galinvidimage2.png",
                                    quote: "Các tác phẩm nghệ thuật được tái hiện một cách sống động qua công nghệ 3D mapping. Thực sự như lạc vào thế giới tranh vẽ.",
                                },
                                {
                                    name: "Giáo dục và giải trí",
                                    image: "/Img/galinvidimage3.png",
                                    quote: "Light City là nơi tuyệt vời cho trẻ em vừa học vừa chơi. Con mình rất thích các hoạt động khoa học tương tác.",
                                },
                                {
                                    name: "Công nghệ ấn tượng",
                                    image: "/Img/galinvidimage4.png",
                                    quote: "Chuyến bay 12D mang đến cảm giác thực tế tuyệt vời. Âm thanh và hình ảnh được đồng bộ hoàn hảo.",
                                },
                                {
                                    name: "Không gian độc đáo",
                                    image: "/Img/galinvidimage5.png",
                                    quote: "Infinity World với gương phản chiếu vô tận tạo nên không gian nghệ thuật độc đáo. Chụp ảnh ở đây rất đẹp!",
                                },
                                {
                                    name: "Đáng để ghé thăm",
                                    image: "/Img/galinvidimage6.png",
                                    quote: "Một địa điểm văn hóa nghệ thuật đáng để ghé thăm tại TP.HCM. Phù hợp cho cả gia đình và nhóm bạn.",
                                },
                            ].map((review, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition hover:-translate-y-1 hover:border-amber-400/60"
                                >
                                    {/* Image */}
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-white mb-3">{review.name}</h3>
                                        <p className="text-sm leading-relaxed text-white/75">{review.quote}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => scrollSlider(reviewSliderRef, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition hover:bg-black/70 opacity-0 group-hover:opacity-100"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </section>

                {/* Tin tức */}
                <section
                    id="tin-tuc"
                    className="mt-20 space-y-6"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Tin tức</p>
                        <h2 className="text-3xl font-bold text-white">Lịch sự kiện & cập nhật</h2>
                    </div>
                    
                    {/* News Cards Slider */}
                    <div className="relative group">
                        {/* Previous Button */}
                        <button
                            onClick={() => scrollSlider(newsSliderRef, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition hover:bg-black/70 opacity-0 group-hover:opacity-100"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div 
                            ref={newsSliderRef}
                            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
                        >
                            {[
                                {
                                    title: "Thông báo tạm ngưng hoạt động từ ngày 23/12/2025",
                                    image: "/Img/thongbao_d6e18eb079854aaa85c00e611a05e298_grande.png",
                                    description: "Cùng chờ đón triển lãm Vincent Van Gogh & Claude Monet Limited Version - Phần 2. Nâng cấp dịch vụ để mang đến trải nghiệm tốt nhất.",
                                },
                                {
                                    title: "Không gian triển lãm nghệ thuật hiện đại",
                                    image: "/Img/605641091_122237244032086141_1759456754890746787_n_7ea7d22535504d81998aaa475c5b93e5_grande.jpg",
                                    description: "Khám phá không gian triển lãm được thiết kế hiện đại với công nghệ ánh sáng và âm thanh chuyên nghiệp, tạo nên trải nghiệm nghệ thuật độc đáo.",
                                },
                                {
                                    title: "Khu vực tương tác đa phương tiện",
                                    image: "/Img/611356044_122238227168086141_1365806327491156651_n__1__cd956f7ec93e425b8fb4c1220d59d1e4_grande.jpg",
                                    description: "Trải nghiệm nghệ thuật tương tác với công nghệ đa phương tiện hiện đại. Không gian giáo dục và giải trí kết hợp hoàn hảo.",
                                },
                                {
                                    title: "Không gian thư giãn và chiêm ngưỡng nghệ thuật",
                                    image: "/Img/533019339_122220338894086141_6233740877803973104_n_3cc980f657b444368533fbf028b82b8f_grande.jpg",
                                    description: "Khu vực ngồi thư giãn với ghế lười êm ái, thưởng thức nghệ thuật ánh sáng và âm nhạc trong không gian yên tĩnh, lý tưởng.",
                                },
                                {
                                    title: "Trải nghiệm nghệ thuật ấn tượng Monet",
                                    image: "/Img/2000x2000_64ede7db8a2f48efa8b356f786a90c68_grande.png",
                                    description: "Đắm chìm trong thế giới nghệ thuật ấn tượng của Claude Monet với công nghệ 3D mapping và chiếu sáng độc đáo.",
                                },
                            ].map((news, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition hover:-translate-y-1 hover:border-amber-400/60"
                                >
                                    {/* Image */}
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-white mb-3">{news.title}</h3>
                                        <p className="text-sm leading-relaxed text-white/75">{news.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => scrollSlider(newsSliderRef, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition hover:bg-black/70 opacity-0 group-hover:opacity-100"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </section>

                {/* Thông tin ưu đãi */}
                <section
                    id="uu-dai"
                    className="mt-20 space-y-6"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Ưu đãi</p>
                        <h2 className="text-3xl font-bold text-white">Thông tin khuyến mãi</h2>
                    </div>
                    
                    {/* Promotion Cards Slider */}
                    <div className="relative group">
                        {/* Previous Button */}
                        <button
                            onClick={() => scrollSlider(promoSliderRef, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition hover:bg-black/70 opacity-0 group-hover:opacity-100"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div 
                            ref={promoSliderRef}
                            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
                        >
                            {[
                                {
                                    title: "Mùa 1 Tặng 1 - Vé Đồng Hành",
                                    image: "/Img/thumb1_3561ba2f78c247f9a0a16dcdb7a0f427_grande.jpg",
                                    description: "Xuân về thêm sắc, trải nghiệm thêm trạnh. Mua 1 tặng 1 vé đồng hành từ 23.12 - 20.02. Khám phá nghệ thuật cùng người thân yêu.",
                                },
                                {
                                    title: "Mùng Tháng 3 - Mua 1 Tặng 1",
                                    image: "/Img/thumb2_7158a4c6cbde4ef2bc84c38824f0ea7c_grande.jpg",
                                    description: "Tặng quà nghệ thuật Mua 1 Tặng 1. Tặng 1 vé Standard khi mua 1 vé bất kỳ. Áp dụng từ 01-31/03/2025.",
                                },
                                {
                                    title: "45 Lý Do Giữ Van Gogh Mãi Trong Tim",
                                    image: "/Img/thumb_2_606cbe0c75fd410f8a78ac816249d15a_grande.jpg",
                                    description: "Ưu đãi tri ân Mua 1 Tặng 1 vé & lên tới 50% BST quà lưu niệm Van Gogh. #countdownVanGoghGigamall",
                                },
                                {
                                    title: "Grand Opening - Mua 3 Vé Triển Lãm",
                                    image: "/Img/thumb_3_3b7991ff2e9047139ddc5a61ee30b72b_grande.jpg",
                                    description: "Mừng khai trương tại Gigamall. Mua 3 vé triển lãm tặng thêm 2 vé Standard hoặc 2 Combo Game Fly Over The World & Infinity World.",
                                },
                                {
                                    title: "Check-in Google Map Tặng Vé Miễn Phí",
                                    image: "/Img/1200x1200_a4cb51208fdd4ed798ab47827bdbed3c_grande.png",
                                    description: "Check-in trên Google Map khi mua vé trên lâm bất kỳ nhận ngay 1 vé miễn phí. Áp dụng từ ngày 07.01.2026.",
                                },
                            ].map((promo, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition hover:-translate-y-1 hover:border-amber-400/60"
                                >
                                    {/* Image */}
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={promo.image}
                                            alt={promo.title}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-white mb-3">{promo.title}</h3>
                                        <p className="text-sm leading-relaxed text-white/75">{promo.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => scrollSlider(promoSliderRef, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition hover:bg-black/70 opacity-0 group-hover:opacity-100"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </section>
            </main>

            {/* Image Popup/Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Đóng"
                    >
                        <X size={24} />
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (currentGallery.length > 0) {
                                const newIndex = selectedImageIndex === 0 ? currentGallery.length - 1 : selectedImageIndex - 1;
                                setSelectedImageIndex(newIndex);
                                setSelectedImage(currentGallery[newIndex]);
                            }
                        }}
                        aria-label="Hình trước"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Image */}
                    <img
                        src={selectedImage}
                        alt="Gallery view"
                        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Next Button */}
                    <button
                        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (currentGallery.length > 0) {
                                const newIndex = selectedImageIndex === currentGallery.length - 1 ? 0 : selectedImageIndex + 1;
                                setSelectedImageIndex(newIndex);
                                setSelectedImage(currentGallery[newIndex]);
                            }
                        }}
                        aria-label="Hình tiếp"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                        {selectedImageIndex + 1} / {currentGallery.length}
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;