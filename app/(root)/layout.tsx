import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const loggenIn = {firstName:'Aritra', lastName:'Sarkar'};

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggenIn} />

        <div className="flex size-full flex-col">
            <div className="root-layout">
                <Image 
                src="/icons/logo.svg"
                width={38}
                height={38}
                alt="logo"
                />
                <div>
                <MobileNav 
                user={loggenIn}
                />
              </div>
            </div>
            {children}
        </div>
    </main>
  );
}
