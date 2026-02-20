'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('nav')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        <span>
          open<span className={styles.logoAccent}>commits</span>
        </span>
        <span className={styles.badge}>
          {t('version')}
          <span className={styles.badgeDot} />
        </span>
      </Link>
      <div className={styles.links}>
        <a href="#format" className={styles.link}>{t('format')}</a>
        <a href="#types" className={styles.link}>{t('types')}</a>
        <a href="#semver" className={styles.link}>{t('semver')}</a>
        <Link href="/spec" className={styles.link}>{t('spec')}</Link>
        <a
          href="https://github.com/opencommits-org"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          {t('github')}
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
