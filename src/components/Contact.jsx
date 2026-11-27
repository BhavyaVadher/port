import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react'
import { profile } from '../data'
import { GitHubIcon, LinkedInIcon, Reveal, Section, spotlight } from './ui'

const encode = (data) => new URLSearchParams(data).toString()

export default function Contact() {
  const [state, setState] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setState('sending')
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...data }) })
      if (!res.ok) throw new Error()
      setState('sent')
      e.target.reset()
    } catch {
      setState('error')
    }
  }

  const field = 'w-full rounded-xl border border-line bg-[var(--bg)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10'

  return (
    <Section id="contact" eyebrow="06 · Contact" title={<>Have a data problem, a role, <span className="text-muted">or just want to talk shop?</span></>}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="flex h-full flex-col gap-4">
            {[
              { href: profile.linkedin, icon: LinkedInIcon, title: 'LinkedIn', sub: 'Fastest way to reach me' },
              { href: profile.github, icon: GitHubIcon, title: 'GitHub', sub: '@BhavyaVadher' },
            ].map((c) => (
              <a key={c.title} href={c.href} target="_blank" rel="noreferrer" onMouseMove={spotlight} className="card group flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--line)]"><c.icon width={18} height={18} /></span>
                <span className="flex-1">
                  <span className="block font-semibold">{c.title}</span>
                  <span className="block text-sm text-muted">{c.sub}</span>
                </span>
                <ArrowUpRight size={18} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            <div className="card flex-1 p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">Open to</p>
              <p className="mt-2 leading-relaxed">Data engineering, analytics engineering and applied-AI roles and collaborations in Toronto or remote.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-3">
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="card grid gap-4 p-6 sm:grid-cols-2 sm:p-7">
            <input type="hidden" name="form-name" value="contact" />
            <p hidden><label>Don’t fill this out: <input name="bot-field" /></label></p>
            <label className="grid gap-1.5 text-sm">Name<input required name="name" autoComplete="name" placeholder="Jane Doe" className={field} /></label>
            <label className="grid gap-1.5 text-sm">Email<input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" className={field} /></label>
            <label className="grid gap-1.5 text-sm sm:col-span-2">Subject<input name="subject" placeholder="Data Engineer role at …" className={field} /></label>
            <label className="grid gap-1.5 text-sm sm:col-span-2">Message<textarea required name="message" rows={5} placeholder="Tell me a bit about it…" className={`${field} resize-none`} /></label>
            <div className="flex items-center justify-between gap-4 sm:col-span-2">
              <p className="text-sm text-muted" role="status">
                {state === 'sent' && <span className="inline-flex items-center gap-1.5 text-emerald-500"><CheckCircle2 size={15} /> Thanks — I’ll get back to you soon.</span>}
                {state === 'error' && <span className="text-rose-500">Couldn’t send — please message me on LinkedIn.</span>}
              </p>
              <button disabled={state === 'sending'} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 disabled:opacity-60">
                {state === 'sending' ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Send message
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
