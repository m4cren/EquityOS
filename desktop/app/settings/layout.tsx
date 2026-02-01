import React, { PropsWithChildren } from "react";
import SideBar from "./side_bar/SideBar";
import { Metadata } from "next";
import Template from "./Template";

const layout = ({ children }: PropsWithChildren) => {
   return (
      <main className="grid grid-cols-[27vw_1fr] justify-center w-screen h-screen">
         <SideBar />
         <Template>{children}</Template>
      </main>
   );
};

export default layout;
export const metadata: Metadata = {
   title: "MindSync | Setings",
   description:
      "A refined, personal habit and expense tracker inspired by Notion — built to serve real purpose and daily growth.",
};
