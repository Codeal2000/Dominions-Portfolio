/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VideoShowreel } from './components/VideoShowreel';
import { WorkShowcase } from './components/WorkShowcase';
import { ModelViewer3D, ModelCategory } from './components/ModelViewer3D';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { SectionTransition } from './components/SectionTransition';
import { initSmoothScroll } from './utils/smoothScroll';

export default function App() {
  const [selected3DModel, setSelected3DModel] = useState<ModelCategory>('shoe');

  // Initialize global smooth scrolling engine
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  const handleOpen3DLab = (modelType: string) => {
    if (['shoe', 'mech', 'gem', 'character'].includes(modelType)) {
      setSelected3DModel(modelType as ModelCategory);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#D4AF37] selection:text-[#050505] font-sans antialiased relative overflow-x-hidden">
      {/* Top subtle golden scroll progress bar */}
      <ScrollProgress />

      {/* Elegant Dark ambient radial gold light bloom */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-15 blur-[140px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      {/* Fixed Navigation Bar */}
      <Navbar />

      <main className="w-full relative z-10">
        {/* 1. Hero Section with 3D Avatar & Interactive Three.js Background */}
        <HeroSection />

        {/* 2. Featured Video Showreel & 4K Reel Player */}
        <SectionTransition direction="up" delay={50}>
          <VideoShowreel />
        </SectionTransition>

        {/* 3. My Works Showcase Gallery */}
        <SectionTransition direction="up" delay={50}>
          <WorkShowcase onOpen3DLab={handleOpen3DLab} />
        </SectionTransition>

        {/* 4. Interactive 3D Model Studio & WebGL Viewport */}
        <SectionTransition direction="up" delay={50}>
          <ModelViewer3D key={selected3DModel} initialModel={selected3DModel} />
        </SectionTransition>

        {/* 5. Direct Contact & Project Inquiry Estimator */}
        <SectionTransition direction="up" delay={50}>
          <ContactSection />
        </SectionTransition>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
