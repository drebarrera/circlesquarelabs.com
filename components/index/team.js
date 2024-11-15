import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from '@/data/team.json';
import links from "@/data/links.json";

export const Team = ({ teamData }) => {
    const [selected, setSelected] = useState(data[Object.keys(data)[0]]);
    const [windowWidth, setWindowWidth] = useState(0);

    const team = [...teamData];

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
    
    return (
        <section id="team" className="h-fit w-full flex flex-col justify-center items-center py-[40px] px-[25px] gap-[40px] md:py-[80px]" style={ {background: 'linear-gradient(to bottom, #060D13 0%, #4A184E 50%, #060D13 100%)'} }>
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white font-medium text-center px-[10px] text-2xl md:text-3xl">Expert Engineers, Exceptional Results</h3>
                <h3 className="text-white font-semibold text-center px-[10px] text-4xl md:text-5xl">Introducing Our Tech Team</h3>
            </div>
            <div 
                className="w-full flex flex-col justify-center items-center gap-[30px]"
                onMouseLeave={() => setSelected(data[Object.keys(data)[0]])}
            >
                <div className={`relative h-fit w-full flex flex-row flex-wrap justify-center items-center max-h-[155px] gap-[15px] md:gap-[30px] md:justify-start md:flex-nowrap md:max-w-[1010px] md:overflow-x-hidden ${(windowWidth < 768) ? "mask-opacity-gradient-b":"mask-opacity-gradient-h"}`}>
                    {
                        team.map((entry, index) => {
                            let name = entry["First Name"] + " " + entry["Last Name"];
                            return <div key={index} className="relative flex flex-row justify-center items-center flex-shrink-0 gap-[15px] w-[70px] h-[70px] md:gap-[30px] md:w-[100px] md:h-[100px]">
                                <Image
                                    src={entry["Photo"][0]["url"]} 
                                    alt={name} 
                                    fill
                                    className="cursor-pointer"
                                    onMouseEnter={() => setSelected(entry)} 
                                    style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                                />
                            </div>
                        })
                    }
                </div>
                <a href={links['team']} className="text-white font-medium link text-center text-xl md:text-2xl">Meet the full team&nbsp;<span className="font-sans">&rarr;</span></a>
                <div className="p-[15px] bg-white flex w-full h-fit gap-[15px] flex-col md:w-[775px] md:h-[290px] md:gap-[25px] md:flex-row" style={ {'borderRadius': '15px'} }>
                    <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px]">
                        <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px]">
                            <Image 
                                src={selected["Photo"][0]["url"]} 
                                alt={selected["First Name"] + " " + selected["Last Name"]}
                                width={100}
                                height={100}
                                style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                            />
                        </div>
                    </div>
                    <div className="relative flex flex-col w-full gap-[5px] md:w-[620px]">
                        <div className="flex flex-col">
                            <h4 className="font-medium text-xl text-black md:text-2xl">{ selected["First Name"] + " " + selected["Last Name"] }</h4>
                            <h4 className="font-medium text-lg text-black md:text-xl">{ selected["Title"] }</h4>
                        </div>
                        <p className="text-md text-black md:text-lg" style={ {'lineHeight': '1.2'} }>{ selected["Bio"] }</p>
                    </div>
                </div>
            </div>
        </section>
    );
};