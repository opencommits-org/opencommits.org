import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://opencommits.org'),
  title: {
    default: 'Git Commit Messages Standard | OpenCommits',
    template: '%s | OpenCommits',
  },
  description: 'OpenCommits is a git commit standard for clean, deterministic commit messages with built-in SemVer mapping and CI-ready validation.',
  keywords: [
    'git commit standard',
    'commit message convention',
    'commit message format',
    'semantic commits',
    'conventional commits alternative',
    'semver commit mapping',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
