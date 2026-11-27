import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Copy, Moon, Search, SquareTerminal } from 'lucide-react'
import { navLinks } from './Navbar'
import { profile } from '../data'
import { GitHubIcon, LinkedInIcon } from './ui'

export default function CommandPalette({ open, setOpen, toggleTheme }) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const inputRef = useRef(null)

  const actions = useMemo(
    () => [
      ...navLinks.map((l) => ({ label: `Go to ${l.label}`, group: 'Navigate', icon: ArrowRight, run: () => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }) })),
      { label: 'Open GitHub', group: 'Links', icon: GitHubIcon, run: () => window.open(profile.github, '_blank', 'noopener') },
      { label: 'Open LinkedIn', group: 'Links', icon: LinkedInIcon, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { label: 'Toggle light / dark theme', group: 'Actions', icon: Moon, run: toggleTheme },
      { label: 'Copy page link', group: 'Actions', icon: Copy, run: () => navigator.clipboard?.writeText(window.location.origin) },
      { label: 'Open the terminal', group: 'Actions', icon: SquareTerminal, run: () => { document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => document.getElementById('term-input')?.focus(), 600) } },
    ],
    [toggleTheme],
  )

  const results = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => inputRef.current?.focus(), 30) } }, [open])

  const run = (a) => { setOpen(false); setTimeout(a.run, 80) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-start bg-black/40 px-4 pt-[15vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-[var(--bg-2)] shadow-2xl"
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setI(0) }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(x + 1, results.length - 1)) }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(x - 1, 0)) }
                  if (e.key === 'Enter' && results[i]) run(results[i])
                }}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
              />
              <kbd className="rounded border border-line px-1.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
              {results.map((a, idx) => (
                <li key={a.label}>
                  <button
                    onMouseEnter={() => setI(idx)}
                    onClick={() => run(a)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${idx === i ? 'bg-[var(--line)]' : ''}`}
                  >
                    <a.icon width={15} height={15} size={15} className="text-muted" />
                    <span className="flex-1">{a.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{a.group}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
