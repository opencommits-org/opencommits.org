'use client'

import { useState } from 'react'
import styles from './RegexBlock.module.css'

interface RegexBlockProps {
  label: string
  regex: string
  plain: string
}

export default function RegexBlock({ label, regex, plain }: RegexBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(plain).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <button onClick={copy} className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: regex }} />
    </div>
  )
}
