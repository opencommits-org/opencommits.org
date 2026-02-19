import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenCommits — A Better Commit Standard',
  description: 'A minimal, deterministic commit message standard. Replaces noise with signal. Built for teams. Designed to last.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
