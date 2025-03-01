"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "@/components/dashboard/nav";
import { AccountPage } from "@/components/dashboard/account";

import { getAuthUser, getUser } from './actions';

import links from '@/data/links.json';

import styles from "@/styles/dashboard.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
    const [formWidth, setFormWidth] = useState("100%");
    const [logoWidth, setLogoWidth] = useState("25%");
    const [logoTransition, setLogoTransition] = useState("none");
    const [subHOpacity, setSubHOpacity] = useState("1");
    const [showModules, setShowModules] = useState(false);
    const [moduleOpacity, setModuleOpacity] = useState("0");

    const [org, setOrg] = useState("CircleSquare Labs");
    const [logoURL, setLogoURL] = useState("");

    const [currentPage, setCurrentPage] = useState("dashboard");

    const router = useRouter();
    const searchParams = useSearchParams();
    const referrer = searchParams.get('referrer');
    const page = searchParams.get('page');
    
    useEffect(() => {
        if (referrer == "login") {
            setLogoTransition("width 2s ease");
            setTimeout(() => {
                router.push('/dashboard?page=dashboard');
            }, 2000)
        } else if (page != "dashboard") {
            console.log(1, page);
            setSubHOpacity("0");
            setShowModules(true);
            setModuleOpacity("1");
        } else {
            console.log(2, page);
            setSubHOpacity("0");
            setTimeout(() => {
                setShowModules(true);
                setTimeout(() => {
                    setModuleOpacity("1");
                }, 10);
            }, 1500);
        }
        if (page) setCurrentPage(page);
        setFormWidth("0px");
        setLogoWidth("100%");
    }, [referrer, page]);

    useEffect(() => {
        (async () => {
            const user = await getAuthUser();
            if (!user.success) {
                router.push('/auth/login');
            } else {
                const userData = await getUser(user.user.id);
                console.log(userData);
            }
        })();
    }, []);

    return (
        <main className={`w-fill min-h-screen flex flex-row ${styles.bg}`}>
            {referrer == "login" && <div 
                className={`min-h-screen ${styles.formSection} flex flex-col justify-center items-center md:items-start`} 
                style={{ transition: "width 2s ease", width: formWidth }}
            >
            </div>}
            <div 
                className={`w-0 md:min-w-[350px] md:w-[25%] h-screen flex flex-col gap-[25px] justify-center items-center overflow-hidden py-[25px] ${styles.logoSection}`} 
                style={{ transition: logoTransition, width: logoWidth }}
            >
                <a className="flex justify-center" href={links["home"]}>
                    <img src="/assets/brand/cs-full-color-dark.svg" alt="CircleSquare Labs" className="h-[50px] w-auto"/>
                </a>
                {!showModules && <p className="text-lg font-light md:text-3xl" style={{transition: "opacity 1s ease", opacity: subHOpacity}}>Brilliance Made Simple</p>}
                {showModules && <div className={`w-full h-full overflow-y-scroll px-[20px]`}>
                    <div className={`flex flex-row flex-wrap overflow-visible md:flex-nowrap gap-[25px]`}>
                        <Nav />
                        { currentPage == "dashboard" && <div className={`w-full h-fit md:h-full text-black p-[20px] ${styles.dashboard}`} style={{borderRadius: "20px", transition: "opacity 1s ease", opacity: moduleOpacity}}>
                            
                        </div> }
                        { currentPage == "account" && <div className={`w-full h-fit text-black p-[20px] bg-white ${styles.page}`} style={{borderRadius: "20px", transition: "opacity 1s ease", opacity: moduleOpacity}}>
                            <AccountPage accountData={{"email": "circlesquarelabs@gmail.com", "org": "CircleSquare Labs"}} />
                        </div> }
                    </div>
                </div>}
            </div>
        </main>
    );
};