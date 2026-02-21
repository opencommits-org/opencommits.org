'use client'

import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])
  const mx = useRef(0)
  const my = useRef(0)
  const rafRef = useRef<number | null>(null)
  const hiddenRef = useRef(false)
  const layerClasses = [styles.layer0, styles.layer1, styles.layer2, styles.layer3, styles.layer4]
  const clickableSelector = 'a, button, input, select, textarea, summary, label[for], [role="button"], [data-clickable="true"]'

  useEffect(() => {
    const points = Array.from({ length: 5 }, () => ({ x: 0, y: 0 }))

    const setHidden = (hidden: boolean) => {
      if (hiddenRef.current === hidden) return
      hiddenRef.current = hidden
      layerRefs.current.forEach((el) => {
        if (!el) return
        el.classList.toggle(styles.hidden, hidden)
      })
    }

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      const hovered = document.elementFromPoint(e.clientX, e.clientY)
      const overClickable = hovered instanceof Element && hovered.closest(clickableSelector)
      setHidden(Boolean(overClickable))
    }

    const animate = () => {
      points[0].x += (mx.current - points[0].x) * 0.34
      points[0].y += (my.current - points[0].y) * 0.34
      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.3
        points[i].y += (points[i - 1].y - points[i].y) * 0.3
      }

      layerRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.left = points[i].x + 'px'
        el.style.top = points[i].y + 'px'
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el
          }}
          className={`${styles.cursorLayer} ${layerClasses[i]}`}
        />
      ))}
    </>
  )
}
