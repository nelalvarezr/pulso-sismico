import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Diferencia entre magnitud e intensidad: energía del evento versus efectos observados en un lugar determinado.",
  path: "/aprende/magnitud-vs-intensidad",
  title: "Magnitud vs intensidad",
});

export default function MagnitudeVsIntensityPage() {
  return (
    <InfoPageShell
      description="Magnitud e intensidad están relacionadas, pero no significan lo mismo. Entender esa diferencia evita muchas confusiones al leer reportes sísmicos."
      eyebrow="APRENDE"
      title="Diferencia entre magnitud e intensidad"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            ⚡
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            EL SISMO
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Magnitud
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Describe el tamaño del sismo y la energía liberada por el evento.
            Un sismo tiene una sola magnitud.
          </p>
        </article>

        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            📍
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            EL LUGAR
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Intensidad
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Describe los efectos observados en un lugar determinado: cómo se
            sintió, qué daños produjo y cómo reaccionaron las estructuras y el
            terreno.
          </p>
        </article>
      </section>

      <section className="rounded-[28px] border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          EJEMPLO
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Un sismo, distintas experiencias
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Imagina un sismo de magnitud 6,0. Su magnitud es la misma para todo
          Chile, pero puede sentirse con fuerza cerca del epicentro y mucho más
          débilmente a cientos de kilómetros.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              CERCA DEL EPICENTRO
            </p>
            <p className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              Mayor intensidad
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              DISTANCIA MEDIA
            </p>
            <p className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              Intensidad intermedia
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              MÁS LEJOS
            </p>
            <p className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              Menor intensidad
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[#F7FAFC]">
          Una misma magnitud, distintas intensidades
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
          El CSN y su glosario explican que la intensidad depende, entre otras
          cosas, de la distancia epicentral, la geología local, la naturaleza
          del terreno y el tipo de construcciones. Por eso un mismo sismo puede
          sentirse de manera muy distinta según la ciudad o incluso el barrio.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Magnitud",
              text: "Es un valor único que representa el tamaño del evento sísmico.",
            },
            {
              number: "02",
              title: "Intensidad",
              text: "Representa los efectos observados en un lugar específico.",
            },
            {
              number: "03",
              title: "Relación",
              text: "Un mismo sismo puede generar distintas intensidades según la ubicación.",
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
