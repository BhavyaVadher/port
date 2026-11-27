import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { Award, ChevronDown } from 'lucide-react'
import { experience } from '../data'
import { Chip, Reveal, Section, spotlight } from './ui'

function Job({ job, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div onMouseMove={spotlight} className="card p-6 sm:p-7">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start justify-between gap-4 text-left" aria-expanded={open}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight">{job.company}</h3>
            {job.current && <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-500 dark:text-emerald-300">Now</span>}
          </div>
          <p className="mt-0.5 text-[15px]">{job.role}</p>
          <p className="mt-1 font-mono text-xs text-muted">{job.period} · {job.place}</p>
        </div>
        <ChevronDown size={18} className={`mt-1 shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">{job.summary}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {job.points.map((p) => (
              <li key={p} className="mt-2.5 flex gap-3 text-[15px] leading-relaxed first:mt-4">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                {p}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {job.award && (
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-300">
          <Award size={13} /> {job.award}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-2">{job.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  return (
    <Section id="experience" eyebrow="02 · Experience" title={<>Four teams, two countries, <span className="text-muted">one thread: making data dependable.</span></>}>
      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--line)] sm:left-[11px]" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-cyan-400 via-violet-400 to-pink-400 sm:left-[11px]" />
        <div className="space-y-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={0.05}>
              <div className="relative">
                <span className={`absolute -left-8 top-8 grid h-4 w-4 place-items-center rounded-full border-2 border-[var(--bg)] sm:-left-12 sm:h-6 sm:w-6 ${job.current ? 'bg-emerald-400' : 'bg-[var(--muted)]'}`}>
                  {job.current && <span className="pulse-dot h-full w-full rounded-full bg-emerald-400" />}
                </span>
                <Job job={job} defaultOpen={i < 2} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
