// NeonPortfolio.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Github, Mail, Briefcase, Star } from "lucide-react";
export default function NeonPortfolio() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let rafId = 0;
    let stars = [];
    const STAR_COUNT = Math.max(60, Math.floor((w * h) / 9000)); // keep reasonable min

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: rand(0.2, 1),
          vx: rand(-0.02, 0.02),
          vy: rand(-0.02, 0.02),
        });
      }
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      createStars();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // background gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#030016");
      g.addColorStop(0.5, "#07051f");
      g.addColorStop(1, "#01040a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // stars
      for (let s of stars) {
        // parallax with mouse
        const dx = (mouse.current.x - w / 2) * 0.0008 * (s.z - 0.5);
        const dy = (mouse.current.y - h / 2) * 0.0008 * (s.z - 0.5);
        s.x += s.vx + dx;
        s.y += s.vy + dy;

        // wrap
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        const size = (1.6 - s.z) * 1.8;
        const alpha = 0.55 + (1 - s.z) * 0.55;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // glowing robotic orbiting dots (foreground)
      const t = Date.now() * 0.001;
      for (let i = 0; i < 6; i++) {
        const cx = w * 0.85 + Math.sin(t * (0.3 + i * 0.07)) * 80;
        const cy = h * 0.18 + Math.cos(t * (0.25 + i * 0.05)) * 40;
        const r = 3 + Math.abs(Math.sin(t * (0.6 + i * 0.1))) * 3;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 6);
        grad.addColorStop(0, "rgba(255,120,200,0.95)");
        grad.addColorStop(0.5, "rgba(120,90,255,0.15)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    createStars();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Motion variants
  const fadeIn = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
  const neon = "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-300";

  // sample projects (replace with your real projects)
  const projects = [
    {
      id: "p1",
      title: "PayStar — VTU & Wallet",
      desc: "End-to-end VTU, wallet and payment integrations with automated providers.",
      tags: ["Node.js", "Tailwind", "React", "Payments"],
      link: "https://paystarng.vercel.app",
      repo: "https://github.com/sulaimonazeez",
      image: "https://cdn.dribbble.com/userupload/39810389/file/original-338665626b099d522954de99a3d8af2c.png?format=webp&resize=1000x750&vertical=center",
    },
    {
      id: "p2",
      title: "Crypto Web App",
      desc: "React app that Allow Users to deposit and withdrawl crypto.",
      tags: ["React", "ServiceWorker", "IndexedDB", "Nodejs"],
      link: "https://xentrovest.netlify.app/",
      repo: "https://github.com/sulaimonazeez/xentrovest",
      image: "https://cdn.dribbble.com/userupload/30126030/file/original-db886942583416b54bf014b3db63f4f4.png?format=webp&resize=1000x750&vertical=center",
    },
    {
      id: "p3",
      title: "Real-Time Chat Application (Django & React)",
      desc: "This is a modern, full-featured real-time chat application designed for seamless communication",
      tags: ["Reactjs", "MySql", "Django"],
      link: "https://chatfronted.vercel.app",
      repo: "https://github.com/sulaimonazeez/chatfronted",
      image: "https://cdn.dribbble.com/userupload/37006423/file/original-a49d1d73942481b4a19853333b1e845b.png?resize=1024x768&vertical=center",
    },
    {
      id: "p4",
      title: "Resume PDF Generator",
      desc: "Developed a scalable, full-stack application dedicated to automated resume and CV generation",
      tags: ["Django", "MongoDB", "Weasyprint"],
      link: "https://pdfgenerators.pythonanywhere.com/",
      repo: "https://github.com/sulaimonazeez/pdf_generator",
      image: "https://cdn.dribbble.com/userupload/17398686/file/original-1e7b4e06fb7a14c3c80561e5384fd170.jpg?resize=1024x768&vertical=center",
    },
        {
      id: "p4",
      title: "Bank Landing Page",
      desc: "Developed a scalable, High Animate HooBank Landing Page",
      tags: ["Reactjs", "css3"],
      link: "https://preeminent-crumble-03769b.netlify.app/",
      repo: "https://github.com/sulaimonazeez/modernweb",
      image: "https://cdn.dribbble.com/userupload/15099081/file/original-2d76b4775a99c8263bef84f4e0218aa0.png?format=webp&resize=1000x750&vertical=center",
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />

      {/* Nebula glows */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute left-[-20%] top-[-20%] w-[60vw] h-[60vh] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-pink-600 via-indigo-700 to-cyan-500 mix-blend-screen" />
        <div className="absolute right-[-10%] bottom-[-10%] w-[50vw] h-[50vh] rounded-full blur-3xl opacity-25 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-400 mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="w-full py-6 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-cyan-300 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center border border-white/10">
              <Rocket className="text-white" size={20} />
            </div>
          </div>
          <div>
            <h1 className={`text-xl font-extrabold tracking-tight ${neon}`}>Azeez Sulaimon</h1>
            <p className="text-xs text-white/60">Full-stack Engineer — Payments & Platform Build</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-4 items-center">
          <a href="#projects" className="px-4 py-2 rounded-lg border border-white/6 hover:border-white/20 transition">Projects</a>
          <a href="#skills" className="px-4 py-2 rounded-lg border border-white/6 hover:border-white/20 transition">Skills</a>
          <a href="#about" className="px-4 py-2 rounded-lg border border-white/6 hover:border-white/20 transition">About</a>
          <a href="#contact" className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 text-black font-bold shadow-lg">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="px-6 md:px-12 pt-8 pb-24">
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeIn} className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/6">
              <Star size={16} />
              <span className="text-sm text-white/70">Open to remote & freelance work</span>
            </div>

            <h2 className={`text-4xl md:text-6xl font-extrabold leading-tight ${neon}`}>
              A Full-Stack Developer proficient in both the MERN stack and Django for robust, scalable backend services
            </h2>

            <p className="text-lg text-white/70 max-w-xl">
              I design and build production-ready payment systems, VTU/data platforms and reactive frontends with
              pixel-perfect animations. My stack: Node, Django, React, Tailwind, and payments integrations.
            </p>

            <div className="flex gap-4">
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} href="#projects" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 font-bold text-black shadow-2xl">See Projects</motion.a>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} href="#contact" className="px-6 py-3 rounded-2xl border border-white/10 text-white">Hire Me</motion.a>
            </div>

            <div className="mt-6 flex gap-3 items-center text-sm text-white/60">
              <Github size={18} /> <a href="https://github.com/sulaimonazeez" className="underline">github.com/sulaimonazeez</a>
              <Mail className="ml-4" size={18} /> <span>olaniyisulaimon221@gmail.com</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            {/* Robo-card: interactive 3D-ish card */}
            <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-black/60 to-white/3 border border-white/5 p-6 backdrop-blur-md shadow-[0_25px_80px_rgba(120,30,200,0.12)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/60">Featured Project</div>
                  <div className={`text-2xl font-bold ${neon}`}>PayStar — Wallet & VTU</div>
                </div>
                <div className="text-sm text-white/60">Live & Private</div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <p className="text-white/70">Built a fullstack platform that handles deposits, virtual accounts, and VTU/data purchases with providers. Integrated Payvessel, Africa's Talking and custom data providers — sharp latency & reconciliation logic.</p>
                </div>
                <div className="flex flex-col gap-3 items-end">
                  <div className="p-2 rounded-md border border-white/6 text-sm">Node.js</div>
                  <div className="p-2 rounded-md border border-white/6 text-sm">Tailwind</div>
                  <div className="p-2 rounded-md border border-white/6 text-sm">React</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-medium">View Demo</button>
                <button className="px-3 py-2 rounded-lg border border-white/6 text-white">Case Study</button>
              </div>
            </div>

            {/* decorative */}
            <div className="absolute -right-10 -top-8 w-48 h-48 rounded-full pointer-events-none" />
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="max-w-7xl mx-auto mt-20">
          <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${neon}`}>Selected Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.article key={p.id} whileHover={{ y: -8 }} className="bg-black/60 border border-white/5 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-semibold">{p.title}</h4>
                    <p className="text-sm text-white/60 mt-2">{p.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <a href={p.repo} className="text-white/40 text-xs">Repo</a>
                    <a href={p.link} className="text-white/40 text-xs">Live</a>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/3">{t}</span>
                  ))}
                </div>

                {/* project preview image (if available) */}
                {p.image && (
                  <div className="mt-4">
                    <img src={p.image} alt={p.title} className="rounded-xl w-full h-40 object-cover border border-white/6" />
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* Extended Projects Section (longer page content) */}
        <section className="w-full py-20 px-6 md:px-20 bg-black/60 mt-16 rounded-2xl">
          <h2 className="text-4xl md:text-6xl font-bold neon-text mb-8 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((p) => (
              <article key={p.id} className="bg-black/40 border border-cyan-500/20 p-6 rounded-2xl shadow-xl hover:scale-[1.02] duration-300">
                <img src={p.image} alt={p.title} className="rounded-xl mb-6 w-full h-64 object-cover" />
                <h3 className="text-2xl md:text-3xl font-bold neon-text mb-3">{p.title}</h3>
                <p className="text-gray-300 mb-4">{p.desc}</p>
                <div className="flex gap-4">
                  <a href={p.repo} className="px-6 py-2 rounded-xl border border-cyan-400 hover:bg-cyan-400/20">GitHub</a>
                  <a href={p.link} className="px-6 py-2 rounded-xl border border-cyan-400 hover:bg-cyan-400/20">Live Demo</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Skills + Timeline */}
        <section id="skills" className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-3xl font-bold ${neon}`}>Skills</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                "Node.js","Django","React","Tailwind","MongoDB","Postgres","Redis","AWS","Payments","Testing"
              ].map((s) => (
                <div key={s} className="p-3 rounded-lg bg-black/50 border border-white/5">{s}</div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-3xl font-bold ${neon}`}>Experience</h3>
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-black/50 border border-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <strong>Lead Engineer — PayStar</strong>
                  <span className="text-sm text-white/60">2024 — Present</span>
                </div>
                <p className="text-sm text-white/60 mt-2">Built payment flows, reconciliations, virtual accounts and VTU automation. Led a team of 3.</p>
              </div>

              <div className="p-4 bg-black/50 border border-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <strong>Fullstack Engineer — Freelance</strong>
                  <span className="text-sm text-white/60">2021 — 2024</span>
                </div>
                <p className="text-sm text-white/60 mt-2">Delivered multiple projects (ecommerce, fintech, dashboards) to clients worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* More About Me */}
        <section className="w-full py-20 px-6 md:px-20 bg-black/50 mt-16 rounded-2xl">
          <h2 className="text-4xl md:text-6xl font-bold neon-text text-center mb-8">More About Me</h2>
          <p className="text-gray-300 text-lg md:text-2xl leading-relaxed max-w-5xl mx-auto text-center">
            I build futuristic digital products with animations that feel alive. My work focuses on speed,
            performance, dark-neon UI, and user satisfaction. I love building financial apps, automation systems,
            and visually insane UI/UX animations.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-4xl mx-auto mt-20">
          <h3 className={`text-3xl font-bold ${neon}`}>Get in touch</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // replace with real submission
                alert("Thanks — copy email: hello@yourmail.com");
              }}
              className="p-6 bg-black/50 border border-white/5 rounded-2xl"
            >
              <label className="text-sm text-white/60">Name</label>
              <input required className="w-full mt-2 p-3 rounded-lg bg-black/40 border border-white/6" placeholder="Your name" />

              <label className="text-sm text-white/60 mt-4 block">Message</label>
              <textarea required className="w-full mt-2 p-3 rounded-lg bg-black/40 border border-white/6" rows={6} placeholder="Tell me about the job/project" />

              <button type="submit" className="mt-4 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 text-black font-bold">Send message</button>
            </form>

            <div className="p-6 bg-black/50 border border-white/5 rounded-2xl flex flex-col justify-between">
              <div>
                <p className="text-white/70">Prefer email? <br/> <strong className="text-white">olaniyisulaimon221@gmail.com</strong></p>
                <p className="text-white/60 mt-4">Based in Nigeria • Available for remote work</p>
              </div>

              <div className="mt-6 flex gap-3">
                <a className="p-3 rounded-md bg-white/4" href="https://ng.linkedin.com/in/sulaimon-olaniyi-73226223a">LinkedIn</a>
                <a className="p-3 rounded-md bg-white/4" href="https://github.com/sulaimonazeez">GitHub</a>
              </div>
              <p className="mt-5 text-white/70">Prefer phone: <br/> <strong className="text-white">+2348080891605</strong></p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto mt-20 pb-20 text-center text-sm text-white/60">
          <div>© {new Date().getFullYear()} Azeez Sulaimon — Alright Reserve.</div>
        </footer>
      </main>

      {/* floating CTA bottom-right */}
      <motion.a whileHover={{ scale: 1.05 }} href="#contact" className="fixed right-6 bottom-6 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 px-4 py-3 rounded-full shadow-2xl text-black font-bold">Contact</motion.a>
    </div>
  );
}