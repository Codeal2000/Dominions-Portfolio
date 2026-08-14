import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central floating geometric sculpture (Cinematic Gold Polyhedron)
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      emissive: 0x5a4308,
      emissiveIntensity: 0.3,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.92,
    });
    const centralMesh = new THREE.Mesh(icosahedronGeo, goldMaterial);
    mainGroup.add(centralMesh);

    // Wireframe overlay for the central mesh
    const wireframeGeo = new THREE.IcosahedronGeometry(1.93, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    centralMesh.add(wireframeMesh);

    // 2. Orbiting Torus Rings (Gimbal / Kinetic Gyroscope)
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x6e520b,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Particle Starfield / Amber Sparks
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      particleScales[i] = Math.random();
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x111111, 2.5);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 5, 20);
    goldPointLight.position.set(4, 5, 5);
    scene.add(goldPointLight);

    const rimLight = new THREE.PointLight(0xf5f5f5, 2.5, 20);
    rimLight.position.set(-5, -4, -2);
    scene.add(rimLight);

    const warmBottomLight = new THREE.PointLight(0xaa820a, 3, 15);
    warmBottomLight.position.set(0, -5, 3);
    scene.add(warmBottomLight);

    // Mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (event.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Group rotation
      mainGroup.rotation.y = elapsedTime * 0.25 + currentMouseX * 0.6;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + currentMouseY * 0.4;

      // Central mesh internal dynamic spin
      centralMesh.rotation.y = elapsedTime * 0.35;
      centralMesh.rotation.z = Math.cos(elapsedTime * 0.2) * 0.2;

      // Rings spin counter-clockwise & dynamically
      ring1.rotation.z = elapsedTime * 0.4;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.2;

      ring2.rotation.x = elapsedTime * 0.3;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.4) * 0.2;

      // Particles subtle drift
      particles.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.1;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icosahedronGeo.dispose();
      goldMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
