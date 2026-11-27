import { useEffect, useRef, useState } from 'react'
import { awards, education, experience, profile, projects, skillGroups } from '../data'
import { Reveal, Section } from './ui'

const HELP = [
  ['whoami', 'who I am'],
  ['experience', 'where I’ve worked'],
  ['skills', 'my toolbox'],
  ['projects', 'things I’ve built'],
  ['education', 'where I studied'],
  ['awards', 'recognition'],
  ['now', 'what I’m doing right now'],
  ['contact', 'how to reach me'],
  ['open <github|linkedin>', 'open a profile'],
  ['sudo hire bhavya', '¯\\_(ツ)_/¯'],
  ['clear', 'clear the screen'],
]

function respond(raw) {
  const cmd = raw.trim().toLowerCase()
  if (!cmd) return null
  if (cmd === 'help' || cmd === '?') return HELP.map(([c, d]) => <div key={c}><span className="text-cyan-400">{c.padEnd(24, ' ')}</span><span className="text-muted">{d}</span></div>)
  if (cmd === 'whoami') return `${profile.name} — Senior Developer (data & analytics) in ${profile.location}. Currently at CIBC, previously BMO.`
  if (cmd === 'now') return experience[0].summary
  if (cmd === 'experience' || cmd === 'exp') return experience.map((e) => <div key={e.company}><span className="text-violet-300">{e.period.padEnd(22, ' ')}</span><span className="font-semibold">{e.company}</span><span className="text-muted"> · {e.role}</span></div>)
  if (cmd === 'skills') return skillGroups.map((g) => <div key={g.name}><span className="text-cyan-400">{(g.name + ':').padEnd(18, ' ')}</span>{g.items.join(', ')}</div>)
  if (cmd === 'projects') return projects.map((p) => <div key={p.title}><span className="text-emerald-300">▸ {p.title}</span><span className="text-muted"> — {p.kind}</span></div>)
  if (cmd === 'education') return education.map((e) => <div key={e.school}>{e.degree} <span className="text-muted">· {e.school}</span></div>)
  if (cmd === 'awards') return awards.map((a) => <div key={a}>★ {a}</div>)
  if (cmd === 'contact') return <>Scroll down to the form, or find me on <a className="text-cyan-400 underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.</>
  if (cmd.startsWith('open ')) {
    const t = cmd.slice(5)
    if (t === 'github' || t === 'linkedin') { window.open(t === 'github' ? profile.github : profile.linkedin, '_blank', 'noopener'); return `Opening ${t}…` }
    return `open: unknown target "${t}". Try: open github`
  }
  if (cmd === 'sudo hire bhavya' || cmd === 'hire') return <span className="text-emerald-300">✔ Permission granted. Redirecting you to the contact form… <a href="#contact" className="underline">go</a></span>
  if (cmd === 'sudo') return 'Nice try 😄'
  if (cmd === 'ls') return 'about.md  experience.json  skills.yml  projects/  contact.sh'
  if (cmd === 'python' || cmd === 'r') return `${cmd === 'r' ? 'R' : 'Python'}? Both. Currently translating one into the other.`
  return `command not found: ${cmd}. Type "help".`
}

export default function Terminal() {
  const [lines, setLines] = useState([{ cmd: 'whoami', out: respond('whoami') }])
  const [value, setValue] = useState('')
  const [hist, setHist] = useState([])
  const [hi, setHi] = useState(-1)
  const bodyRef = useRef(null)

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }) }, [lines])

  const submit = (e) => {
    e.preventDefault()
    const v = value
    setValue(''); setHi(-1)
    if (v.trim()) setHist((h) => [v, ...h])
    if (v.trim().toLowerCase() === 'clear') return setLines([])
    setLines((l) => [...l, { cmd: v, out: respond(v) }])
  }

  return (
    <Section id="terminal" eyebrow="05 · Terminal" title={<>Prefer the command line? <span className="text-muted">So do I.</span></>}>
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-[#0a0d14] text-[#d7deea] shadow-2xl shadow-cyan-500/5" onClick={() => document.getElementById('term-input')?.focus()}>
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-white/40">bhavya@portfolio: ~ — zsh</span>
          </div>
          <div ref={bodyRef} className="h-[360px] overflow-y-auto p-5 font-mono text-[13px] leading-6 [--muted:#7d8799]">
            <p className="text-white/40">Type <span className="text-cyan-400">help</span> to see what you can ask. ↑/↓ for history.</p>
            {lines.map((l, i) => (
              <div key={i} className="mt-2">
                <p><span className="text-emerald-400">➜</span> <span className="text-cyan-400">~</span> {l.cmd}</p>
                {l.out && <div className="whitespace-pre-wrap">{l.out}</div>}
              </div>
            ))}
            <form onSubmit={submit} className="mt-2 flex items-center gap-2">
              <span className="text-emerald-400">➜</span> <span className="text-cyan-400">~</span>
              <input
                id="term-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); setHi(n); setValue(hist[n]) }
                  if (e.key === 'ArrowDown') { e.preventDefault(); const n = hi - 1; setHi(n); setValue(n >= 0 ? hist[n] : '') }
                }}
                className="flex-1 bg-transparent caret-cyan-400 outline-none"
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-3">
            {['help', 'experience', 'skills', 'projects', 'sudo hire bhavya'].map((c) => (
              <button key={c} onClick={(e) => { e.stopPropagation(); setLines((l) => [...l, { cmd: c, out: respond(c) }]) }} className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-white/60 transition hover:border-cyan-400/50 hover:text-white">
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
