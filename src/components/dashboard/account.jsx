import { useState, useEffect } from 'react';
import styles from "@/styles/dashboard.module.css";

export const AccountPage = ({ accountData }) => {
    const [email, setEmail] = useState(accountData.email);
    const [logoURL, setLogoURL] = useState(accountData.logoURL);
    const [org, setOrg] = useState(accountData.org);
    const [adminName, setAdminName] = useState(accountData.adminName);
    const [error, setError] = useState("");

    useEffect(() => {
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push('/dashboard?referrer=login');
        } else {
            setError(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`w-[90%] md:w-[50%] md:min-w-[500px] p-[10px] flex flex-col ${styles.form} gap-[20px]`} style={{borderRadius: '20px'}}>
            <h3 className="text-xl font-semibold md:text-2xl text-[#ff4233]">Account</h3>
            <div className="flex flex-col gap-[10px]">
                <label className="text-md font-medium md:text-lg" htmlFor="username">Profile Image:</label>
                <img src={logoURL} className="h-[100px] w-[100px]"/>
            </div>
            <div className="flex flex-col gap-[10px]">
                <label className="text-md font-medium md:text-lg" htmlFor="org">Organization:</label>
                <input className="text-lg md:text-xl" type="text" placeholder="Organization Name" name="org" value={org} onChange={(e) => setOrg(e.target.value)} />
            </div>
            <div className="flex flex-col gap-[10px]">
                <label className="text-md font-medium md:text-lg" htmlFor="admin">First Name:</label>
                <input className="text-lg md:text-xl" type="text" placeholder="Point of Contact Name" name="admin" value={adminName} onChange={(e) => setAdmin(e.target.value)} />
            </div>
            <div className="flex flex-col gap-[10px]">
                <label className="text-md font-medium md:text-lg" htmlFor="email">E-mail:</label>
                <input className="text-lg md:text-xl" type="text" placeholder="E-mail" name="email" value={email} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="w-full flex flex-row justify-end gap-[10px] ">
                { error && <div className={`w-full px-[10px] py-[3px] font-normal text-md md:text-lg`} style={{borderRadius: "8px"}}>
                    <p>{error}</p>
                </div> }
                <button type="submit" className="text-md md:text-lg w-fit px-[25px] py-[4px] font-medium text-nowrap" style={{borderRadius: "5px"}}>Save</button>
            </div>
        </form>
    );
};