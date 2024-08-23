import { useState } from 'react';
import Image from 'next/image';
import data from '@/data/team.json';

export const Team = () => {
    const [selected, setSelected] = useState(data[Object.keys(data)[0]]);
    return (
        <section id="team" className="h-fit w-full flex flex-col justify-center items-center py-[80px] px-[25px] gap-[40px]" style={ {background: 'linear-gradient(to bottom, #060D13 0%, #4A184E 50%, #060D13 100%)'} }>
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white text-3xl font-medium">Expert Engineers, Exceptional Results</h3>
                <h3 className="text-white text-5xl font-semibold">Introducing Our Tech Team</h3>
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
                                src={`/assets/index/team/${key.replace(' ', '_')}.webp`} 
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
                <div className="w-[775px] h-[335px] p-[15px] bg-white flex flex-row gap-[25px]" style={ {'borderRadius': '15px'} }>
                    <div className="w-[100px] h-[100px]">
                        <Image 
                            src={`/assets/index/team/${selected["name"].replace(' ', '_')}.webp`} 
                            alt={selected["name"]}
                            width={100}
                            height={100}
                            style={ {'borderRadius': '50px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }
                        />
                    </div>
                    <div className="w-[620px] flex flex-col gap-[5px]">
                        <h4 className="text-3xl font-medium">{ selected["name"] }</h4>
                        <h4 className="text-2xl font-medium">{ selected["role"] }</h4>
                        <p className="text-xl">{ selected["description"] }</p>
                    </div>
                </div>
            </div>
        </section>
    );
};