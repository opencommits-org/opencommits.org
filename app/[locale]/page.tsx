import { useTranslations } from 'next-intl'
import Terminal from '@/components/Terminal'
import TypesGrid from '@/components/TypesGrid'
import RegexBlock from '@/components/RegexBlock'
import Reveal from '@/components/Reveal'
import ContributionGrid from '@/components/ContributionGrid'
import s from './page.module.css'

export default function Home() {
  const t = useTranslations()

  return (
    <main>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroGrid}>
          <ContributionGrid />
        </div>
        <div className={s.heroInner}>
          <h1 className={s.heroTitle}>
            {t('hero.title')}<br />
            <span className={s.heroTitleGradient}>{t('hero.titleAccent')}</span>
          </h1>
          <p className={s.heroSub}>{t('hero.sub')}</p>
          <div className={s.heroActions}>
            <a href="https://github.com/opencommits-org/opencommits/blob/main/opencommits.md" target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>{t('hero.readSpec')}</a>
            <a href="https://github.com/opencommits-org" target="_blank" rel="noopener noreferrer" className={s.btnSecondary}>
              <GithubIcon /> {t('hero.github')}
            </a>
          </div>
          <div className={s.terminalWrap}>
            <Terminal />
          </div>
        </div>
      </section>

      {/* FORMAT */}
      <section id="format" className={s.section}>
        <Reveal><div className={s.sectionLabel}>{t('format.label')}</div></Reveal>
        <Reveal delay={100}><h2 className={s.sectionTitle}>{t('format.title')}<br />{t('format.titleLine2')}</h2></Reveal>
        <Reveal delay={150}><p className={s.sectionSub}>{t('format.sub')}</p></Reveal>
        <Reveal delay={200}>
          <div className={s.formatDisplay}>
            <div className={s.formatDisplayLine} />
            <span className={s.fRequired}>Type</span>
            <span className={s.fBang}>[!]</span>
            <span className={s.fSep}>·</span>
            <span className={`${s.fOptional} ${s.fScope}`}>[scope]</span>
            <span className={s.fSep}>·</span>
            <span className={s.fOptional}>description</span>
          </div>
        </Reveal>
        <Reveal delay={250}>
          <div className={s.formatParts}>
            {[
              { key: 'type', nameClass: s.fRequired, req: true },
              { key: 'bang', nameClass: s.fBang, req: false },
              { key: 'scope', nameClass: `${s.fOptional} ${s.fScope}`, req: false },
              { key: 'description', nameClass: s.fOptional, req: true },
            ].map(p => (
              <div key={p.key} className={s.formatPart}>
                <div className={s.formatPartName}>
                  <span className={p.nameClass}>{t(`format.parts.${p.key}.name`)}</span>
                  <span className={p.req ? s.tagRequired : s.tagOptional}>
                    {p.req ? t('format.required') : t('format.optional')}
                  </span>
                </div>
                <div className={s.formatPartDesc}>{t(`format.parts.${p.key}.desc`)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TYPES */}
      <section id="types" className={s.sectionAlt}>
        <div className={s.sectionInner}>
          <Reveal><div className={s.sectionLabel}>{t('types.label')}</div></Reveal>
          <Reveal delay={100}><h2 className={s.sectionTitle}>{t('types.title')}<br />{t('types.titleLine2')}</h2></Reveal>
          <Reveal delay={150}><p className={s.sectionSub}>{t('types.sub')}</p></Reveal>
          <TypesGrid />
        </div>
      </section>

      {/* SEMVER */}
      <section id="semver" className={s.section}>
        <Reveal><div className={s.sectionLabel}>{t('semver.label')}</div></Reveal>
        <Reveal delay={100}><h2 className={s.sectionTitle}>{t('semver.title')}<br />{t('semver.titleLine2')}</h2></Reveal>
        <Reveal delay={150}><p className={s.sectionSub}>{t('semver.sub')}</p></Reveal>
        <Reveal delay={200}>
          <table className={s.semverTable}>
            <thead>
              <tr>
                <th>{t('semver.colType')}</th>
                <th>{t('semver.colImpact')}</th>
                <th>{t('semver.colRule')}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Any Type + !', sv: s.svMajor, svLabel: 'major', ruleKey: 'breaking' },
                { type: 'Add',          sv: s.svMinor, svLabel: 'minor', ruleKey: 'add' },
                { type: 'Dep',          sv: s.svMinor, svLabel: 'minor', ruleKey: 'dep' },
                { type: 'Fix, Sec',     sv: s.svPatch, svLabel: 'patch', ruleKey: 'fix' },
                { type: 'Ref, Opt, Rmv, Mov, Rnm', sv: s.svInternal, svLabel: 'internal', ruleKey: 'internal' },
                { type: 'Doc, Tst, Sty, Chr, Cfg, Rev', sv: s.svNone, svLabel: 'none', ruleKey: 'none' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className={s.tdType}>{row.type}</td>
                  <td><span className={row.sv}>{row.svLabel}</span></td>
                  <td className={s.tdRule}>{t(`semver.rows.${row.ruleKey}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* REGEX */}
      <section className={s.regexSection}>
        <Reveal><div className={s.sectionLabel}>{t('validation.label')}</div></Reveal>
        <Reveal delay={100}><h2 className={s.sectionTitle}>{t('validation.title')}<br />{t('validation.titleLine2')}</h2></Reveal>
        <Reveal delay={150}><p className={s.sectionSub}>{t('validation.sub')}</p></Reveal>
        <Reveal delay={200}>
          <RegexBlock
            label={t('validation.defaultLabel')}
            plain="^(Add|Fix|Ref|Opt|Rmv|Doc|Tst|Sty|Chr|Mov|Rnm|Dep|Sec|Cfg|Rev)(!)?( [a-z][a-z0-9]*){0,2} [a-z].+$"
            regex={`<span style="color:var(--blue)">^</span><span style="color:var(--accent)">(Add|Fix|Ref|Opt|Rmv|Doc|Tst|Sty|Chr|Mov|Rnm|Dep|Sec|Cfg|Rev)</span><span style="color:var(--accent)">(!)?</span><span style="color:var(--accent)">( [a-z][a-z0-9]*)</span><span style="color:var(--yellow)">{0,2}</span> <span style="color:var(--accent)">[a-z].+</span><span style="color:var(--blue)">$</span>`}
          />
        </Reveal>
        <div className={s.regexGap} />
        <Reveal delay={250}>
          <RegexBlock
            label={t('validation.strictLabel')}
            plain="^(Add|Fix|Ref|Opt|Rmv|Doc|Tst|Sty|Chr|Mov|Rnm|Dep|Sec|Cfg|Rev)(!)?( [a-z][a-z0-9]*)? [a-z].+$"
            regex={`<span style="color:var(--blue)">^</span><span style="color:var(--accent)">(Add|Fix|Ref|Opt|Rmv|Doc|Tst|Sty|Chr|Mov|Rnm|Dep|Sec|Cfg|Rev)</span><span style="color:var(--accent)">(!)?</span><span style="color:var(--accent)">( [a-z][a-z0-9]*)</span><span style="color:var(--yellow)">?</span> <span style="color:var(--accent)">[a-z].+</span><span style="color:var(--blue)">$</span>`}
          />
        </Reveal>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaGrid}>
          <ContributionGrid />
        </div>
        <div className={s.ctaInner}>
          <Reveal>
            <h2 className={s.ctaTitle}>
              {t('cta.title')}<br /><span className={s.ctaTitleAccent}>{t('cta.titleAccent')}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={s.ctaSub}>{t('cta.sub')}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className={s.ctaActions}>
              <a href="https://github.com/opencommits-org/opencommits/blob/main/opencommits.md" target="_blank" rel="noopener noreferrer" className={s.btnPrimary}>{t('cta.readSpec')}</a>
              <a href="https://github.com/opencommits-org" target="_blank" rel="noopener noreferrer" className={s.btnSecondary}>
                {t('cta.contribute')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerLeft}>
          {t('footer.license')} <a href="https://creativecommons.org/licenses/by/4.0/">{t('footer.licenseLink')}</a>
        </div>
        <a href="/" className={s.footerRight}>{t('footer.domain')}</a>
      </footer>
    </main>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}
