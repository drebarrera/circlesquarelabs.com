import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Main } from "@/components/team/main";
import { getAllTeamMembers } from "@/services/team.service";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
    const fn = context.query?.fn ?? null;
    const ln = context.query?.ln ?? null;

    const teamData = await getAllTeamMembers();

    return {
        props: { teamData, fn, ln },
    };
}

export default function Team({ teamData, fn, ln }) {
    return (
        <main className={`flex min-h-screen flex-col overflow-clip ${inter.className}`} style={{ background: 'linear-gradient(170deg, rgba(25,53,78,0) 20%, rgba(0,255,255,0.4) 55%, rgba(25,53,78,0)) 100%' }}>
            <Header position="fixed" />
            <Main teamData={teamData} fn={fn} ln={ln} />
        </main>
    );
}
