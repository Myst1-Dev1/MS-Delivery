import Link from "next/link";
import { CiForkAndKnife } from "react-icons/ci";
import type { UrlObject } from 'url';

interface LogoProps {
  color?: string;
  link?: string | UrlObject;
}

export function Logo({ color, link = '/' }:LogoProps) {
    return (
        <>
            <Link href={link} className="flex gap-3 items-center">
                <h1 className={`font-bold text-xl lg:text-3xl ${color}`}><span className="text-orange-500">MS</span> Delivery</h1>
                <CiForkAndKnife className="text-orange-500 text-xl" />
            </Link>
        </>
    )
}