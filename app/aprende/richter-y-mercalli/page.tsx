import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Conoce las diferencias entre la escala de Richter y la escala de Mercalli, cómo se relacionan con la magnitud y la intensidad de un sismo y cómo se utilizan actualmente.",
  path: "/aprende/richter-y-mercalli",
  title: "Escala de Richter y Mercalli",
});

const mercalliLevels = [
  {
    level: "I",
    title: "Imperceptible",
    text: "No es percibido por las personas. Puede ser registrado por instrumentos.",
  },
  {
    level: "II",
    title: "Muy débil",
    text: "Percibido por algunas personas en reposo, especialmente en pisos superiores.",
  },
  {
    level: "III",
    title: "Débil",
    text: "Se percibe en interiores. Algunas personas pueden confundirlo con el paso de un vehículo.",
  },
  {
    level: "IV",
    title: "Moderado",
    text: "Percibido por muchas personas en interiores. Pueden vibrar ventanas, puertas y objetos.",
  },
  {
    level: "V",
    title: "Bastante fuerte",
    text: "Es percibido por casi todas las personas. Algunos objetos pequeños pueden desplazarse.",
  },
  {
    level: "VI",
    title: "Fuerte",
    text: "Es percibido por todas las personas. Pueden producirse daños leves en algunas construcciones.",
  },
  {
    level: "VII",
    title: "Muy fuerte",
    text: "Puede provocar daños moderados, especialmente en construcciones vulnerables.",
  },
  {
    level: "VIII",
    title: "Severo",
    text: "Puede causar daños importantes en estructuras deficientes y afectar parcialmente otras construcciones.",
  },
  {
    level: "IX",
    title: "Violento",
    text: "Puede producir daños considerables incluso en estructuras bien diseñadas.",
  },
  {
    level: "X",
    title: "Extremo",
    text: "Puede destruir muchas construcciones y provocar importantes alteraciones en el terreno.",
  },
  {
    level: "XI",
    title: "Muy extremo",
    text: "Pocas estructuras permanecen sin daños. Pueden producirse grandes deformaciones del terreno.",
  },
  {
    level: "XII",
    title: "Catastrófico",
    text: "Los daños son generalizados y pueden producirse grandes modificaciones en la superficie terrestre.",
  },
];

