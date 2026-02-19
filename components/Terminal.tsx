'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Terminal.module.css'

const before = [
  'feat(ui): Add accordion menu component',
  'fix: Fix login redirect loop issue',
  'refactor(core): Session cleanup and reorganization',
  'chore(ci): Update pipeline for staging deployments',
  'fix(a11y): Fix missing aria labels on modal',
  'perf(db): optimize transaction batching',
]

type Part = [string, string?]
const after: Part[][] = [
  [['Add', 'accent'], [' '], ['ui', 'blue'], [' accordion menu']],
  [['Fix', 'accent'], [' login redirect loop']],
  [['Ref', 'accent'], [' '], ['core', 'blue'], [' session cleanup']],
  [['Chr', 'accent'], [' '], ['ci', 'blue'], [' update staging pipeline']],
  [['Fix', 'accent'], [' '], ['a11y', 'blue'], [' missing aria labels']],
  [['Opt', 'accent'], [' '], ['db', 'blue'], [' transaction batching']],
]

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState<boolean[]>(new Array(6).fill(false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          after.forEach((_, i) => {
            setTimeout(() => setRevealed(prev => { const n = [...prev]; n[i] = true; return n }), i * 130)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.terminal}>
      <div className={styles.bar}>
        <div className={`${styles.dot} ${styles.dotRed}`} />
        <div className={`${styles.dot} ${styles.dotYellow}`} />
        <div className={`${styles.dot} ${styles.dotGreen}`} />
        <span className={styles.barTitle}>git log --oneline</span>
      </div>
      <div className={styles.body}>
        <div className={`${styles.col} ${styles.colBefore}`}>
          <div className={`${styles.colLabel} ${styles.labelBad}`}>// Before</div>
          {before.map((line, i) => (
            <div key={i} className={`${styles.line} ${styles.lineBefore}`}>{line}</div>
          ))}
        </div>
        <div className={`${styles.col} ${styles.colAfter}`}>
          <div className={`${styles.colLabel} ${styles.labelGood}`}>// OpenCommits</div>
          {after.map((parts, i) => (
            <div key={i} className={`${styles.line} ${styles.lineAfter} ${revealed[i] ? styles.lineAfterVisible : ''}`}>
              {parts.map(([text, color], j) => (
                <span key={j} className={
                  color === 'accent' ? styles.typeAccent :
                  color === 'blue' ? styles.typeBlue :
                  styles.typeText
                }>{text}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
