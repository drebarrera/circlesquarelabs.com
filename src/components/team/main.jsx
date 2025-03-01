"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Icon } from "@/components/icon";
import icons from '@/data/icons.json';

import data from '@/data/team.json';
import links from "@/data/links.json";

export const Main = ({ teamData, fn, ln }) => {
    const team = [...teamData];
    const [selected, setSelected] = useState(team.find((entry) => entry["First Name"] === fn && entry["Last Name"] === ln) ?? team[0]);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <section id="team" className="h-fit w-full flex flex-col justify-center items-start gap-[20px]">
            <div className="h-fit w-full sm:bg-[rgba(0,255,255,0.4)] flex flex-col justify-center items-start gap-[10px] sm:gap-[20px] px-[40px] pt-[100px] pb-[25px] sm:pt-[100px] sm:pb-[45px] md:pt-[130px] md:pb-[65px]">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl">Meet Our Team</h2>
                    <h3 className="text-white text-lg sm:text-2xl md:text-3xl">Of Expert Engineers, Designers, and Consultants</h3>
                </div>
                <a href={links['inquire']} className="text-white font-medium link text-center text-xl md:text-2xl">Ready to plan, build, and deploy&nbsp;<span className="font-sans">&rarr;</span></a>
            </div>
            <div id="spotlight" className="relative top-[-65px] sm:top-[-90px]"></div>
            <div className="w-full flex flex-col sm:flex-row gap-[30px] h-fit sm:h-[875px] pl-[10px] pr-[10px] sm:pl-[20px] sm:pr-[0px]">
                <div className="h-fit sm:h-[855px] w-full flex flex-col sm:min-w-[450px] max-w-[600px] bg-[rgba(0,0,0,0.3)] pb-[30px] sm:pb-[0px] pt-[30px] px-[30px] gap-[10px] sm:gap-[20px]" style={{'border-radius': '20px'}}>
                    <div className="relative w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]">
                        <Image 
                            src={selected["Photo"][0]["url"]} 
                            alt={selected["First Name"] + " " + selected["Last Name"]}
                            width={300}
                            height={300}
                            style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                        />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <h3 className="text-white font-semibold text-2xl sm:text-4xl md:text-4xl">{selected["First Name"] + " " + selected["Last Name"]}</h3>
                        <h4 className="text-white text-xl sm:text-xl md:text-2xl">{selected["Title"]}</h4>
                    </div>
                    <p className="text-white opacity-90 text-md sm:text-lg lg:text-xl">{ selected["Bio"] }</p>
                    <div className="flex flex-row flex-wrap gap-[5px]">
                        {
                            Object.entries(selected["Skills"]).filter((entry, index) => Object.keys(icons).includes(entry[1]?.toLowerCase())).map((entry, index) => {
                                return <Icon key={index} icon={entry[1].toLowerCase()} classData="relative w-[40px] h-[40px] cursor-pointer" title={entry[1]}/>
                            })
                        }
                        {
                            //console.log(Object.entries(selected["Skills"]).filter((entry, index) => !Object.keys(icons).includes(entry[1]?.toLowerCase())))
                        }
                    </div>
                </div>
                <div className="relative h-fit sm:h-[925px] w-full bg-white py-[10px] sm:py-[40px] px-[10px] sm:px-[30px] sm:top-[-70px]" style={{borderRadius: (windowWidth < 640) ? '20px' : '20px 0px 0px 20px'}}>
                    <div className="relative h-full w-full bg-white flex flex-row flex-wrap justify-center gap-[15px] sm:gap-[40px] overflow-y-auto ">
                        {
                            team.map((entry, index) => {
                                let name = entry["First Name"] + " " + entry["Last Name"];
                                return <a key={index} href={`/team?fn=${entry["First Name"]}&ln=${entry["Last Name"]}#spotlight`}><div className="flex flex-col items-center gap-[10px] sm:gap-[30px] w-[100px] md:w-[200px]">
                                    <div className="relative flex flex-row justify-center items-center flex-shrink-0 gap-[15px] w-[100px] h-[100px] md:gap-[30px] md:w-[175px] md:h-[175px]">
                                        <Image 
                                            src={entry["Photo"][0]["url"]}
                                            alt={name} 
                                            fill
                                            className="cursor-pointer"
                                            onMouseEnter={() => setSelected(entry)} 
                                            style={ {'borderRadius': '100px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-[5px] whitespace-pre-wrap text-wrap text-center">
                                        <p className="font-semibold text-gray-700 text-lg md:text-xl">{name}</p>
                                        <p className="hidden sm:inline text-md md:text-lg" style={{"line-height": "25px"}}>{entry["Title"]}</p>
                                    </div>
                                </div></a>
                            })
                        }
                    </div>
                </div>
            </div>
            {/*<div className="w-full h-fit bg-[rgba(0,255,255,0.5)] flex flex-row justify-center gap-[50px] py-[40px]">
                <div className="flex justify-center items-center p-[20px] w-[400px] h-[175px] bg-[rgba(0,0,0,0.3)] animate-pop" style={ {borderRadius: '25px'} }><a href={links['team']} className="text-white font-bold link text-center text-xl md:text-2xl">Join the Our Team&nbsp;<span className="font-sans">&rarr;</span></a></div>
                <div className="flex justify-center items-center p-[20px] w-[400px] h-[175px] bg-[rgba(0,0,0,0.3)] animate-pop" style={ {borderRadius: '25px'} }><a href={links['team']} className="text-white font-bold link text-center text-xl md:text-2xl">Inquire With Us&nbsp;<span className="font-sans">&rarr;</span></a></div>
            </div>*/}
        </section>
    );
};