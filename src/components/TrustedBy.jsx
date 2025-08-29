import React from 'react'
import { company_logos } from '../assets/assets'
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.5,
    },
  },
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
}

const TrustedBy = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className='flex flex-col items-center px-4 sm:px-12 lg:px-24 xl:px-40 gap-10 text-gray-700 dark:text-white/80'
  >
    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className='font-semibold'
    >
      Trusted by Leading Companies
    </motion.h3>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className='flex items-center justify-center flex-wrap gap-10 m-4'
    >
      {company_logos.map((logo, index) => (
        <motion.img
          key={index}
          src={logo}
          alt=""
          variants={logoVariants}
          whileHover={{ scale: 1.15 }}
          className='max-h-5 sm:max-h-6 dark:drop-shadow-xl'
        />
      ))}
    </motion.div>
  </motion.div>
)

export default TrustedBy