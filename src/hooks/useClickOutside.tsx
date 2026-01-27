
import { useEffect } from "react";

/**
 * Lắng nghe click bên ngoài các phần tử được tham chiếu trong `refs`
 * và gọi `callback` khi click xảy ra bên ngoài.
 *
 * Logic giữ nguyên: dùng sự kiện "mousedown", kiểm tra `contains`.
 */
export const useClickOutside = <T extends HTMLElement>(
    refs: Array<React.RefObject<T>>,
    callback: (event: MouseEvent) => void
): void => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // event.target là Node | null theo DOM spec
            const target = event.target as Node | null;

            const isOutside = refs.every(
                (ref) => !!ref?.current && !ref.current.contains(target)
            );

            if (isOutside && typeof callback === "function") {
                callback(event);
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [callback, refs])
};

