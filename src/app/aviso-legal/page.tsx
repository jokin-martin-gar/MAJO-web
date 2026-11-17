import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { Completar } from "@/components/ui/Completar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal e información del titular de la web de ${site.legalName}.`,
  alternates: { canonical: "/aviso-legal" },
};

// Template based on art. 10 of Spain's LSSI-CE. Have it reviewed before publishing.
export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal" updated={<Completar>fecha</Completar>}>
      <h2>Titular de la web</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
      <ul>
        <li>Titular: <Completar>nombre y apellidos o razón social</Completar></li>
        <li>NIF/CIF: <Completar>NIF o CIF</Completar></li>
        <li>Domicilio: <Completar>dirección postal completa</Completar></li>
        <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
        <li>Datos registrales (si es sociedad): <Completar>Registro Mercantil, tomo, folio, hoja</Completar></li>
      </ul>

      <h2>Objeto</h2>
      <p>Esta web presenta los servicios de diseño y desarrollo web de {site.legalName} y permite solicitar información o un presupuesto. Los proyectos mostrados como “Proyecto conceptual” son negocios ficticios creados con fines demostrativos.</p>

      <h2>Propiedad intelectual</h2>
      <p>Los textos, diseños, código y demás elementos de esta web son propiedad del titular o se usan con licencia. No se permite su reproducción con fines comerciales sin autorización expresa.</p>

      <h2>Responsabilidad</h2>
      <p>El titular procura que la información de la web sea exacta y esté actualizada, pero no se hace responsable de errores puntuales ni del uso que terceros hagan de ella. Los enlaces externos, si los hubiera, se ofrecen solo a título informativo.</p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española.</p>
    </LegalPage>
  );
}
