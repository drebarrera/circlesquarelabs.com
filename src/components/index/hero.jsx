"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import hero from '@/data/hero.json';
import styles from '@/styles/index.module.css';

export const Hero = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const sectionHeight = 800;
    const heroTitleInterval = 125;
    const heroEntries = Object.entries(hero);
    const heroInterval = (maxTitleLength() * 2 + 10) * heroTitleInterval;

    const [heroTitle, setHeroTitle] = useState("");
    const [heroTitleCount, setHeroTitleCount] = useState(1);
    const [heroIndex, setHeroIndex] = useState(0);
    const [heroList, setHeroList] = useState([...heroEntries.slice(0, 2)]);
    const [heroTitleEllipsis, setHeroTitleEllipsis] = useState(true);
    const [animate, setAnimate] = useState(true);
    const [offset, setOffset] = useState(0);

    function maxTitleLength() {
        return heroEntries.reduce((max, entry) => {
            return (entry[0].length > max) ? entry[0].length : max;
        }, 0);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prevHeroIndex) => {
                setHeroTitleCount((prevHeroTitleCount) => {
                    var count = prevHeroTitleCount % (heroInterval / heroTitleInterval);
                    var heroTitleEntry = heroEntries[prevHeroIndex][0];
                    if (count == (heroInterval / heroTitleInterval) - 1 - 4) {
                        nextHero();
                    }
                    if (count <= heroTitleEntry.length) {
                        setHeroTitle(() => {
                            return heroTitleEntry.slice(0, count);
                        });
                    }
                    if (((heroInterval / heroTitleInterval) - count) <= heroTitleEntry.length) {
                        setHeroTitle(() => {
                            return heroTitleEntry.slice(0, (heroInterval / heroTitleInterval) - count);
                        });
                    }
                    setHeroTitleEllipsis(() => {
                        return (count % 6 <= 2) ? true : false;
                    });
                    return prevHeroTitleCount + 1;
                });
                return prevHeroIndex;
            });
        }, heroTitleInterval);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    function nextHero() {
        setOffset((prevOffset) => prevOffset - sectionHeight);
        
        setTimeout(() => {
            setHeroIndex((prevHeroIndex) => {
                const newIndex = ((prevHeroIndex + 1) % heroEntries.length + heroEntries.length) % heroEntries.length;
                setHeroList(() => {
                    const extrapolated = [];
                    for (let i = 0; i <= 1; i++) {
                        const index = ((newIndex + i) % heroEntries.length + heroEntries.length) % heroEntries.length;
                        extrapolated.push(heroEntries[index]);
                    }
                    return extrapolated;
                });
    
                return newIndex;
            });
    
            setAnimate(false);
            setOffset(0);
    
            setTimeout(() => {
                setAnimate(true);
            }, 10);
        }, heroTitleInterval * 4);
    }

    return (
        <section id="hero" className={`h-[${sectionHeight}px] w-full bg-gradient-to-br from-black to-[#0D1B2A] flex items-center justify-center relative`}>
            <div className="h-full w-full max-w-[1800px] flex flex-row pl-[25px] pb-[25px] md:pt-[50px] md:pb-[50px] lg:pl-[100px]">
                <div className="h-full w-full flex flex-col justify-start items-end overflow-clip gap-[100px]">
                    {
                        heroList.map(([key, value], index) => {
                            return <div key={index} className={`relative h-full w-full flex-none max-w-[95%] lg:max-w-[65%]  ${animate ? styles.hero : ''}`} style={ {marginTop: `${(index == 0) ? offset : 0}px`} }>
                                <Image
                                    src={`/assets/index/hero/${(value["fit"] == "switch" && windowWidth < 760) ?  value["image"] + "_sm" : (value["fit"] == "switch" && windowWidth >= 760) ? value["image"] + "_lg" : value["image"]}.webp`}
                                    alt="Code Example"
                                    fill
                                    priority
                                    style={{ objectFit: (value["fit"] == "switch") ? "cover" : value["fit"], objectPosition: (value["fit"] == "switch" && windowWidth < 760) ? 'center' : 'left' }}
                                />
                            </div>
                        })
                    }
                    
                </div>
                <div className="absolute top-0 left-0 pl-[4%] h-full w-full flex flex-col justify-center gap-[20px] bg-gradient-to-r from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0)] lg:from-[rgba(0,0,0,0)]">
                    <div className="flex flex-col justify-center gap-[10px]">
                        <h2 className="text-white font-semibold text-4xl md:text-5xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{`${heroTitle}`}<span className="font-normal ml-[5px]">{heroTitleEllipsis ? '|' : ''}</span></h2>
                        <h2 className="text-[#CCCCCC] text-3xl font-semibold md:text-4xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Done Simply.</h2>
                    </div>
                    <img src="/assets/brand/cs-icon-color.svg" alt="CircleSquare Icon" className="w-[60px] h-[60px] md:w-[75px] md:h-[75px]" />
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(rgba(0,0,0,1) 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0) 50%, rgba(6,13,19,0.05) 80%, rgba(6,13,19,1) 100%)' }}></div>
        </section>
    )
};