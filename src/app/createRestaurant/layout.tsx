import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MS Delivery",
    description: "Generated by create next app",
  };
  
  export default function CreateRestaurantLayout({
    children,
  }:{
    children: React.ReactNode;
  }) {
    return (
        <>
          {children}
        </>
    );
  }