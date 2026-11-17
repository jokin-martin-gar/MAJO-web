import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { Completar } from "@/components/ui/Completar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo trata ${site.legalName} los datos que nos envías a través del formulario de contacto.`,
  alternates: { canonical: "/privacidad" },
};

// Template following the RGPD (EU 2016/679) and LOPDGDD 3/2018. Have it reviewed before publishing.
export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" updated={<Completar>fecha</Completar>}>
      <p>Aquí te explicamos, de forma clara, qué hacemos con los datos que nos envías a través de esta web.</p>

      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>Responsable: <Completar>nombre y apellidos o razón social</Completar></li>
        <li>NIF/CIF: <Completar>NIF o CIF</Completar></li>
        <li>Domicilio: <Completar>dirección postal</Completar></li>
        <li>Contacto: <a href={`mailto:${site.email}`}>{site.email}</a></li>
      </ul>

      <h2>Qué datos tratamos y para qué</h2>
      <p>Cuando rellenas el formulario de contacto tratamos tu nombre, tu email, el tipo de negocio, el presupuesto orientativo (si lo indicas) y el mensaje que nos escribes. Los usamos únicamente para responder a tu solicitud y, si lo deseas, preparar una propuesta.</p>

      <h2>Legitimación</h2>
      <p>La base legal es tu consentimiento al enviarnos el formulario y la aplicación, a petición tuya, de medidas precontractuales (art. 6.1.a y 6.1.b del RGPD).</p>

      <h2>Cuánto tiempo los conservamos</h2>
      <p>Mientras mantengamos la conversación contigo y, como máximo, <Completar>plazo, p. ej. 12 meses</Completar> desde el último contacto si no llegamos a trabajar juntos. Si te conviertes en cliente, durante la relación y los plazos legales aplicables.</p>

      <h2>Con quién los compartimos</h2>
      <p>No vendemos ni cedemos tus datos. Pueden acceder a ellos los proveedores que nos prestan servicios técnicos (alojamiento web y correo electrónico), con los que tenemos los contratos de encargado de tratamiento exigidos: <Completar>proveedores, p. ej. alojamiento y email</Completar>.</p>

      <h2>Tus derechos</h2>
      <p>Puedes acceder, rectificar o suprimir tus datos, oponerte a su tratamiento, limitarlo o solicitar su portabilidad escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>. También puedes retirar tu consentimiento en cualquier momento. Si consideras que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>
    </LegalPage>
  );
}
