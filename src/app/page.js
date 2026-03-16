"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION & DATA ---

// 1. Image Paths
const profileImage = "/dhruv-photo.jpg"; // Your photo
const backgroundImage = "/background_v.jpeg"; // Your landing page background
// Add your real links here!
const socialLinks = {
  github: "https://github.com/KernelKnight33",
  linkedin: "https://www.linkedin.com/in/dhruv-gowda-822343383/",
  x: "https://x.com/Knight_deity33",
  email: "mailto:kernelknight@proton.me" // The 'mailto:' makes it open their email app automatically
};
const aboutContent = (
  <>
    
    Hi I’m <span className="text-[#ffd700] font-bold">Dhruv</span>, a second-year Electrical Engineering student at VJTI Mumbai and an active member of the <span className="text-[#6a99ff] font-medium">VJTI Robotics Club (SRA)</span>. 
    <br /><br />
    I work on designing and building robots, with strong interests in <span className="text-[#ffd700]">robotics</span>, <span className="text-[#ffd700]">soft robotics</span>, <span className="text-[#ffd700]">embedded systems</span>, and <span className="text-[#ffd700]">compiler architecture</span>. 
    <br /><br />
    Beyond academics, I’m an anime <span className="text-[#ffd700]">Otaku</span>, a serious <span className="text-[#ffd700]">foodie</span>, and a <span className="text-[#ffd700]">car</span> enthusiast — interests that keep me curious, creative, and balanced.
    <br /><br />
    If you’re passionate about building, learning, and pushing technical boundaries, feel free to connect.
  </>
);
  

const essays = [
  {
    id: 1,
    title: "Building a Compiler (LLVM)",
    date: "2025.11",
    excerpt: "Notes on the LLVM 'My First Language Frontend' tutorial...",
    content: "Exploring the fundamental architecture of compilers by building a custom language frontend using LLVM. This covers abstract syntax tree (AST) transformations, lexing, parsing, and intermediate representation (IR) optimizations."
  },
  {
    id: 2,
    title: "Soft Robotics & Molding",
    date: "2026.02",
    excerpt: "Designing fins and creating molds in Onshape...",
    content: "Documenting the process of designing a soft gripper for the SO-100 arm. This includes 3D modeling the molds in Onshape and working with materials like Ecoflex to create compliant mechanisms."
  }
];

const artPieces = [
  {
    id: 1,
    title: "Knight Auras",
    date: "2025.11",
    description: "Dark blue and black aura knight designs.",
    imageUrl: "https://placehold.co/800x600/0a0a0a/e5e5e5?text=Knight+Aura"
  },
  {
    id: 2,
    title: "Konkan Travel Log",
    date: "2025.11",
    description: "Photography from the 5-day bike trip along the Konkan coast.",
    imageUrl: "https://placehold.co/800x600/0a0a0a/e5e5e5?text=Konkan+Coast"
  }
];

const projects = [
  {
    id: 1,
    title: "RC Ornithopter",
    date: "09.2025",
    description: "Eklavya project to make an mechanical bird from scratch.",
    link: "https://github.com/MAX090706/RC-ORNITHOPTER"
  },
  
  {
    id: 2,
    title: "SO-100 Soft Gripper",
    date: "02.2026",
    description: "Designed a molded soft gripper end-effector for a so100 robotic arm using EcoFlex100.",
    link: "#"
  },
  {
    id: 4,
    title: "Autonomous Wall-E Bot ",
    date: "10.2026",
    description: "Automated Wall-E Bot for maze solving .",
    link: "#"
  }
];

const animeManga = [
  {
    id: 1,
    title: "Neon Genesis Evangelion",
    type: "Anime",
    review: "A deconstruction of the mecha genre exploring trauma, identity, and human connection through apocalyptic symbolism."
  },
  {
    id: 2,
    title: "Berserk",
    type: "Manga",
    review: "Dark fantasy epic examining the human spirit's resilience against cosmic horror, fate, and the price of ambition."
  },
  {
    id: 3,
    title: "Vagabond",
    type: "Manga",
    review: "Philosophical journey of self-mastery and enlightenment through the lens of Musashi Miyamoto's legendary swordsmanship."
  }
];

