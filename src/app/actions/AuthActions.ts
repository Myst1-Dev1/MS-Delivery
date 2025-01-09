'use server';

import { signIn } from "next-auth/react";

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {

    const data = { email, password }

    try {
        await signIn("credentials", { ...data, redirectTo: "/" });
    } catch (error:any) {
        if (error) {
            console.log(error);
        }
        throw error;
    }
}