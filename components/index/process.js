import { Icon } from '@/components/icon';
import links from '@/data/links.json';
import data from "@/data/process.json";

export const Process = () => {
    return (
        <section id="process" className="relative h-fit w-full flex flex-col justify-center items-center py-[80px] overflow-clip bg-[#060D13] gap-[30px] md:gap-[50px]">
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white font-medium text-center px-[10px] text-2xl md:text-3xl">"Tech Meetings to Look Forward To"</h3>
                <h3 className="text-white font-semibold text-center px-[10px] text-4xl md:text-5xl">The CircleSquare Process</h3>
            </div>
            <div className="h-fit flex flex-col w-full md:w-[800px]">
                {
                    Object.entries(data).map(([key, value], index) => {
                        return <div key={index} className="w-fill h-fit flex flex-row px-[10px] gap-[10px] md:gap-[20px]">
                            <div className="w-[100px] h-fill flex flex-col items-center">
                                <div className="flex-none w-[50px] h-[50px] md:w-[100px] md:h-[100px]" style={ {'borderRadius': '8px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)', 'background': `linear-gradient(to bottom right, ${value["bg-start"]} 0%, ${value["bg-stop"]} 100%)`} }>
                                    <div className="flex justify-center items-center w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
                                        { (index != 0) ? <Icon icon={value["icon"]} classData="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" /> : <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" /> }
                                    </div>
                                </div>
                                {
                                    (index != Object.keys(data).length - 1) ? <div className="h-full flex flex-col items-center">
                                        <div className="bg-white rounded-br-full rounded-bl-full flex-none w-[15px] h-[7.5px] md:w-[20px] md:h-[10px]"></div>
                                        <div className="w-[4px] h-full bg-white"></div>
                                        <div className="bg-white rounded-tr-full rounded-tl-full flex-none w-[15px] h-[7.5px] md:w-[20px] md:h-[10px]"></div>
                                    </div> : null
                                }
                            </div>
                            <div className="w-[600px] h-fit flex flex-col gap-[5px] pb-[30px]">
                                <h4 className="font-medium text-white text-xl md:text-2xl">{ value["title"] }</h4>
                                <p className="text-white text-lg md:text-xl">{ value["description"] }</p>
                                {
                                    (value["link"] != null) ? <a href={links[value["href"]]} className="text-white font-medium pt-[5px] link text-xl md:text-2xl">{value["link"]}&nbsp;<span className="font-sans">&rarr;</span></a> : null
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}