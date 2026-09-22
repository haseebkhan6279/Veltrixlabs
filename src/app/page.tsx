import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_KEYWORDS,
  buildMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: SITE_KEYWORDS,
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-obsidian">
      <JsonLd />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Services />
      <CaseStudies />
      <About />
      <TechStack />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
