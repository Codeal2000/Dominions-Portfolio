import React from 'react';
import { ARTIST_INFO } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';
import {
  Play,
  Layers,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[96vh] flex items-center justify-center bg-[#050505] text-[#f5f5f5] overflow-hidden pt-28 pb-16">
      {/* 3D Interactive Three.js Canvas Background (responds to cursor) */}
      <Hero3DCanvas />

      {/* Dark vignette & ambient gold glow overlay */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,rgba(5,5,5,0.88)_100%] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Subheading / Category Label */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Artist & Motion Designer • Dominion Ige</span>
          </div>

          {/* High-Impact Serif Typography ("IGE DOMINION") */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-[0.88] mb-6 font-serif-heading select-none">
            <span className="block text-[#fdfdfd]">IGE</span>
            <span className="block text-[#D4AF37]">DOMINION</span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl md:text-2xl font-medium text-zinc-300 tracking-wide max-w-3xl mb-4">
            3D Animator & Visual Artist <span className="text-[#D4AF37]">|</span> Crafting Cinematic Product Animations & Character Motion
          </p>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed mb-8">
            Crafting cinematic product animations and complex character motions that bridge the gap between digital reality and artistic vision using Blender, Cascadeur, and high-fidelity shaders.
          </p>

          {/* Primary Expertise Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['Blender 3D', 'Cascadeur', 'After Effects', 'Substance 3D', '3D Rigging', 'Fluid & VFX'].map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1 bg-[#111] border border-[#222] text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            {/* Primary Action: Watch Showreel */}
            <a
              href="#showreel"
              id="hero-watch-showreel-btn"
              onClick={() => playUiSound('click')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#D4AF37]/15"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Showreel</span>
            </a>

            {/* Secondary Action: Orbit 3D Lab */}
            <a
              href="#interactive-3d-lab"
              id="hero-orbit-3d-lab-btn"
              onClick={() => playUiSound('switch')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111] border border-[#222] text-zinc-200 hover:text-[#D4AF37] hover:border-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Interactive 3D View</span>
            </a>

            {/* Tertiary Action: Get In Touch */}
            <a
              href="#contact"
              id="hero-get-in-touch-btn"
              onClick={() => playUiSound('click')}
              className="w-full sm:w-auto px-8 py-3.5 border border-zinc-700 text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Stats Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl pt-8 border-t border-[#222]">
            {ARTIST_INFO.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-[#0a0a0a] border border-[#222] flex flex-col items-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-cinzel">{stat.value}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <a
            href="#showreel"
            className="mt-12 text-zinc-600 hover:text-[#D4AF37] transition-colors flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest font-medium"
          >
            <span>Explore Works</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#D4AF37]" />
          </a>
        </div>
      </div>
    </section>
  );
};

