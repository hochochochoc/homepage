import React from "react";
import { ExternalLink, Github, FolderOpen } from "lucide-react";

import { ExpandableCardDemo } from "@/components/ui/expandable-card";

const ProjectsSection = () => {
  const projectCards = [
    {
      description: "React • GoogleMaps API • d3.js • Tailwind",
      title: "TSP Explorer",
      src: "/tsp_explorer.png",
      ctaText: "Ver Más",
      ctaLink: "https://travelingsalessim.com",
      content: () => {
        return (
          <div>
            <p>
              Una web educativa que permite a los usuarios explorar y entender
              el problema del viajante de comercio (TSP) de manera interactiva.
              <br />
              <br />
              Esta aplicación implementa varios algoritmos para resolver el TSP,
              incluyendo algoritmos genéticos y técnicas de optimización local.
              La interfaz de usuario permite a los usuarios crear, modificar y
              visualizar rutas en tiempo real.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/hochochochoc/traveling_salesman_react"
                target="_blank"
              >
                <Github className="h-5 w-5 cursor-pointer hover:text-blue-500" />
              </a>
              <a href="https://travelingsalessim.com" target="_blank">
                <ExternalLink className="h-5 w-5 cursor-pointer hover:text-blue-500" />
              </a>
            </div>
          </div>
        );
      },
    },
    {
      description: "React • Node.js • Cheerio • Firebase",
      title: "GeoCities Webscraper",
      src: "/cities_webscraper.png",
      ctaText: "Ver Más",
      ctaLink: "https://github.com/hochochochoc/web_scraper_cities",
      content: () => {
        return (
          <div>
            <p>
              Un web scraper automatizado que recolecta y analiza datos sobre
              ciudades de múltiples fuentes web.
              <br />
              <br />
              Implementa técnicas avanzadas de web scraping y procesamiento de
              datos para recopilar información geográfica de ciudades alrededor
              del mundo. Permite a los usuarios guardar ciudades en una base de
              datos, visualizarlas en un mapa interactivo y realizar
              modificaciones directamente desde la interfaz.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com/hochochochoc/web_scraper_cities">
                <Github className="h-5 w-5 cursor-pointer hover:text-blue-500" />
              </a>

              {/* <ExternalLink className="h-5 w-5 cursor-pointer hover:text-blue-500" /> */}
            </div>
          </div>
        );
      },
    },
    {
      description: "React • Radix • shadcn/ui • Tailwind",
      title: "CS50 Gym Tracker",
      src: "/cs50_gymtracker.png",
      ctaText: "Ver Más",
      ctaLink: "https://cs50gymtracker.vercel.app/",
      content: () => {
        return (
          <div>
            <p>
              Una aplicación móvil completa para el seguimiento de rutinas de
              ejercicio y progreso en el gimnasio.
              <br />
              <br />
              Permite a los usuarios crear y seguir rutinas personalizadas,
              registrar su progreso, y visualizar estadísticas detalladas sobre
              su rendimiento a lo largo del tiempo.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/hochochochoc/cs50_gym_tracker"
                target="_blank"
              >
                <Github className="h-5 w-5 cursor-pointer hover:text-blue-500" />
              </a>

              <a href="https://cs50gymtracker.vercel.app/" target="_blank">
                <ExternalLink className="h-5 w-5 cursor-pointer hover:text-blue-500" />
              </a>
            </div>
          </div>
        );
      },
    },
    {
      description: "React • Next.js • ml5.js • Tailwind • SQL",
      title: "AI Form Assistant",
      src: "/ai_form_assistant.png",
      ctaText: "Ver Más",
      // ctaLink: "javascript:void(0)",
      content: () => {
        return (
          <div>
            <p>
              Un asistente de IA que ayuda a los usuarios a analizar y corregir
              su técnica de ejercicio en el gimnasio.
              <br />
              <br />
              <p className="text-center">***En Desarrollo***</p>
            </p>
            <div className="mt-4 flex gap-3">
              <Github className="h-5 w-5 cursor-pointer hover:text-blue-500" />
              <ExternalLink className="h-5 w-5 cursor-pointer hover:text-blue-500" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
        <FolderOpen
          size={48}
          strokeWidth={2.5}
          className="mb-2 mr-2 inline-block text-blue-600"
        />
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Mis Proyectos
        </span>
      </h2>

      <div className="mx-auto">
        <ExpandableCardDemo projectCards={projectCards} />
      </div>
    </div>
  );
};

export default ProjectsSection;
