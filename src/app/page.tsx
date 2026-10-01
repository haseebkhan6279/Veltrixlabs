import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AiWorkflow from "@/components/AiWorkflow";
import CaseStudies from "@/components/CaseStudies";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import VelocityMarquee from "@/components/VelocityMarquee";
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
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <div className="border-y border-white/8 bg-white/[0.015]">
        <VelocityMarquee
          items={["Web Apps", "Mobile", "SaaS", "Shopify", "AI Automation", "n8n"]}
        />
      </div>
      <Services />
      <AiWorkflow />
      <CaseStudies />
      <Reviews />
      <About />
      <TechStack />
      <Process />
      <VelocityMarquee
        outline
        baseVelocity={2}
        items={["Build", "Automate", "Scale", "Ship in weeks"]}
      />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </main>
  );
}
