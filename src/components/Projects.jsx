import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import { hiddenRepos, liveRepoLanguages, profile, projects } from '../data'
import { Chip, GitHubIcon, Reveal, Section, spotlight } from './ui'

function TiltCard({ p, big }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })
  const Tag = p.repo ? 'a' : 'div'
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className="h-full">
      <Tag
        href={p.repo}
        target={p.repo ? '_blank' : undefined}
        rel="noreferrer"
        onMouseMove={(e) => {
          spotlight(e)
          const r = e.currentTarget.getBoundingClientRect()
          x.set((e.clientX - r.left) / r.width)
          y.set((e.clientY - r.top) / r.height)
        }}
        onMouseLeave={() => { x.set(0.5); y.set(0.5) }}
        className={`card group flex h-full flex-col p-6 sm:p-7 ${big ? 'min-h-[300px]' : 'min-h-[230px]'}`}
      >
        <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`} />
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.kind}</p>
          {p.repo ? (
            <ArrowUpRight size={18} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Private</span>
          )}
        </div>
        <h3 className={`mt-4 font-bold tracking-tight ${big ? 'text-3xl' : 'text-xl'}`}>{p.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.blurb}</p>
        <div className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
      </Tag>
    </motion.div>
  )
}

function LiveRepos() {
  const [repos, setRepos] = useState(null)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=30`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setRepos(Array.isArray(d) ? d.filter((r) => !r.fork && !hiddenRepos.includes(r.name) && liveRepoLanguages.includes(r.language)).slice(0, 6) : []))
      .catch(() => setRepos([]))
    return () => ctrl.abort()
  }, [])

  if (repos && repos.length === 0) return null
  return (
    <Reveal>
      <div className="mt-16 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live from GitHub
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">Recently pushed</h3>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-[var(--fg)]">
          <GitHubIcon width={15} height={15} /> All repos
        </a>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(repos ?? Array.from({ length: 6 })).map((r, i) =>
          r ? (
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" onMouseMove={spotlight} className="card group block p-5">
              <p className="truncate font-mono text-sm font-semibold group-hover:text-cyan-400">{r.name}</p>
              <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm text-muted">{r.description || 'No description yet.'}</p>
              <div className="mt-3 flex items-center gap-4 font-mono text-xs text-muted">
                {r.language && <span>{r.language}</span>}
                <span className="inline-flex items-center gap-1"><Star size={12} />{r.stargazers_count}</span>
                <span className="inline-flex items-center gap-1"><GitFork size={12} />{r.forks_count}</span>
                <span className="ml-auto">{new Date(r.pushed_at).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })}</span>
              </div>
            </a>
          ) : (
            <div key={i} className="card h-[116px] animate-pulse" />
          ),
        )}
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const tags = ['All', ...new Set(projects.flatMap((p) => p.kind.split(' · ')))]
  const [tag, setTag] = useState('All')
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured && (tag === 'All' || p.kind.includes(tag)))

  return (
    <Section id="projects" eyebrow="04 · Projects" title={<>Things I’ve built <span className="text-muted">outside the 9-to-5.</span></>}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}><TiltCard p={p} big /></Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mb-5 mt-12 flex flex-wrap gap-2">
          {tags.map((t) => <Chip key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Chip>)}
        </div>
      </Reveal>
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <motion.div layout key={p.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <TiltCard p={p} />
          </motion.div>
        ))}
      </motion.div>

      <LiveRepos />
    </Section>
  )
}
