import { Project, SkillItem, Testimonial } from '../types';

export const ARTIST_INFO = {
  name: 'DOMINION IGE',
  formalName: 'IGE DOMINION',
  title: '3D Animator & Visual Artist',
  tagline: 'Crafting Cinematic Product Animations & Character Motion',
  bio: 'Specializing in high-octane 3D product commercial animations, physics-grounded character motion in Cascadeur & Blender, and photorealistic lighting & VFX. Transforming brand concepts into visceral, hyper-polished visual experiences that captivate audiences.',
  email: 'igedominion09@gmail.com',
  location: 'Worldwide / Remote Studio',
  yearsExperience: '4+ Years',
  status: 'Open for Freelance & Studio Contracts',
  showreelDuration: '01:45',
  stats: [
    { label: 'Commercial Projects', value: '35+' },
    { label: 'Keyframe Animations', value: '450+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Average Render Res', value: '4K UHD' },
  ],
  socials: [
    { name: 'Email', url: 'mailto:igedominion09@gmail.com', icon: 'Mail' },
    { name: 'ArtStation', url: 'https://artstation.com', icon: 'Palette' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'buddy-green-spark',
    title: 'Buddy Green Spark Initiative',
    client: 'Buddy Green Eco Footwear',
    category: '3D Product Animation / Footwear',
    year: '2025',
    tagline: 'Futuristic Eco-Footwear Deconstruction & Energy Spark Sequence',
    description: 'A cinematic 3D commercial sequence showcasing the sustainable engineering of Buddy Green performance footwear. Features explosive layered deconstruction of the sole unit, procedural bioluminescent spark particle simulations, and dynamic camera choreography.',
    image: '/src/assets/images/shoe_animation_still_1786701546110.jpg',
    duration: '0:35 Commercial',
    software: ['Blender 4.2', 'Cycles X', 'Substance 3D Painter', 'Adobe After Effects'],
    role: 'Lead 3D Artist, Modeling, Texturing, Animation & Compositing',
    modelType: 'shoe',
    breakdown: [
      {
        phase: '1. CAD Reconstruction & Retopology',
        description: 'Transformed raw footwear design blueprints into quad-optimized sub-d meshes with high-density micro-creasing on synthetic fabrics and tread grooves.'
      },
      {
        phase: '2. Procedural PBR Shading',
        description: 'Developed custom recycled TPU polymer shaders with realistic subsurface scattering and micro-fiber weave displacement in Substance Painter.'
      },
      {
        phase: '3. Layer Explosion & Kinetic Animation',
        description: 'Choreographed a 60fps mechanical explosion sequence dissecting the carbon fiber shank, nitrogen-infused foam core, and kinetic spark emission.'
      },
      {
        phase: '4. Octane/Cycles Lighting & Color Grade',
        description: 'Dramatic three-point studio lighting with high-contrast gold rim lights and anamorphic lens flares composited in After Effects.'
      }
    ],
    metrics: [
      { label: 'View Count', value: '180K+' },
      { label: 'Render Time', value: '42 hrs @ 4K' },
      { label: 'Sim Particles', value: '2.5M Sparks' }
    ]
  },
  {
    id: 'valued-tasty-foods',
    title: 'Valued Tasty Foods',
    client: 'Valued Tasty Foods Corp.',
    category: '3D Commercial / Fluid & Food Simulation',
    year: '2025',
    tagline: 'High-Impact Flavor Explosion & Fluid Macro Visualization',
    description: 'An appetizing 3D product commercial featuring viscous golden honey ribbons, floating fresh organic ingredients colliding in ultra-slow motion, and macro condensation droplets on packaging.',
    image: '/src/assets/images/food_product_still_1786701556328.jpg',
    duration: '0:45 Spot',
    software: ['Blender', 'FLIP Fluids', 'Substance Painter', 'Adobe After Effects', 'DaVinci Resolve'],
    role: 'Fluid Simulation, Shading, Lighting & Commercial Direction',
    modelType: 'gem',
    breakdown: [
      {
        phase: '1. Fluid Viscosity & Inflow Simulation',
        description: 'Configured FLIP Fluids solver for non-Newtonian golden syrup viscosity with surface tension micro-bubbles and realistic splashing physics.'
      },
      {
        phase: '2. Organic Food Asset Sculpting',
        description: 'Sculpted dynamic food cross-sections and procedural moisture droplets adhering to packaging surfaces using Geometry Nodes.'
      },
      {
        phase: '3. High-Speed Macro Camera Pacing',
        description: 'Simulated 1,000 FPS Phantom Flex camera velocity curves with optical motion blur and shallow depth of field.'
      },
      {
        phase: '4. Commercial Compositing',
        description: 'Added volumetric light rays, chromatic aberration passes, and color balance enhancing appetite appeal.'
      }
    ],
    metrics: [
      { label: 'Fluid Mesh Density', value: '14M Polys' },
      { label: 'Conversion Lift', value: '+34%' },
      { label: 'Resolution', value: '3840x2160 UHD' }
    ]
  },
  {
    id: 'owlup-motion',
    title: 'OwlUp Tech Identity',
    client: 'OwlUp Digital & Hardware',
    category: '3D Motion Design / Mech Character',
    year: '2024',
    tagline: 'Futuristic Cybernetic Mech Owl Kinetic Brand Reveal',
    description: 'An intricate hard-surface mech character animation depicting an autonomous robotic owl taking flight. Demonstrates multi-segmented carbon-fiber feather articulation, glowing amber optical sensors, and sleek brand reveal sequences.',
    image: '/src/assets/images/owlup_motion_still_1786701566178.jpg',
    duration: '0:30 Stinger',
    software: ['Blender 4.1', 'Eevee Next', 'Cinema 4D', 'After Effects'],
    role: 'Hard Surface Modeling, Rigging, Mech Motion Design',
    modelType: 'mech',
    breakdown: [
      {
        phase: '1. Modular Hard-Surface Topology',
        description: 'Crafted over 120 interlocking mechanical plates with robotic bevels, screw recesses, and hydraulic piston linkages.'
      },
      {
        phase: '2. Kinematic Feather Rigging',
        description: 'Built a custom bone hierarchy driving individual feather angles based on wing flapping velocity and rotational inertia.'
      },
      {
        phase: '3. Dynamic Optical UI Animation',
        description: 'Designed animated holographic lens reticles and eye aperture dilations synced with synthetic sound design.'
      }
    ],
    metrics: [
      { label: 'Rig Bones', value: '148 Joints' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Brand Recall', value: '98%' }
    ]
  },
  {
    id: 'yappi-animation',
    title: 'YAPPI Character Sequence',
    client: 'Youth Animation & Pixels Project',
    category: 'Character Animation & Physics Rigging',
    year: '2024',
    tagline: 'Acrobatic Action Motion with Cascadeur Physics Balancing',
    description: 'High-octane character parkour choreography utilizing Cascadeur auto-physics, center-of-mass trajectory tracking, and expressive secondary muscle and clothing simulation.',
    image: '/src/assets/images/character_rig_still_1786701578188.jpg',
    duration: '0:50 Sequence',
    software: ['Cascadeur', 'Blender', 'Mixamo', 'After Effects'],
    role: 'Character Animator & Physics Technical Director',
    modelType: 'character',
    breakdown: [
      {
        phase: '1. Center of Mass & Physics Posing',
        description: 'Employed Cascadeur physics engine to calculate realistic inertia, ground impact weight distribution, and mid-air rotational momentum.'
      },
      {
        phase: '2. Secondary Cloth & Hair Dynamics',
        description: 'Simulated high-velocity fabric drag and realistic recoil upon landing on concrete surfaces.'
      },
      {
        phase: '3. Facial Rigging & Performance',
        description: 'Implemented 52 ARKit blendshapes for micro-expressions reflecting physical exertion and determination.'
      }
    ],
    metrics: [
      { label: 'Keyframes Polished', value: '1,200+' },
      { label: 'Physics Passes', value: '100% physically accurate' },
      { label: 'Accolades', value: 'YAPPI Showcase Winner' }
    ]
  },
  {
    id: 'jabbok-media-commercials',
    title: 'Jabbok Media Broadcast Stingers',
    client: 'Jabbok Media Group',
    category: '3D Broadcast Motion & Visual Identity',
    year: '2024',
    tagline: 'Gold-Plated 3D Typography & Liquid Metal Kinetic Choreography',
    description: 'Sleek luxury broadcast bumpers and title sequences featuring molten gold fluid interactions, refractive crystal prism structures, and punchy motion typography.',
    image: '/src/assets/images/owlup_motion_still_1786701566178.jpg',
    duration: '0:20 IDs',
    software: ['Blender', 'After Effects', 'Cycles', 'Premiere Pro'],
    role: 'Motion Graphics Designer & Lighting Artist',
    modelType: 'mech',
    breakdown: [
      {
        phase: '1. 3D Kinetic Typography',
        description: 'Extruded custom typography with champfered gold edging, brushed anisotropic reflections, and rhythmic entrance cuts.'
      },
      {
        phase: '2. Caustics & Reflection Passes',
        description: 'Computed GPU-accelerated caustics and volumetric golden atmospheric dust.'
      }
    ],
    metrics: [
      { label: 'Broadcast Reach', value: '500K+ Viewers' },
      { label: 'Delivery Formats', value: '16:9 & 9:16 Vertical' }
    ]
  }
];

export const SKILLS: SkillItem[] = [
  {
    name: 'Blender 3D (Cycles & Eevee)',
    category: 'Software',
    level: 95,
    experience: '4+ Years',
    iconName: 'Box',
    description: 'Expertise across full production pipeline: Sub-D hard surface modeling, procedural Geometry Nodes, shader graphs, and photorealistic GPU rendering.',
    tags: ['Modeling', 'Geometry Nodes', 'Cycles X', 'Eevee', 'UV Unwrapping']
  },
  {
    name: 'Cascadeur',
    category: 'Software',
    level: 90,
    experience: '3+ Years',
    iconName: 'Activity',
    description: 'Physics-based character animation, center-of-mass trajectory balance, ballistic flight curves, and keyframe motion enhancement.',
    tags: ['Physics Motion', 'AutoPosing', 'Action Choreography', 'Fulcrum Points']
  },
  {
    name: 'Adobe After Effects',
    category: 'Software',
    level: 92,
    experience: '4+ Years',
    iconName: 'Film',
    description: 'Multipass EXR compositing, optical flares, glow dynamics, 3D camera tracking, sound sync, and broadcast color correction.',
    tags: ['Compositing', 'VFX', 'Multipass EXR', 'Color Grading', 'Motion Graphics']
  },
  {
    name: '3D Rigging & Kinematics',
    category: 'Core Discipline',
    level: 88,
    experience: '3+ Years',
    iconName: 'Cpu',
    description: 'Custom FK/IK switchable skeletal systems, mechanical constraint hierarchies, driver networks, and facial morph blendshapes.',
    tags: ['IK/FK Switch', 'Bone Constraints', 'Weight Painting', 'Facial Blendshapes']
  },
  {
    name: 'Lighting, Shading & PBR Materials',
    category: 'Core Discipline',
    level: 94,
    experience: '4+ Years',
    iconName: 'SunMedium',
    description: 'Cinematic studio 3-point setups, HDRI environment balancing, ray-traced subsurface scattering, and anisotropic metal shaders.',
    tags: ['PBR Shading', 'Subsurface Scattering', 'Studio Lighting', 'Volumetrics']
  },
  {
    name: 'Substance 3D Painter',
    category: 'Software',
    level: 86,
    experience: '3+ Years',
    iconName: 'Sparkles',
    description: 'Baking 8K high-to-low poly normal maps, procedural edge-wear masks, fabric micro-details, and realistic weathering.',
    tags: ['Texture Baking', 'Smart Materials', 'Roughness Maps', 'PBR Workflows']
  },
  {
    name: 'Fluid & Particle Dynamics',
    category: 'Rendering & VFX',
    level: 85,
    experience: '2+ Years',
    iconName: 'Flame',
    description: 'Viscous liquid simulations, explosive particle sparks, smoke dissipation, and aerodynamic cloth physics.',
    tags: ['FLIP Fluids', 'Particle Emitters', 'Cloth Sim', 'Micro Splashes']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'Creative Director',
    company: 'Buddy Green Labs',
    content: 'Dominion turned our product blueprints into an absolute cinematic masterpiece. The deconstructed shoe explosion animation doubled our pre-order engagement rate within 48 hours.',
  },
  {
    id: '2',
    name: 'Amara Okafor',
    role: 'Head of Marketing',
    company: 'Valued Tasty Foods',
    content: 'The liquid honey physics and lighting Dominion rendered for our 3D commercial are mouth-watering. Exceptional communication and lightning-fast turnaround!',
  },
  {
    id: '3',
    name: 'Devon Reed',
    role: 'Founder & CEO',
    company: 'OwlUp Digital',
    content: 'Dominion has an innate sense of weight, momentum, and cinematic pacing. The mech character animation blew our entire team away.',
  }
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Concept & Creative Brief',
    description: 'Reviewing reference boards, camera angles, pacing, and mood boards to establish a clear cinematic vision.',
    icon: 'Compass'
  },
  {
    step: '02',
    title: '3D Asset Prep & Rigging',
    description: 'High-detail modeling or CAD cleanup, topology optimization, and custom bone/constraint rigging.',
    icon: 'Layers'
  },
  {
    step: '03',
    title: 'Keyframing & Physics Motion',
    description: 'Crafting fluid motion curves, physics-grounded weight in Cascadeur, and dynamic camera choreography.',
    icon: 'Video'
  },
  {
    step: '04',
    title: 'PBR Shading & Cinematic Lighting',
    description: 'Assigning photorealistic materials, subsurface scattering, volumetric dust, and studio rim lighting.',
    icon: 'Sun'
  },
  {
    step: '05',
    title: '4K Render & VFX Compositing',
    description: 'Multipass rendering, motion blur, optical depth, color grading, and final delivery in requested formats.',
    icon: 'CheckCircle'
  }
];
