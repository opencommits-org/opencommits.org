'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('nav')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled || menuOpen ? styles.navScrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoText}>
          {'open'.split('').map((ch, i) => (
            <span key={i} className={styles.logoLetter} style={{ animationDelay: `${i * 40}ms` }}>{ch}</span>
          ))}
          {'commits'.split('').map((ch, i) => (
            <span key={i + 4} className={`${styles.logoLetter} ${styles.logoAccent}`} style={{ animationDelay: `${(i + 4) * 40}ms` }}>{ch}</span>
          ))}
        </span>
        <span className={styles.badge}>
          {t('version')}
          <span className={styles.badgeDot} />
        </span>
      </Link>
      <div className={styles.controls}>
        <span className={styles.mobileOnly}><ThemeToggle /></span>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>
      <div className={`${styles.links} ${menuOpen ? styles.menuOpen : ''}`}>
        <a href="#format" className={styles.link} onClick={() => setMenuOpen(false)}>{t('format')}</a>
        <a href="#types" className={styles.link} onClick={() => setMenuOpen(false)}>{t('types')}</a>
        <a href="#semver" className={styles.link} onClick={() => setMenuOpen(false)}>{t('semver')}</a>
        <a
          href="https://github.com/opencommits-org/opencommits/blob/main/opencommits.md"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          {t('spec')}
        </a>
        <a
          href="https://github.com/opencommits-org/opencommits"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghBtn}
        >
          <svg className={styles.ghIcon} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          <svg className={styles.ghStar} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.166L12 19.748l-7.334 3.415 1.4-8.166L.132 9.21l8.2-1.192z"/>
          </svg>
        </a>
        <span className={styles.desktopOnly}><ThemeToggle /></span>
      </div>
    </nav>
  )
}
