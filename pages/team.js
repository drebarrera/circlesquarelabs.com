import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Main } from "@/components/team/main";

const inter = Inter({ subsets: ["latin"] });

export default function Team() {
    return (
        <main className={`flex min-h-screen flex-col overflow-clip ${inter.className}`} style={ {background: 'linear-gradient(170deg, rgba(25,53,78,0) 20%, rgba(0,255,255,0.4) 55%, rgba(25,53,78,0)) 100%'} }>
            <Header position="fixed" />
            <Main />
        </main>
    );
}
