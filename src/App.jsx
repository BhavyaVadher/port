import { useState } from 'react'
import Navbar, { useTheme } from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Terminal from './components/Terminal'
import Contact from './components/Contact'
import { profile } from './data'

export default function App() {
  const [dark, toggleTheme] = useTheme()
  const [palette, setPalette] = useState(false)

  return (
    <div className="noise relative overflow-x-clip">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-[var(--fg)] focus:px-3 focus:py-2 focus:text-[var(--bg)]">Skip to content</a>
      <Navbar dark={dark} toggleTheme={toggleTheme} openPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {profile.name} · Toronto</p>
          <p className="font-mono text-xs">Built with React, Motion & Tailwind · press <kbd className="rounded border border-line px-1">⌘K</kbd></p>
        </div>
      </footer>
    </div>
  )
}
