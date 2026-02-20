'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './TypesGrid.module.css'

const coreTypes = [
  { tag: 'Add', name: 'New features or capabilities', desc: 'Introducing new behavior, components, endpoints, or flows.', example: [['Add','accent'],[' '],['ui','blue'],[' accordion menu']], semver: 'minor' },
  { tag: 'Fix', name: 'Bug fixes or incorrect behavior', desc: 'Any correction of incorrect runtime behavior or bugs.', example: [['Fix','accent'],[' '],['api','blue'],[' pagination off by one']], semver: 'patch' },
  { tag: 'Ref', name: 'Refactor internal structure', desc: 'Structural changes that do not alter external behavior.', example: [['Ref','accent'],[' '],['core','blue'],[' session cleanup']], semver: 'none' },
  { tag: 'Opt', name: 'Performance optimizations', desc: 'When the primary goal is speed, efficiency, or resource reduction.', example: [['Opt','accent'],[' '],['db','blue'],[' transaction batching']], semver: 'none' },
  { tag: 'Rmv', name: 'Remove code or features', desc: 'Dead code, obsolete functionality. Use Rmv! for breaking removals.', example: [['Rmv','accent'],[' unused cache layer']], semver: 'none' },
  { tag: 'Doc', name: 'Documentation and comments', desc: 'README, API docs, architecture docs, inline comments.', example: [['Doc','accent'],[' auth token lifecycle']], semver: 'none' },
  { tag: 'Tst', name: 'Add or update tests', desc: 'Any test-only change — adding, updating, or fixing tests.', example: [['Tst','accent'],[' add jwt expiration edge cases']], semver: 'none' },
  { tag: 'Sty', name: 'Style and formatting', desc: 'Purely cosmetic — formatting, linting, prettier. No logic changes.', example: [['Sty','accent'],[' apply prettier across backend']], semver: 'none' },
  { tag: 'Chr', name: 'Chores', desc: 'Tooling, CI/CD, dependency updates, build scripts, infrastructure.', example: [['Chr','accent'],[' '],['ci','blue'],[' update staging pipeline']], semver: 'none' },
  { tag: 'Rev', name: 'Revert a previous commit', desc: 'Reference the original Type and description. Rev! for breaking rollbacks.', example: [['Rev','accent'],[' Add experimental sidebar']], semver: 'none' },
]

const extendedTypes = [
  { tag: 'Mov', name: 'Move files or modules', desc: 'Relocation without logic changes.', example: [['Mov','blue'],[' '],['ui','scope'],[' components to shared/ui']], semver: 'none' },
  { tag: 'Rnm', name: 'Rename identifiers or files', desc: 'Renaming across the codebase.', example: [['Rnm','blue'],[' user_service to account_service']], semver: 'none' },
  { tag: 'Dep', name: 'Deprecate features or APIs', desc: 'Mark as deprecated but not yet removed. Signals a future Rmv!.', example: [['Dep','blue'],[' v1 user endpoints']], semver: 'minor' },
  { tag: 'Sec', name: 'Security-specific changes', desc: 'Explicitly highlight security work when visibility matters.', example: [['Sec','blue'],[' fix csrf vulnerability in forms']], semver: 'patch' },
  { tag: 'Cfg', name: 'Configuration-only changes', desc: 'Purely configuration with no code logic involved.', example: [['Cfg','blue'],[' update webpack production settings']], semver: 'none' },
]

const semverClass: Record<string, string> = {
  major: styles.semverMajor,
  minor: styles.semverMinor,
  patch: styles.semverPatch,
  none: styles.semverNone,
}

const semverLabel: Record<string, string> = {
  major: 'major', minor: 'minor', patch: 'patch', none: '—',
}

type CardType = typeof coreTypes[0]

function TypeCard({ type, extended, index }: { type: CardType, extended?: boolean, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVis(true), index * 60)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className={`${styles.card} ${vis ? styles.cardVisible : ''}`}>
      <div className={styles.cardHeader}>
        <span className={`${styles.typeTag} ${extended ? styles.typeTagExtended : ''}`}>
          {type.tag}
        </span>
        <span className={`${styles.semverBadge} ${semverClass[type.semver]}`}>
          {semverLabel[type.semver]}
        </span>
      </div>
      <div className={styles.typeName}>{type.name}</div>
      <div className={styles.typeDesc}>{type.desc}</div>
      <div className={styles.typeExample}>
        {type.example.map(([text, color], i) => (
          <span key={i} className={
            color === 'accent' ? styles.exAccent :
            color === 'scope' ? styles.exScope :
            color === 'blue' ? (extended ? styles.exBlue : styles.exScope) : ''
          }>{text}</span>
        ))}
      </div>
    </div>
  )
}

export default function TypesGrid() {
  const [tab, setTab] = useState<'core' | 'extended'>('core')
  const types = tab === 'core' ? coreTypes : extendedTypes

  return (
    <div>
      <div className={styles.tabs}>
        {(['core', 'extended'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {types.map((type, i) => (
          <TypeCard key={type.tag} type={type} extended={tab === 'extended'} index={i} />
        ))}
      </div>
    </div>
  )
}
