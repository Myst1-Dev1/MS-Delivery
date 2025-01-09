'use client';
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Session({ children }: React.ReactNode | any) {
    return <SessionProvider>{children}</SessionProvider>
}