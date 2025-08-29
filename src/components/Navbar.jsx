import React, { useState } from 'react'
import assets from '../assets/assets'
import ThemetoggleBtn from './ThemetoggleBtn'
import { motion, AnimatePresence } from "framer-motion"





const navVariants = {
    hidden: { opacity: 0, y: -60, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1] 
        }
    }
}

const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.2 + i * 0.08, duration: 0.4 }
    })
}

const sidebarVariants = {
    closed: { x: '100%', opacity: 0 },
    open: { 
        x: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
    }
}

const sidebarBgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
}

const sidebarLinkVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: 0.2 + i * 0.09, duration: 0.4, type: "spring", stiffness: 200 }
    })
}

const Navbar = ({ theme, setTheme }) => {
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const navLinks = [
        { href: "#", label: "Home" },
        { href: "#services", label: "Services" },
        { href: "#our-work", label: "Our Work" },
        { href: "#contact-us", label: "Contact Us" }
    ]

    return (
        <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className='flex justify-between items-center px-4 
                sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20
                backdrop-blur-xl font-medium bg-white/70 dark:bg-gray-900/80
                shadow-lg shadow-primary/10 dark:shadow-black/30
                border-b border-primary/10 dark:border-white/10'
        >
            <motion.img
                src={theme === 'dark' ? assets.logo_dark : assets.logo}
                className='w-32 sm:w-40 drop-shadow-lg'
                alt="Logo"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-7">
                {navLinks.map((link, i) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        className='relative px-2 py-1 text-gray-700 dark:text-white text-base font-semibold
                            hover:text-primary dark:hover:text-primary transition-colors
                            after:content-[""] after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left'
                        custom={i}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.08 }}
                    >
                        {link.label}
                    </motion.a>
                ))}
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {sideBarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            key="sidebar-bg"
                            className="fixed inset-0 bg-black z-20"
                            variants={sidebarBgVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={() => setSideBarOpen(false)}
                        />
                        {/* Sidebar */}
                        <motion.div
                            key="sidebar"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sidebarVariants}
                            className='fixed top-0 right-0 bottom-0 w-64 bg-gradient-to-br from-primary to-purple-700 text-gray-800 dark:text-white z-30 flex flex-col pt-20 gap-7 px-8 shadow-2xl rounded-l-3xl'
                        >
                            <motion.img 
                                src={assets.close_icon} 
                                alt="" 
                                className='w-6 absolute right-5 top-5 cursor-pointer hover:rotate-90 transition-transform'
                                onClick={() => setSideBarOpen(false)}
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 90 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            />
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setSideBarOpen(false)}
                                    className='text-lg font-semibold hover:text-yellow-300 transition-colors px-2 py-2 rounded-lg hover:bg-white/10'
                                    custom={i}
                                    variants={sidebarLinkVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact-us"
                                className='mt-8 bg-yellow-400 text-primary font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors text-center'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Connect
                            </motion.a>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Right Controls */}
            <div className='flex items-center gap-2 sm:gap-4'>
                <ThemetoggleBtn theme={theme} setTheme={setTheme} />

                {/* Mobile Menu Icon */}
                <motion.img
                    src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon}
                    alt=""
                    onClick={() => setSideBarOpen(true)}
                    className='w-8 sm:hidden cursor-pointer active:scale-90 transition-transform'
                    whileTap={{ scale: 0.9, rotate: 10 }}
                    initial={false}
                    animate={sideBarOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Desktop Connect Button */}
                <motion.a
                    href="#contact-us"
                    className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all shadow-md hover:shadow-lg'
                    whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.15)" }}
                >
                    Connect <img src={assets.arrow_icon} width={14} alt="" />
                </motion.a>
            </div>
        </motion.div>
    )
}

export default Navbar