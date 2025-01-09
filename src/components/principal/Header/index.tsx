'use server';

import { HeaderContent } from "./HeaderContent";

export async function Header() {
    // const session = await auth();

    return (
        <>
            <HeaderContent />
        </>
    )
}