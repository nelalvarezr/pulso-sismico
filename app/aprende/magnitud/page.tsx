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
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Una medida del tamaño del evento</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            El CSN explica que la magnitud es una medida del tamaño de un sismo y que se relaciona con la energía liberada. Por eso, cuando en Pulso Sísmico ves un número de magnitud, estás mirando una forma resumida de describir cuán grande fue ese evento.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            Ese valor no depende del barrio, la ciudad o la comuna desde donde se observe: el sismo tiene una sola magnitud, aunque su percepción cambie mucho entre lugares.
          </p>

          <div className="mt-6 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5">
            <h3 className="text-lg font-bold text-[#F7FAFC]">Escala logarítmica</h3>
            <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
              La magnitud no crece de forma lineal. Según USGS, la escala es logarítmica: una diferencia de 1 punto equivale a unas 10 veces más amplitud medida y a un salto de energía mucho mayor, del orden de 32 veces.
            </p>
          </div>
        </article>

        <aside className="space-y-4">
          {[
            "Magnitud = tamaño relativo del sismo.",
            "Cada evento tiene un valor único de magnitud.",
            "Subir 1 punto implica un cambio muy importante en energía liberada.",
          ].map((item) => (
            <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5" key={item}>
              <p className="text-sm leading-7 text-[#C4D0DF]">{item}</p>
            </div>
          ))}
        </aside>
      </section>
    </InfoPageShell>
  );
}
