import Image from "next/image";
import { useState, useEffect } from 'react';
import { Icon } from '@/components/icon';
import projects from "@/data/projects.json";
import links from "@/data/links.json";

import styles from '@/styles/index.module.css';

export const Projects = () => {
    const [windowWidth, setWindowWidth] = useState(0);

    const g = 40;
    const mdProjectSize = 0.6;
    const smProjectSize = 0.9;
    var projectSize = mdProjectSize;

    const [projectIndex, setProjectIndex] = useState(0);
    const [projectList, setProjectList] = useState([...projects.slice(-2), ...projects.slice(0, 3)]);
    const [animate, setAnimate] = useState(true);
    const [offset, setOffset] = useState(parseInt((windowWidth * (1 - projectSize) / 2) - parseInt(windowWidth * projectSize) * 2 - g * 2.65));

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setOffset(parseInt((window.innerWidth * (1 - projectSize) / 2) - parseInt(window.innerWidth * projectSize) * 2 - g * 2.65));
            if (window.innerWidth < 768) {
                projectSize = smProjectSize;
            } else {
                projectSize = mdProjectSize;
            }
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup event listener on unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    function nextProject() {
        var projectSize = (windowWidth < 768) ? smProjectSize : mdProjectSize;
        setOffset(offset - (parseInt(windowWidth * projectSize) + g));
        
        setTimeout(() => {
            const extrapolated = [];
            for (let i = -2; i <= 2; i++) {
                const index = ((projectIndex + 1 + i) % projects.length + projects.length) % projects.length;
                extrapolated.push(projects[index]);
            }
            setProjectList(extrapolated);
            setAnimate(false);
            setOffset(parseInt((window.innerWidth * (1 - projectSize) / 2) - parseInt(window.innerWidth * projectSize) * 2 - g * 2.65));
            setTimeout(() => {
                setAnimate(true);
            },10);
            setProjectIndex(((projectIndex + 1) % projects.length + projects.length) % projects.length);
        },500);       
    }

    function prevProject() {
        var projectSize = (windowWidth < 768) ? smProjectSize : mdProjectSize;
        setOffset(offset + (parseInt(windowWidth * projectSize) + g));

        setTimeout(() => {
            const extrapolated = [];
            for (let i = -3; i <= 1; i++) {
                const index = ((projectIndex + i) % projects.length + projects.length) % projects.length;
                extrapolated.push(projects[index]);
            }
            setProjectList(extrapolated);
            setAnimate(false);
            setOffset(parseInt((window.innerWidth * (1 - projectSize) / 2) - parseInt(window.innerWidth * projectSize) * 2 - g * 3));
            setTimeout(() => {
                setAnimate(true);
            },10);
            setProjectIndex(((projectIndex - 1) % projects.length + projects.length) % projects.length);
        },500);
    }

    return (
        <section id="projects" className="relative h-fit w-full flex flex-col justify-center items-center overflow-clip gap-[50px] pb-[50px] md:pb-[80px]" style={ {background: 'radial-gradient(closest-side, #244B75 0%, #060D13 100%)'} }>
            <div className="relative h-fit w-full flex flex-col justify-center items-center px-[25px] gap-[50px] pt-[40px] md:pt-[80px]">
                <div className="flex flex-col justify-center items-center gap-[5px]">
                    <h3 className="text-white font-medium px-[10px] text-2xl md:text-3xl">"Strikingly Innovative"</h3>
                    <h3 className="text-white font-semibold text-center px-[10px] text-4xl md:text-5xl">Our Latest Projects</h3>
                </div>
                <div className={`w-full flex flex-row items-center gap-[${g}px] overflow-clip]`} style={ {height: `${windowWidth < 768 ? parseInt(windowWidth * 0.8) : parseInt(windowWidth * 0.48)}px`} }>
                    {
                        projectList.map((key, index) => {
                            return <div key={index} className={`h-full bg-[rgba(51,51,51,0.3)] flex-none p-[15px] md:p-[40px] ${animate ? styles.project : ''}`} style={ {'borderRadius': '30px', width: `${windowWidth < 768 ? parseInt(windowWidth * smProjectSize) : parseInt(windowWidth * mdProjectSize)}px`, height: `parseInt(windowWidth * 0.48)px`, marginLeft: `${(index == 0) ? offset : 0}px`} }>
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <Image
                                        src={`/assets/index/projects/${key.replace(' ', '_')}.webp`}
                                        alt={key}
                                        fill
                                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-3 flex flex-row justify-between items-end px-[25px] md:px-[100px]" style={ {'background': 'linear-gradient(to left, rgba(6,13,19,1) 0%, rgba(6,13,19,0) 25%, rgba(6,13,19,0) 75%, rgba(6,13,19,1) 100%)'} }>
                    <div className={`relative flex justify-center items-center w-[40px] md:w-[50px]`} style={ {height: `${windowWidth < 768 ? parseInt(windowWidth * 0.8) : parseInt(windowWidth * 0.48)}px`} }>
                        <button className={`text-white text-5xl font-semibold bg-[rgba(30,30,30,0.8)] ${'hover:bg-[rgba(30,30,30,1)]'}`} onClick={() => prevProject()} style={ {'borderRadius': '50px'} }>
                            <Icon icon="left" classData="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"/>
                        </button>
                    </div>
                    <div className={`relative flex justify-center items-center w-[40px] md:w-[50px]`} style={ {height: `${windowWidth < 768 ? parseInt(windowWidth * 0.8) : parseInt(windowWidth * 0.48)}px`} }>
                        <button className={`text-white text-5xl font-semibold bg-[rgba(30,30,30,0.8)] ${'hover:bg-[rgba(30,30,30,1)]'}`}  onClick={() => nextProject()} style={ {'borderRadius': '50px'} }>
                            <Icon icon="right" classData="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-fit w-fit flex flex-col justify-center items-center gap-[5px]">
                <p className="text-white text-center text-xl md:text-2xl">Let's get started on your next project.</p>
                <a href={links['inquire']} className="text-white font-medium link text-center text-xl md:text-2xl">Get in touch with a tech expert&nbsp;<span className="font-sans">&rarr;</span></a>
            </div>
        </section>
    )
};