export default function RichterAndMercalliPage() {
  return (
    <InfoPageShell
      description="Richter y Mercalli son dos nombres muy conocidos al hablar de terremotos, pero representan conceptos diferentes. Una se relaciona con el tamaño del sismo y la otra con sus efectos observados."
      eyebrow="APRENDE"
      title="Escala de Richter y Mercalli"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            📈
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            MAGNITUD
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Escala de Richter
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            La escala de Richter fue desarrollada para estimar la magnitud de
            los sismos a partir de los registros obtenidos por instrumentos
            sísmicos.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            La magnitud representa el tamaño del evento y está relacionada con
            la energía liberada. Para un mismo sismo se determina un valor de
            magnitud.
          </p>
        </article>

        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            🏠
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            INTENSIDAD
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Escala de Mercalli
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            La escala de Mercalli describe los efectos que produce un sismo en
            las personas, las construcciones y el entorno de un lugar
            determinado.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            Se expresa mediante números romanos desde I hasta XII. Un mismo
            terremoto puede alcanzar distintas intensidades Mercalli según el
            lugar desde donde se observe.
          </p>
        </article>
      </section>

      <section className="rounded-[28px] border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          IMPORTANTE
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          No todos los sismos actuales se miden literalmente con la escala de
          Richter
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Aunque es habitual escuchar expresiones como &quot;7 grados
          Richter&quot;, actualmente la magnitud de los sismos puede calcularse
          utilizando distintos métodos dependiendo del evento y de los datos
          disponibles.
        </p>

        <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
          Para terremotos importantes se utiliza ampliamente la{" "}
          <strong className="font-bold text-[#F7FAFC]">
            magnitud de momento
          </strong>
          , conocida como Mw. Por eso, en Pulso Sísmico hablamos principalmente
          de <strong className="font-bold text-[#F7FAFC]">magnitud</strong> y no
          asumimos que cada valor publicado corresponda necesariamente a la
          escala de Richter.
        </p>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            UNA DIFERENCIA FUNDAMENTAL
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            El sismo tiene magnitud, cada lugar puede tener una intensidad
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            La magnitud caracteriza al evento sísmico. La intensidad, en
            cambio, describe lo ocurrido en un lugar concreto.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Un solo sismo",
              text: "El terremoto corresponde a un único evento sísmico.",
            },
            {
              number: "02",
              title: "Una magnitud",
              text: "Se calcula un valor que representa el tamaño del evento.",
            },
            {
              number: "03",
              title: "Muchas intensidades",
              text: "Los efectos pueden ser diferentes en cada ciudad o localidad.",
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

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            ESCALA DE MERCALLI
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            De I a XII: cómo se describen los efectos
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            La intensidad Mercalli aumenta a medida que los efectos observados
            son mayores. Los primeros niveles corresponden a movimientos apenas
            perceptibles, mientras que los niveles superiores describen daños
            cada vez más importantes.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {mercalliLevels.map((item) => (
            <article
              className="flex gap-5 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5"
              key={item.level}
            >
              <div className="flex h-12 min-w-12 items-center justify-center rounded-[16px] bg-[#55C2FF]/10 px-3 text-base font-extrabold text-[#55C2FF]">
                {item.level}
              </div>

              <div>
                <h3 className="text-base font-bold text-[#F7FAFC]">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#C4D0DF]">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          EJEMPLO
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Un terremoto puede sentirse muy distinto según dónde estés
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Imagina un terremoto de magnitud 7,0 frente a la costa de Chile. Su
          magnitud corresponde al mismo evento, pero sus efectos pueden variar
          considerablemente entre distintas localidades.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              ZONA CERCANA
            </p>

            <p className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              Mayor intensidad
            </p>

            <p className="mt-2 text-xs leading-5 text-[#93A4B8]">
              Movimiento fuerte y posibles daños.
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              ZONA INTERMEDIA
            </p>

            <p className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              Intensidad intermedia
            </p>

            <p className="mt-2 text-xs leading-5 text-[#93A4B8]">
              Movimiento claramente perceptible.
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-[#93A4B8]">
              ZONA LEJANA
            </p>

            <p className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              Menor intensidad
            </p>

            <p className="mt-2 text-xs leading-5 text-[#93A4B8]">
              Puede sentirse débilmente o incluso pasar inadvertido.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[#F7FAFC]">
          Richter y Mercalli no compiten entre sí
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
          Ambas formas de describir un terremoto responden preguntas
          diferentes. La magnitud busca determinar qué tan grande fue el
          evento, mientras que la intensidad describe qué ocurrió en un lugar
          determinado.
        </p>

        <div className="mt-6 overflow-hidden rounded-[22px] border border-[var(--border-subtle)]">
          <div className="grid grid-cols-[1fr_1fr] border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
            <div className="p-4 text-sm font-bold text-[#F7FAFC]">
              Magnitud
            </div>

            <div className="border-l border-[var(--border-subtle)] p-4 text-sm font-bold text-[#F7FAFC]">
              Intensidad
            </div>
          </div>

          {[
            {
              magnitude: "Describe el tamaño del sismo.",
              intensity: "Describe sus efectos en un lugar.",
            },
            {
              magnitude: "Se obtiene a partir de registros instrumentales.",
              intensity: "Considera efectos observados y daños.",
            },
            {
              magnitude: "El evento tiene un valor de magnitud.",
              intensity: "Puede variar entre distintas localidades.",
            },
            {
              magnitude: "Puede expresarse mediante escalas como Mw.",
              intensity: "Mercalli se expresa desde I hasta XII.",
            },
          ].map((row, index) => (
            <div
              className={`grid grid-cols-[1fr_1fr] ${
                index < 3
                  ? "border-b border-[var(--border-subtle)]"
                  : ""
              }`}
              key={row.magnitude}
            >
              <div className="p-4 text-sm leading-6 text-[#C4D0DF]">
                {row.magnitude}
              </div>

              <div className="border-l border-[var(--border-subtle)] p-4 text-sm leading-6 text-[#C4D0DF]">
                {row.intensity}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <div className="flex gap-4">
          <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            💡
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
              PARA RECORDAR
            </p>

            <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
              Magnitud mide el evento. Intensidad describe sus efectos.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
              Cuando veas un sismo publicado en Pulso Sísmico, el valor
              numérico principal corresponde a su magnitud. Si además existen
              reportes sobre cómo fue percibido en diferentes lugares, estamos
              hablando de sus efectos o intensidad.
            </p>
          </div>
        </div>
      </section>
    </InfoPageShell>
  );
}
