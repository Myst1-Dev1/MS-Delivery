'use server';

import { signInSchema, signUpRestaurantSchema, signUpSchema } from "@/lib/zod";
import { api } from "@/services/axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SignInForm = {
    errors: {
        email?: string[];
        password?: string[];
        general?: string[];
    };
};

type SignUpForm = {
    errors: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
        address?: string[];
        zipCode?: string[];
        general?: string[];
    }
    message?:string;
}

type SignUpRestaurantForm = {
    errors: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
        general?: string[];
    }
    message?:string;
}

// export async function handleSignIn(formData: { email: string, password: string }): Promise<void> {
//     const { email, password } = formData;

//     const validatedFields = signInSchema.safeParse({ email, password });

//     if (!validatedFields.success) {
//         return;
//     }

//     try {
//         const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
        
//         const cookie = await cookies();
//         cookie.set('user-token', JSON.stringify(res.data));

//     } catch (error) {
//         console.log("Erro no login", error);
//     }

//     revalidatePath('/restaurants');
//     redirect('/restaurants');
// }

export async function handleCreateUserAccount(prevState: SignUpForm, formData: FormData): Promise<SignUpForm> {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm_password = formData.get('confirm_password');
    const address = formData.get('address');
    const zipCode = formData.get('zipCode');

    const validatedFields = signUpSchema.safeParse({name, email, password, address, zipCode});

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    if (password !== confirm_password) {
        return { errors: { confirm_password: ["As senhas não coincidem."] } };
    }

    try {
        await api.post('/auth/register', {
            name,
            email,
            isAdmin: false,
            password,
            address,
            zipCode
        });

        return { errors: {}, message: "Conta criada com sucesso!" };
        
    } catch (error) {
        return { errors: { general: ["Credenciais inválidas."] } };
    }
}

export async function handleCreateRestaurantAccount(prevState: SignUpRestaurantForm, formData: FormData): Promise<SignUpRestaurantForm> {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm_password = formData.get('confirm_password');

    const validatedFields = signUpRestaurantSchema.safeParse({name, email, password});

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    if (password !== confirm_password) {
        return { errors: { confirm_password: ["As senhas não coincidem."] } };
    }

    try {
        await api.post('/auth/register', {
            name,
            email,
            isAdmin: true,
            password
        });

        return { errors: {}, message: "Admin do restaurante criado com sucesso!" };
        
    } catch (error) {
        return { errors: { general: ["Credenciais inválidas."] } };
    }
}

export async function handleSignOut() {
    try {

        const cookie = await cookies();

        cookie.delete('user-token');
        await api.post("/auth/logout");
    } catch (error) {
        console.log(error);
    }

    redirect('/');
}