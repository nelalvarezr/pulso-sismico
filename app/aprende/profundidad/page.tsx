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
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Profundidad hipocentral</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            El CSN define el hipocentro o foco como el punto en el interior de la Tierra donde se inicia la ruptura. La profundidad hipocentral es, justamente, la distancia vertical entre ese punto y la superficie.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            El epicentro, en cambio, es la proyección de ese punto sobre la superficie. Son conceptos relacionados, pero no equivalentes.
          </p>
        </article>

        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Cómo cambia la percepción</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            En términos generales, un sismo superficial puede sentirse con más fuerza cerca de la fuente, mientras que uno profundo puede percibirse en áreas amplias de forma distinta. La profundidad es una de las variables que ayudan a entender por qué un mismo número de magnitud no siempre se vive igual.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            No actúa sola: también importan la distancia al epicentro, el tipo de suelo y las características de las construcciones.
          </p>
        </article>
      </section>
    </InfoPageShell>
  );
}
