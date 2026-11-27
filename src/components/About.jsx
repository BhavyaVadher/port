import { useEffect, useState } from 'react'
import { Award, Clock, GraduationCap, Repeat, Sparkles } from 'lucide-react'
import { awards, education, profile, skillGroups } from '../data'
import { Reveal, Section, spotlight } from './ui'

function TorontoClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  const time = now.toLocaleTimeString('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const hour = Number(now.toLocaleString('en-CA', { timeZone: 'America/Toronto', hour: 'numeric', hour12: false }))
  const mood = hour >= 9 && hour < 18 ? 'Probably shipping pipelines' : hour >= 18 && hour < 23 ? 'Probably side-projecting' : 'Probably asleep'
  return (
    <>
      <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight">{time}</p>
      <p className="mt-1 text-sm text-muted">Toronto (ET) · {mood}</p>
    </>
  )
}

const allTools = skillGroups.flatMap((g) => g.items)

export default function About() {
  return (
    <Section id="about" eyebrow="01 · About" title={<>Analytics meets engineering — <span className="text-muted">and I live right in the middle.</span></>}>
      <div className="grid grid-cols-1 auto-rows-[minmax(170px,auto)] gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4 md:row-span-2">
          <div onMouseMove={spotlight} className="card h-full p-7 sm:p-8">
            <div className="flex items-center gap-4">
              <img src={profile.avatar} alt="Bhavya Vadher" width="64" height="64" className="h-16 w-16 rounded-2xl object-cover ring-1 ring-[var(--line)]" />
              <div>
                <p className="text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-muted">Senior Specialty Developer · CIBC</p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                I started in electronics engineering, fell for data at <span className="text-[var(--fg)]">BISAG-N</span> building pipelines for government-scale datasets, and came to Canada to go deeper on AI & ML at Lambton College.
              </p>
              <p>
                At <span className="text-[var(--fg)]">BMO</span> I designed dimensional models, Azure Data Factory pipelines and 10+ Power BI dashboards for KPI tracking. Now at <span className="text-[var(--fg)]">CIBC</span> I modernize legacy security automation for Identity & Access Review operations — moving R and VBScript to Python, Power Automate and Office Scripts with byte-identical output, proven by automated tests.
              </p>
              <p>What I care about: code the next person can maintain, numbers people can trust, and automation that gives teams their week back.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-2">
          <div onMouseMove={spotlight} className="card h-full p-6">
            <Clock size={18} className="mb-4 text-cyan-400" />
            <TorontoClock />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div onMouseMove={spotlight} className="card h-full p-6">
            <Repeat size={18} className="mb-4 text-violet-400" />
            <p className="font-semibold">Right now</p>
            <p className="mt-1 font-mono text-sm text-muted">
              <span className="text-pink-400">R · VBScript</span> → <span className="text-cyan-400">Python · Power Automate · TS</span> · zero logic drift
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-3">
          <div onMouseMove={spotlight} className="card h-full p-6">
            <GraduationCap size={18} className="mb-4 text-emerald-400" />
            <ul className="space-y-3">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-semibold">{e.degree}</p>
                  <p className="text-sm text-muted">{e.school} · {e.period}{e.note ? ` · ${e.note}` : ''}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-3">
          <div onMouseMove={spotlight} className="card h-full p-6">
            <Award size={18} className="mb-4 text-amber-400" />
            <ul className="space-y-2 text-sm">
              {awards.map((a) => (
                <li key={a} className="flex items-start gap-2"><Sparkles size={14} className="mt-0.5 shrink-0 text-amber-400" />{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="md:col-span-6">
          <div className="card marquee flex overflow-hidden py-5">
            <div className="marquee-track flex shrink-0 gap-3 pr-3">
              {[...allTools, ...allTools].map((t, i) => (
                <span key={i} className="whitespace-nowrap rounded-full border border-line px-4 py-1.5 font-mono text-xs text-muted">{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
