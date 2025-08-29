import React from 'react'
import Title from './Title'
import assets from '../assets/assets'
import { motion } from "framer-motion"

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, type: "spring" }
    })
}

const OurWork = () => {

        const workData = [
                {
                        title: 'Mobile app marketing',
                        description: 'We turn bold ideas into powerful digital solutions that connect, engage...',
                        image: assets.work_mobile_app
                },
                {
                        title: 'Dashboard Management',
                        description: 'We help you execute your plan and deliver results.',
                        image: assets.work_dashboard_management
                },
                {
                        title: 'Fitness app promotion',
                        description: 'We help you create a marketing strategy that drives results.',
                        image: assets.work_fitness_app
                },
        ]

    return (
        <div id='our-work' className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white '>
                    <Title title={'Our latest work'} desc={'From strategy to execution, we craft digital solutions that move your business forward.'} />
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
                            {
                                    workData.map((work,index) => (
                                            <motion.div
                                                key={index}
                                                className='hover:scale-102 duration-500 transition-all cursor-pointer'
                                                custom={index}
                                                variants={cardVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, amount: 0.2 }}
                                            >
                                                    <motion.img
                                                        src={work.image}
                                                        alt=""
                                                        className='w-full rounded-xl'
                                                        whileHover={{ scale: 1.04 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    />
                                                    <h3 className='mt-3 mb-2 text-lg font-semibold'>{work.title}</h3>
                                                    <p className='test-sm opacity-60 w-5/6'>{work.description}</p>
                                            </motion.div>
                                    ))
                            }
                    </div>
        </div>
    )
}

export default OurWork