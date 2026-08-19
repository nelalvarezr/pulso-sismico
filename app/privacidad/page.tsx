import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Información sobre privacidad, datos personales y servicios técnicos utilizados por Pulso Sísmico.",
  path: "/privacidad",
  title: "Privacidad",
});

export default function PrivacyPage() {
  return (
    <InfoPageShell
      description="Pulso Sísmico es un sitio informativo y de consulta. No requiere crear una cuenta ni entregar datos personales para navegar por sus páginas públicas."
      title="Privacidad"
    >
      <section className="grid gap-5 md:grid-cols-3">
        {[
          {
            icon: "👤",
            eyebrow: "CUENTAS",
            title: "Sin registro",
            body: "Pulso Sísmico no requiere crear cuentas de usuario, perfiles ni iniciar sesión para consultar la información publicada.",
          },
          {
            icon: "📝",
            eyebrow: "DATOS",
            title: "Sin formularios",
            body: "Actualmente no solicitamos nombres, teléfonos, direcciones ni otros datos personales mediante formularios del sitio.",
          },
          {
            icon: "🔒",
            eyebrow: "PRIVACIDAD",
            title: "Uso limitado",
            body: "La información técnica generada durante la navegación se utiliza únicamente para operación, seguridad y funcionamiento del sitio.",
          },
        ].map((item) => (
          <article
            className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5"
            key={item.title}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#55C2FF]/10 text-lg">
              {item.icon}
            </div>

            <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
              {item.eyebrow}
            </p>

            <h2 className="mt-2 text-lg font-extrabold text-[#F7FAFC]">
              {item.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#C4D0DF]">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          INFORMACIÓN TÉCNICA
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Registros de funcionamiento
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-7 text-[#C4D0DF]">
          <p>
            Como ocurre con la mayoría de los sitios web, la infraestructura
            utilizada para publicar Pulso Sísmico puede generar registros
            técnicos relacionados con solicitudes, errores, seguridad y
            diagnóstico.
          </p>

          <p>
            Estos registros pueden ser gestionados por los proveedores
            tecnológicos utilizados para alojar y distribuir el sitio y no se
            utilizan por Pulso Sísmico para crear perfiles editoriales de los
            visitantes.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          SERVICIOS EXTERNOS
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Contenido y servicios de terceros
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
          Pulso Sísmico utiliza servicios externos para obtener información
          sísmica, mostrar mapas y operar su infraestructura web. Al acceder a
          enlaces externos, como los informes oficiales del Centro Sismológico
          Nacional, aplican las políticas de privacidad de esos respectivos
          sitios.
        </p>
      </section>

      <section className="rounded-3xl border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          COOKIES Y PUBLICIDAD
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Situación actual
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Actualmente Pulso Sísmico no utiliza sistemas propios de publicidad
          personalizada ni solicita información personal con fines
          publicitarios.
        </p>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Si en el futuro incorporamos servicios de publicidad, analítica,
          cookies u otras tecnologías que impliquen tratamiento adicional de
          información, esta política será actualizada para explicar claramente
          qué servicios se utilizan y con qué finalidad.
        </p>
      </section>

      <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#93A4B8]">
          ACTUALIZACIONES
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Cambios en esta política
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Esta página podrá actualizarse si Pulso Sísmico incorpora nuevas
          funcionalidades o servicios que cambien la forma en que se trata
          información relacionada con los visitantes.
        </p>

        <p className="mt-4 text-xs text-[#93A4B8]">
          Última actualización: agosto de 2026.
        </p>
      </section>
    </InfoPageShell>
  );
}
