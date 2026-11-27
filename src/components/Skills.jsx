import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BarChart3, Boxes, Database, ShieldCheck, Workflow } from 'lucide-react'
import { skillGroups } from '../data'
import { Chip, Reveal, Section, spotlight } from './ui'

const pipeline = [
  { icon: Database, title: 'Ingest', text: 'APIs, SQL databases, cloud & on-prem sources via ADF and SSIS' },
  { icon: Workflow, title: 'Transform', text: 'Python, R & Databricks SQL — tested, modular, scheduled' },
  { icon: Boxes, title: 'Model', text: 'Star & snowflake schemas built for fast, honest reporting' },
  { icon: ShieldCheck, title: 'Validate', text: 'Data-quality checks, lineage and governance baked in' },
  { icon: BarChart3, title: 'Serve', text: 'Power BI & Tableau dashboards people actually open' },
]

export default function Skills() {
  const [tab, setTab] = useState('All')
  const items = tab === 'All' ? skillGroups.flatMap((g) => g.items.map((i) => ({ i, g: g.name }))) : skillGroups.find((g) => g.name === tab).items.map((i) => ({ i, g: tab }))

  return (
    <Section id="skills" eyebrow="03 · Skills" title={<>The full path from raw source <span className="text-muted">to the number on the dashboard.</span></>}>
      <Reveal>
        <ol className="relative mb-16 grid gap-3 md:grid-cols-5">
          {pipeline.map((s, idx) => (
            <li key={s.title} onMouseMove={spotlight} className="card group p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-500 transition group-hover:scale-110 dark:text-cyan-300">
                  <s.icon size={18} />
                </span>
                <span className="font-mono text-xs text-muted">0{idx + 1}</span>
              </div>
              <p className="font-semibold">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal>
        <div className="mb-6 flex flex-wrap gap-2">
          {['All', ...skillGroups.map((g) => g.name)].map((t) => (
            <Chip key={t} active={tab === t} onClick={() => setTab(t)}>{t}</Chip>
          ))}
        </div>
        <motion.ul layout className="flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {items.map(({ i, g }) => (
              <motion.li
                layout
                key={g + i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-line bg-card px-4 py-2.5 text-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-400/50"
              >
                {i}
                {tab === 'All' && <span className="ml-2 font-mono text-[10px] text-muted">{g}</span>}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Reveal>
    </Section>
  )
}
