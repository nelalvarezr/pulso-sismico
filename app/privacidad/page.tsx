import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description: "Información general sobre privacidad y tratamiento básico de datos en Pulso Sísmico.",
  path: "/privacidad",
  title: "Privacidad",
});

export default function PrivacyPage() {
  return (
    <InfoPageShell
      description="Pulso Sísmico es un sitio editorial y de consulta. No requiere cuenta de usuario ni solicita datos personales para navegar sus páginas públicas."
      title="Privacidad"
    >
      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <div className="space-y-4 text-sm leading-7 text-[#C4D0DF]">
          <p>
            Este sitio muestra información pública sobre sismos recientes y contenido educativo relacionado. En su uso normal, no pedimos registro, no publicamos perfiles de usuario y no presentamos formularios de contacto que requieran datos personales.
          </p>
          <p>
            Como en la mayoría de los sitios web, la infraestructura de hosting puede generar registros técnicos básicos para operación, seguridad y diagnóstico. Esa información depende del entorno de despliegue y no se utiliza aquí para crear perfiles editoriales de visitantes.
          </p>
          <p>
            Si en el futuro la política de privacidad cambia por nuevas funciones del sitio, esta página debería actualizarse para reflejarlo de forma explícita.
          </p>
        </div>
      </section>
    </InfoPageShell>
  );
}
