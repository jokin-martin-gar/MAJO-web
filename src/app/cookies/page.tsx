import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { Completar } from "@/components/ui/Completar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `Información sobre el uso de cookies en la web de ${site.legalName}.`,
  alternates: { canonical: "/cookies" },
};

// Accurate for the current site: no analytics, no ads, no third-party embeds, no cookies set.
// If analytics or embeds are added, this page AND a consent banner must be updated.
export default function Cookies() {
  return (
    <LegalPage title="Política de cookies" updated={<Completar>fecha</Completar>}>
      <h2>¿Usamos cookies?</h2>
      <p>No. A día de hoy esta web no instala cookies propias ni de terceros: no usamos herramientas de analítica, publicidad ni redes sociales que rastreen tu navegación. Por eso no te mostramos un aviso de cookies.</p>

      <h2>Almacenamiento técnico</h2>
      <p>El navegador puede guardar temporalmente archivos de la web (caché) para que cargue más rápido. No contienen datos personales y puedes borrarlos desde la configuración de tu navegador.</p>

      <h2>Cambios</h2>
      <p>Si en el futuro incorporamos herramientas que usen cookies (por ejemplo, analítica), actualizaremos esta política y te pediremos tu consentimiento antes de instalarlas.</p>
    </LegalPage>
  );
}
