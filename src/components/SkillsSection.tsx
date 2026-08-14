import React, { useState } from 'react';
import { SKILLS, WORKFLOW_STEPS, TESTIMONIALS } from '../data/portfolioData';
import {
  Box,
  Activity,
  Film,
  Cpu,
  SunMedium,
  Sparkles,
  Flame,
  CheckCircle,
  Compass,
  Layers,
  Video,
  Sun,
  Star,
  Quote,
} from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Box,
  Activity,
  Film,
  Cpu,
  SunMedium,
  Sparkles,
  Flame,
  Compass,
  Layers,
  Video,
  Sun,
  CheckCircle,
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Software', 'Core Discipline', 'Rendering & VFX'];

  const filteredSkills = SKILLS.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory
  );

  return (
    <section id="skills" className="relative w-full py-24 bg-[#050505] text-[#f5f5f5] border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Software Mastery & Toolchain
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fdfdfd] font-serif-heading">
            Industry-Grade <span className="text-[#D4AF37]">3D Pipeline</span>
          </h2>
          <p className="text-zinc-400 mt-3 text-xs sm:text-sm">
            Proficiency across world-class digital creation suites, physics engines, and cinematic renderers.
          </p>

          {/* Category Filter */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#0a0a0a] border border-[#222] mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`skills-tab-${cat}`}
                onClick={() => {
                  playUiSound('switch');
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-zinc-400 hover:text-[#D4AF37] hover:bg-[#111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.iconName] || Box;
            return (
              <div
                key={skill.name}
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="p-6 bg-[#0a0a0a] border border-[#222] hover:border-[#D4AF37] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-[#111] border border-[#222] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 bg-[#111] border border-[#222] text-[10px] uppercase tracking-widest font-semibold text-zinc-400">
                      {skill.experience}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors font-serif-heading">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Progress Bar & Tags */}
                <div className="mt-6 pt-4 border-t border-[#222]">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold mb-1.5">
                    <span className="text-zinc-400">Proficiency</span>
                    <span className="text-[#D4AF37] font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#111] overflow-hidden mb-4">
                    <div
                      className="h-full bg-[#D4AF37]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#111] border border-[#222] text-[9px] uppercase tracking-wider text-zinc-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-Step Production Workflow Timeline */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              Directorial Process
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif-heading">
              From Concept to <span className="text-[#D4AF37]">Final Master</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((wf) => {
              const Icon = iconMap[wf.icon] || Box;
              return (
                <div
                  key={wf.step}
                  className="p-5 bg-[#0a0a0a] border border-[#222] flex flex-col justify-between relative group hover:border-[#D4AF37] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors font-mono">
                      {wf.step}
                    </span>
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5">{wf.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{wf.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1 text-[#D4AF37] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-white font-serif-heading">Client Feedback & Studio Reviews</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 bg-[#0a0a0a] border border-[#222] flex flex-col justify-between relative hover:border-[#D4AF37]/50 transition-colors"
              >
                <Quote className="w-6 h-6 text-[#D4AF37]/30 mb-3" />
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
                <div className="pt-4 border-t border-[#222] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{t.role} • {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
