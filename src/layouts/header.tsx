import { useTheme } from "@/hooks/useThemeCT";
import { Bell, ChevronsLeft, Moon, Search, Sun, User } from "lucide-react";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import React from "react";
import { cn } from "../utils/cn";
import { Link } from "react-router-dom";

export const Header: React.FC<{ collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    collapsed,
    setCollapsed,
}) => {
    const { theme, setTheme } = useTheme(); // Nếu hook đã có type thì không cần ép kiểu

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-5 shadow-md transition-colors dark:bg-slate-900">
            {/* Button for toggle sidebar */}
            {/* <button
                className="md:opacity-0 md:pointer-events-none btn-ghost size-10"
                onClick={() => setCollapsed(!collapsed)}
            >
                <ChevronsLeft className={cn(collapsed && "rotate-180")} />
            </button> */}
            {/* Main Logo */}
            <div className="flex items-center gap-x-3 py-3">
                {collapsed && (
                    <>
                        <img
                            src={logoLight}
                            alt="Logoipsum"
                            className="dark:hidden"
                        />
                        <img
                            src={logoDark}
                            alt="Logoipsum"
                            className="hidden dark:block"
                        />
                        <p className="text-lg font-medium whitespace-nowrap text-slate-900 transition-colors dark:text-slate-50">Oil Prediction</p>
                    </>
                )}

                {/* Button for toggle sidebar */}
                <button
                    className="btn-ghost size-10 md:hidden"
                    onClick={() => setCollapsed?.(!collapsed)}
                >
                    <ChevronsLeft
                        strokeWidth={2.5}
                        className={cn(collapsed && "rotate-180")}
                    />
                </button>
            </div>
            <div className="">{""}</div>
            <div className="flex items-center justify-between gap-x-3">
                <div className="input w-[500px] bg-slate-100 dark:bg-slate-950">
                    <Search
                        size={20}
                        className="text-slate-500"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-500 dark:text-slate-100"
                    />
                </div>
            </div>

            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>
                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>

                {/* Login / Signup Button */}
                <Link
                    to={"/login"}
                    className="btn-normal"
                >
                    <span className="hidden lg:block whitespace-nowrap">
                        Login / Sign Up
                    </span>
                    <User size={20} className="block lg:hidden" />
                </Link>
            </div>
        </header>
    );
};

