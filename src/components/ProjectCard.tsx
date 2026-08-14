import React from 'react';
import { Project } from '../types';
import { ExternalLink, Play, Eye, Sparkles, Layers } from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onOpen3DLab?: (modelType: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onOpen3DLab }) => {
  return (
    <div
      id={`project-card-${project.id}`}
      className="group relative border border-[#222] bg-[#0a0a0a] overflow-hidden hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_35px_rgba(212,175,55,0.08)]"
    >
      {/* Top Image Preview Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#050505] border-b border-[#222]">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 bg-[#050505]/90 backdrop-blur-md border border-[#222] text-[#D4AF37] text-[9px] uppercase font-bold tracking-widest">
            {project.category}
          </span>
          <span className="px-2 py-1 bg-[#050505]/90 backdrop-blur-md border border-[#222] text-zinc-400 text-[9px] font-mono">
            {project.year}
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            id={`open-breakdown-btn-${project.id}`}
            onClick={() => {
              playUiSound('click');
              onSelect(project);
            }}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-white text-black font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Case Study & Breakdown</span>
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[9px] font-semibold text-[#D4AF37] tracking-[0.2em] uppercase mb-1">
            Client: {project.client}
          </div>
          <h3 className="text-lg font-bold text-[#fdfdfd] group-hover:text-[#D4AF37] transition-colors leading-snug font-serif-heading">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Software Stack Pills */}
        <div className="mt-5 pt-4 border-t border-[#222]">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.software.map((sw) => (
              <span
                key={sw}
                className="px-2 py-0.5 bg-[#111] border border-[#222] text-zinc-400 text-[9px] uppercase font-mono"
              >
                {sw}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                playUiSound('click');
                onSelect(project);
              }}
              className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] hover:text-white flex items-center gap-1.5 group/btn"
            >
              <span>View Breakdown</span>
              <ExternalLink className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </button>

            {project.modelType && (
              <a
                href="#interactive-3d-lab"
                onClick={() => {
                  playUiSound('switch');
                  if (onOpen3DLab) onOpen3DLab(project.modelType!);
                }}
                className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400 hover:text-[#D4AF37] flex items-center gap-1 bg-[#111] px-2 py-1 border border-[#222] hover:border-[#D4AF37]"
              >
                <Layers className="w-3 h-3 text-[#D4AF37]" />
                <span>3D View</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
