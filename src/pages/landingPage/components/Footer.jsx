const Footer = ({ onSectionClick, sectionRefs }) => {
  return (
    <footer className="min-h-min w-full bg-gray-900 p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="my-2 h-20 w-20 rounded-full">
          <img
            className="rounded-full"
            src="/logos/jannik_riegel_logo.png"
            alt="logo"
            style={{ maxHeight: "70px" }}
          />
        </div>
        <div>
          <ul className="mb-3 flex flex-wrap justify-center gap-4 text-[17px] font-bold text-white">
            <li>
              <div
                className="cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => onSectionClick(sectionRefs.inicio)}
              >
                Inicio
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => onSectionClick(sectionRefs.proyectos)}
              >
                Proyectos
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => onSectionClick(sectionRefs.experiencia)}
              >
                Experiencia
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer transition-colors hover:text-sky-300"
                onClick={() => onSectionClick(sectionRefs.skills)}
              >
                Skills
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => onSectionClick(sectionRefs.formacion)}
              >
                Formación
              </div>
            </li>
            <li>
              <div
                className="cursor-pointer transition-colors hover:text-sky-400"
                onClick={() => onSectionClick(sectionRefs.contacto)}
              >
                Contacto
              </div>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-thin text-white">
            © 2024 Creado por Jannik Riegel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
