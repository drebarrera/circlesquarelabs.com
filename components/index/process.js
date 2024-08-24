import { Icon } from '@/components/icon';
import links from '@/data/links.json';
import data from "@/data/process.json";

export const Process = () => {
    return (
        <section id="process" className="relative h-fit w-full flex flex-col justify-center items-center gap-[50px] py-[80px] overflow-clip bg-[#060D13]">
            <div className="flex flex-col justify-center items-center gap-[5px]">
                <h3 className="text-white text-3xl font-medium">"Tech Meetings to Look Forward To"</h3>
                <h3 className="text-white text-5xl font-semibold">The CircleSquare Process</h3>
            </div>
            <div className="w-[800px] h-fit flex flex-col">
                {
                    Object.entries(data).map(([key, value], index) => {
                        return <div className="w-fill h-fit flex flex-row gap-[20px]">
                            <div className="w-[100px] h-fill flex flex-col items-center">
                                <div className="w-[100px] h-[100px] flex-none" style={ {'borderRadius': '8px', 'boxShadow': '0px 4px 6px rgba(0, 0, 0, 0.1)', 'background': `linear-gradient(to bottom right, ${value["bg-start"]} 0%, ${value["bg-stop"]} 100%)`} }>
                                    <div className="w-[100px] h-[100px] flex justify-center items-center">
                                        { (index != 0) ? <Icon icon={value["icon"]} classData="w-[50px] h-[50px]" /> : <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" width="50" height="50" /> }
                                    </div>
                                </div>
                                {
                                    (index != Object.keys(data).length - 1) ? <div className="h-full flex flex-col items-center">
                                        <div className="w-[20px] h-[10px] bg-white rounded-br-full rounded-bl-full flex-none"></div>
                                        <div className="w-[4px] h-full bg-white"></div>
                                        <div className="w-[20px] h-[10px] bg-white rounded-tr-full rounded-tl-full flex-none"></div>
                                    </div> : null
                                }
                            </div>
                            <div className="w-[600px] h-fit flex flex-col gap-[5px] pb-[30px]">
                                <h4 className="text-2xl font-medium text-white">{ value["title"] }</h4>
                                <p className="text-xl text-white">{ value["description"] }</p>
                                {
                                    (value["link"] != null) ? <a href={links[value["href"]]} className="text-white text-2xl font-medium pt-[5px] link">{value["link"]}&nbsp;<span className="font-sans">&rarr;</span></a> : null
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}