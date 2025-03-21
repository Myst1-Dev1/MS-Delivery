"use client";

import { usePathname } from "next/navigation";
import { HeaderContent } from "./HeaderContent";

export function Header() {
    const pathname = usePathname();

    const hideOnPages = ["/"];

    if (hideOnPages.includes(pathname)) {
        return null;
    }

    return <HeaderContent />;
}
