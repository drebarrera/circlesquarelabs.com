import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Hero } from "@/components/index/hero";
import { ProductLab } from "@/components/index/product_lab";
import { Community } from "@/components/index/community";
import { Projects } from "@/components/index/projects";
import { Team } from "@/components/index/team";
import { Process } from "@/components/index/process";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <Header />
      <Hero />
      <ProductLab />
      <Community />
      <Projects />
      <Team />
      <Process />
    </main>
  );
}
