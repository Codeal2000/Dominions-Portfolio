import React, { useState } from 'react';
import { ARTIST_INFO } from '../data/portfolioData';
import {
  Mail,
  Send,
  Check,
  Copy,
  Calendar,
  Sparkles,
  DollarSign,
  Clock,
  Video,
  Layers,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playUiSound } from '../utils/audioSynth';

export const ContactSection: React.FC = () => {
  const [projectType, setProjectType] = useState<string>('3D Product Animation');
  const [timeline, setTimeline] = useState<string>('Standard (3-4 Weeks)');
  const [format, setFormat] = useState<string>('Both (16:9 Landscape + 9:16 Vertical)');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCopyEmail = () => {
    playUiSound('shimmer');
    navigator.clipboard.writeText(ARTIST_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUiSound('success');

    // Fire golden confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'],
    });

    const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${clientName || 'Client'}`);
    const body = encodeURIComponent(
      `Hello Dominion,\n\nI would like to discuss a 3D animation project with you.\n\n` +
      `• Project Type: ${projectType}\n` +
      `• Timeline: ${timeline}\n` +
      `• Deliverable Format: ${format}\n` +
      `• Client Name: ${clientName}\n` +
      `• Contact Email: ${clientEmail}\n\n` +
      `Project Scope & Brief:\n${projectBrief || 'Details to be discussed during discovery call.'}\n\n` +
      `Looking forward to hearing from you!`
    );

    window.open(`mailto:${ARTIST_INFO.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-[#050505] text-[#f5f5f5] border-t border-[#222] overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#D4AF37]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Artist Contact Info & Bio */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Build Something Unforgettable
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fdfdfd] font-serif-heading">
                Start Your Next <span className="text-[#D4AF37]">3D Project</span>
              </h2>
              <p className="text-zinc-400 mt-4 text-xs sm:text-sm leading-relaxed">
                Whether you need a high-converting product commercial, dynamic character animation in Cascadeur, or custom 3D motion design, Dominion is ready to bring your vision to life.
              </p>

              {/* Status Pill */}
              <div className="mt-6 flex items-center gap-3 p-3.5 bg-[#0a0a0a] border border-[#222]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] absolute inset-0" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">{ARTIST_INFO.status}</div>
                  <div className="text-[10px] text-zinc-500">Response time: Usually within 24 hours</div>
                </div>
              </div>

              {/* Direct Email Card */}
              <div className="mt-6 p-5 bg-[#0a0a0a] border border-[#222] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#111] border border-[#222] flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Direct Email</div>
                    <a
                      href={`mailto:${ARTIST_INFO.email}`}
                      className="text-xs font-bold text-[#D4AF37] hover:underline"
                    >
                      {ARTIST_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2.5 bg-[#111] border border-[#222] hover:border-[#D4AF37] text-zinc-300 hover:text-white transition-all"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div className="mt-8 pt-6 border-t border-[#222]">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                Connect on Creative Platforms
              </div>
              <div className="flex flex-wrap gap-2">
                {ARTIST_INFO.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-[#0a0a0a] border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <span>{s.name}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Builder */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#0a0a0a] border border-[#222] shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2 font-serif-heading">Project Brief & Estimator</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Configure your project requirements below to generate an instant discovery brief directly for Dominion.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Project Type Selector */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">
                    1. Select Animation Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      '3D Product Animation',
                      'Footwear Breakdown',
                      'Character Rig & Motion',
                      'Brand Broadcast Commercial',
                      'Hard Surface 3D Model',
                      'Full 3D Showreel',
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => {
                          playUiSound('switch');
                          setProjectType(type);
                        }}
                        className={`p-2.5 text-[10px] uppercase tracking-wider font-semibold text-left transition-all border ${
                          projectType === type
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold shadow-sm'
                            : 'bg-[#050505] border-[#222] text-zinc-400 hover:text-[#D4AF37] hover:border-[#333]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Timeline & Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      Target Timeline
                    </label>
                    <select
                      id="timeline-select"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#222] text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Rush (1-2 Weeks)">Rush Delivery (1-2 Weeks)</option>
                      <option value="Standard (3-4 Weeks)">Standard Production (3-4 Weeks)</option>
                      <option value="Flexible (1-2 Months)">Flexible Pipeline (1-2 Months)</option>
                      <option value="Ongoing Retainer">Ongoing Studio Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2 flex items-center gap-1">
                      <Video className="w-3 h-3 text-[#D4AF37]" />
                      Delivery Aspect Ratio
                    </label>
                    <select
                      id="format-select"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#050505] border border-[#222] text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Both (16:9 Landscape + 9:16 Vertical)">Both (16:9 4K + 9:16 TikTok/Reels)</option>
                      <option value="16:9 Landscape 4K UHD">16:9 Landscape 4K UHD (YouTube / TVC)</option>
                      <option value="9:16 Vertical Mobile">9:16 Vertical Mobile (Social Ads)</option>
                      <option value="1:1 Square">1:1 Square Feed</option>
                    </select>
                  </div>
                </div>

                {/* 3. Client Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-1">Your Name / Studio</label>
                    <input
                      id="client-name-input"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins (Brand Lead)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#050505] border border-[#222] text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-1">Your Email</label>
                    <input
                      id="client-email-input"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#050505] border border-[#222] text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* 4. Project Brief textarea */}
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-1">
                    Project Brief & Key Deliverables
                  </label>
                  <textarea
                    id="project-brief-textarea"
                    rows={3}
                    placeholder="Tell Dominion about your product, desired animation style, reference videos, or camera movements..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#050505] border border-[#222] text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="submit-inquiry-btn"
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#b8972e] text-black font-bold uppercase tracking-wider text-xs shadow-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry to Dominion Ige</span>
                </button>

                {submitted && (
                  <div className="p-3 bg-[#111] border border-[#D4AF37] text-center text-xs font-bold text-[#D4AF37]">
                    Inquiry draft opened in your email client! Dominion will review your brief shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
