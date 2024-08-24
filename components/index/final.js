import Image from "next/image";
import { Icon } from "@/components/icon";
import tools from "@/data/tools.json";
import links from "@/data/links.json";
import styles from "@/styles/index.module.css";

export const Final = () => {
    return (
        <section id="tools" className="h-fit w-full flex flex-col justify-center items-center py-[40px] gap-[40px]" style={ {background: 'linear-gradient(170deg, rgba(25,53,78,0) 20%, rgba(0,255,255,0.4) 55%, rgba(25,53,78,0)) 100%'} }>
            <div className="flex flex-col justify-center items-center gap-[5px] px-[25px] ">
                <h3 className="text-white text-3xl font-medium">Our Toolkit For</h3>
                <h3 className="text-white text-5xl font-semibold">Design, Development, & Deployment</h3>
            </div>
            <div className={`relative h-[330px] w-fill flex flex-row justify-center items-center flex-wrap gap-[20px] px-[25px] ${styles.tools} overflow-clip`} style={ {} }>
                {
                    Object.entries(tools).map(([index, value]) => {
                        return <Icon
                            key={index}
                            icon={value}
                            classData={`h-[90px] w-[90px] ${styles.tool}`}
                        />
                    })
                }
            </div>
            <div className="relative w-full h-[800px] flex items-center justify-center">
                <div className="h-full w-full max-w-[1800px] py-[50px] flex flex-row pr-[100px]">
                    <div className="h-full w-full flex justify-start items-center">
                        <div className="h-full w-full max-w-[65%] relative">
                            <Image
                                src="/assets/index/hero/code_example.png"
                                alt="Code Example"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'right' }}
                            />
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 pr-[4%] h-full w-full flex flex-col justify-center items-end gap-[20px] px-[25px] ">
                        <div className="w-[500px] flex flex-col justify-center gap-[10px]">
                            <h2 className="text-white text-5xl text-right font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Ready to Plan, Build, and Deploy</h2>
                        </div>
                        <a href={links['inquire']} className="text-white text-2xl font-medium link">Let's get in touch&nbsp;<span className="font-sans">&rarr;</span></a>
                        <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" width="75" height="75" />
                    </div>
                </div>
            </div>
        </section>
    )
}