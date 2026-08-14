import React from 'react';
import { ARTIST_INFO } from '../data/portfolioData';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playUiSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 bg-[#050505] text-zinc-400 border-t border-[#222] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Monogram & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#111] border border-[#222] flex items-center justify-center font-bold text-[#D4AF37] text-xs font-serif-heading">
            DI
          </div>
          <div>
            <div className="font-bold text-white tracking-widest uppercase font-serif-heading text-xs">
              {ARTIST_INFO.name} ({ARTIST_INFO.formalName})
            </div>
            <div className="text-[10px] text-zinc-500">
              © {new Date().getFullYear()} All Rights Reserved. 3D Animator & Visual Artist.
            </div>
          </div>
        </div>

        {/* Middle Tech Specs */}
        <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-wider font-mono">
          <span>Blender Cycles & Cascadeur</span>
          <span>•</span>
          <span>WebGL Three.js Engine</span>
        </div>

        {/* Back to Top */}
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="px-3.5 py-2 bg-[#0a0a0a] border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-2"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3 h-3 text-[#D4AF37]" />
        </button>
      </div>
    </footer>
  );
};
