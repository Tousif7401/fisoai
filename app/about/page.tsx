import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SymbolFold } from '@/components/SymbolFold';
import { Github, Twitter, Mail, MapPin, Code, Briefcase, Award, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section - Creator Profile */}
          <div className="text-center mb-16">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-[#E1E0CC]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-photo.jpeg"
                alt="Mohammed Tousif"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-medium text-[#E1E0CC] mb-4">
              Mohammed Tousif
            </h1>
            <p className="text-xl text-[#DEDBC8]/80 max-w-2xl mx-auto mb-6">
              Full-Stack Developer & Creator of Calmify AI
            </p>
            <div className="flex items-center justify-center gap-4 text-[#DEDBC8]/60">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Ballari, India</span>
              </div>
              <span>•</span>
              <a href="https://tousif-mohammed.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1E0CC] transition-colors">
                tousif-mohammed.vercel.app
              </a>
            </div>
          </div>

          {/* About Me */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6">About Me</h2>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <p className="text-[#DEDBC8]/80 text-lg leading-relaxed">
                Hey! I&apos;m Mohammed Tousif, a passionate full-stack developer who loves building products that make a difference.
                I graduated with a B.Tech in Computer Science from RYMEC Ballari and have been crafting web applications that solve real problems.
              </p>
              <p className="text-[#DEDBC8]/80 text-lg leading-relaxed mt-4">
                I created Calmify AI with a simple mission: to make mental health support accessible to developers, builders, and creators everywhere.
                As someone who understands the unique challenges we face — burnout, imposter syndrome, creative blocks — I wanted to create a space
                where we can talk about these things without judgment.
              </p>
              <p className="text-[#DEDBC8]/80 text-lg leading-relaxed mt-4">
                When I&apos;m not coding, you&apos;ll find me exploring AI/ML, participating in hackathons, or sharing my journey on social media.
              </p>
            </div>
          </section>

          {/* Skills & Tech Stack */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6">Skills & Tech Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-medium text-[#E1E0CC]">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML5/CSS3'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-medium text-[#E1E0CC]">Backend & Database</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MySQL', 'MongoDB', 'FastAPI'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-medium text-[#E1E0CC]">Cloud & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['AWS (Lambda, ECS, S3, SQS)', 'Git', 'Vercel', 'Firebase', 'CI/CD', 'RESTful APIs'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What I&apos;m Building */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6">What I&apos;m Building</h2>
            <div className="space-y-4">
              {/* Calmify AI */}
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-2xl font-medium text-[#E1E0CC] mb-3">Calmify AI</h3>
                <p className="text-[#DEDBC8]/80 leading-relaxed mb-4">
                  A free AI-powered mental health companion for developers. Built with Next.js, TypeScript, Supabase, and Claude AI.
                  Features structured articles, interactive AI conversations, and secure donation integration.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E1E0CC] text-black rounded-full font-medium hover:bg-[#DEDBC8] transition-colors"
                >
                  Check Out Calmify
                </Link>
              </div>

              {/* Devsync AI */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-medium text-[#E1E0CC] mb-3">Devsync AI</h3>
                <p className="text-[#DEDBC8]/80 leading-relaxed mb-4">
                  AI-powered developer workflow platform that connects to GitHub via OAuth 2.0 & Webhooks to analyze commit metadata
                  and auto-generate social media content (LinkedIn, X, Instagram) using Gemini AI in under 3 seconds.
                </p>
                <a
                  href="https://ai-devsync.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[#E1E0CC] transition-colors"
                >
                  View Devsync AI
                </a>
              </div>

              {/* Axiom - Local AI */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-medium text-[#E1E0CC] mb-3">Axiom</h3>
                <p className="text-[#DEDBC8]/80 leading-relaxed">
                  A local AI assistant that lives on my machine with real-time web awareness. Built with Python, OpenAI API, and LangChain.
                  My personal project for intelligent, context-aware assistance.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6 flex items-center gap-3">
              <Briefcase className="w-8 h-8" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-[#E1E0CC] mb-2">Full Stack Developer @ ZYPTR</h3>
                <p className="text-[#DEDBC8]/60 text-sm mb-3">Sept 2025 – May 2026</p>
                <ul className="text-[#DEDBC8]/80 space-y-2">
                  <li>• Built Infakt LMS with 4-role RBAC using React, Node.js, PostgreSQL</li>
                  <li>• Developed Microfinance Management System for secure loan processing</li>
                  <li>• Created Modernspaces real estate platform with Next.js, achieving 90+ Lighthouse scores</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-[#E1E0CC] mb-2">Full Stack Developer Intern @ Kodemapa</h3>
                <p className="text-[#DEDBC8]/60 text-sm mb-3">Oct 2024 – March 2025</p>
                <ul className="text-[#DEDBC8]/80 space-y-2">
                  <li>• Architected React.js front-end with advanced state management</li>
                  <li>• Achieved 35% reduction in page load time through optimization</li>
                  <li>• Built reusable UI components, cutting development effort by 30%</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6 flex items-center gap-3">
              <GraduationCap className="w-8 h-8" />
              Education
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-[#E1E0CC] mb-1">B.Tech in Computer Science & Engineering</h3>
                <p className="text-[#DEDBC8]/80">Rao Bahadur Y Mahabaleshwarappa Engineering College, Ballari</p>
                <p className="text-[#DEDBC8]/60 text-sm mt-1">Jan 2023 – July 2025 • 77.07%</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-[#E1E0CC] mb-1">Diploma in Electronics & Communication Engineering</h3>
                <p className="text-[#DEDBC8]/80">Government Polytechnic College, Ballari</p>
                <p className="text-[#DEDBC8]/60 text-sm mt-1">July 2018 – May 2021 • 72.08%</p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6 flex items-center gap-3">
              <Award className="w-8 h-8" />
              Achievements
            </h2>
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20">
              <ul className="text-[#DEDBC8]/80 space-y-2">
                <li>🏆 Smart India Hackathon 2023 – Grand Finalist</li>
                <li>🎯 State-Level Hackathon (Mandya) – Finalist</li>
                <li>🥇 RYMEC Hackathon – Winner</li>
                <li>⚡ Innovation, Development & Entrepreneurship Competitions – Active Participant</li>
              </ul>
            </div>
          </section>

          {/* Connect With Me */}
          <section className="mb-16">
            <h2 className="text-3xl font-medium text-[#E1E0CC] mb-6">Let&apos;s Connect</h2>
            <p className="text-[#DEDBC8]/80 mb-6">
              I&apos;m always open to collaborations, interesting projects, or just a friendly chat about tech and AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://github.com/Tousif7401"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[#E1E0CC] transition-colors"
              >
                <Github size={20} />
                <span>GitHub</span>
              </Link>
              <Link
                href="https://x.com/mohammed_t41990"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[#E1E0CC] transition-colors"
              >
                <Twitter size={20} />
                <span>Twitter</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/mohammed-tousif-78b0b8255"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[#E1E0CC] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </Link>
              <Link
                href="mailto:tousif.cse.rymec@gmail.com"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[#E1E0CC] transition-colors"
              >
                <Mail size={20} />
                <span>Email</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <SymbolFold />
      <Footer />
    </main>
  );
}
