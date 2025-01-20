import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import icons from '@/data/icons.json';
import Image from 'next/image';

import { getAndresBarrera } from "@/services/andresbarrera.service";

export async function getServerSideProps(context) {
    const andresData = await getAndresBarrera();
    return {
        props: { andresData },
    };
}

const inter = Inter({ subsets: ["latin"] });

export default function AndresBarrera({ andresData }) {
    return (
        <main className={`flex overflow-clip min-h-screen flex-col items-center gap-[80px] ${inter.className}`} style={{ background: 'linear-gradient(170deg, rgba(25,53,78,0) 20%, rgba(0,255,255,0.4) 55%, rgba(25,53,78,0)) 80%' }}>
            <Header position="fixed" />
            <section className="flex flex-col justify-center items-center gap-[40px] mt-[140px]">
                <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px]" >
                    <Image 
                        src={'/assets/index/team/andres_barrera.webp'} 
                        alt={'Andres Barrera'}
                        fill
                        priority
                        style={ {'borderRadius': '150px', 'boxShadow': '0px 20px 30px rgba(0, 0, 0, 0.8)', 'objectFit': 'contain'} }
                    />
                </div>
                <div className="flex flex-row gap-[20px] justify-center mx-[10px]">
                    <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" className="w-[45px] h-[45px] mt-[10px]" />
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-medium">Andrés Barrera</h1>
                            <h2 className="text-2xl font-regular">Senior Software Engineer</h2>
                        </div>
                        <a href="https://calendly.com/circlesquarelabs" target="_blank" className="flex flex-row gap-[10px] w-full text-xl align-center font-light hover:underline"><Icon icon={"calendar"} classData="relative w-[25px] h-[25px] cursor-pointer" title={"calendar"}/>Schedule a Meeting</a>
                        <a href="https://drebarrera.fillout.com/connect" target="_blank" className="flex flex-row gap-[10px] w-full text-xl align-center font-light hover:underline"><Icon icon={"email"} classData="relative w-[25px] h-[25px] cursor-pointer" title={"email"}/>Send a Message</a>
                        <a href="https://www.drebarrera.com" target="_blank" className="flex flex-row gap-[10px] w-full text-xl align-center font-light hover:underline"><Icon icon={"profile"} classData="relative w-[25px] h-[25px] cursor-pointer" title={"profile"}/>View Portfolio</a>
                        <a href="https://www.linkedin.com/in/drebarrera" target="_blank" className="flex flex-row gap-[10px] w-full text-xl align-center font-light hover:underline"><Icon icon={"linkedin"} classData="relative w-[25px] h-[25px] cursor-pointer" title={"linkedin"}/>Connect on LinkedIn</a>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-[10px] px-[10px]">
                <h3 className="flex justify-center w-full text-2xl">Favorite Technologies</h3>
                <div className="flex flex-row flex-wrap gap-[5px] w-full md:w-[800px] justify-center">
                    {
                        Object.entries(andresData["Skills"]).filter((entry, index) => Object.keys(icons).includes(entry[1]?.toLowerCase())).map((entry, index) => {
                            return <Icon key={index} icon={entry[1].toLowerCase()} classData="relative w-[40px] h-[40px] cursor-pointer hover:mt-[-5px] hover:scale-150 transition" title={entry[1]}/>
                        })
                    }
                </div>
            </section>
            <section className="flex flex-col gap-[20px] md:gap-[30px] m-[50px] mb-[20px] md:mb-[80px]">
                <a href="https://www.circlesquarelabs.com" target="_blank" className="flex flex-wrap flex-row gap-[30px] justify-center items-center hover:bg-white px-[40px] py-[20px] pb-[80px] md:pb-[20px] hover:text-black transition" style={ {'borderRadius': '180px'} }>
                    <div className="relative w-[300px] h-[168.75px] md:w-[500px] md:h-[281.25px]" >
                        <Image 
                            src={'/assets/andresbarrera/circlesquarelabs_cover.webp'} 
                            alt={'Circle Square Labs'}
                            fill
                            style={{ 'borderRadius': '10px', 'boxShadow': '0px 20px 30px rgba(0, 0, 0, 0.8)', 'objectFit': 'fill'}}
                        />
                    </div>
                    <div className="flex flex-col w-[300px] md:w-[480px] gap-[10px]">
                        <h3 className="text-2xl">CircleSquare Labs | Senior Software Engineer</h3>
                        <p>CircleSquare Labs is a full-service technology firm with a team of engineering experts to delivery quality products. As a Senior Software Engineer and Project Manager, I lead and service both internal R&D and external software projects.</p>
                    </div>
                </a>
                <a href="https://www.hispanichackers.org" target="_blank" className="flex flex-wrap flex-row gap-[30px] justify-center items-center hover:bg-white px-[40px] py-[20px] pb-[80px] md:pb-[20px] hover:text-black transition" style={ {'borderRadius': '180px'} }>
                <div className="relative w-[300px] h-[168.75px] md:w-[500px] md:h-[281.25px]" >
                        <Image 
                            src={'/assets/andresbarrera/hh_cover.webp'} 
                            alt={'Hispanic Hackers'}
                            fill
                            style={{ 'borderRadius': '10px', 'boxShadow': '0px 20px 30px rgba(0, 0, 0, 0.8)', 'objectFit': 'fill' }}
                        />
                    </div>
                    <div className="flex flex-col w-[300px] md:w-[480px] gap-[10px]">
                        <h3 className="text-2xl">Hispanic Hackers | President</h3>
                        <p>Hispanic Hackers is an Austin-based 501(c)(3) non-profit making the tech industry accessible to all Latinos. As President, I oversee our community of over 2,500 members, offering developer & entrepreneur resources and creating professional opportunities</p>
                    </div>
                </a>
                <a href="https://hispanichackers.fillout.com/t/fQAwcfMfHrus" target="_blank" className="flex flex-wrap flex-row gap-[30px] justify-center items-center hover:bg-white px-[40px] py-[20px] pb-[80px] md:pb-[20px] hover:text-black transition" style={ {'borderRadius': '180px'} }>
                <div className="relative w-[300px] h-[168.75px] md:w-[500px] md:h-[281.25px]" >
                        <Image 
                            src={'/assets/andresbarrera/code_foundry_cover.webp'} 
                            alt={'Code Foundry Product Development Masterclass'}
                            fill
                            style={{ 'borderRadius': '10px', 'boxShadow': '0px 20px 30px rgba(0, 0, 0, 0.8)', 'objectFit': 'fill'}}
                        />
                    </div>
                    <div className="flex flex-col w-[300px] md:w-[480px] gap-[10px]">
                        <h3 className="text-2xl">Code Foundry | Director</h3>
                        <p>Code Foundry is a Product Development Masterclass created for startup founders and engineers looking to bridge the gap between concept and market-ready product. As the Director, I organize events, coordinate with industry experts, and help founders achieve their startup goals.</p>
                    </div>
                </a>
            </section>
        </main>
    );
}