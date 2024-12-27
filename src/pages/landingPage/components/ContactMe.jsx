import React from "react";

const ContactSection = () => {
  return (
    <div className="mx-auto mb-20 mt-10 w-full max-w-3xl rounded-3xl bg-blue-950 p-9 text-white shadow-md sm:w-3/4 md:w-2/3 lg:w-1/2">
      <div className="container">
        <h4 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Contáctame
          </span>
        </h4>

        <form
          action="https://formsubmit.co/jannik.riegel@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              required
              className="w-full rounded-md border border-gray-600 bg-black p-2.5 text-base placeholder-gray-600 transition-colors duration-500 focus:border-blue-500 focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-md border border-gray-600 bg-black p-2.5 text-base placeholder-gray-600 transition-colors duration-500 focus:border-blue-500 focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <textarea
              name="message"
              id="message"
              rows={3}
              placeholder="Escriba su mensaje"
              required
              className="max-h-52 min-h-40 w-full rounded-md border border-gray-600 bg-black p-2.5 text-base placeholder-gray-600 transition-colors duration-500 focus:border-blue-500 focus:outline-none focus:ring-0"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 font-medium text-white transition-all hover:opacity-90"
          >
            Enviar mensaje
          </button>

          <input type="hidden" name="_next" value="http://localhost:5173" />
          <input type="hidden" name="_captcha" value="false" />
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
