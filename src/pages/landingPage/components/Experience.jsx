import React from "react";
import { Laptop } from "lucide-react";

const ExperienceSection = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
        <Laptop
          size={56}
          strokeWidth={2.5}
          className="mb-2 mr-2 inline-block text-blue-600"
        />
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Mi Experiencia
        </span>
      </h2>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 px-9 md:px-3 lg:px-0">
          {/* Colillas Branding */}
          <div className="rounded-3xl bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50">
            <div className="grid grid-cols-12 gap-1">
              <h4 className="col-span-12 mb-3 text-xl font-semibold md:hidden md:text-2xl xl:text-3xl">
                Desarrollador Front-End
              </h4>
              <div className="col-span-12 flex md:col-span-3 md:me-3 md:flex-col md:justify-center md:rounded-lg md:bg-gray-700 md:bg-opacity-30 md:px-1">
                <h5 className="md-text-xl mb-3 me-3 text-sm font-semibold text-white md:mb-5 md:me-0 md:text-center xl:text-2xl">
                  TSP Explorer
                </h5>
                <p className="text-sm text-white md:text-center md:text-base">
                  Sept 2024 - Actualmente
                </p>
              </div>
              <div className="col-span-12 px-3 md:col-span-9">
                <h4 className="mb-3 hidden text-xl font-semibold md:inline-block md:text-2xl xl:text-3xl">
                  Desarrollador Front-End
                </h4>
                <p className="text-[17px] text-white">
                  🎓 Desarrollo de una plataforma educativa de visualización de
                  problemas de búsqueda de rutas: Diseño e implementación de una
                  herramienta interactiva que permite a los estudiantes explorar
                  y comprender algoritmos de optimización de rutas de manera
                  visual e intuitiva 🗺️💡.
                  <br />
                  🔍 Diseño de mapas interactivos: Creación de interfaces
                  dinámicas que permiten a los usuarios manipular y experimentar
                  con diferentes escenarios de rutas, facilitando el aprendizaje
                  práctico de conceptos complejos 🌐✨.
                  <br />
                  📚 Desarrollo de tutoriales paso a paso: Implementación de
                  guías educativas interactivas que ayudan a los estudiantes a
                  comprender los fundamentos de los algoritmos de búsqueda de
                  rutas, utilizando visualizaciones en tiempo real y ejemplos
                  prácticos 📊🎯.
                  <br />
                  🛠️ Tecnologías: React para la interfaz de usuario, Tailwind
                  CSS para el diseño responsivo, Firebase para el almacenamiento
                  de datos, y D3.js para visualizaciones avanzadas 💻✨.
                </p>
              </div>
            </div>
          </div>

          {/* Neoelectra */}
          <div className="rounded-3xl bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50">
            <div className="grid grid-cols-12 gap-1">
              <h4 className="col-span-12 mb-3 text-xl font-semibold md:hidden md:text-2xl xl:text-3xl">
                Ingeniero Hidráulico
              </h4>
              <div className="col-span-12 flex md:col-span-3 md:me-3 md:flex-col md:justify-center md:rounded-lg md:bg-gray-700 md:bg-opacity-30 md:px-1">
                <h5 className="md-text-xl mb-3 me-3 text-sm font-semibold text-white md:mb-5 md:me-0 md:text-center xl:text-2xl">
                  Grupo Neoelectra
                </h5>
                <p className="text-sm text-white md:text-center md:text-base">
                  Feb 2022 - Jul 2022
                </p>
              </div>
              <div className="col-span-12 px-3 md:col-span-9">
                <h4 className="mb-3 hidden text-xl font-semibold md:inline-block md:text-2xl xl:text-3xl">
                  Ingeniero Hidráulico
                </h4>
                <p className="text-[17px] text-white">
                  💧 Evaluación de parámetros hidráulicos y calidad del agua:
                  Análisis y monitoreo de sistemas hídricos mediante modelado
                  experimental y estudios comparativos 🔍📊.
                  <br />⚡ Implementación de modelos económicos y regulatorios:
                  Aplicación de normativas vigentes y evaluación de costos en
                  proyectos hidráulicos 📋💰.
                </p>
              </div>
            </div>
          </div>

          {/* Vietnam */}
          <div className="rounded-3xl bg-blue-950 p-4 text-blue-500 shadow-md transition-colors duration-500 hover:bg-gradient-to-r hover:from-blue-900 hover:to-cyan-900 hover:text-blue-50">
            <div className="grid grid-cols-12 gap-1">
              <h4 className="col-span-12 mb-3 text-xl font-semibold md:hidden md:text-2xl xl:text-3xl">
                Ingeniero Hidráulico
              </h4>
              <div className="col-span-12 flex md:col-span-3 md:me-3 md:flex-col md:justify-center md:rounded-lg md:bg-gray-700 md:bg-opacity-30 md:px-1">
                <h5 className="md-text-xl mb-3 me-3 text-sm font-semibold text-white md:mb-5 md:me-0 md:text-center xl:text-2xl">
                  VNU HCMC
                </h5>
                <p className="text-sm text-white md:text-center md:text-base">
                  Sep 2019 - Feb 2020
                </p>
              </div>
              <div className="col-span-12 px-3 md:col-span-9">
                <h4 className="mb-3 hidden text-xl font-semibold md:inline-block md:text-2xl xl:text-3xl">
                  Ingeniero Hidráulico
                </h4>
                <p className="text-[17px] text-white">
                  🌧️ Desarrollo de sistemas de monitoreo de sequía y patrones de
                  lluvia en el Altiplano Central de Vietnam, implementando
                  metodologías de análisis hidrológico.
                  <br />
                  🌾 Modelado predictivo de rendimientos agrícolas basado en
                  datos climatológicos y gestión de recursos hídricos.
                  <br />
                  📊 Establecimiento de protocolos de observación y análisis
                  para la evaluación del impacto de sequías en la producción
                  agrícola regional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;