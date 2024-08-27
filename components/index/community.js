import { useState } from 'react';
import Image from 'next/image';
import data from '@/data/community.json';

export const Community = () => {
    const [selected, setSelected] = useState(data[Object.keys(data)[0]]);
    return (
        <section className="h-fit w-full flex flex-col justify-center items-center pt-[30px] pb-[15px] px-[25px] gap-[40px] bg-[#060D13] md:pt-[80px] md:pb-[30px]">
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white font-medium text-center px-[10px] text-2xl md:text-3xl">Community Supported</h3>
                <h3 className="text-white font-semibold text-center px-[10px] text-4xl md:text-5xl">Client Recommended</h3>
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
                                    src={`/assets/index/community/${key.toLowerCase().replace(' ', '_')}.webp`} 
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
                <div className="p-[15px] bg-white flex w-full h-fit gap-[15px] flex-col md:w-[775px] md:h-[225px] md:gap-[25px] md:flex-row" style={ {'borderRadius': '15px'} }>
                    <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px]">
                        <div className="relative w-[75px] h-[75px] md:w-[100px] md:h-[100px]">
                            <Image
                                src={`/assets/index/community/${selected["name"].toLowerCase().replace(' ', '_')}.webp`} 
                                alt={selected["name"]}
                                fill
                                style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                            />
                        </div>
                    </div>
                    <div className="relative flex flex-col justify-between w-full md:w-[620px]">
                        <quote className="font-light text-md md:text-lg" style={ {'lineHeight': '1.2'} }>{selected["description"]}</quote>
                        <p className="font-normal text-right text-lg md:text-xl">- {selected["name"]}, {selected["position"]} at {selected["company"]}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};