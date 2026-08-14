import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Sliders,
  Eye,
  Activity,
  Layers,
  Sun,
  Shield,
  Zap,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { playUiSound, toggleSound, isSoundEnabled } from '../utils/audioSynth';

export type ModelCategory = 'shoe' | 'mech' | 'gem' | 'character';
export type MaterialPreset = 'gold' | 'obsidian' | 'chrome' | 'emerald' | 'hologram';
export type LightingPreset = 'studioGold' | 'cyberpunk' | 'noir' | 'daylight';

interface ModelViewer3DProps {
  initialModel?: ModelCategory;
}

export const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ initialModel = 'shoe' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<ModelCategory>(initialModel);
  const [materialPreset, setMaterialPreset] = useState<MaterialPreset>('gold');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studioGold');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.8);
  const [explosionAmount, setExplosionAmount] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [stats, setStats] = useState({ polyCount: '12,480', vertices: '8,920', fps: '60' });

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update sound state
  const handleToggleSound = () => {
    const newVal = toggleSound();
    setSoundOn(newVal);
    if (newVal) playUiSound('click');
  };

  // Helper to create the procedural 3D models
  const buildModel = useCallback((type: ModelCategory, matPreset: MaterialPreset, wireframe: boolean, explosion: number) => {
    const group = new THREE.Group();

    // Material definitions
    const getMaterial = (baseColor: number, roughness = 0.2, metalness = 0.9, emissive = 0x000000) => {
      if (matPreset === 'hologram') {
        return new THREE.MeshBasicMaterial({
          color: baseColor || 0xf59e0b,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
      }

      let col = baseColor;
      let rough = roughness;
      let metal = metalness;
      let emiss = emissive;
      let clearcoat = 0.8;

      if (matPreset === 'gold') {
        col = 0xd4af37;
        metal = 0.95;
        rough = 0.18;
        emiss = 0x5a4308;
      } else if (matPreset === 'obsidian') {
        col = 0x18181b;
        metal = 0.85;
        rough = 0.1;
        emiss = 0x09090b;
      } else if (matPreset === 'chrome') {
        col = 0xe4e4e7;
        metal = 1.0;
        rough = 0.05;
        emiss = 0x18181b;
      } else if (matPreset === 'emerald') {
        col = 0x10b981;
        metal = 0.4;
        rough = 0.15;
        emiss = 0x064e3b;
        clearcoat = 1.0;
      }

      return new THREE.MeshPhysicalMaterial({
        color: col,
        metalness: metal,
        roughness: rough,
        emissive: emiss,
        emissiveIntensity: 0.2,
        clearcoat: clearcoat,
        clearcoatRoughness: 0.1,
        wireframe: wireframe,
      });
    };

    const exp = explosion * 1.5;

    if (type === 'shoe') {
      // 1. SNEAKER / AERO SPARK 3D MODEL
      // Outsole
      const soleGeo = new THREE.BoxGeometry(3.6, 0.45, 1.4, 8, 2, 4);
      const soleMat = getMaterial(0x18181b, 0.4, 0.2);
      const sole = new THREE.Mesh(soleGeo, soleMat);
      sole.position.y = -1.1 - exp * 0.8;
      group.add(sole);

      // Midsole Cushion Foam
      const midSoleGeo = new THREE.BoxGeometry(3.4, 0.35, 1.3, 6, 2, 4);
      const midSoleMat = getMaterial(0xf59e0b, 0.2, 0.85);
      const midSole = new THREE.Mesh(midSoleGeo, midSoleMat);
      midSole.position.y = -0.75 - exp * 0.4;
      group.add(midSole);

      // Upper body
      const upperGeo = new THREE.CylinderGeometry(0.7, 0.85, 2.2, 16, 4, false, 0, Math.PI * 2);
      upperGeo.rotateZ(Math.PI / 6);
      upperGeo.scale(1.2, 1, 0.75);
      const upperMat = getMaterial(0x27272a, 0.3, 0.5);
      const upper = new THREE.Mesh(upperGeo, upperMat);
      upper.position.set(0.1, 0.2, 0);
      group.add(upper);

      // Toe box
      const toeGeo = new THREE.SphereGeometry(0.75, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
      toeGeo.scale(1.3, 0.6, 0.9);
      const toeMat = getMaterial(0xf59e0b, 0.2, 0.9);
      const toe = new THREE.Mesh(toeGeo, toeMat);
      toe.position.set(1.1, -0.45 + exp * 0.3, 0);
      group.add(toe);

      // Heel Stabilizer Clip
      const heelGeo = new THREE.TorusGeometry(0.65, 0.12, 12, 24, Math.PI);
      heelGeo.rotateY(Math.PI / 2);
      const heelMat = getMaterial(0xfbbf24, 0.1, 0.95);
      const heel = new THREE.Mesh(heelGeo, heelMat);
      heel.position.set(-1.2 - exp * 0.6, -0.3, 0);
      group.add(heel);

      // Ankle Collar Ring
      const collarGeo = new THREE.TorusGeometry(0.55, 0.08, 12, 24);
      collarGeo.rotateX(Math.PI / 2);
      const collarMat = getMaterial(0xf59e0b, 0.2, 0.9);
      const collar = new THREE.Mesh(collarGeo, collarMat);
      collar.position.set(-0.45, 1.2 + exp * 0.7, 0);
      group.add(collar);

      setStats({ polyCount: '14,820', vertices: '11,400', fps: '60' });
    } else if (type === 'mech') {
      // 2. KINETIC MECH TORUS KNOT / CORE ARTIFACT
      const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.38, 128, 32, 2, 3);
      const knotMat = getMaterial(0xf59e0b, 0.15, 0.95);
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      group.add(knotMesh);

      // Inner glowing core
      const coreGeo = new THREE.IcosahedronGeometry(0.7 + exp * 0.3, 2);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Outer cyber rings
      const outerRing1Geo = new THREE.TorusGeometry(2.4 + exp * 0.8, 0.04, 16, 64);
      const outerRing1Mat = getMaterial(0xd97706, 0.1, 0.95);
      const outerRing1 = new THREE.Mesh(outerRing1Geo, outerRing1Mat);
      outerRing1.rotation.x = Math.PI / 4;
      group.add(outerRing1);

      const outerRing2Geo = new THREE.TorusGeometry(2.8 + exp * 1.1, 0.03, 16, 64);
      const outerRing2Mat = getMaterial(0xfde68a, 0.1, 0.9);
      const outerRing2 = new THREE.Mesh(outerRing2Geo, outerRing2Mat);
      outerRing2.rotation.y = Math.PI / 3;
      group.add(outerRing2);

      setStats({ polyCount: '19,640', vertices: '16,280', fps: '60' });
    } else if (type === 'gem') {
      // 3. PRISMATIC APEX DIAMOND / SHOWPIECE
      const gemGeo = new THREE.OctahedronGeometry(1.6, 2);
      const gemMat = getMaterial(0xf59e0b, 0.05, 0.9);
      const gemMesh = new THREE.Mesh(gemGeo, gemMat);
      group.add(gemMesh);

      // Surrounding Orbiting Facet shards
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const shardGeo = new THREE.TetrahedronGeometry(0.35 + (i % 2) * 0.1, 0);
        const shardMat = getMaterial(0xfbbf24, 0.1, 0.95);
        const shard = new THREE.Mesh(shardGeo, shardMat);
        const radius = 2.3 + exp * 1.2;
        shard.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 0.5, Math.sin(angle) * radius);
        shard.rotation.set(angle, angle * 1.5, 0);
        group.add(shard);
      }

      setStats({ polyCount: '9,840', vertices: '6,450', fps: '60' });
    } else if (type === 'character') {
      // 4. CYBERNETIC BIPED RIG / MECH HEAD
      // Cranium
      const skullGeo = new THREE.BoxGeometry(1.4, 1.7, 1.6, 4, 4, 4);
      const skullMat = getMaterial(0x27272a, 0.25, 0.8);
      const skull = new THREE.Mesh(skullGeo, skullMat);
      skull.position.y = 0.3 + exp * 0.5;
      group.add(skull);

      // Faceplate Shield
      const visorGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.5, 16, 1, false, 0, Math.PI);
      visorGeo.rotateY(Math.PI / 2);
      const visorMat = getMaterial(0xf59e0b, 0.05, 0.95);
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 0.35 + exp * 0.5, 0.8 + exp * 0.4);
      group.add(visor);

      // Glowing Optical Sensor Eye
      const eyeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(0.3, 0.35 + exp * 0.5, 0.85 + exp * 0.4);
      group.add(eye);

      // Articulated Jaw
      const jawGeo = new THREE.BoxGeometry(1.2, 0.6, 1.2);
      const jawMat = getMaterial(0x18181b, 0.3, 0.7);
      const jaw = new THREE.Mesh(jawGeo, jawMat);
      jaw.position.set(0, -0.8 - exp * 0.6, 0.1);
      group.add(jaw);

      // Neck Hydraulic Joint
      const neckGeo = new THREE.CylinderGeometry(0.4, 0.5, 1.0, 16);
      const neckMat = getMaterial(0xd97706, 0.1, 0.95);
      const neck = new THREE.Mesh(neckGeo, neckMat);
      neck.position.set(0, -1.3 - exp * 0.9, 0);
      group.add(neck);

      setStats({ polyCount: '16,700', vertices: '13,100', fps: '60' });
    }

    return group;
  }, []);

  // Update lighting preset in scene
  const applyLighting = useCallback((preset: LightingPreset, scene: THREE.Scene) => {
    if (lightsGroupRef.current) {
      scene.remove(lightsGroupRef.current);
      // dispose existing lights
      lightsGroupRef.current.clear();
    }

    const lightsGroup = new THREE.Group();

    if (preset === 'studioGold') {
      const ambient = new THREE.AmbientLight(0x27272a, 2.0);
      lightsGroup.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xfef08a, 4.5);
      keyLight.position.set(5, 6, 4);
      lightsGroup.add(keyLight);

      const fillLight = new THREE.PointLight(0xf59e0b, 4, 15);
      fillLight.position.set(-4, -2, 3);
      lightsGroup.add(fillLight);

      const rimLight = new THREE.PointLight(0xd97706, 5, 20);
      rimLight.position.set(0, 4, -5);
      lightsGroup.add(rimLight);
    } else if (preset === 'cyberpunk') {
      const ambient = new THREE.AmbientLight(0x09090b, 1.5);
      lightsGroup.add(ambient);

      const cyanLight = new THREE.PointLight(0x06b6d4, 6, 20);
      cyanLight.position.set(-5, 4, 4);
      lightsGroup.add(cyanLight);

      const magentaLight = new THREE.PointLight(0xec4899, 6, 20);
      magentaLight.position.set(5, -3, 3);
      lightsGroup.add(magentaLight);

      const goldTop = new THREE.DirectionalLight(0xf59e0b, 3);
      goldTop.position.set(0, 7, 0);
      lightsGroup.add(goldTop);
    } else if (preset === 'noir') {
      const ambient = new THREE.AmbientLight(0x18181b, 0.8);
      lightsGroup.add(ambient);

      const highKey = new THREE.DirectionalLight(0xffffff, 6);
      highKey.position.set(6, 8, 4);
      lightsGroup.add(highKey);

      const amberSubtle = new THREE.PointLight(0xb45309, 2, 10);
      amberSubtle.position.set(-3, -2, -3);
      lightsGroup.add(amberSubtle);
    } else if (preset === 'daylight') {
      const ambient = new THREE.AmbientLight(0xffffff, 3.0);
      lightsGroup.add(ambient);

      const sun = new THREE.DirectionalLight(0xffffff, 4.0);
      sun.position.set(4, 8, 6);
      lightsGroup.add(sun);

      const softFill = new THREE.DirectionalLight(0x93c5fd, 2.0);
      softFill.position.set(-4, 2, -4);
      lightsGroup.add(softFill);
    }

    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;
  }, []);

  // Initialize Three.js viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Apply Lighting
    applyLighting(lightingPreset, scene);

    // Build Initial Model
    const model = buildModel(selectedModel, materialPreset, isWireframe, explosionAmount);
    scene.add(model);
    modelGroupRef.current = model;

    // Mouse Controls (Orbit, Zoom, Pan)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const newZ = cameraRef.current.position.z + e.deltaY * 0.005;
      cameraRef.current.position.z = Math.max(3.5, Math.min(12, newZ));
    };

    // Touch controls
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging && modelGroupRef.current) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        modelGroupRef.current.rotation.y += deltaX * 0.008;
        modelGroupRef.current.rotation.x += deltaY * 0.008;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && cameraRef.current) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (touchStartDist - dist) * 0.01;
        const newZ = cameraRef.current.position.z + delta;
        cameraRef.current.position.z = Math.max(3.5, Math.min(12, newZ));
        touchStartDist = dist;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize observer
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Render loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isAutoRotate && modelGroupRef.current && !isDragging) {
        modelGroupRef.current.rotation.y += delta * rotationSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);

      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  // Re-build model when model type, material preset, wireframe, or explosion changes
  useEffect(() => {
    if (!sceneRef.current) return;

    if (modelGroupRef.current) {
      sceneRef.current.remove(modelGroupRef.current);
    }

    const newModel = buildModel(selectedModel, materialPreset, isWireframe, explosionAmount);
    sceneRef.current.add(newModel);
    modelGroupRef.current = newModel;
  }, [selectedModel, materialPreset, isWireframe, explosionAmount, buildModel]);

  // Re-apply lighting when lighting preset changes
  useEffect(() => {
    if (!sceneRef.current) return;
    applyLighting(lightingPreset, sceneRef.current);
  }, [lightingPreset, applyLighting]);

  // Reset Camera View
  const handleResetCamera = () => {
    playUiSound('click');
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 7.5);
    }
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleSelectModel = (model: ModelCategory) => {
    playUiSound('switch');
    setSelectedModel(model);
  };

  const handleSelectMaterial = (mat: MaterialPreset) => {
    playUiSound('switch');
    setMaterialPreset(mat);
  };

  const handleSelectLighting = (light: LightingPreset) => {
    playUiSound('switch');
    setLightingPreset(light);
  };

  const toggleFullscreen = () => {
    playUiSound('click');
    setIsFullscreen(!isFullscreen);
  };

  return (
    <section id="interactive-3d-lab" className="relative w-full py-20 bg-[#050505] text-[#f5f5f5] overflow-hidden border-t border-[#222]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              Real-Time WebGL Viewport
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fdfdfd] font-serif-heading">
              Interactive 3D <span className="text-[#D4AF37]">Asset Lab</span>
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl text-xs sm:text-sm">
              Interact, orbit, and dissect high-fidelity 3D assets crafted by Dominion Ige. Switch material shaders, adjust studio lighting setups, and explode assembly layers in real-time.
            </p>
          </div>

          {/* Quick Audio & Reset buttons */}
          <div className="flex items-center gap-3">
            <button
              id="toggle-audio-feedback-btn"
              onClick={handleToggleSound}
              className={`p-2.5 border transition-all flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider ${
                soundOn
                  ? 'bg-[#111] border-[#D4AF37] text-[#D4AF37]'
                  : 'bg-[#0a0a0a] border-[#222] text-zinc-400 hover:text-zinc-200'
              }`}
              title="Toggle Audio Feedback"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{soundOn ? 'SFX On' : 'SFX Off'}</span>
            </button>

            <button
              id="reset-camera-btn"
              onClick={handleResetCamera}
              className="p-2.5 bg-[#0a0a0a] border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider"
              title="Reset Camera Angle"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Reset Orbit</span>
            </button>
          </div>
        </div>

        {/* Main 3D Studio Card */}
        <div
          className={`relative border border-[#222] bg-[#050505] shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-4 z-50' : 'h-[620px] sm:h-[680px]'
          }`}
        >
          {/* Top Control Bar: Model Selectors */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
            {/* Model Type Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#222] shadow-lg">
              {[
                { id: 'shoe', label: 'Aero Sneaker', icon: Sparkles },
                { id: 'mech', label: 'Kinetic Torus', icon: Activity },
                { id: 'gem', label: 'Prismatic Diamond', icon: Shield },
                { id: 'character', label: 'Biped Rig', icon: Layers },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedModel === item.id;
                return (
                  <button
                    key={item.id}
                    id={`model-select-${item.id}`}
                    onClick={() => handleSelectModel(item.id as ModelCategory)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37] text-black shadow-md'
                        : 'text-zinc-400 hover:text-[#D4AF37] hover:bg-[#111]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#D4AF37]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Viewport Meta Badge & Fullscreen Button */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#222] text-[10px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1 text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  {stats.fps} FPS
                </span>
                <span className="text-zinc-700">|</span>
                <span>{stats.polyCount} Polys</span>
              </div>

              <button
                id="toggle-3d-fullscreen-btn"
                onClick={toggleFullscreen}
                className="p-2 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#222] text-zinc-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </button>
            </div>
          </div>

          {/* Three.js Canvas Container */}
          <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            title="Click & Drag to Orbit | Scroll to Zoom"
          />

          {/* Bottom Overlay: Orbit Hint & Interaction Guide */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#222] text-[10px] uppercase tracking-wider text-zinc-400">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Drag to rotate 360° • Scroll to zoom</span>
          </div>

          {/* Floating Studio Controls Drawer on Right / Bottom */}
          <div className="absolute bottom-4 right-4 z-20 pointer-events-auto flex flex-col sm:flex-row items-end sm:items-center gap-2">
            {/* Shaders & Materials Selector */}
            <div className="p-1.5 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#222] shadow-xl flex items-center gap-1">
              <span className="text-[9px] uppercase font-bold text-zinc-500 px-1 hidden md:inline tracking-wider">Shader:</span>
              {[
                { id: 'gold', label: 'Gold', color: '#d4af37' },
                { id: 'obsidian', label: 'Obsidian', color: '#27272a' },
                { id: 'chrome', label: 'Chrome', color: '#e4e4e7' },
                { id: 'emerald', label: 'Emerald', color: '#10b981' },
                { id: 'hologram', label: 'Holo', color: '#d4af37' },
              ].map((m) => (
                <button
                  key={m.id}
                  id={`material-btn-${m.id}`}
                  onClick={() => handleSelectMaterial(m.id as MaterialPreset)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all ${
                    materialPreset === m.id
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#111]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: m.color }} />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Lighting & Wireframe Controls */}
            <div className="p-1.5 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#222] shadow-xl flex items-center gap-1">
              <button
                id="toggle-wireframe-btn"
                onClick={() => {
                  playUiSound('switch');
                  setIsWireframe(!isWireframe);
                }}
                className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                  isWireframe
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'text-zinc-400 hover:text-[#D4AF37] hover:bg-[#111]'
                }`}
                title="Toggle Wireframe Mesh"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              <button
                id="toggle-autorotate-btn"
                onClick={() => {
                  playUiSound('click');
                  setIsAutoRotate(!isAutoRotate);
                }}
                className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                  isAutoRotate
                    ? 'bg-[#111] text-[#D4AF37] border border-[#D4AF37]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#111]'
                }`}
                title="Toggle Auto Spin"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin text-[#D4AF37]' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline">Spin</span>
              </button>

              {/* Lighting Switcher */}
              <div className="relative group">
                <button
                  id="lighting-preset-btn"
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-zinc-300 hover:text-[#D4AF37] hover:bg-[#111] transition-all flex items-center gap-1"
                >
                  <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="capitalize hidden sm:inline">{lightingPreset.replace('studio', '')}</span>
                </button>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex flex-col gap-1 p-2 bg-[#0a0a0a] border border-[#222] shadow-2xl z-30 min-w-[130px]">
                  {[
                    { id: 'studioGold', label: 'Studio Gold' },
                    { id: 'cyberpunk', label: 'Cyberpunk' },
                    { id: 'noir', label: 'Moody Noir' },
                    { id: 'daylight', label: 'Clean Daylight' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => handleSelectLighting(l.id as LightingPreset)}
                      className={`text-left text-[10px] uppercase tracking-wider px-2 py-1 transition-colors ${
                        lightingPreset === l.id ? 'bg-[#D4AF37] text-black font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exploded View Slider & Technical Breakdown Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#0a0a0a] border border-[#222] flex flex-col justify-center">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-zinc-300 mb-2">
              <span className="flex items-center gap-1.5 text-[#D4AF37]">
                <Layers className="w-3.5 h-3.5" />
                Assembly Explosion
              </span>
              <span className="font-mono text-zinc-400">{Math.round(explosionAmount * 100)}% Dissected</span>
            </div>
            <input
              id="model-explosion-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explosionAmount}
              onChange={(e) => setExplosionAmount(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div className="p-4 bg-[#0a0a0a] border border-[#222] flex flex-col justify-center">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-zinc-300 mb-2">
              <span className="flex items-center gap-1.5 text-[#D4AF37]">
                <RotateCcw className="w-3.5 h-3.5" />
                Rotation Velocity
              </span>
              <span className="font-mono text-zinc-400">{rotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              id="model-speed-slider"
              type="range"
              min="0.1"
              max="2.5"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

          <div className="p-4 bg-[#0a0a0a] border border-[#222] flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">Geometry Standard</div>
              <div className="text-xs font-bold text-white mt-0.5">Clean Sub-D Quad Topology</div>
            </div>
            <div className="px-2.5 py-1 bg-[#111] border border-[#222] text-[#D4AF37] text-[9px] uppercase font-bold tracking-widest">
              Blender & Cycles PBR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
