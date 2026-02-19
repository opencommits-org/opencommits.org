'use client'

import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mx = useRef(0)
  const my = useRef(0)
  const rx = useRef(0)
  const ry = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12
      ry.current += (my.current - ry.current) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px'
        ringRef.current.style.top = ry.current + 'px'
      }
      requestAnimationFrame(animate)
    }

    const grow = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '16px'; cursorRef.current.style.height = '16px' }
      if (ringRef.current) { ringRef.current.style.width = '48px'; ringRef.current.style.height = '48px' }
    }
    const shrink = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '8px'; cursorRef.current.style.height = '8px' }
      if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px' }
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    animate()

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
