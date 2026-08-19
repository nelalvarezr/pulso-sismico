import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Qué es la profundidad hipocentral, cómo se relaciona con el hipocentro y por qué influye en la percepción de un sismo.",
  path: "/aprende/profundidad",
  title: "¿Qué significa la profundidad?",
});

export default function DepthPage() {
  return (
    <InfoPageShell
      description="La profundidad indica qué tan abajo, dentro de la Tierra, se inició la ruptura que generó el sismo."
      eyebrow="APRENDE"
      title="¿Qué significa la profundidad?"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            🌎
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            DENTRO DE LA TIERRA
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Profundidad hipocentral
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            El hipocentro o foco es el punto en el interior de la Tierra donde
            comienza la ruptura que origina el sismo.
          </p>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            La profundidad hipocentral corresponde a la distancia vertical
            entre ese punto y la superficie.
          </p>
        </article>

        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            📍
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            EN LA SUPERFICIE
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Epicentro
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            El epicentro es la proyección del hipocentro sobre la superficie
            terrestre.
          </p>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Hipocentro y epicentro están directamente relacionados, pero no
            representan el mismo punto.
          </p>
        </article>
      </section>

      <section className="rounded-[28px] border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          IDEA CLAVE
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          No todos los sismos ocurren a la misma profundidad
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Dos sismos de magnitud similar pueden sentirse de manera diferente
          dependiendo de qué tan profundo se origine cada uno.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 text-center">
            <div className="mx-auto mb-3 h-3 w-3 rounded-full bg-[#55C2FF]" />
            <p className="text-sm font-bold text-[#F7FAFC]">Superficial</p>
            <p className="mt-2 text-xs leading-6 text-[#93A4B8]">
              La ruptura ocurre relativamente cerca de la superficie.
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 text-center">
            <div className="mx-auto mb-3 h-3 w-3 rounded-full bg-[#55C2FF]/70" />
            <p className="text-sm font-bold text-[#F7FAFC]">Intermedio</p>
            <p className="mt-2 text-xs leading-6 text-[#93A4B8]">
              El foco se encuentra a una profundidad mayor.
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 text-center">
            <div className="mx-auto mb-3 h-3 w-3 rounded-full bg-[#55C2FF]/40" />
            <p className="text-sm font-bold text-[#F7FAFC]">Profundo</p>
            <p className="mt-2 text-xs leading-6 text-[#93A4B8]">
              La ruptura se origina mucho más abajo dentro de la Tierra.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[#F7FAFC]">
          ¿Cómo influye en cómo sentimos un sismo?
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
          En términos generales, un sismo superficial puede sentirse con más
          fuerza cerca de la fuente, mientras que uno más profundo puede
          percibirse de manera distinta y en áreas más amplias.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Profundidad",
              text: "Indica qué tan abajo se inició la ruptura.",
            },
            {
              number: "02",
              title: "Distancia",
              text: "La cercanía al epicentro también influye en la percepción.",
            },
            {
              number: "03",
              title: "Terreno y construcciones",
              text: "El tipo de suelo y las estructuras pueden modificar cómo se siente el movimiento.",
            },
          ].map((item) => (
            <article
              className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5"
              key={item.number}
            >
              <span className="text-xs font-extrabold tracking-[0.16em] text-[#55C2FF]">
                {item.number}
              </span>

              <h3 className="mt-2 text-lg font-bold text-[#F7FAFC]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#C4D0DF]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
