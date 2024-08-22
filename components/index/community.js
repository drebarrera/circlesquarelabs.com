import { useState } from 'react';
import Image from 'next/image';
import data from '@/data/community.json';

export const Community = () => {
    const [selected, setSelected] = useState(data[Object.keys(data)[0]]);
    return (
        <section className="h-fit w-full flex flex-col justify-center items-center pt-[80px] pb-[30px] px-[25px] gap-[40px] bg-[#060D13]">
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white text-3xl font-medium">Community Supported</h3>
                <h3 className="text-white text-5xl font-semibold">Client Recommended</h3>
            </div>
            <div 
                className="flex flex-col justify-center items-center gap-[30px]"
                onMouseLeave={() => setSelected(data[Object.keys(data)[0]])}
            >
                <div className="h-fit w-fit flex flex-row justify-center items-center gap-[30px]">
                    {
                        Object.entries(data).map(([key, value], index) => {
                            return <Image 
                                key={index} 
                                src={`/assets/index/community/${key.replace(' ', '_')}.webp`} 
                                alt={key} 
                                width={100}
                                height={100}
                                className="cursor-pointer"
                                onMouseEnter={() => setSelected(value)} 
                                style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                            />
                        })
                    }
                </div>
                <div className="w-[775px] h-[225px] p-[15px] bg-white flex flex-row gap-[25px]" style={ {'borderRadius': '15px'} }>
                    <div className="w-[100px] h-[100px]">
                        <Image 
                            src={`/assets/index/community/${selected["name"].replace(' ', '_')}.webp`} 
                            alt={selected["name"]}
                            width={100}
                            height={100}
                            style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                        />
                    </div>
                    <div className="w-[620px] flex flex-col justify-between">
                        <quote className="text-lg font-light" style={ {'lineHeight': '1.2'} }>{selected["description"]}</quote>
                        <p className="font-normal text-xl text-right">- {selected["name"]}, {selected["position"]} at {selected["company"]}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};