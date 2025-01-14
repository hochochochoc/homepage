import React from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
        },
      }}
      viewport={{ once: true }}
      className="mx-auto mb-20 mt-10 w-full max-w-3xl rounded-3xl border border-transparent bg-blue-950 p-9 text-white shadow-lg transition-all duration-500 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50 hover:opacity-20 sm:w-3/4 md:w-2/3 lg:w-1/2"
    >
      <div className="container">
        <h4 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Contáctame
          </span>
        </h4>

        <motion.form
          initial={{ opacity: 0, x: 100 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
              delay: 0.2,
            },
          }}
          viewport={{ once: true }}
          action="https://formsubmit.co/jannik.riegel@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.3,
              },
            }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              required
              className="w-full rounded-md border border-gray-600 bg-black p-2.5 text-base placeholder-gray-600 transition-colors duration-500 focus:border-blue-500 focus:outline-none focus:ring-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.4,
              },
            }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-md border border-gray-600 bg-black p-2.5 text-base placeholder-gray-600 transition-colors duration-500 focus:border-blue-500 focus:outline-none focus:ring-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
          >
            <textarea
              name="message"
              id="message"
              rows={3}
              placeholder="Escriba su mensaje"
              required
              className="max-h-52 min-h-40 w-full rounded-md border border-gray-600 bg-black p-2.5 text-base placeholder-gray-600 transition-colors duration-500 focus:border-blue-500 focus:outline-none focus:ring-0"
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.7,
              },
            }}
            viewport={{ once: true }}
          >
            <button
              type="submit"
              className="rounded-md bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[size:200%_100%] bg-[position:0%] px-4 py-2 font-medium text-white transition-[background-position] duration-1000 hover:bg-[position:100%]"
            >
              Enviar mensaje
            </button>
          </motion.div>

          <input type="hidden" name="_next" value="http://localhost:5173" />
          <input type="hidden" name="_captcha" value="false" />
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactSection;
