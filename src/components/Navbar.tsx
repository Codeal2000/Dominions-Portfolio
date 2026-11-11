import React, { useState, useEffect } from 'react';
import { ARTIST_INFO } from '../data/portfolioData';
import {
  Sparkles,
  Menu,
  X,
  Volume2,
  VolumeX,
  Mail,
  Layers,
  Film,
  Grid,
  ArrowUpRight,
} from 'lucide-react';
import { playUiSound, toggleSound, isSoundEnabled } from '../utils/audioSynth';
import { smoothScrollTo } from '../utils/smoothScroll';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section scroll spy
      const sections = ['showreel', 'work', 'interactive-3d-lab', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newVal = toggleSound();
    setSoundOn(newVal);
    if (newVal) playUiSound('click');
  };

  const navLinks = [
    { label: 'Showreel', href: '#showreel', id: 'showreel', icon: Film },
    { label: 'My Works', href: '#work', id: 'work', icon: Grid },
    { label: '3D Studio Lab', href: '#interactive-3d-lab', id: 'interactive-3d-lab', icon: Layers },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    playUiSound('click');
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-[#222] shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Artist Monogram */}
        <a
          href="#top"
          onClick={(e) => handleNavClick('#top', e)}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 border-2 border-[#D4AF37] flex items-center justify-center font-bold text-[#D4AF37] text-lg font-cinzel group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
            DI
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.4em] font-bold text-[#f5f5f5] group-hover:text-[#D4AF37] transition-colors">
              {ARTIST_INFO.name}
            </div>
            <div className="text-[9px] text-[#D4AF37] font-medium tracking-[0.3em] uppercase">
              3D Visual Artist
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[10px] uppercase tracking-widest text-zinc-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                onMouseEnter={() => playUiSound('hover')}
                className={`transition-all font-medium py-1 relative ${
                  isActive
                    ? 'text-[#D4AF37] font-bold'
                    : 'text-zinc-400 hover:text-[#D4AF37]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.7)] animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA & SFX Toggle */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            id="navbar-sound-toggle-btn"
            onClick={handleToggleSound}
            className="p-2.5 bg-[#111] border border-[#222] text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
            title="Toggle SFX"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick('#contact', e)}
            className="px-6 py-2.5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/10"
          >
            <span>Hire Dominion</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-2 bg-[#111] border border-[#222] text-zinc-400"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#D4AF37]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playUiSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 bg-[#111] border border-[#222] text-zinc-300 hover:border-[#D4AF37]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-8 bg-[#050505]/98 backdrop-blur-2xl border-b border-[#222] space-y-3 mt-3 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`flex items-center justify-between px-4 py-3 border text-xs font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-[#18150a] border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-[#111] border-[#222] text-zinc-200 hover:border-[#D4AF37]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-zinc-400'}`} />
                  <span>{link.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                )}
              </a>
            );
          })}

          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick('#contact', e)}
              className="w-full py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all"
            >
              <span>Get In Touch / Hire</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
