"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const achievementsRef = useRef(null);
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const glow = document.getElementById("cursor-glow");

    let mouseX = 0;
    let mouseY = 0;

    const moveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
      }

      if (glow) {
        glow.style.left = mouseX + "px";
        glow.style.top = mouseY + "px";
      }
    };

    window.addEventListener("mousemove", moveHandler);

    // 🔥 MAGNETIC EFFECT (REAL ONE)
    const magneticItems = document.querySelectorAll(".magnetic");

    const handleEnter = (e: any) => {
      const el = e.currentTarget;
      el.style.transition = "transform 0.2s ease";
    };

    const handleMove = (e: any) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleLeave = (e: any) => {
      const el = e.currentTarget;
      el.style.transform = "translate(0px, 0px)";
    };

    magneticItems.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });
    // 🍎 APPLE 3D TILT EFFECT
    const tiltItems = document.querySelectorAll(".tilt-card");

    const tiltMove = (e: any) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 12;
      const rotateY = (x - centerX) / 12;

      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    const tiltLeave = (e: any) => {
      const el = e.currentTarget;
      el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    setTimeout(() => {
      tiltItems.forEach((el) => {
        el.addEventListener("mousemove", tiltMove);
        el.addEventListener("mouseleave", tiltLeave);
      });
    }, 300);

    // ✅ CLEANUP (VERY IMPORTANT)
    return () => {
      window.removeEventListener("mousemove", moveHandler);

      magneticItems.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);


  useEffect(() => {
    if (!startCount) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCount(i);
      if (i === 100) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [startCount]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.5 }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => {
      if (achievementsRef.current) {
        observer.unobserve(achievementsRef.current);
      }
    };
  }, []);
  const [autoRotate, setAutoRotate] = useState(0);
  const expText = "Built and trained ML models using Python & Scikit-learn";
  const [typedExp, setTypedExp] = useState("");

  // 🔥 ABOUT TEXT
  const aboutText = [
    "Computer Science Engineering graduate with expertise in Data Analytics, Python development, and Machine Learning.",
    "Skilled in transforming data into actionable insights through analytics, automation, and visualization using Python, SQL, Pandas, and Power BI",
    "Passionate about building data-driven solutions that support business decision-making and operational efficiency."
  ];

  const [displayedText, setDisplayedText] = useState(["", "", ""]);

  // 🔥 TYPING EFFECT
  useEffect(() => {
    let line = 0;
    let char = 0;

    const typing = setInterval(() => {
      setDisplayedText((prev) => {
        if (!aboutText[line]) return prev;

        const updated = [...prev];
        updated[line] = aboutText[line].slice(0, char + 1);
        return updated;
      });

      char++;

      if (char === aboutText[line].length) {
        char = 0;
        line++;

        if (line === aboutText.length) {
          clearInterval(typing);
        }
      }
    }, 25);

    return () => clearInterval(typing);
  }, []);
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTypedExp(expText.slice(0, i));
      i++;

      if (i > expText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // 🔥 AUTO ROTATION (SMOOTH)
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRotate((prev) => prev + 0.4);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const languages = [
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Scikit-learn", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
    { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "Matplotlib", img: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
    { name: "Seaborn", img: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
  ];

  const webtools = [
    { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Django", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "Streamlit", img: "https://streamlit.io/images/brand/streamlit-logo-secondary-colormark-darktext.png" },
    { name: "Flask", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];

  const others = [
    { name: "Power BI", img: "https://img.icons8.com/color/96/power-bi.png" },
    { name: "Google Colab", img: "https://colab.research.google.com/img/colab_favicon_256px.png" },
    { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Notion", img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Excel", img: "https://img.icons8.com/color/96/microsoft-excel-2019.png" },
  ];

  const totalRotate = autoRotate;

  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-glow" className="cursor-glow"></div>
      <main className="text-white overflow-x-hidden relative z-10">


        {/* VIDEO BACKGROUND */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* HERO */}
        <section className="h-screen flex items-center justify-center">
          <div className="relative flex items-center justify-center">

            <motion.img
              src="/profile.jpg"
              alt="profile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-xl z-0 shadow-2xl"
            />

            {/* LEFT TEXT */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: -180, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute flex flex-col items-start z-20"
            >
              <span className="text-xl tracking-[8px] text-white/50 font-light uppercase">
                HI, I'M
              </span>

              {/* 🔥 GLOW FIX */}
              <span
                className="text-5xl font-bold mt-2 
              bg-gradient-to-r from-blue-400 to-purple-500 
              bg-clip-text text-transparent
              drop-shadow-[0_0_25px_rgba(139,92,246,0.8)]"
                style={{ fontFamily: "serif" }}
              >
                RAMESH
              </span>
            </motion.div>

            {/* 🔥 GLOW FIX */}
            <motion.h1
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 180, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute text-6xl font-bold tracking-widest z-20
            bg-gradient-to-r from-blue-400 to-purple-500 
            bg-clip-text text-transparent
            drop-shadow-[0_0_25px_rgba(139,92,246,0.8)]"
              style={{ fontFamily: "serif" }}
            >
              KANNAN
            </motion.h1>

          </div>
        </section>

        {/* ABOUT */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">

            <h2 className="text-4xl font-bold mb-10">
              About Me
            </h2>

            <p className="text-white/70 text-lg mb-4">{displayedText[0]}</p>
            <p className="text-white/70 text-lg mb-4">{displayedText[1]}</p>
            <p className="text-white/70 text-lg">{displayedText[2]}</p>

          </div>
        </section>

        {/* SKILLS */}
        <section className="min-h-screen flex flex-col items-center justify-center">

          <h2 className="text-4xl font-bold mb-20">Skills</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-20">

            {/* 🔹 LEFT WHEEL */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotateY: totalRotate }}
                transition={{ ease: "linear", duration: 0 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] flex items-center justify-center"
              >
                {languages.map((skill, i) => {
                  const angle = (360 / languages.length) * i;
                  const activeIndex = Math.round((totalRotate % 360) / (360 / languages.length));
                  const isActive = i === (languages.length - activeIndex) % languages.length;

                  return (
                    <div
                      key={i}
                      className={`absolute w-28 h-28 flex flex-col items-center justify-center 
              rounded-xl border transition-all duration-300
              ${isActive
                          ? "bg-white/20 scale-125 shadow-[0_0_40px_rgba(139,92,246,0.9)]"
                          : "bg-white/10 opacity-40 blur-[1px]"
                        }`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(140px)`
                      }}
                    >
                      <img src={skill.img} className="w-8 h-8 mb-2" />
                      <p className="text-xs text-center">{skill.name}</p>
                    </div>
                  );
                })}
              </motion.div>
              <p className="mt-4 text-sm text-white/60">Languages & Libraries</p>
            </div>

            {/* 🔥 DIVIDER */}
            <div className="hidden md:block w-[1px] h-40 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

            {/* 🔹 CENTER WHEEL */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotateY: totalRotate }}
                transition={{ ease: "linear", duration: 0 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] flex items-center justify-center"
              >
                {webtools.map((skill, i) => {
                  const angle = (360 / webtools.length) * i;
                  const activeIndex = Math.round((totalRotate % 360) / (360 / webtools.length));
                  const isActive = i === (webtools.length - activeIndex) % webtools.length;

                  return (
                    <div
                      key={i}
                      className={`absolute w-28 h-28 flex flex-col items-center justify-center 
              rounded-xl border transition-all duration-300
              ${isActive
                          ? "bg-white/20 scale-125 shadow-[0_0_40px_rgba(139,92,246,0.9)]"
                          : "bg-white/10 opacity-40 blur-[1px]"
                        }`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(140px)`
                      }}
                    >
                      <img src={skill.img} className="w-8 h-8 mb-2" />
                      <p className="text-xs text-center">{skill.name}</p>
                    </div>
                  );
                })}
              </motion.div>
              <p className="mt-4 text-sm text-white/60">Database & Web Tools</p>
            </div>

            {/* 🔥 DIVIDER */}
            <div className="hidden md:block w-[1px] h-40 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

            {/* 🔹 RIGHT WHEEL */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotateY: totalRotate }}
                transition={{ ease: "linear", duration: 0 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] flex items-center justify-center"
              >
                {others.map((skill, i) => {
                  const angle = (360 / others.length) * i;
                  const activeIndex = Math.round((totalRotate % 360) / (360 / others.length));
                  const isActive = i === (others.length - activeIndex) % others.length;

                  return (
                    <div
                      key={i}
                      className={`absolute w-28 h-28 flex flex-col items-center justify-center 
              rounded-xl border transition-all duration-300
              ${isActive
                          ? "bg-white/20 scale-125 shadow-[0_0_40px_rgba(139,92,246,0.9)]"
                          : "bg-white/10 opacity-40 blur-[1px]"
                        }`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(140px)`
                      }}
                    >
                      <img src={skill.img} className="w-8 h-8 mb-2" />
                      <p className="text-xs text-center">{skill.name}</p>
                    </div>
                  );
                })}
              </motion.div>
              <p className="mt-4 text-sm text-white/60">Others</p>
            </div>

          </div>

        </section>
        {/* PROJECTS */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">

          <h2 className="text-4xl font-bold mb-16">Projects</h2>

          <div className="grid md:grid-cols-2 gap-10 py-10 w-full max-w-6xl mx-auto px-4">

            {/* PROJECT 1 */}
            <div className="group tilt-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden will-change-transform 
hover:scale-[1.02] transform-gpu transition duration-300 shadow-md 
hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">

              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="text-sm font-semibold">
                  DietBuddy – AI Nutrition Planner
                </h3>

                <p className="text-xs text-white/60 mt-1">
                  AI-based system that generates personalized diet plans using ML models.
                </p>

                <div className="flex gap-2 mt-3">
                  {/*
                  <button className="magnetic text-[11px] px-3 py-1 rounded bg-gradient-to-r from-orange-500 to-red-500 
text-white font-medium shadow-md
hover:shadow-[0_0_15px_rgba(255,100,0,0.8)]
transition duration-300">
                    Live Demo
                  </button>
*/}
                  <a
                    href="https://github.com/ramesh-kannan-dev/dietbuddy-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="magnetic text-[11px] px-2 py-1 rounded border border-white/30 hover:bg-white/10"
                    >
                      GitHub
                    </button>
                  </a>

                </div>

              </div>
            </div>

            {/* PROJECT 2 */}
            <div className="group tilt-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden will-change-transform 
hover:scale-[1.02] transform-gpu transition duration-300 shadow-md 
hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">

              <img
                src="https://images.unsplash.com/photo-1677756119517-756a188d2d94"
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="text-sm font-semibold">
                  LLM Security Layer
                </h3>

                <p className="text-xs text-white/60 mt-1">
                  Multi-layer AI security system using BERT to detect unsafe prompts and attacks.
                </p>

                <div className="flex gap-2 mt-3">

                  {/*
                  <button className="magnetic text-[11px] px-3 py-1 rounded bg-gradient-to-r from-orange-500 to-red-500 
text-white font-medium shadow-md
hover:shadow-[0_0_15px_rgba(255,100,0,0.8)]
transition duration-300">
                    Live Demo
                  </button>
                  */}

                  <a
                    href="https://github.com/ramesh-kannan-dev/LLM-Security-Layer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="magnetic text-[11px] px-2 py-1 rounded border border-white/30 hover:bg-white/10"
                    >
                      GitHub
                    </button>
                  </a>

                </div>

              </div>
            </div>

            {/* PROJECT 3 */}
            <div className="group tilt-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden will-change-transform 
hover:scale-[1.02] transform-gpu transition duration-300 shadow-md 
hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">

              <img
                src="/mentor.jpg"
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="text-sm font-semibold">
                  MENTOR.AI – Career Engine Pro
                </h3>

                <p className="text-xs text-white/60 mt-1">
                  AI mentor that generates skill-gap analysis and visual learning paths.
                </p>

                <div className="flex gap-2 mt-3">
                  {/*
                  <button className="magnetic text-[11px] px-3 py-1 rounded bg-gradient-to-r from-orange-500 to-red-500 
text-white font-medium shadow-md
hover:shadow-[0_0_15px_rgba(255,100,0,0.8)]
transition duration-300">
                    Live Demo
                  </button>
*/}

                  <a
                    href="https://github.com/ramesh-kannan-dev/ai-career-mentor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="magnetic text-[11px] px-2 py-1 rounded border border-white/30 hover:bg-white/10"
                    >
                      GitHub
                    </button>
                  </a>

                </div>

              </div>
            </div>

            {/* PROJECT 4 */}
            <div className="group tilt-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden will-change-transform 
hover:scale-[1.02] transform-gpu transition duration-300 shadow-md 
hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">

              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="text-sm font-semibold">
                  AI-Powered Data Analyst
                </h3>

                <p className="text-xs text-white/60 mt-1">
                  AI system that analyzes datasets, generates insights, and builds automated reports.
                </p>

                <div className="flex gap-2 mt-3">
                  {/*
                  <button className="magnetic text-[11px] px-3 py-1 rounded bg-gradient-to-r from-orange-500 to-red-500 
text-white font-medium shadow-md
hover:shadow-[0_0_15px_rgba(255,100,0,0.8)]
transition duration-300">
                    Live Demo
                  </button>
*/}
                  <a
                    href="https://github.com/ramesh-kannan-dev/ai-powered-data-analyst"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="magnetic text-[11px] px-2 py-1 rounded border border-white/30 hover:bg-white/10"
                    >
                      GitHub
                    </button>
                  </a>

                </div>

              </div>
            </div>

          </div>

        </section>
        {/* EXPERIENCE */}
        <section className="min-h-screen px-6 py-20">

          <h2 className="text-4xl font-bold text-center mb-20">Experience</h2>

          <div className="relative max-w-4xl mx-auto">

            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white/10 -translate-x-1/2"></div>

            {/* Timeline Item */}
            <div className="relative flex items-center justify-between mb-20">

              {/* LEFT SIDE */}
              <div className="w-[45%] text-right pr-6">
                <h3 className="text-xl font-semibold">
                  Machine Learning Intern –
                  <span className="text-purple-400"> VCODEZ</span>
                </h3>

                <p className="text-sm text-white/50 mt-1">
                  📅 July 2025 – Oct 2025
                </p>
              </div>

              {/* DOT */}
              <div className="w-4 h-4 bg-purple-500 rounded-full z-10 shadow-[0_0_20px_#a855f7]"></div>

              {/* RIGHT SIDE */}
              <div className="w-[45%] pl-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-5 
      hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition duration-300">

                <ul className="space-y-3 text-sm text-white/80">

                  <li>
                    ⚙️ {typedExp}
                  </li>

                  <li>
                    🧹 Processed <span className="text-white font-medium">10,000+ data rows</span> with data cleaning & feature engineering
                  </li>

                  <li>
                    📊 Improved prediction accuracy by <span className="text-purple-400 font-semibold">+18%</span>
                  </li>

                  <li>
                    🚀 Reduced manual analysis effort by <span className="text-purple-400 font-semibold">40%</span>
                  </li>

                </ul>

                {/* TECH STACK */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Python", "Pandas", "Scikit-learn", "NumPy"].map((tech, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* WHAT I LEARNED */}
                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-xs text-white/60 mb-1">💡 What I Learned</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Real-world ML workflows</li>
                    <li>• Model optimization</li>
                    <li>• Data preprocessing</li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </section>
        {/* ACHIEVEMENTS */}
        <section ref={achievementsRef} className="min-h-screen px-6 py-20">

          <h2 className="text-4xl font-bold text-center mb-16">Achievements</h2>

          {/* CERTIFICATIONS */}
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">

            {/* SPRING BOOT */}
            <div className="card magnetic border-purple-500/40">
              <h3>Java Spring Boot</h3>
              <p>Govt. of Tamil Nadu</p>
              <span>2025</span>
            </div>

            {/* SPRING BOOT L2 */}
            <div className="card magnetic border-purple-500/40">
              <h3>Spring Boot Level 2</h3>
              <p>Advanced Backend</p>
              <span>2025</span>
            </div>

            {/* MICROSOFT */}
            <div className="card magnetic border-purple-500/40">
              <h3>Microsoft Office Essentials</h3>
              <p>Microsoft + TN Govt</p>
              <span>2025</span>
            </div>

            {/* CCNA */}
            <div className="card magnetic">
              <h3>CCNA - 1</h3>
              <p>Cisco Networking</p>
              <span>2025</span>
            </div>

            {/* PYTHON */}
            <div className="card magnetic">
              <h3>Python Programming</h3>
              <p>GUI, OOP, Data Handling</p>
              <span>Certified</span>
            </div>

            {/* JAVA */}
            <div className="card magnetic">
              <h3>Java Programming</h3>
              <p>Advanced Java + JDBC</p>
              <span>Certified</span>
            </div>

            {/* C */}
            <div className="card magnetic">
              <h3>C Programming</h3>
              <p>Core Programming Logic</p>
              <span>Certified</span>
            </div>

            {/* C++ */}
            <div className="card magnetic">
              <h3>C++ Programming</h3>
              <p>OOP + Data Structures</p>
              <span>Certified</span>
            </div>

            {/* DIPLOMA */}
            <div className="card magnetic">
              <h3>Master Diploma in Computer</h3>
              <p>Full Programming Track</p>
              <span>2023</span>
            </div>

          </div>

          {/* CODING STATS */}
          {/* CODING STATS */}


          {/* LEETCODE */}
          {/*
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="stats-card text-center cursor-pointer">
                <h3 className="text-3xl font-bold text-green-400">{count}+</h3>
                <p>LeetCode Problems</p>
              </div>
            </a>
*/}
          {/* HACKERRANK */}
          {/*
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="stats-card text-center cursor-pointer">
                <h3 className="text-3xl font-bold text-yellow-400">{count}+</h3>
                <p>HackerRank Problems</p>
              </div>
            </a>

          </div>
*/}
        </section>
        {/* CONTACT */}
        <section className="min-h-screen flex items-center justify-center px-6">

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center">

            {/* LEFT SIDE */}
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Let’s Build Something <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Amazing Together !
                </span>
              </h2>

              <p className="text-white/70 mb-6 max-w-md">
                Open to Data Analyst, Python Developer, and Machine Learning Engineer roles. I enjoy working with data, solving real-world problems, and building solutions that create measurable business impact.
              </p>

              <p className="text-green-400 mb-8 font-medium">
                🚀 Open to internships & full-time roles
              </p>

              <a href="mailto:rameshkannan067@gmail.com">
                <button className="magnetic px-8 py-4 rounded-xl 
        bg-gradient-to-r from-blue-500 to-purple-600 
        text-white font-semibold shadow-lg
        hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]
        transition duration-300">
                  📩 Get In Touch
                </button>
              </a>
            </div>

            {/* RIGHT SIDE - GLASS CARD */}
            <div className="relative">

              {/* GLOW BACKGROUND */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl rounded-2xl"></div>

              <div className="relative backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6">

                <h3 className="text-2xl font-semibold mb-4">
                  Contact Info
                </h3>

                {/* EMAIL */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">Email</span>
                  <a href="mailto:rameshkannan067@gmail.com" className="text-blue-400 hover:underline">
                    rameshkannan067@gmail.com
                  </a>
                </div>

                {/* GITHUB */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">GitHub</span>
                  <a href="https://github.com/ramesh-kannan-dev" target="_blank" className="text-blue-400 hover:underline">
                    View Profile
                  </a>
                </div>

                {/* LINKEDIN */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60">LinkedIn</span>
                  <a href="https://linkedin.com/in/ramesh-kannan-O7" target="_blank" className="text-blue-400 hover:underline">
                    Connect
                  </a>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 pt-4 flex-wrap">

                  <a href="https://github.com/ramesh-kannan-dev" target="_blank">
                    <button className="magnetic px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
                      💻 GitHub
                    </button>
                  </a>

                  <a href="/ramesh_kannan_resume.pdf" download>
                    <button className="magnetic px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
                      📄 Resume
                    </button>
                  </a>

                </div>

              </div>
            </div>

          </div>

        </section>

      </main>
    </>
  );
}