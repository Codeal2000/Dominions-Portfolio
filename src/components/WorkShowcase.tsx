import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Sparkles, Grid, Layers, Activity, Filter } from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

interface WorkShowcaseProps {
  onOpen3DLab: (modelType: string) => void;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ onOpen3DLab }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'product', label: 'Product & Footwear', count: 2 },
    { id: 'character', label: 'Character & Rigging', count: 2 },
    { id: 'commercial', label: 'Brand Commercials', count: 1 },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'product') return p.category.toLowerCase().includes('product') || p.category.toLowerCase().includes('footwear') || p.category.toLowerCase().includes('fluid');
    if (selectedFilter === 'character') return p.category.toLowerCase().includes('character') || p.category.toLowerCase().includes('mech');
    if (selectedFilter === 'commercial') return p.category.toLowerCase().includes('broadcast') || p.category.toLowerCase().includes('identity');
    return true;
  });

  return (
    <section id="work" className="relative w-full py-24 bg-[#050505] text-[#f5f5f5] border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
              <Grid className="w-3.5 h-3.5" />
              Selected Projects
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fdfdfd] font-serif-heading">
              Commercial <span className="text-[#D4AF37]">Visual Works</span>
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl text-xs sm:text-sm">
              A curated portfolio of high-impact 3D product animations, physics-grounded character rigging, and commercial visual effects.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0a0a0a] border border-[#222]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                onClick={() => {
                  playUiSound('switch');
                  setSelectedFilter(cat.id);
                }}
                className={`px-3.5 py-2 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 ${
                  selectedFilter === cat.id
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'text-zinc-400 hover:text-[#D4AF37] hover:bg-[#111]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 text-[9px] font-mono ${
                    selectedFilter === cat.id ? 'bg-black/20 text-black font-bold' : 'bg-[#111] text-zinc-500 border border-[#222]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setActiveProject(p)}
              onOpen3DLab={onOpen3DLab}
            />
          ))}
        </div>

        {/* Project Breakdown Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onSelect3DModel={onOpen3DLab}
        />
      </div>
    </section>
  );
};
