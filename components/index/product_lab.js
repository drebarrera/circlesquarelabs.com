import { useState } from 'react';
import { Icon } from '@/components/icon';
import data from '@/data/product_lab.json';
import circlesquare from '@/data/circlesquare.json';
import links from '@/data/links.json';
import styles from '@/styles/index.module.css';

export const ProductLab = () => {
    const [selected, setSelected] = useState(circlesquare);

    return (
        <section id="productLab" className="h-fit w-full flex flex-col justify-center items-center py-[80px] px-[25px] gap-[50px]" style={ {background: 'linear-gradient(180deg, #060D13 0%, #072C0D 50%, #060D13 100%)'} }>
            <div className="h-[1px] w-[50px] bg-[#D9D9D9]"></div>
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white text-3xl font-medium">Welcome to Our</h3>
                <h3 className="text-white text-5xl font-semibold">Product Lab</h3>
            </div>
            <div 
                className="flex flex-col justify-center items-center gap-[30px]"
                onMouseLeave={() => setSelected(circlesquare)}
            >
                <div className="h-fit w-fit flex flex-row justify-center items-center gap-[20px]">
                    {
                        Object.entries(data).map(([key, value], index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="h-[90px] w-[90px] flex flex-col justify-center items-center gap-[5px] cursor-pointer" 
                                    style={{'background': `linear-gradient(135deg, ${value["bg-start"]} 0%, ${value["bg-stop"]} 100%)`, 'borderRadius': '10px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'}}
                                    onMouseEnter={() => setSelected(value)}
                                >
                                    <Icon icon={value["icon"]} classData={`w-[50px] h-[50px] ${styles.icon}`} />
                                    
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-[775px] h-[340px] p-[15px] bg-[rgba(13,13,13,0.7)] flex flex-row gap-[25px]" style={ {'borderRadius': '15px'} }>
                    <div className="h-[125px] w-[125px] flex flex-col justify-center items-center gap-[5px] cursor-pointer" style={ {'background': `linear-gradient(135deg, ${selected["bg-start"]} 0%, ${selected["bg-stop"]} 100%)`, 'borderRadius': '10px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }>
                        { (selected["title"] == "CircleSquare Labs") ? <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" width="70" height="70" /> : <Icon icon={selected["icon"]} classData={`w-[75px] h-[75px] ${styles.icon}`} /> }
                    </div>
                    <div className="w-[595px] flex flex-col gap-[10px]">
                        <h4 className="text-white text-3xl font-medium">{ selected["title"] }</h4>
                        <p className="h-[190px] overflow-clip text-[#D9D9D9] text-xl">{ selected["description"] }</p>
                        <div className="relative w-[460px] h-fit flex flex-row justify-center items-center gap-[20px] py-[5px] px-[10px]">
                            {
                                Object.entries(selected["tools"]).map(([index, value]) => {
                                    return <Icon
                                        key={index}
                                        icon={value}
                                        classData={`h-[40px] w-[40px] ${styles.tool}`}
                                    />
                                })
                            }
                            <div className="absolute top-0 left-0 w-full h-full px-[10px]" style={ {background: 'linear-gradient(to right, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.05) 30%, rgba(13,13,13,0.05) 70%, rgba(13,13,13,0.8) 100%)', borderRadius: "10px"} }></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-fit w-fit flex flex-col justify-center items-center gap-[5px]">
                <p className="text-white text-2xl">What can we build for you?</p>
                <a href={links['inquire']} className="text-white text-2xl font-medium link">Get in touch with a tech expert&nbsp;<span className="font-sans">&rarr;</span></a>
            </div>
        </section>
    );
}