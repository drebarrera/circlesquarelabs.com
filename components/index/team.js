import { useState } from 'react';
import Image from 'next/image';
import data from '@/data/team.json';

export const Team = () => {
    const [selected, setSelected] = useState(data[Object.keys(data)[0]]);
    return (
        <section id="team" className="h-fit w-full flex flex-col justify-center items-center py-[40px] px-[25px] gap-[40px] md:py-[80px]" style={ {background: 'linear-gradient(to bottom, #060D13 0%, #4A184E 50%, #060D13 100%)'} }>
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white font-medium text-center px-[10px] text-2xl md:text-3xl">Expert Engineers, Exceptional Results</h3>
                <h3 className="text-white font-semibold text-center px-[10px] text-4xl md:text-5xl">Introducing Our Tech Team</h3>
            </div>
            <div 
                className="flex flex-col justify-center items-center gap-[30px]"
                onMouseLeave={() => setSelected(data[Object.keys(data)[0]])}
            >
                <div className="h-fit w-fit flex flex-row justify-center items-center gap-[15px] md:gap-[30px]">
                    {
                        Object.entries(data).map(([key, value], index) => {
                            return <div className="relative flex flex-row justify-center items-center gap-[15px] w-[70px] h-[70px] md:gap-[30px] md:w-[100px] md:h-[100px]">
                                <Image 
                                    key={index} 
                                    src={`/assets/index/team/${key.toLowerCase().replace(' ', '_')}.webp`} 
                                    alt={key} 
                                    fill
                                    className="cursor-pointer"
                                    onMouseEnter={() => setSelected(value)} 
                                    style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                                />
                            </div>
                        })
                    }
                </div>
                <div className="p-[15px] bg-white flex w-full h-fit gap-[15px] flex-col md:w-[775px] md:h-[275px] md:gap-[25px] md:flex-row" style={ {'borderRadius': '15px'} }>
                    <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px]">
                        <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px]">
                            <Image 
                                src={`/assets/index/team/${selected["name"].toLowerCase().replace(' ', '_')}.webp`} 
                                alt={selected["name"]}
                                width={100}
                                height={100}
                                style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                            />
                        </div>
                    </div>
                    <div className="relative flex flex-col w-full gap-[5px] md:w-[620px]">
                        <div className="flex flex-col">
                            <h4 className="font-medium text-xl text-black md:text-2xl">{ selected["name"] }</h4>
                            <h4 className="font-medium text-lg text-black md:text-xl">{ selected["role"] }</h4>
                        </div>
                        <p className="text-md text-black md:text-lg" style={ {'lineHeight': '1.2'} }>{ selected["description"] }</p>
                    </div>
                </div>
            </div>
        </section>
    );
};