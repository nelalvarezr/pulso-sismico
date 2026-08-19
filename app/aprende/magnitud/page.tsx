import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Explicación simple de qué representa la magnitud de un sismo, por qué es logarítmica y cómo cambia la energía liberada.",
  path: "/aprende/magnitud",
  title: "¿Qué significa la magnitud de un sismo?",
});

export default function MagnitudePage() {
  return (
    <InfoPageShell
      description="La magnitud busca describir el tamaño del evento sísmico. Es un valor único para cada sismo y está relacionado con la energía liberada en forma de ondas elásticas."
      eyebrow="APRENDE"
      title="¿Qué significa la magnitud de un sismo?"
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_340px]">
        <article className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            📈
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            TAMAÑO DEL EVENTO
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Una medida del tamaño del sismo
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            El CSN explica que la magnitud es una medida del tamaño de un sismo
            y que se relaciona con la energía liberada. Por eso, cuando en
            Pulso Sísmico ves un número de magnitud, estás mirando una forma
            resumida de describir cuán grande fue ese evento.
          </p>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Ese valor no depende del barrio, la ciudad o la comuna desde donde
            se observe: el sismo tiene una sola magnitud, aunque su percepción
            cambie mucho entre lugares.
          </p>
        </article>

        <aside className="space-y-4">
          {[
            {
              number: "01",
              title: "Valor único",
              text: "Cada evento sísmico tiene una sola magnitud.",
            },
            {
              number: "02",
              title: "Tamaño relativo",
              text: "La magnitud permite comparar el tamaño de distintos sismos.",
            },
            {
              number: "03",
              title: "Cambio importante",
              text: "Subir un punto implica una diferencia muy significativa en energía liberada.",
            },
          ].map((item) => (
            <article
              className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5"
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
        </aside>
      </section>

      <section className="rounded-3xl border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          ESCALA LOGARÍTMICA
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Un punto más no significa “un poco más”
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          La magnitud no crece de forma lineal. Según USGS, una diferencia de
          1 punto equivale aproximadamente a 10 veces más amplitud medida y a
          cerca de 32 veces más energía liberada.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              MAGNITUD
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#F7FAFC]">5.0</p>
            <p className="mt-2 text-xs leading-6 text-[#93A4B8]">
              Punto de referencia
            </p>
          </div>

          <div className="rounded-[22px] border border-[#55C2FF]/25 bg-[#55C2FF]/8 p-5 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#55C2FF]">
              MAGNITUD
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#F7FAFC]">6.0</p>
            <p className="mt-2 text-xs leading-6 text-[#C4D0DF]">
              ≈ 32 veces más energía
            </p>
          </div>

          <div className="rounded-[22px] border border-[#55C2FF]/30 bg-[#55C2FF]/10 p-5 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#55C2FF]">
              MAGNITUD
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#F7FAFC]">7.0</p>
            <p className="mt-2 text-xs leading-6 text-[#C4D0DF]">
              ≈ 1.000 veces más energía que 5.0
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          IDEA CLAVE
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Magnitud no es lo mismo que intensidad
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          La magnitud describe el tamaño del evento. La intensidad, en cambio,
          describe cómo se percibe o qué efectos produce en un lugar
          determinado. Un mismo sismo mantiene su magnitud, pero puede generar
          distintas intensidades según la ubicación.
        </p>
      </section>
    </InfoPageShell>
  );
}
