'use client'

import { useMemo } from 'react'
import s from './ContributionGrid.module.css'

// Seeded random for consistent rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function ContributionGrid() {
  const squares = useMemo(() => {
    const result: number[] = []
    // 50 x 50 = 2500 squares
    for (let i = 0; i < 2500; i++) {
      // Use seeded random for consistent SSR/client rendering
      const rand = seededRandom(i * 9973)
      // Weighted distribution: more empty/light squares
      if (rand < 0.4) result.push(0)
      else if (rand < 0.6) result.push(1)
      else if (rand < 0.8) result.push(2)
      else if (rand < 0.92) result.push(3)
      else result.push(4)
    }
    return result
  }, [])

  return (
    <div className={s.grid}>
      {squares.map((level, i) => (
        <div
          key={i}
          className={`${s.square} ${level > 0 ? s[`square${level}`] : ''}`}
        />
      ))}
    </div>
  )
}
