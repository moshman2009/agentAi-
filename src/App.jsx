import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

// Define hint targets and messages
const HINTS = [
  {
    x: () => window.innerWidth / 2, // Hero section (center)
    y: () => 350,
    msg: "Check out our Hero section!",
  },
  {
    x: () => window.innerWidth / 2,
    y: () => 700,
    msg: "See who trusts us below!",
  },
  {
    x: () => window.innerWidth / 2,
    y: () => 1100,
    msg: "Explore our Services!",
  },
  {
    x: () => window.innerWidth / 2,
    y: () => 1600,
    msg: "Take a peek at my Work!",
  },
  {
    x: () => window.innerWidth / 2,
    y: () => 2000,
    msg: "Meet the Team!",
  },
  {
    x: () => window.innerWidth / 2,
    y: () => document.body.scrollHeight - 100,
    msg: "Contact me below!",
  },
]


function EyeCursor({ target,hintMsg }) {
  // Eye position (center top, e.g., in Navbar)
  const eyeCenter = { x: window.innerWidth / 2, y: 60 }
  // Calculate angle to target
  const dx = target.x - eyeCenter.x
  const dy = target.y - eyeCenter.y
  const angle = Math.atan2(dy, dx)
  // Animate blinking
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000 + Math.random() * 2090)
    return () => clearInterval(interval)
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        left: `calc(50% - 24px)`,
        top: 16,
        width: 48,
        height: 48,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#fff',
          border: '2px solid #333',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Eyelid for blinking */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: blink ? '100%' : '0%',
            background: '#fff',
            transition: 'height 0.15s',
            zIndex: 2,
          }}
        />
        {/* Pupil */}
        <div
          style={{
            position: 'absolute',
            left: 24 + Math.cos(angle) * 10 - 8,
            top: 24 + Math.sin(angle) * 10 - 8,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#333',
            zIndex: 1,
            transition: 'left 0.2s, top 0.2s',
          }}
        />
      </div>
      {/* Show hint message if present */}
      {hintMsg && (
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#222',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: 8,
            fontSize: 14,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10,
            pointerEvents: 'auto',
            opacity: 0.95,
          }}
        >
          {hintMsg}
        </div>
         )}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const dotRef = useRef(null)
  const outlineRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)
  const [eyeTarget, setEyeTarget] = useState({ x: window.innerWidth / 2, y: 60 })

  // Refs for custom cursor Position tracking
  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setIsTouch(isTouchDevice())
    const handleResize = () => setIsTouch(isTouchDevice())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isTouch) {
      const handleMouseMove = (e) => {
        mouse.current.x = e.clientX
        mouse.current.y = e.clientY
      }
      document.addEventListener('mousemove', handleMouseMove)
      const animate = () => {
        position.current.x += (mouse.current.x - position.current.x) * 0.1
        position.current.y += (mouse.current.y - position.current.y) * 0.1
        if (dotRef.current && outlineRef.current) {
          dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px , ${mouse.current.y - 6}px, 0)`
          outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px , ${position.current.y - 20}px, 0 )`
        }
        requestAnimationFrame(animate)
      }
      animate()
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    } else {
      // Touch: track last tap or scroll for eye
      const handleTouch = (e) => {
        const touch = e.touches[0] || e.changedTouches[0]
        setEyeTarget({ x: touch.clientX, y: touch.clientY })
      }
      const handleClick = (e) => {
        setEyeTarget({ x: e.clientX, y: e.clientY })
      }
      const handleScroll = () => {
        setEyeTarget({ x: window.innerWidth / 2, y: 60 + window.scrollY })
      }
      document.addEventListener('touchstart', handleTouch)
      document.addEventListener('click', handleClick)
      window.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('touchstart', handleTouch)
        document.removeEventListener('click', handleClick)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isTouch])

  return (
    <div className='dark:bg-black relative'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />
      {/* Custom cursor for desktop */}
      {!isTouch && (
        <>
          <div
            ref={outlineRef}
            className='fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]'
            style={{ transition: 'transform 0.1s ease-out' }}
          ></div>
          <div
            ref={dotRef}
            className='fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]'
          ></div>
        </>
      )}
      {/* Eye for touch devices */}
      {isTouch && <EyeCursor target={eyeTarget} />}
    </div>
  )
}

export default App