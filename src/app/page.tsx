"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "@/components/ui/BootScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/hero/HeroSection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import CapabilitiesSection from "@/components/sections/capabilities/CapabilitiesSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import FAQSection from "@/components/sections/faq/FAQSection";
import TerminalSection from "@/components/sections/terminal/TerminalSection";
import AboutSection from "@/components/sections/about/AboutSection";
import FeedbackSection from "@/components/sections/feedback/FeedbackSection";

export default function HomePage() {
  const [booted, setBooted] = useState(false);
  const handleBoot = useCallback(() => setBooted(true), []);

  return (
    <>
      {/* Boot animation */}
      <BootScreen onComplete={handleBoot} />

      {/* Main app — fades in after boot */}
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col min-h-screen"
          >
            <Navbar />
            <main className="flex-1">
              <HeroSection />
              <ProjectsSection />
              <CapabilitiesSection />
              <ServicesSection />
              <FAQSection />
              <TerminalSection />
              <AboutSection />
              <FeedbackSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
