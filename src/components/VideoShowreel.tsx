import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  Film,
  Layers,
  Activity,
  Share2,
  Check,
  Tv,
} from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

export const VideoShowreel: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'master' | 'product' | 'character'>('master');
  const [progress, setProgress] = useState<number>(38);
  const [copied, setCopied] = useState<boolean>(false);
  const [customEmbedModal, setCustomEmbedModal] = useState<boolean>(false);
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);

  // Simulated progress bar animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    playUiSound('click');
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    playUiSound('click');
    setIsMuted(!isMuted);
  };

  const handleShare = () => {
    playUiSound('shimmer');
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const reels = {
    master: {
      title: 'Dominion Ige — 2025/2026 Master 3D Animation & VFX Reel',
      duration: '01:45',
      fps: '60 FPS',
      res: '4K DCI',
      software: 'Blender 4.2 • Cascadeur • Substance 3D • After Effects',
      description: 'A cinematic compilation of high-impact product animations, fluid simulations, and physics-driven character stunts.',
      previewImg: '/src/assets/images/shoe_animation_still_1786701546110.jpg',
    },
    product: {
      title: 'Commercial Product & Footwear Visualization Reel',
      duration: '01:10',
      fps: '60 FPS',
      res: '4K UHD',
      software: 'Blender Cycles X • FLIP Fluids • Substance Painter',
      description: 'Exploded assembly choreography, liquid splash dynamics, and photorealistic footwear micro-textures.',
      previewImg: '/src/assets/images/food_product_still_1786701556328.jpg',
    },
    character: {
      title: 'Physics Character Motion & Rigging Reel (Cascadeur)',
      duration: '00:55',
      fps: '60 FPS',
      res: '4K UHD',
      software: 'Cascadeur • Blender • Mixamo • Marvelous Designer',
      description: 'Ground-impact weight mechanics, fulcrum point balancing, dynamic acrobatics, and secondary muscle inertia.',
      previewImg: '/src/assets/images/character_rig_still_1786701578188.jpg',
    },
  };

  const currentReel = reels[activeTab];

  return (
    <section id="showreel" className="relative w-full py-24 bg-[#050505] text-[#f5f5f5] overflow-hidden border-t border-[#222]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
              <Film className="w-3.5 h-3.5" />
              Featured Showreel
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fdfdfd] font-serif-heading">
              Cinematic Motion in <span className="text-[#D4AF37]">Pure 4K</span>
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl text-xs sm:text-sm">
              Experience the motion velocity, lighting finesse, and anatomical weight in Dominion Ige's 3D animation cuts.
            </p>
          </div>

          {/* Reel Category Switchers */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-[#0a0a0a] border border-[#222]">
            {[
              { id: 'master', label: 'Master 2025/2026 Reel', icon: Sparkles },
              { id: 'product', label: 'Product & Footwear', icon: Layers },
              { id: 'character', label: 'Character Physics', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`reel-tab-${tab.id}`}
                  onClick={() => {
                    playUiSound('switch');
                    setActiveTab(tab.id as 'master' | 'product' | 'character');
                    setProgress(0);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'text-zinc-400 hover:text-[#D4AF37] hover:bg-[#111]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="relative border border-[#222] bg-[#111] shadow-2xl overflow-hidden group">
          {/* Main Visual Display / Video Viewport */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#050505] overflow-hidden flex items-center justify-center">
            {activeEmbed ? (
              <iframe
                src={activeEmbed}
                title="Dominion Ige 3D Showreel"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* Background image with cinematic zoom effect */}
                <img
                  src={currentReel.previewImg}
                  alt={currentReel.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlaying ? 'scale-105 filter brightness-90' : 'scale-100 filter brightness-75'
                  }`}
                />

                {/* Dark Vignette Overlay & Scanlines */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

                {/* Live Animated 3D Simulation Overlay when playing */}
                {isPlaying && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 border border-[#D4AF37]/20 rounded-full animate-ping opacity-25" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 bg-red-600 text-[#f5f5f5] text-[8px] uppercase font-bold tracking-widest">
                        Live Showreel
                      </span>
                      <span className="px-2.5 py-1 bg-black/70 text-[#D4AF37] text-[8px] uppercase font-bold tracking-widest backdrop-blur border border-zinc-800">
                        4K Quality
                      </span>
                    </div>
                  </div>
                )}

                {/* Play / Pause Central Hero Trigger */}
                <button
                  id="play-pause-showreel-hero-btn"
                  onClick={togglePlay}
                  className={`absolute z-20 w-16 h-16 sm:w-20 sm:h-20 bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all transform hover:scale-105 active:scale-95 hover:bg-white ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}
                  title={isPlaying ? 'Pause Reel' : 'Play Reel'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                  )}
                </button>
              </>
            )}

            {/* Custom Embed Floating Button */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                id="embed-showreel-modal-btn"
                onClick={() => setCustomEmbedModal(true)}
                className="px-3 py-1.5 bg-[#050505]/90 backdrop-blur-md border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all"
              >
                <Tv className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{activeEmbed ? 'Change Embed' : 'Embed Custom Reel'}</span>
              </button>
              <button
                id="share-showreel-btn"
                onClick={handleShare}
                className="p-2 bg-[#050505]/90 backdrop-blur-md border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs transition-all"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Video Control Bar & Scrubbing Timeline */}
          <div className="p-4 sm:p-5 bg-[#0a0a0a] border-t border-[#222] flex flex-col gap-4">
            {/* Scrubber Progress Bar */}
            <div
              className="relative w-full h-1.5 bg-zinc-900 cursor-pointer overflow-hidden group/bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
                setProgress(newProgress);
              }}
            >
              <div
                className="h-full bg-[#D4AF37] transition-all relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white shadow-md transform scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>

            {/* Bottom Meta & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Play / Info */}
              <div className="flex items-center gap-3">
                <button
                  id="bottom-bar-play-pause-btn"
                  onClick={togglePlay}
                  className="p-2 bg-[#D4AF37] text-black hover:bg-white font-bold transition-all shadow-md"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>

                <button
                  id="toggle-video-mute-btn"
                  onClick={toggleMute}
                  className="p-2 bg-[#111] border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </button>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#fdfdfd] leading-snug">{currentReel.title}</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{currentReel.software}</p>
                </div>
              </div>

              {/* Quality & Specs Badges */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="px-2.5 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
                  {currentReel.res}
                </span>
                <span className="px-2.5 py-1 bg-[#111] border border-[#222] text-zinc-400 text-[10px] font-semibold uppercase">
                  {currentReel.fps}
                </span>
                <span className="px-2.5 py-1 bg-[#111] border border-[#222] text-zinc-500 text-[10px] font-mono">
                  {Math.floor((progress / 100) * 105)}s / {currentReel.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Video Embed Modal */}
        {customEmbedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg p-6 bg-[#0a0a0a] border border-[#222] shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 font-serif-heading">Embed Direct Video Showreel</h3>
              <p className="text-xs text-zinc-400 mb-4">
                Paste any YouTube, Vimeo, or ArtStation player embed URL to preview Dominion's live showreel directly inside the player.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    Embed URL (e.g. https://www.youtube.com/embed/...)
                  </label>
                  <input
                    id="custom-embed-input"
                    type="url"
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-4 py-2.5 bg-[#050505] border border-[#222] text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveEmbed(null);
                      setCustomEmbedModal(false);
                    }}
                    className="px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-zinc-400 hover:text-white"
                  >
                    Reset to Default Reel
                  </button>
                  <button
                    onClick={() => {
                      if (embedUrl) {
                        let finalUrl = embedUrl;
                        if (embedUrl.includes('watch?v=')) {
                          finalUrl = embedUrl.replace('watch?v=', 'embed/');
                        }
                        setActiveEmbed(finalUrl);
                      }
                      setCustomEmbedModal(false);
                    }}
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest shadow-lg transition-all"
                  >
                    Apply Embed
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
