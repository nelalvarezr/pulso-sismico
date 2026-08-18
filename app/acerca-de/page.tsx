import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Qué es Pulso Sísmico, cómo presenta la actividad sísmica reciente en Chile y cuál es el alcance editorial del sitio.",
  path: "/acerca-de",
  title: "Acerca de Pulso Sísmico",
});

export default function AboutPage() {
  return (
    <InfoPageShell
      description="Pulso Sísmico organiza información reciente sobre sismos en Chile para que pueda leerse rápido, con contexto y sin ruido innecesario."
      title="Acerca de Pulso Sísmico"
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            body: "Mostramos actividad sísmica reciente en Chile a partir de datos publicados por fuentes conocidas del ecosistema sismológico nacional.",
            title: "Qué es",
          },
          {
            body: "No somos un organismo oficial ni emitimos alertas. El sitio resume, ordena y enlaza información pública para facilitar su lectura.",
            title: "Qué no es",
          },
          {
            body: "Nuestro objetivo es presentar los datos de forma simple, clara y visualmente consistente para que más personas entiendan mejor cada evento.",
            title: "Objetivo",
          },
        ].map((item) => (
          <article
            className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
            key={item.title}
          >
            <h2 className="text-xl font-extrabold text-[#F7FAFC]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Cómo leer el sitio</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
            <p className="text-sm leading-7 text-[#C4D0DF]">
              La portada reúne el último sismo, una lista reciente y un mapa para obtener una visión rápida del momento sísmico actual.
            </p>
          </div>
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
            <p className="text-sm leading-7 text-[#C4D0DF]">
              La sección Aprende agrega contexto editorial para diferenciar conceptos como magnitud, intensidad o profundidad sin alterar el significado original de los datos.
            </p>
          </div>
        </div>
      </section>
    </InfoPageShell>
  );
}
