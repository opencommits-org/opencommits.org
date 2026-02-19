import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import s from './spec.module.css'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'spec' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function SpecPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'spec' })

  // Try locale-specific translation first, fall back to English
  const translatedPath = join(process.cwd(), '..', 'spec', 'translations', locale, 'SPECIFICATION.md')
  const englishPath = join(process.cwd(), '..', 'spec', 'SPECIFICATION.md')
  const specPath = existsSync(translatedPath) ? translatedPath : englishPath
  const content = readFileSync(specPath, 'utf-8')

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <Link href="/" className={s.back}>{t('back')}</Link>
        <div className={s.badge}>
          <span className={s.badgeDot} />
          {t('badge')}
        </div>
        <div className="spec-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <div className={s.specFooter}>
          <div className={s.specFooterLeft}>{t('license')}</div>
          <a
            href="https://github.com/opencommits-org"
            target="_blank"
            rel="noopener noreferrer"
            className={s.specFooterLink}
          >
            {t('editGithub')}
          </a>
        </div>
      </div>
    </div>
  )
}
