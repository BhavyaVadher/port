import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { profile } from '../data'
import { GitHubIcon, LinkedInIcon, Reveal, Section, spotlight } from './ui'

export default function Contact() {
  const [state, setState] = useState('idle')

  // Static hosting (GitHub Pages) has no form backend, so the form drafts an email in the visitor's mail app.
  const onSubmit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    const subject = d.subject || `Hello from ${d.name}`
    const body = `${d.message}\n\n— ${d.name} (${d.email})`
    setState('sending')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setTimeout(() => setState('sent'), 400)
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
              { href: `mailto:${profile.email}`, icon: Mail, title: 'Email', sub: profile.email },
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
          <form name="contact" onSubmit={onSubmit} className="card grid gap-4 p-6 sm:grid-cols-2 sm:p-7">
            <label className="grid gap-1.5 text-sm">Name<input required name="name" autoComplete="name" placeholder="Jane Doe" className={field} /></label>
            <label className="grid gap-1.5 text-sm">Email<input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" className={field} /></label>
            <label className="grid gap-1.5 text-sm sm:col-span-2">Subject<input name="subject" placeholder="Data Engineer role at …" className={field} /></label>
            <label className="grid gap-1.5 text-sm sm:col-span-2">Message<textarea required name="message" rows={5} placeholder="Tell me a bit about it…" className={`${field} resize-none`} /></label>
            <div className="flex items-center justify-between gap-4 sm:col-span-2">
              <p className="text-sm text-muted" role="status">
                {state === 'sent' && <span className="inline-flex items-center gap-1.5 text-emerald-500"><CheckCircle2 size={15} /> Your email app should open with the message ready to send.</span>}
                {state === 'error' && <span className="text-rose-500">Couldn’t open your email app — please message me on LinkedIn.</span>}
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
