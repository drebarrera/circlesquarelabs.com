import { useState } from 'react';
import icons from '@/data/icons.json';
import data from '@/data/product_lab.json';
import circlesquare from '@/data/circlesquare.json';
import styles from '@/styles/index.module.css';

export const ProductLab = () => {
    const [selected, setSelected] = useState(circlesquare);

    return (
        <section className="h-fit w-full flex flex-col justify-center items-center py-[80px] px-[25px] gap-[50px]" style={ {background: 'linear-gradient(180deg, #060D13 0%, #072C0D 50%, #060D13 100%)'} }>
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
                                    <div key={index} dangerouslySetInnerHTML={{ __html: icons[value["icon"]] }} className={`w-[50px] h-[50px] ${styles.icon}`}></div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-[775px] h-[275px] p-[15px] bg-[rgba(13,13,13,0.7)] flex flex-row gap-[25px]" style={ {'borderRadius': '15px'} }>
                    {
                        <div className="h-[125px] w-[125px] flex flex-col justify-center items-center gap-[5px] cursor-pointer" style={ {'background': `linear-gradient(135deg, ${selected["bg-start"]} 0%, ${selected["bg-stop"]} 100%)`, 'borderRadius': '10px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)'} }>
                            { (selected["title"] == "CircleSquare Labs") ? <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" width="70" height="70" /> : <div dangerouslySetInnerHTML={{ __html: icons[selected["icon"]] }} className={`w-[75px] h-[75px] ${styles.icon}`}></div> }
                        </div> 
                    }
                    <div className="w-[595px] flex flex-col gap-[10px]">
                        <h4 className="text-white text-3xl font-medium">{ selected["title"] }</h4>
                        <p className="text-[#D9D9D9] text-xl">{ selected["description"] }</p>
                    </div>
                </div>
            </div>
            <div className="h-fit w-fit flex flex-col justify-center items-center gap-[5px]">
                <p className="text-white text-2xl">What can we build for you?</p>
                <a href="#" className="text-white text-2xl font-medium link">Get in touch with a tech expert&nbsp;<span className="font-sans">&rarr;</span></a>
            </div>
        </section>
    );
}