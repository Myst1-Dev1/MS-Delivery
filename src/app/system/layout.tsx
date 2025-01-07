import { SideBar } from "@/components/system/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MS Delivery",
    description: "Generated by create next app",
  };
  
  export default function SystemLayout({
    children,
  }:{
    children: React.ReactNode;
  }) {
    return (
      <div className="flex">
          <SideBar />
          {children}
      </div>
    );
  }