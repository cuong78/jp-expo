import { Link } from "react-router-dom";
import { Facebook, Youtube } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                {/* Top row: 4 columns */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: JP EXPO VIỆT NAM */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            JP EXPO VIỆT NAM
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    to="/tuyen-dung"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Tuyển dụng
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/lien-he"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Liên hệ & Địa điểm
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: ĐIỀU KHOẢN & CHÍNH SÁCH */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            ĐIỀU KHOẢN & CHÍNH SÁCH
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms-of-service"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Điều khoản dịch vụ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/return-policy"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Chính sách đổi trả
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/payment-guide"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Hướng dẫn mua hàng và thanh toán
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/delivery-policy"
                                    className="text-sm text-gray-300 transition hover:text-amber-400"
                                >
                                    Chính sách giao nhận vé
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: CHĂM SÓC KHÁCH HÀNG */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            CHĂM SÓC KHÁCH HÀNG
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li className="text-sm text-gray-300">
                                Email:{" "}
                                <a
                                    href="mailto:info@jp-expo.vn"
                                    className="text-white transition hover:text-amber-400"
                                >
                                    info@jp-expo.vn
                                </a>
                            </li>
                            <li className="text-sm text-gray-300">
                                Hotline:{" "}
                                <a
                                    href="tel:0909373991"
                                    className="text-white transition hover:text-amber-400"
                                >
                                    0909 373 991
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: KẾT NỐI VỚI CHÚNG TÔI */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            KẾT NỐI VỚI CHÚNG TÔI
                        </h3>
                        <div className="mt-4 flex items-center gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 transition hover:bg-blue-700"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} className="text-white" />
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black transition hover:bg-gray-900"
                                aria-label="TikTok"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-white"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 transition hover:bg-red-700"
                                aria-label="YouTube"
                            >
                                <Youtube size={20} className="text-white" />
                            </a>
                            <a
                                href="https://m.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 transition hover:from-blue-600 hover:to-purple-700"
                                aria-label="Messenger"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-white"
                                >
                                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.898 1.446 5.49 3.71 7.193V22l3.587-1.968c.957.262 1.968.403 3.018.403 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm.993 12.416l-2.558-2.73-4.993 2.73 5.491-5.834 2.623 2.73 4.927-2.73-5.49 5.834z" />
                                </svg>
                            </a>
                        </div>
                        <div className="mt-4">
                            <img
                                src="/Img/showbcngthuonglinkicon.png"
                                alt="Đã thông báo Bộ Công Thương"
                                className="h-12 w-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom row: Copyright */}
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p className="mb-2">
                        © Bản quyền 2025 của Chi nhánh Công ty TNHH JAZZY PARADISE
                    </p>
                    <p className="text-xs">
                        GPKĐ số 0312641062-002 cấp ngày 11/05/2022 tại Sở kế hoạch và Đầu tư TP.HCM
                    </p>
                    <p className="text-xs">
                        Lô 1-2-3-4-5-6, Tầng 6, 240 Phạm Văn Đồng, Phường Hiệp Bình, Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                </div>
            </div>
        </footer>
    );
};