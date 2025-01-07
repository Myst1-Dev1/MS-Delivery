import Link from "next/link";
import { CiForkAndKnife } from "react-icons/ci";

export function Logo() {
    return (
        <>
            <Link href="/" className="flex gap-3 items-center">
                <h1 className="font-bold text-xl lg:text-2xl"><span className="text-orange-500">MS</span> Delivery</h1>
                <CiForkAndKnife className="text-orange-500 text-xl" />
            </Link>
        </>
    )
}