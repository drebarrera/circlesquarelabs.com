"use client";

import { useState } from 'react';
import { Icon } from '@/components/icon';
import data from '@/data/product_lab.json';
import circlesquare from '@/data/circlesquare.json';
import links from '@/data/links.json';
import styles from '@/styles/index.module.css';

export const ProductLab = () => {
    const [selected, setSelected] = useState(circlesquare);

    return (
        <section id="productLab" className="h-fit w-full flex flex-col justify-center items-center py-[80px] px-[25px] gap-[30px] md:gap-[50px]" style={ {background: 'linear-gradient(180deg, #060D13 0%, #072C0D 50%, #060D13 100%)'} }>
            <div className="h-[1px] bg-[#D9D9D9] w-[40px] md:w-[50px]"></div>
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white font-medium text-center px-[10px] text-2xl md:text-3xl">Welcome to Our</h3>
                <h3 className="text-white font-semibold text-center px-[10px] text-4xl md:text-5xl">Product Lab</h3>
            </div>
            <div 
                className="flex justify-center flex-row gap-[10px] items-start md:flex-col md:gap-[30px] md:items-center"
                onMouseLeave={() => setSelected(circlesquare)}
            >
                <div className="h-fit w-fit flex justify-center items-center gap-[10px] md:gap-[20px] flex-col md:flex-row">
                    <div className=" flex-col justify-center items-center cursor-pointer h-[50px] w-[50px] md:h-[90px] md:w-[90px] md:gap-[5px] flex md:hidden" style={{'background': `linear-gradient(135deg, ${circlesquare["bg-start"]} 0%, ${circlesquare["bg-stop"]} 100%)`, 'borderRadius': '10px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'}} onMouseEnter={() => setSelected(circlesquare)}>
                        <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" className="w-[25px] h-[25px] md:w-[50px] md:h-[50px]" />
                    </div>
                    {
                        Object.entries(data).map(([key, value], index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="flex flex-col justify-center items-center cursor-pointer h-[50px] w-[50px] md:h-[90px] md:w-[90px] md:gap-[5px] " 
                                    style={{'background': `linear-gradient(135deg, ${value["bg-start"]} 0%, ${value["bg-stop"]} 100%)`, 'borderRadius': '10px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'}}
                                    onMouseEnter={() => setSelected(value)}
                                >
                                    <Icon icon={value["icon"]} classData={`w-[25px] h-[25px] md:w-[50px] md:h-[50px] ${styles.icon}`} />
                                    
                                </div>
                            )
                        })
                    }
                </div>
                <div className="p-[15px] bg-[rgba(13,13,13,0.7)] flex w-full h-fit flex-col gap-[15px] md:w-[775px] md:h-[340px] md:flex-row md:gap-[25px]" style={ {'borderRadius': '15px'} }>
                    <div className="flex flex-col justify-center items-center gap-[5px] cursor-pointer h-[60px] w-[60px] md:h-[125px] md:w-[125px]" style={ {'background': `linear-gradient(135deg, ${selected["bg-start"]} 0%, ${selected["bg-stop"]} 100%)`, 'borderRadius': '10px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }>
                        { (selected["title"] == "CircleSquare Labs") ? <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" className="w-[35px] h-[35px] md:w-[70px] md:h-[70px]" /> : <Icon icon={selected["icon"]} classData={`w-[40px] h-[40px] md:w-[75px] md:h-[75px] ${styles.icon}`} /> }
                    </div>
                    <div className="flex flex-col gap-[10px] w-full md:w-[595px]">
                        <h4 className="text-white font-medium text-2xl md:text-3xl">{ selected["title"] }</h4>
                        <p className="overflow-clip text-[#D9D9D9] text-md md:text-xl md:h-[190px]">{ selected["description"] }</p>
                        <div className="relative h-fit flex flex-row justify-center items-center py-[10px] w-fit gap-[10px] md:w-[460px] md:gap-[20px] md:px-[10px]">
                            {
                                Object.entries(selected["tools"]).map(([index, value]) => {
                                    return <Icon
                                        key={index}
                                        icon={value}
                                        classData={`h-[25px] w-[25px] md:h-[40px] md:w-[40px] ${styles.tool}`}
                                    />
                                })
                            }
                            <div className="absolute top-0 left-0 w-full h-full md:px-[10px]" style={ {background: 'linear-gradient(to right, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.05) 30%, rgba(13,13,13,0.05) 70%, rgba(13,13,13,0.8) 100%)', borderRadius: "10px"} }></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit w-fit flex flex-col justify-center items-center gap-[5px]">
                <p className="text-white text-center text-xl md:text-2xl">What can we build for you?</p>
                <a href={links['inquire']} className="text-white font-medium link text-center text-xl md:text-2xl">Get in touch with a tech expert&nbsp;<span className="font-sans">&rarr;</span></a>
            </div>
        </section>
    );
}