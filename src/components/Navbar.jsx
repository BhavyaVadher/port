import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Moon, Sun, Menu, X } from 'lucide-react'

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
]

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}

export default function Navbar({ dark, toggleTheme, openPalette }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400" />
      <nav
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? 'mx-3 border border-line bg-card shadow-lg shadow-black/5 backdrop-blur-xl sm:mx-auto' : ''
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-extrabold text-white">BV</span>
          <span className="hidden sm:inline">Bhavya Vadher</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition ${active === l.id ? 'text-[var(--fg)]' : 'text-muted hover:text-[var(--fg)]'}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-[var(--line)]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-muted transition hover:text-[var(--fg)] sm:flex"
            aria-label="Open command palette"
          >
            {isMac ? '⌘' : 'Ctrl'} K
          </button>
          <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:text-[var(--fg)]" aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-lg border border-line md:hidden" aria-label="Menu">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mx-3 mt-2 grid gap-1 rounded-2xl border border-line bg-card p-2 backdrop-blur-xl md:hidden">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-[var(--line)]">
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  )
}
