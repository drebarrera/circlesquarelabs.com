import Image from 'next/image';

export const Hero = () => {
    return (
        <section id="hero" className="h-[800px] w-full bg-gradient-to-br from-black to-[#0D1B2A] flex items-center justify-center relative">
            <div className="h-full w-full max-w-[1800px] py-[50px] flex flex-row pl-[100px]">
                <div className="h-full w-full flex justify-end items-center">
                    <div className="h-full w-full max-w-[65%] relative">
                        <Image
                            src="/assets/index/hero/code_example.png"
                            alt="Code Example"
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'left' }}
                        />
                    </div>
                </div>
                <div className="absolute top-0 left-0 pl-[4%] h-full w-full flex flex-col justify-center gap-[20px]">
                    <div className="flex flex-col justify-center gap-[10px]">
                        <h2 className="text-white text-5xl font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Software Engineering...</h2>
                        <h2 className="text-[#CCCCCC] text-4xl font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Done Simply.</h2>
                    </div>
                    <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" width="75" height="75" />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(rgba(0,0,0,1) 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0) 50%, rgba(6,13,19,0.05) 80%, rgba(6,13,19,1) 100%)' }}></div>
        </section>
    )
};