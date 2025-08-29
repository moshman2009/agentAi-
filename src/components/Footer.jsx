import React from 'react'
import assets from '../assets/assets'
import { useForm, ValidationError } from '@formspree/react';
import { motion } from "framer-motion"

const footerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const sectionLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.2 } }
};

const sectionRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.4 } }
};

const Footer = ({ theme }) => {
    const [state, handleSubmit] = useForm("mnnbqqwe");
    const formRef = React.useRef();
    if (state.succeeded) {
        formRef.current.reset();
    }

    return (
        <motion.div
            className='bg-slate-50 dark:bg-gray-900 pt-10 sm:pt-10 mt-10 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40'
            variants={footerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Footer top */}
            <div className="flex justify-between lg:items-center max-lg:flex-col gap-10">
                <motion.div
                    className='space-y-2 text-sm text-gray-700 dark:text-gray-400'
                    variants={sectionLeft}
                    initial="hidden"
                    animate="visible"
                >
                    <img src={theme === 'dark' ? assets.logo_dark : assets.logo} alt="" className='w-32 sm:w-44' />
                    <p className='max-w-md'> From strategy to execution, we craft digital solutions to move your business forward.</p>
                    <ul className='flex gap-8'>
                        <li><a className=' hover:text-primary' href="#hero">Home</a></li>
                        <li><a className=' hover:text-primary' href="#services">Services</a></li>
                        <li><a className=' hover:text-primary' href="#our-work">Our Work</a></li>
                        <li><a className=' hover:text-primary' href="#contact-us">Contact Us</a></li>
                    </ul>
                </motion.div>
                <motion.div
                    className=' text-gray-600 dark:text-gray-400'
                    variants={sectionRight}
                    initial="hidden"
                    animate="visible"
                >
                    <h3 className='font-semibold'>Subscribe to our newsLetter!</h3>
                    <p className='text-sm mt-2 mb-6 '>The latest news,articles, and  resources sent to your inbox weekly.</p>
                    <form ref={formRef} action="https://formspree.io/f/mnnbqqwe"
                        method="POST" onSubmit={handleSubmit} className='flex gap-2 text-sm'>
                        <input className='w-full p-3 text-sm outline-none rounded dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-500 ' type="email" name="secmnd" id="secmnd" placeholder='Enter your email.' />
                        <ValidationError prefix="Email-Only" field="secmnd" errors={state.errors} />
                        <button type='submit' className=' bg-primary text-white rounded px-6'>Subscribe</button>
                    </form>
                </motion.div>
            </div>
            <hr className='border-gray-300 dark:border-gray-600 my-6' />

            {/* Footer Bottom */}
            <div className='pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap'>
                <p>Copyright 2025 © Moshman - All Rights Reserved</p>
                <div className='flex items-center justify-between gap-4'>
                    {[assets.facebook_icon, assets.twitter_icon, assets.instagram_icon, assets.linkedin_icon].map((icon, idx) => (
                        <motion.img
                            key={idx}
                            src={icon}
                            alt=""
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Footer