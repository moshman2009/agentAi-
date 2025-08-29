import React from 'react';
import Title from './Title'
import assets from '../assets/assets'
import { useForm, ValidationError } from '@formspree/react';
import { motion } from "framer-motion"

const formVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const ContactUs = () => {
  const [state, handleSubmit] = useForm("mnnbqqwe");
  const formRef = React.useRef();

  React.useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
    }
  }, [state.succeeded]);

  return (
    <div id="contact-us" className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white">
      <Title
        title={"Reach out to us"}
        desc={"This is to show that you can reach out to us. If it works, praise GOD."}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={formVariants}
        className="w-full flex flex-col items-center"
      >
        {state.succeeded && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 font-medium"
          >
            ✅ Thanks for your message!
          </motion.p>
        )}

        <form
          ref={formRef}
          action="https://formspree.io/f/mnnbqqwe"
          method="POST"
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full"
        >
          {/* Name */}
          <div>
            <label htmlFor="fname" className="mb-2 text-sm font-medium">
              Your Name
            </label>
            <div className="flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
              <img src={assets.person_icon} alt="" />
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter your name"
                className="w-full p-3 text-sm outline-none"
                required
              />
            </div>
            <ValidationError prefix="FullName" field="fname" errors={state.errors} />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 text-sm font-medium">
              Email id
            </label>
            <div className="flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600">
              <img src={assets.email_icon} alt="" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 text-sm outline-none"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              rows={8}
              id="message"
              name="message"
              placeholder="Enter your message"
              className="w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            disabled={state.submitting}
            type="submit"
            className="w-max flex gap-2 bg-primary text-white text-sm px-6 hover:px-8 py-3 rounded-full cursor-pointer hover:scale-103 transition-all"
          >
            Submit <img src={assets.arrow_icon} alt="" className="w-4" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default ContactUs;