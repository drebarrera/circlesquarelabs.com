"use client";

import React, { useState } from "react";
import { Icon } from "@/components/icon";
import links from "@/data/links.json";

export const Header = ({ position }) => {
    const [menuToggled, setMenuToggled] = useState(false);

    function toggleMenu() {
        setMenuToggled(!menuToggled);
    }

    return (
        <header className={`h-[70px] bg-[rgba(0,0,0,0.8)] px-[50px] w-full flex flex-row justify-between items-center ${position} top-0 z-10`}>
            <a href={links["home"]}><img src="/assets/brand/cs-full-color-dark.svg" alt="CircleSquare Labs" className="h-[40px] w-auto"/></a>
            <div id="menu" className={`absolute right-0 top-0 overflow-clip flex flex-col items-end p-[15px] rounded-lg lg:relative lg:flex-row lg:space-x-[40px] lg:p-0 lg:items-center lg:bg-transparent ${menuToggled ? 'menuToggled' : 'menuStandard'}`}>
                <Icon icon="menu" classData="relative w-[40px] h-[40px] lg:hidden cursor-pointer" onClick={toggleMenu} />
                <nav className="relative right-0 top-[20px] flex flex-col px-[10px] lg:flex-row lg:space-x-[40px] lg:p-0 lg:top-0">
                    <a href={links["home"]} className="text-black text-lg font-medium link lg:text-white">CircleSquare Labs</a>
                    <a href={links["team"]} className="text-black text-lg font-medium link lg:text-white">Our Team</a>
                    <a href={links["join"]} className="text-black text-lg font-medium link lg:text-white">Join Our Team</a>
                    <span className={`flex lg:gap-[10px] flex-col lg:flex-row`}>
                        <a href={links["inquire"]} className="text-black text-lg font-medium link lg:text-white">Inquire With Us</a>
                        <span className="hidden lg:block">|</span>
                        <a href={links["login"]} className="text-black text-lg font-medium link lg:text-white">Client Portal</a>
                    </span>
                </nav>
            </div>
        </header>
    );
};
