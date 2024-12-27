import React, { useState } from "react";

const Header = ({ onSectionClick, sectionRefs }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header id="navSection" className="bg-gray-900">
      <nav className="mx-auto flex items-center justify-between px-4 py-4 text-white md:w-[87%] md:px-0">
        <div>
          <img
            src="/logos/jannik_riegel_logo.avif"
            alt="Logo"
            className="h-12 w-12 cursor-pointer rounded-full"
            onClick={() => onSectionClick(sectionRefs.inicio)}
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-[4vw] text-lg font-bold lg:flex">
          <li>
            <a
              className="cursor-pointer transition-colors hover:text-sky-400"
              onClick={() => onSectionClick(sectionRefs.inicio)}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer transition-colors hover:text-sky-400"
              onClick={() => onSectionClick(sectionRefs.proyectos)}
            >
              Proyectos
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer transition-colors hover:text-sky-400"
              onClick={() => onSectionClick(sectionRefs.experiencia)}
            >
              Experiencia
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer transition-colors hover:text-sky-400"
              onClick={() => onSectionClick(sectionRefs.skills)}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer transition-colors hover:text-sky-400"
              onClick={() => onSectionClick(sectionRefs.formacion)}
            >
              Formación
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-blue-800 to-sky-800 px-4 py-2 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            onClick={() => onSectionClick(sectionRefs.contacto)}
          >
            Contáctame
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 bg-gray-900 p-4 lg:hidden">
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  className="block text-white transition-colors hover:text-sky-400"
                  onClick={() => {
                    onSectionClick(sectionRefs.inicio);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  className="block text-white transition-colors hover:text-sky-400"
                  onClick={() => {
                    onSectionClick(sectionRefs.proyectos);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  className="block text-white transition-colors hover:text-sky-400"
                  onClick={() => {
                    onSectionClick(sectionRefs.experiencia);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Experiencia
                </a>
              </li>
              <li>
                <a
                  className="block text-white transition-colors hover:text-sky-400"
                  onClick={() => {
                    onSectionClick(sectionRefs.skills);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  className="block text-white transition-colors hover:text-sky-400"
                  onClick={() => {
                    onSectionClick(sectionRefs.formacion);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Formación
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
