import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Hero } from "@/components/index/hero";
import { ProductLab } from "@/components/index/product_lab";
import { Community } from "@/components/index/community";
import { Projects } from "@/components/index/projects";
import { Team } from "@/components/index/team";
import { Process } from "@/components/index/process";
import { Final } from "@/components/index/final";

import { getTeam } from "@/services/index.service";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const teamData = await getTeam();
  return {
    props: { teamData },
  };
}

export default function Home({ teamData }) {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between overflow-clip ${inter.className}`}>
      <Header position="sticky" />
      <Hero />
      <ProductLab />
      <Community />
      <Projects />
      <Team teamData={ teamData }/>
      <Process />
      <Final />
    </main>
  );
}
