'use server';

import { HeaderContent } from "./HeaderContent";
import { auth } from "@/services/auth";

export async function Header() {
    const session = await auth();

    return (
        <>
            <HeaderContent session = {session} />
        </>
    )
}