import React from 'react'
import Title from './Title'
import { teamData } from '../assets/assets'
import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 75 }
  })
}

const Teams = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white '
    >
      <Title title={'Meet the team'} desc={'Our team of experts is here to help you achieve your goals.'} />
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
        {teamData.map((team, index) => (
          <motion.div
            key={index}
            className='flex max-sm:flex-col items-center gap-5 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-gray-100 dark:shadow-white/5 hover:scale-103 transition-all duration-400'
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <motion.img
              src={team.image}
              alt=""
              className='w-12 h-12 rounded-full'
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <div className='flex-1'>
              <h3 className='text-sm font-bold'>{team.name}</h3>
              <p className='text-xs opacity-60'>{team.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
export default Teams