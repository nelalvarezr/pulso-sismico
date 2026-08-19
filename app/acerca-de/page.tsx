import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Qué es Pulso Sísmico, cómo presenta la actividad sísmica reciente en Chile y cuál es el alcance editorial del sitio.",
  path: "/acerca-de",
  title: "Acerca de Pulso Sísmico",
});

export default function AboutPage() {
  const principles = [
    {
      eyebrow: "INFORMACIÓN",
      icon: "🌎",
      title: "Qué es",
      body: "Mostramos actividad sísmica reciente en Chile a partir de datos publicados por fuentes conocidas del ecosistema sismológico nacional.",
    },
    {
      eyebrow: "ALCANCE",
      icon: "🧭",
      title: "Qué no es",
      body: "No somos un organismo oficial ni emitimos alertas. El sitio resume, ordena y enlaza información pública para facilitar su lectura.",
    },
    {
      eyebrow: "PROPÓSITO",
      icon: "✨",
      title: "Objetivo",
      body: "Nuestro objetivo es presentar los datos de forma simple, clara y visualmente consistente para que más personas entiendan mejor cada evento.",
    },
  ];

  return (
    <InfoPageShell
      description="Pulso Sísmico organiza información reciente sobre sismos en Chile para que pueda leerse rápido, con contexto y sin ruido innecesario."
      title="Acerca de Pulso Sísmico"
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {principles.map((item) => (
          <article
            className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
            key={item.title}
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
              {item.icon}
            </div>

            <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
              {item.eyebrow}
            </p>

            <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
              {item.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          CÓMO FUNCIONA
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
          Cómo leer el sitio
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
            <span className="text-xs font-extrabold tracking-[0.16em] text-[#55C2FF]">
              01
            </span>

            <h3 className="mt-2 text-lg font-bold text-[#F7FAFC]">
              Actividad reciente
            </h3>

            <p className="mt-2 text-sm leading-7 text-[#C4D0DF]">
              La portada reúne el último sismo, una lista reciente y un mapa para
              obtener una visión rápida del momento sísmico actual.
            </p>
          </article>

          <article className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
            <span className="text-xs font-extrabold tracking-[0.16em] text-[#55C2FF]">
              02
            </span>

            <h3 className="mt-2 text-lg font-bold text-[#F7FAFC]">
              Contexto para entender
            </h3>

            <p className="mt-2 text-sm leading-7 text-[#C4D0DF]">
              La sección Aprende agrega contexto editorial para diferenciar
              conceptos como magnitud, intensidad o profundidad sin alterar el
              significado original de los datos.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          PRINCIPIO EDITORIAL
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Información clara, sin alarmismo
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Pulso Sísmico busca presentar la actividad sísmica de forma accesible,
          priorizando datos, contexto y fuentes confiables por sobre mensajes
          sensacionalistas o interpretaciones alarmistas.
        </p>
      </section>
    </InfoPageShell>
  );
}
