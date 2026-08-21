export const footerLinks = [
  { href: "/acerca-de", label: "Acerca de" },
  { href: "/fuentes", label: "Fuentes" },
  { href: "/aprende/magnitud", label: "Magnitud" },
  { href: "/aprende/profundidad", label: "Profundidad" },
  { href: "/aprende/magnitud-vs-intensidad", label: "Magnitud vs intensidad" },
  { href: "/aprende/richter-y-mercalli", label: "Richter y Mercalli" },
  { href: "/aprende/historia-sismica-chile", label: "Historia sísmica de Chile" },
  { href: "/privacidad", label: "Privacidad" },
] as const;

export const homeLearnCards = [
  {
    description:
      "Una línea de tiempo con eventos ampliamente documentados que marcaron la historia sísmica del país.",
    href: "/aprende/historia-sismica-chile",
    title: "Historia sísmica de Chile",
  },
  {
    description:
      "Qué representa la magnitud de un sismo, cómo funciona su escala y por qué pequeños cambios significan grandes diferencias.",
    href: "/aprende/magnitud",
    title: "Magnitud",
  },
  {
    description:
      "Cómo se relacionan la energía del evento y los efectos que se sienten en distintos lugares.",
    href: "/aprende/magnitud-vs-intensidad",
    title: "Magnitud e intensidad",
  },
  {
    description:
      "Qué significan las escalas de Richter y Mercalli, qué mide cada una y por qué actualmente no toda magnitud corresponde literalmente a Richter.",
    href: "/aprende/richter-y-mercalli",
    title: "Richter y Mercalli",
  },
  {
    description:
      "Qué es la profundidad hipocentral y por qué influye en la percepción de un sismo.",
    href: "/aprende/profundidad",
    title: "Profundidad",
  },
] as const;

export const staticSiteRoutes = [
  "/",
  "/acerca-de",
  "/fuentes",
  "/aprende/magnitud",
  "/aprende/profundidad",
  "/aprende/magnitud-vs-intensidad",
  "/aprende/richter-y-mercalli",
  "/aprende/historia-sismica-chile",
  "/privacidad",
] as const;

export const historyEvents = [
  {
    date: "16 de agosto de 1906",
    depth: "—",
    effect: "Tsunami moderado (TM)",
    location: "Valparaíso",
    magnitude: "Mw 8.2 / Ms 8.4",
    sourceUrl:
      "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    summary:
      "Fue uno de los grandes terremotos del centro de Chile y es parte de la memoria sísmica temprana del país.",
  },
  {
    date: "24 de enero de 1939",
    depth: "—",
    effect: "Sin efecto de tsunami reportado en la tabla CSN",
    location: "Chillán",
    magnitude: "Ms 7.8",
    sourceUrl:
      "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    summary:
      "Su impacto humano y urbano marcó un antes y un después en la discusión sobre construcción sismo resistente.",
  },
  {
    date: "22 de mayo de 1960",
    depth: "33 km",
    effect: "Tsunami destructor (TD)",
    location: "Valdivia",
    magnitude: "Mw 9.5 / Ms 8.3",
    sourceUrl:
      "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    summary:
      "El terremoto de Valdivia es el mayor registrado instrumentalmente y sigue siendo una referencia global para la sismología.",
  },
  {
    date: "3 de marzo de 1985",
    depth: "33 km",
    effect: "Sin efecto de tsunami reportado en la tabla CSN",
    location: "Algarrobo",
    magnitude: "Mw 8.0 / Ms 7.8",
    sourceUrl:
      "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    summary:
      "Afectó fuertemente a la zona central y reforzó el aprendizaje práctico sobre diseño y respuesta sísmica en áreas urbanas densas.",
  },
  {
    date: "27 de febrero de 2010",
    depth: "30 km",
    effect: "Tsunami destructor (TD)",
    location: "Maule",
    magnitude: "Mw 8.8",
    sourceUrl:
      "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    summary:
      "Es uno de los eventos más estudiados del Chile contemporáneo por su magnitud, extensión territorial y efectos sobre infraestructura crítica.",
  },
  {
    date: "16 de septiembre de 2015",
    depth: "11.1 km",
    effect: "Tsunami destructor (TD)",
    location: "Illapel",
    magnitude: "Mw 8.4",
    sourceUrl:
      "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    summary:
      "Mostró nuevamente la relevancia de la preparación costera y de la integración entre monitoreo sísmico, alerta y evacuación.",
  },
] as const;

export const officialSources = [
  {
    description:
      "Portal oficial con sismos recientes, glosario, preguntas frecuentes y tabla histórica de grandes terremotos.",
    href: "https://www.sismologia.cl/",
    label: "Centro Sismológico Nacional (CSN)",
  },
  {
    description:
      "Base histórica oficial del CSN con magnitudes, profundidades y efectos de terremotos importantes en Chile.",
    href: "https://www.sismologia.cl/informacion/grandes-terremotos.html",
    label: "CSN — Grandes terremotos en Chile",
  },
  {
    description:
      "Explicaciones oficiales del CSN sobre magnitud, intensidad, hipocentro y profundidad.",
    href: "https://www.sismologia.cl/informacion/preguntas-frecuentes.html",
    label: "CSN — Preguntas frecuentes",
  },
  {
    description:
      "Glosario oficial del CSN con definiciones de intensidad, epicentro, hipocentro y conceptos sismológicos.",
    href: "https://www.sismologia.cl/informacion/glosario.html",
    label: "CSN — Glosario",
  },
  {
    description:
      "Portal de preparación de SENAPRED con explicación general de sismos y contexto del riesgo en Chile.",
    href: "https://senapred.cl/sismos/",
    label: "SENAPRED — Sismos",
  },
  {
    description:
      "Artículo institucional sobre el Día Nacional de la Memoria y Educación ante Desastres, que recuerda Valdivia 1960.",
    href: "https://www.senapred.cl/2023/05/22/autoridades-realizaron-la-primera-conmemoracion-del-dia-nacional-de-la-memoria-y-educacion-sobre-desastres-socio-naturales/",
    label: "SENAPRED — Conmemoración de Valdivia 1960",
  },
  {
    description:
      "Referencia complementaria sobre por qué la magnitud es logarítmica y cómo cambia la energía liberada.",
    href: "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
    label: "USGS — Magnitude, Energy Release, and Intensity",
  },
] as const;
