/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VideoShowreel } from './components/VideoShowreel';
import { WorkShowcase } from './components/WorkShowcase';
import { ModelViewer3D, ModelCategory } from './components/ModelViewer3D';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selected3DModel, setSelected3DModel] = useState<ModelCategory>('shoe');

  const handleOpen3DLab = (modelType: string) => {
    if (['shoe', 'mech', 'gem', 'character'].includes(modelType)) {
      setSelected3DModel(modelType as ModelCategory);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#D4AF37] selection:text-[#050505] font-sans antialiased relative overflow-x-hidden">
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
        {/* 1. Hero Section with High-Impact Typography & Interactive Three.js Background */}
        <HeroSection />

        {/* 2. Featured Video Showreel & 4K Reel Player */}
        <VideoShowreel />

        {/* 3. Featured Work Showcase Gallery (Buddy Green, Valued Tasty Foods, OwlUp, YAPPI, Jabbok Media) */}
        <WorkShowcase onOpen3DLab={handleOpen3DLab} />

        {/* 4. Interactive 3D Model Studio & WebGL Viewport (Orbit, Materials, Shaders, Lighting) */}
        <ModelViewer3D key={selected3DModel} initialModel={selected3DModel} />

        {/* 5. Software & Skills Badges (Blender, Cascadeur, After Effects, Rigging, VFX) */}
        <SkillsSection />

        {/* 6. Direct Contact & Project Inquiry Estimator (Dominion Ige) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
