import type { Metadata } from "next";
import Image from "next/image";
import RenderRecordFinance from "./RenderRecordFinance";

export const metadata: Metadata = {
  title: "Finance",
  description: "Systems over goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col  w-screen h-fit min-h-screen pb-[20vw]">
      <Image
        src={"/images/banner.gif"}
        width={1920}
        height={1080}
        alt="banner"
        unoptimized
        className="w-full h-[15vw] object-cover object-center"
      />
      <RenderRecordFinance />

      <section className="flex flex-col gap-[2vw] px-[8vw]">{children}</section>
    </main>
  );
}
