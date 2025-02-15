import { SideBar } from "@/components/system/SideBar";
import { EdgeStoreProvider } from "@/lib/edgestore";
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
      <EdgeStoreProvider>
        <div className="flex">
            <SideBar />
            {children}
        </div>
        </EdgeStoreProvider>
    );
  }