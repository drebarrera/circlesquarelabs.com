import { useState } from "react";
import { Icon } from '@/components/icon';
import LoadingSpinner from "@/components/loading_spinner";

import styles from "@/styles/dashboard.module.css";

import {logout} from '@/app/actions/serverActions';

export default function Nav({ moduleOpacity, logoURL, org }) {
    const [showMenu, setShowMenu] = useState(true);
    const [loadingLogout, setLoadingLogout] = useState(false);

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        setLoadingLogout(true);

        const res = await logout();

        setLoadingLogout(false);
        if (res.ok) {
            router.push('/');
        } else {
            console.log(res.error);
        }
    };


    return (
        <div className={`w-full md:max-w-[325px] bg-white text-black px-[15px] py-[8px] flex flex-col gap-[10px] overflow-hidden ${(showMenu) ? styles.menuToggled : styles.menuStandard}`} style={{borderRadius: "15px", transition: "opacity 1s ease, height 0.5s linear", opacity: moduleOpacity}}>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-[10px]">
                    <img src={logoURL} className="w-[30px] h-[30px]"/>
                    <h3 className="text-lg md:text-xl font-medium">{org}</h3>
                </div>
                <Icon icon="menu" classData={`relative w-[30px] h-[30px] cursor-pointer ${styles.menuIcon} md:hidden`} onClick={() => toggleMenu()}/>
            </div>
            <div className="flex flex-col text-lg md:text-xl gap-[5px]">
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=account">Account</a>
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=invoices">Invoices</a>
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=projects">Projects</a>
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=kanban">Kanban</a>
                <div className="hover:bg-red-300 px-[10px] w-full cursor-pointer flex flex-row justify-between items-center" style={{borderRadius: "5px"}} onClick={handleLogout}><p>Log Out</p>{loadingLogout && <LoadingSpinner size={18} color={"#ff4233"}/>}</div>
                <hr></hr>
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=users">Users</a>
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=organizations">Organizations</a>
                <a className="hover:bg-red-300 px-[10px] w-full" style={{borderRadius: "5px"}} href="/dashboard?page=account">Projects</a>

            </div>
        </div>
    );
}