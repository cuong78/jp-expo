import { Outlet } from "react-router-dom";

/**
 * Shared layout wrapper. Kept intentionally lightweight so
 * landing pages (like the new Art header) can take the full width/height.
 */
const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-100 text-foreground transition-colors dark:bg-slate-950">
            <Outlet />
        </div>
    );
};

export default Layout;