// --- MAIN COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [hoveredOrbit, setHoveredOrbit] = useState(null);
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  
  const eyeRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. Animated Starfield Logic (Only runs on content pages)
  useEffect(() => {
    // If we are on the landing page, don't run the canvas code
    if (currentPage === "landing" || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const stars = [];
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 0.6 + 0.2, opacity: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.005, twinklePhase: Math.random() * Math.PI * 2, layer: 'distant'
      });
    }
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 0.9 + 0.6, opacity: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.005, twinklePhase: Math.random() * Math.PI * 2, layer: 'mid'
      });
    }
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 1, opacity: Math.random() * 0.3 + 0.6,
        twinkleSpeed: Math.random() * 0.02 + 0.01, twinklePhase: Math.random() * Math.PI * 2, layer: 'bright'
      });
    }
    
    const drawNebulae = () => {
      const gradient1 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.2, 0, canvas.width * 0.8, canvas.height * 0.2, Math.max(canvas.width, canvas.height) * 0.5);
      gradient1.addColorStop(0, 'rgba(65, 105, 225, 0.10)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const gradient2 = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.8, 0, canvas.width * 0.2, canvas.height * 0.8, Math.max(canvas.width, canvas.height) * 0.4);
      gradient2.addColorStop(0, 'rgba(255, 69, 0, 0.05)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebulae();
      stars.forEach(star => {
        let currentOpacity = star.opacity;
        if (star.twinkleSpeed > 0) {
          star.twinklePhase += star.twinkleSpeed;
          currentOpacity = star.opacity + Math.sin(star.twinklePhase) * 0.15;
          currentOpacity = Math.max(0.05, Math.min(1.0, currentOpacity));
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPage]); // Re-runs when the page changes
  
  // 2. Inject CSS Styles
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
    
    const style = document.createElement('style');
    style.textContent = `
      body { font-family: 'Space Mono', monospace; background-color: #0a0a0a; }
      .serif-heading { font-family: 'Cormorant Garamond', serif; }
      
      @keyframes rotateOrbit1 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      @keyframes rotateOrbit2 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      @keyframes rotateOrbit3 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      @keyframes rotateOrbit4 { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      
      @keyframes counterRotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(-360deg); }
      }
      
      .orbit-1 { animation: rotateOrbit1 25s linear infinite; }
      .orbit-2 { animation: rotateOrbit2 40s linear infinite; }
      .orbit-3 { animation: rotateOrbit3 55s linear infinite; }
      .orbit-4 { animation: rotateOrbit4 75s linear infinite; }
      
      .counter-rotate-1 { animation: counterRotate 25s linear infinite; }
      .counter-rotate-2 { animation: counterRotate 40s linear infinite; }
      .counter-rotate-3 { animation: counterRotate 55s linear infinite; }
      .counter-rotate-4 { animation: counterRotate 75s linear infinite; }
      
      .paused { animation-play-state: paused !important; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  
  // 3. Eye Tracking Logic
  useEffect(() => {
    const eye = eyeRef.current;
    if (!eye || currentPage !== "landing") return;
    
    const handleMouseMove = (e) => {
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const maxDistance = rect.width / 2.5;
      let moveX = dx;
      let moveY = dy;
      
      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx);
        moveX = Math.cos(angle) * maxDistance;
        moveY = Math.sin(angle) * maxDistance;
      }
      setPupilPosition({ x: moveX * 0.1, y: moveY * 0.1 });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentPage]);
  
  // 4. Navigation Handlers
  const navigateTo = useCallback((page) => {
    if (page === "writing") setSelectedEssay(null);
    else if (page === "art") setSelectedArtPiece(null);
    setCurrentPage(page);
  }, []);
  
  const viewEssay = useCallback((essay) => { setSelectedEssay(essay); setCurrentPage("essay-detail"); }, []);
  const viewArtPiece = useCallback((piece) => { setSelectedArtPiece(piece); setCurrentPage("art-detail"); }, []);
  
  const goBack = useCallback(() => {
    if (currentPage === "essay-detail") setCurrentPage("writing");
    else if (currentPage === "art-detail") setCurrentPage("art");
    else setCurrentPage("landing");
  }, [currentPage]);
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };
  
  // 5. Orbits Array
  const orbits = [
    { id: "anime", diameterVmin: 40, planetSize: 20, label: "ANIME & MANGA", page: "anime", className: "orbit-1", counterClass: "counter-rotate-1", color: "#a0a0a0" },
    { id: "writing", diameterVmin: 60, planetSize: 32, label: "WRITING", page: "writing", className: "orbit-2", counterClass: "counter-rotate-2", color: "#ffd700" },
    { id: "art", diameterVmin: 80, planetSize: 40, label: "ARTS & COOKING", page: "art", className: "orbit-3", counterClass: "counter-rotate-3", color: "#6a99ff" },
    { id: "projects", diameterVmin: 100, planetSize: 48, label: "PROJECTS", page: "projects", className: "orbit-4", counterClass: "counter-rotate-4", color: "#ff7f50" }
  ];
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono selection:bg-[#ffd700] selection:text-[#0a0a0a] relative overflow-hidden">
      
      {/* --- CONDITIONAL BACKGROUNDS --- */}
      {/* Show the image ONLY on the landing page */}
      {currentPage === "landing" && (
        <>
          <div 
            className="fixed inset-0 z-0" 
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="fixed inset-0 bg-[#0a0a0a]/50 z-0" />
        </>
      )}

      {/* Show the animated space background ONLY on content pages */}
      {currentPage !== "landing" && (
        <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-[#0a0a0a]" aria-hidden="true" />
      )}
      
      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <motion.div 
            key="landing" 
            variants={pageVariants} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            className="fixed inset-0 flex items-center justify-center overflow-hidden z-10"
          >
            <div className="relative w-full h-full">
              
              {/* ORBITS RENDER LOOP */}
              {[...orbits].reverse().map((orbit, originalIndex) => {
                const index = orbits.length - 1 - originalIndex;
                const baseZIndex = 30 + (orbits.length - index) * 5;
                const currentZIndex = hoveredOrbit === orbit.id ? 100 : baseZIndex;
                
                return (
                  <div
                    key={orbit.id}
                    className={`absolute top-1/2 left-1/2 rounded-full ${orbit.className} ${hoveredOrbit === orbit.id ? 'paused' : ''}`}
                    style={{
                      width: `${orbit.diameterVmin}vmin`,
                      height: `${orbit.diameterVmin}vmin`,
                      boxSizing: 'content-box',
                      zIndex: currentZIndex,
                      pointerEvents: 'none' // The empty ring itself doesn't block mouse clicks
                    }}
                  >
                    {/* PLANET WRAPPER */}
                    <div
                      className={`absolute top-0 left-1/2 ${orbit.counterClass}`}
                      style={{
                        pointerEvents: 'auto', // The planet itself receives clicks
                        zIndex: currentZIndex + 1
                      }}
                      onMouseEnter={() => setHoveredOrbit(orbit.id)}
                      onMouseLeave={() => setHoveredOrbit(null)}
                      onClick={() => navigateTo(orbit.page)}
                    >
                      {/* The colored planet dot */}
                      <div
                        className="rounded-full cursor-pointer"
                        style={{
                          width: `${orbit.planetSize}px`,
                          height: `${orbit.planetSize}px`,
                          backgroundColor: orbit.color,
                          boxShadow: `0 0 12px ${orbit.color}, 0 0 24px ${orbit.color}80`,
                          border: `2px solid ${orbit.color}cc`
                        }}
                      />
                      
                      {/* Hover Label */}
                      {hoveredOrbit === orbit.id && (
                        <div 
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap text-[10px] md:text-xs font-bold px-2.5 py-1 rounded"
                          style={{
                            backgroundColor: "rgba(10, 10, 10, 0.95)",
                            color: orbit.color,
                            border: `1px solid ${orbit.color}80`,
                            backdropFilter: "blur(2px)",
                            zIndex: currentZIndex + 2
                          }}
                        >
                          {orbit.label}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* CENTRAL EYE */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-[200]" 
                onMouseEnter={() => setIsEyeHovered(true)} 
                onMouseLeave={() => setIsEyeHovered(false)}
              >
                {/* Changed sizes to w-32 h-32 as requested previously! */}
                <div ref={eyeRef} className="relative w-32 h-32 cursor-pointer" onClick={() => navigateTo("about")}>
                  <div className={`absolute inset-0 bg-[#e5e5e5] rounded-full border-[1.5px] transition-all duration-300 ${isEyeHovered ? 'border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.4)]' : 'border-[#ffd700]'}`}></div>
                  <div className="absolute inset-2 bg-[#1a1a1a] rounded-full border-[1.5px] border-[#ffd700] flex items-center justify-center">
                    {/* Changed pupil size to w-4 h-4 to match the smaller eye */}
                    <motion.div className="w-4 h-4 bg-black rounded-full border-[1.5px] border-[#ffd700]" animate={{ x: pupilPosition.x, y: pupilPosition.y }} transition={{ type: "spring", damping: 15 }} />
                  </div>
                </div>
                <motion.div 
                  className={`mt-4 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 ${isEyeHovered ? 'text-[#ffd700] opacity-100 translate-y-0' : 'text-[#e5e5e5] opacity-30 translate-y-1'}`}
                  initial={{ opacity: 0.3, y: 4 }}
                  animate={{ opacity: isEyeHovered ? 1 : 0.3, y: isEyeHovered ? 0 : 4, color: isEyeHovered ? '#ffd700' : '#e5e5e5' }}
                >
                  PROFILE
                </motion.div>
              </div>
              
            </div>
            
            {/* QUOTE - Bottom Right */}
            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 text-right serif-heading text-lg md:text-2xl opacity-100 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] max-w-xl leading-relaxed z-50 pointer-events-none">
              "karmaṇy-evādhikāras te mā phaleṣhu kadāchana<br />
              mā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi"
              <div className="mt-2 text-base md:text-lg text-white opacity-80">— Shree Krishna</div>
            </div>
            
          </motion.div>
        )}
        
        {/* --- PAGE: ABOUT --- */}
        {currentPage === "about" && (
          <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>About</motion.h1>
              
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="w-full md:w-1/3">
                  <div className="relative rounded-lg overflow-hidden border border-[#2a2a2a] group">
                    <img src={profileImage} alt="Profile" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-[#ffd700] mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full md:w-2/3 serif-heading text-base md:text-xl leading-relaxed text-[#cfcfcf]">
                  <p>{aboutContent}</p>
                  {/* NEW SOCIALS & CONTACT BLOCK */}
                 <div className="mt-10 pt-8 border-t border-[#2a2a2a]">
                 <h3 className="text-[#ffd700] font-mono text-sm tracking-[0.2em] uppercase mb-5 opacity-80">Connect / Contact</h3>
  
                 <div className="flex flex-wrap gap-6 font-mono text-sm md:text-base">
                 {/* Email */}
                 <a href={socialLinks.email} className="group flex items-center text-[#cfcfcf] hover:text-[#ffd700] transition-colors">
                 <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">✉</span> 
                   Email
                 </a>
    
                  {/* GitHub */}
                 <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="group flex items-center text-[#cfcfcf] hover:text-[#ffd700] transition-colors">
                  <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">⌨</span> 
                  GitHub
                  </a>
    
                 {/* LinkedIn */}
                 <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center text-[#cfcfcf] hover:text-[#ffd700] transition-colors">
                  <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity"></span> 
                  LinkedIn
                  </a>
    
                 {/* X (Twitter) */}
                 <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="group flex items-center text-[#cfcfcf] hover:text-[#ffd700] transition-colors">
                  <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">𝕏</span> 
                  X
                  </a>
                </div>
  
                 <div className="mt-8 font-mono text-xs text-[#8f8f8f] opacity-60">
                  Based in Mumbai • SRA VJTI Robotics
                </div>
                </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PAGE: WRITING --- */}
        {currentPage === "writing" && (
          <motion.div key="writing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Writing</motion.h1>
              <div className="space-y-7">
                {essays.map((essay, index) => (
                  <motion.div key={essay.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.08 }} className="border-b border-[#2a2a2a] pb-5 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <motion.button onClick={() => viewEssay(essay)} whileHover={{ x: 5 }} whileTap={{ scale: 0.99 }} className="text-lg md:text-xl font-medium hover:text-[#ffd700] transition-colors block text-left">{essay.title}</motion.button>
                      <span className="text-[#8f8f8f] mt-1 sm:mt-0 font-mono text-xs md:text-sm">{essay.date}</span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm md:text-base">{essay.excerpt}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PAGE: ESSAY DETAIL --- */}
        {currentPage === "essay-detail" && selectedEssay && (
          <motion.div key={`essay-${selectedEssay.id}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{selectedEssay.title}</motion.h1>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#8f8f8f] block mb-8 font-mono text-xs md:text-sm">{selectedEssay.date}</motion.span>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="serif-heading text-base md:text-lg leading-relaxed text-[#cfcfcf] max-w-prose">
                <p>{selectedEssay.content}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* --- PAGE: ANIME & MANGA --- */}
        {currentPage === "anime" && (
          <motion.div key="anime" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Anime & Manga</motion.h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animeManga.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.08 }} className="border border-[#2a2a2a] rounded-lg p-5 hover:border-[#a0a0a0] transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg md:text-xl font-bold serif-heading">{item.title}</h3>
                      <span className="text-[#a0a0a0] text-xs font-mono px-2 py-1 bg-[#1a1a1a]/50 rounded">{item.type}</span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.review}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PAGE: ARTS & COOKING --- */}
        {currentPage === "art" && (
          <motion.div key="art" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Arts & Cooking</motion.h1>
              <div className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold mb-5 serif-heading">Art</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {artPieces.map((piece, index) => (
                    <motion.div key={piece.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.08 }} className="border border-[#2a2a2a] rounded-lg overflow-hidden">
                      <motion.button onClick={() => viewArtPiece(piece)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <div className="aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center"><img src={piece.imageUrl} alt={piece.title} className="w-full h-full object-cover" /></div>
                        <div className="p-3 md:p-4 text-left border-t border-[#2a2a2a]">
                          <div className="flex justify-between"><h3 className="text-base md:text-lg font-medium">{piece.title}</h3><span className="text-[#8f8f8f] font-mono text-xs md:text-sm">{piece.date}</span></div>
                          <p className="text-[#a0a0a0] mt-1 text-xs md:text-sm">{piece.description}</p>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-5 serif-heading">Cooking</h2>
                <div className="space-y-6">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="border-b border-[#2a2a2a] pb-5 last:border-b-0">
                    <p className="text-[#a0a0a0] text-sm md:text-base italic">Documentation of culinary experiments and recipe development coming soon.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PAGE: PROJECTS --- */}
        {currentPage === "projects" && (
          <motion.div key="projects" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Projects</motion.h1>
              <div className="space-y-7">
                {projects.map((project, index) => (
                  <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.08 }} className="border-b border-[#2a2a2a] pb-5 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="group block">
                        <div className="flex items-center"><h3 className="text-lg md:text-xl font-medium group-hover:text-[#ff7f50] transition-colors">{project.title}</h3><span className="ml-2 text-[#ff7f50] opacity-0 group-hover:opacity-100 transition-opacity">↗</span></div>
                      </a>
                      <span className="text-[#8f8f8f] mt-1 sm:mt-0 font-mono text-xs md:text-sm">{project.date}</span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm md:text-base">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PAGE: ART DETAIL --- */}
        {currentPage === "art-detail" && selectedArtPiece && (
          <motion.div key={`art-${selectedArtPiece.id}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen p-6 md:p-12 flex flex-col items-center relative z-10">
            <div className="max-w-4xl w-full">
              <motion.button onClick={goBack} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="mb-8 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base">← Back</motion.button>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-7 rounded-lg overflow-hidden border border-[#2a2a2a]">
                <img src={selectedArtPiece.imageUrl} alt={selectedArtPiece.title} className="w-full" />
              </motion.div>
              <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                <motion.h1 className="text-4xl md:text-5xl serif-heading font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{selectedArtPiece.title}</motion.h1>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-[#8f8f8f] font-mono text-xs md:text-sm mt-2 sm:mt-0">{selectedArtPiece.date}</motion.span>
              </div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[#cfcfcf] serif-heading text-base md:text-lg max-w-2xl leading-relaxed mt-4">{selectedArtPiece.description}</motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}