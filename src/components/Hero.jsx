import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView } from 'motion/react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile, stats } from '../data'
import { GitHubIcon, LinkedInIcon } from './ui'

/* A live "data graph": nodes drift, link up when close, and lean toward the cursor. */
function NodeField() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, nodes, raf
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (w * h) / 16000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }
    const color = () => (document.documentElement.classList.contains('dark') ? '148,190,255' : '60,80,140')

    const tick = () => {
      const c = color()
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y
        const d = Math.hypot(dx, dy)
        if (d < 180) { n.vx += (dx / d) * 0.012; n.vy += (dy / d) * 0.012 }
        n.vx *= 0.985; n.vy *= 0.985
        n.vx += (Math.random() - 0.5) * 0.02; n.vy += (Math.random() - 0.5) * 0.02
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(${c},${0.18 * (1 - d / 130)})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${c},0.7)`
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const onLeave = () => { mouse.x = mouse.y = -9999 }
    resize(); tick()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % profile.roles.length), 2600); return () => clearInterval(t) }, [])
  return (
    <span className="relative inline-grid h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="text-gradient whitespace-nowrap"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Counter({ value, decimals = 0, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix } })
    return () => c.stop()
  }, [inView, value, decimals, suffix])
  return <span ref={ref}>0{suffix}</span>
}

const fade = (d) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } })

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="aurora" />
      <div className="grid-bg absolute inset-0" />
      <NodeField />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-8 top-6 hidden xl:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-cyan-400/40 via-violet-500/30 to-pink-400/30 blur-2xl" />
            <img src={profile.photo} alt="Bhavya Vadher" width="260" height="260" className="relative h-[260px] w-[260px] rounded-[2rem] border border-white/10 object-cover shadow-2xl" />
            <div className="absolute -bottom-4 -left-6 flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 text-xs backdrop-blur-xl">
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" /> Toronto, Canada
            </div>
          </div>
        </motion.div>
        <motion.a {...fade(0)} href="#experience" className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs backdrop-blur-md">
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-muted">Currently</span>
          <span className="font-semibold">Senior Developer @ CIBC</span>
          <ArrowUpRight size={13} className="text-muted" />
        </motion.a>

        <motion.h1 {...fade(0.1)} className="text-[clamp(2.6rem,7.5vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
          Hi, I’m {profile.first}.
          <br />
          <RotatingRole />
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {profile.tagline}
        </motion.p>

        <motion.div {...fade(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl bg-[var(--fg)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:opacity-90">
            See my work <ArrowDown size={15} className="transition group-hover:translate-y-0.5" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold backdrop-blur-md transition hover:border-[var(--muted)]">
            Get in touch
          </a>
          <div className="ml-1 flex items-center gap-1">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-xl text-muted transition hover:bg-[var(--line)] hover:text-[var(--fg)]"><GitHubIcon width={18} height={18} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-xl text-muted transition hover:bg-[var(--line)] hover:text-[var(--fg)]"><LinkedInIcon width={18} height={18} /></a>
          </div>
          <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} /> Toronto, Canada</span>
        </motion.div>

        <motion.dl {...fade(0.45)} className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-[var(--line)] sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[var(--bg)] p-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-bold tracking-tight"><Counter {...s} /></dd>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
