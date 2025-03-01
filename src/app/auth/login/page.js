"use client";
import { login } from './actions';

import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import links from '@/data/links.json';

import styles from "@/styles/login.module.css"

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const res = await login(username, password);

        if (res.ok) {
            router.push('/dashboard?referrer=login');
        } else {
            console.log(res.error);
            setError(res.error.message);
        }
    };

    return (
        <main className={`w-fill min-h-screen flex flex-row ${styles.bg}`}>
            <div className={`w-[100%] min-h-screen ${styles.formSection} flex flex-col justify-center md:p-[10%] items-center md:items-start`}>
                <form onSubmit={handleLogin} className={`w-[90%] md:w-[50%] md:min-w-[500px] p-[20px] flex flex-col ${styles.form} gap-[20px]`} style={{borderRadius: '20px'}}>
                    <h3 className="text-xl font-semibold md:text-2xl">Sign In to Mission Control</h3>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-md font-medium md:text-lg" htmlFor="username">E-mail:</label>
                        <input className="text-lg md:text-xl" type="text" placeholder="E-mail" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <label className="text-md font-medium md:text-lg" htmlFor="password">Password:</label>
                        <input className="text-lg md:text-xl" type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="w-full flex flex-row justify-end gap-[10px] ">
                        { error && <div className={`w-full px-[10px] py-[3px] font-normal text-md md:text-lg`} style={{borderRadius: "8px"}}>
                            <p>{error}</p>
                        </div> }
                        <button type="submit" className="text-md md:text-lg w-fit px-[25px] py-[4px] font-medium text-nowrap" style={{borderRadius: "5px"}}>Log In</button>
                    </div>
                </form>
            </div>
            <div className={`w-0 md:min-w-[350px] md:w-[25%] flex flex-col gap-[25px] justify-center items-center overflow-hidden ${styles.logoSection}`}>
                <a className="flex justify-center" href={links["home"]}><img src="/assets/brand/cs-full-color-dark.svg" alt="CircleSquare Labs" className="h-[50px] w-auto"/></a>
                <p className="text-lg font-light md:text-3xl">Brilliance Made Simple</p>
            </div>
        </main>
    );
};
