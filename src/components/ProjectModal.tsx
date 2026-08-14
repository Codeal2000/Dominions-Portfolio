import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Play,
  Share2,
  Check,
  Eye,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { playUiSound } from '../utils/audioSynth';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelect3DModel?: (modelType: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelect3DModel }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'tech'>('overview');
  const [wireframeView, setWireframeView] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!project) return null;

  const handleShare = () => {
    playUiSound('shimmer');
    navigator.clipboard.writeText(`${window.location.origin}#${project.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0a0a0a] border border-[#222] shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Top Header Banner & Hero Image */}
        <div className="relative w-full h-64 sm:h-80 bg-[#050505] overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-500 ${
              wireframeView ? 'filter invert brightness-125 contrast-200' : 'filter brightness-85'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              id="wireframe-toggle-modal"
              onClick={() => {
                playUiSound('switch');
                setWireframeView(!wireframeView);
              }}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border ${
                wireframeView
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#050505]/90 text-zinc-300 border-[#222] backdrop-blur-md hover:text-[#D4AF37]'
              }`}
            >
              {wireframeView ? 'Shaded Pass' : 'Wireframe Pass'}
            </button>

            <button
              id="share-project-modal-btn"
              onClick={handleShare}
              className="p-2 bg-[#050505]/90 border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] backdrop-blur-md transition-all"
              title="Share Project Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              id="close-project-modal-btn"
              onClick={() => {
                playUiSound('click');
                onClose();
              }}
              className="p-2 bg-[#050505]/90 border border-[#222] text-zinc-300 hover:text-white backdrop-blur-md transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Project Title & Category */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#050505]/90 border border-[#222] text-[#D4AF37] text-[9px] uppercase font-bold tracking-widest mb-2">
              <Sparkles className="w-3 h-3" />
              {project.category}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif-heading">{project.title}</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">{project.tagline}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#222] bg-[#050505] flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-6">
            {[
              { id: 'overview', label: 'Project Overview' },
              { id: 'breakdown', label: 'Production Phases' },
              { id: 'tech', label: 'Pipeline & Metrics' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`modal-tab-${tab.id}`}
                onClick={() => {
                  playUiSound('switch');
                  setActiveTab(tab.id as 'overview' | 'breakdown' | 'tech');
                }}
                className={`py-3.5 text-[10px] sm:text-xs uppercase tracking-widest font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {project.modelType && onSelect3DModel && (
            <a
              href="#interactive-3d-lab"
              onClick={() => {
                playUiSound('switch');
                onSelect3DModel(project.modelType!);
                onClose();
              }}
              className="px-3 py-1.5 my-2 bg-[#111] border border-[#222] text-[#D4AF37] text-[9px] uppercase tracking-wider font-bold flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-black transition-all flex-shrink-0"
            >
              <Layers className="w-3 h-3" />
              <span>Inspect 3D Geometry</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-zinc-200">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] mb-2">Project Scope</h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Client & Role Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-[#050505] border border-[#222]">
                <div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Client</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1">{project.client}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Dominion's Role</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1">{project.role}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Production Year</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1">{project.year}</div>
                </div>
              </div>

              {/* Metrics Highlights */}
              <div>
                <h3 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] mb-3">Key Results & Benchmarks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-4 bg-[#050505] border border-[#222]">
                      <div className="text-2xl font-bold text-[#D4AF37] font-serif-heading">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em]">Production Workflow</h3>
              <div className="space-y-3">
                {project.breakdown.map((step, idx) => (
                  <div key={idx} className="p-4 bg-[#050505] border border-[#222] flex gap-4">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#111] border border-[#222] flex items-center justify-center text-[#D4AF37] font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{step.phase}</h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.2em] mb-3">Software & Render Engines</h3>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((sw) => (
                    <span
                      key={sw}
                      className="px-3 py-1.5 bg-[#050505] border border-[#222] text-[#D4AF37] text-[10px] uppercase font-mono font-bold"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-[#050505] border border-[#222] space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 font-serif-heading">
                  <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Technical Standards
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    ACECG / OCIO Color Management pipeline for broadcast consistency.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    Multipass 32-bit Cryptomatte, Depth, Ambient Occlusion, and Direct Diffuse output.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    Strict center-of-mass trajectory keyframe verification in Cascadeur.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#050505] border-t border-[#222] flex items-center justify-between">
          <div className="text-xs text-zinc-400">
            Interested in a similar animation for your brand?
          </div>
          <a
            href="#contact"
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest shadow-lg transition-all"
          >
            Inquire About This Project
          </a>
        </div>
      </div>
    </div>
  );
};
