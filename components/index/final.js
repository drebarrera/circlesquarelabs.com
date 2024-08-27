import Image from "next/image";
import { Icon } from "@/components/icon";
import tools from "@/data/tools.json";
import links from "@/data/links.json";
import styles from "@/styles/index.module.css";

export const Final = () => {
    return (
        <section id="tools" className="h-fit w-full flex flex-col justify-center items-center py-[15px] gap-[30px] md:py-[40px] md:gap-[40px]" style={ {background: 'linear-gradient(170deg, rgba(25,53,78,0) 20%, rgba(0,255,255,0.4) 55%, rgba(25,53,78,0)) 100%'} }>
            <div className="flex flex-col justify-center items-center gap-[5px] px-[25px] ">
                <h3 className="text-white font-medium text-center text-2xl md:text-3xl">Our Toolkit For</h3>
                <h3 className="text-white font-semibold text-center text-4xl md:text-5xl">Design, Development, & Deployment</h3>
            </div>
            <div className={`relative w-fill flex flex-row justify-center items-center flex-wrap gap-[20px] px-[25px] ${styles.tools} overflow-clip h-[400px] sm:h-[280px] md:h-[530px] lg:h-[330px]`} style={ {} }>
                {
                    Object.entries(tools).map(([index, value]) => {
                        return <Icon
                            key={index}
                            icon={value}
                            classData={`h-[50px] w-[50px] md:h-[90px] md:w-[90px] ${styles.tool}`}
                        />
                    })
                }
            </div>
            <div className="relative w-full h-[800px] flex items-center justify-center">
                <div className="h-full w-full max-w-[1800px] py-[50px] flex flex-row pr-[100px]">
                    <div className="h-full w-full flex justify-start items-center">
                        <div className="h-full w-full relative max-w-[90%] md:max-w-[65%]">
                            <Image
                                src="/assets/index/hero/development.webp"
                                alt="Code Example"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'right' }}
                            />
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 pr-[4%] h-full w-full flex flex-col justify-center items-end gap-[20px] px-[25px] ">
                        <div className="flex flex-col justify-center gap-[10px] w-full md:w-[500px]">
                            <h2 className="text-white text-right font-semibold text-4xl md:text-5xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Ready to Plan, Build, and Deploy</h2>
                        </div>
                        <a href={links['inquire']} className="text-white text-2xl font-medium link">Let's get in touch&nbsp;<span className="font-sans">&rarr;</span></a>
                        <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" className="w-[60px] h-[60px] md:w-[75px] md:h-[75px]" />
                    </div>
                </div>
            </div>
        </section>
    )
}