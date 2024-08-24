import React from 'react';
import links from '@/data/links.json';

export const Header = () => {
    return (
        <header className="h-[70px] bg-[rgba(0,0,0,0.6)] px-[50px] w-full flex flex-row justify-between items-center sticky top-0 z-10">
            <img src="/assets/brand/cs-full-color-dark.svg" alt="CircleSquare Labs" className="h-[45px] w-auto"/>
            <nav className="flex flex-row space-x-[40px]">
                <a href={links["home"]} className="text-white text-lg font-medium link">CircleSquare Labs</a>
                <a href={links["join"]} className="text-white text-lg font-medium link">Join Our Team</a>
                <a href={links["inquire"]} className="text-white text-lg font-medium link">Inquire With Us</a>
            </nav>
        </header>
    );
};