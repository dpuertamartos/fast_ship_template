import { Container, Typography, Box } from '@mui/material'
import ContactButton from '../components/common/ContactButton'

const date = "16/05/2024"

const PrivacyPolicy = () => {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        {/* English Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Effective Date: {date}
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to template.es ("we", "our", "us"). This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website template.es (the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.
          </Typography>
          <Typography variant="h5" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            - Personal Data
            - Derivative Data
            - Financial Data
            - Data from Social Networks
            - Mobile Device Data
            - Third-Party Data
            - Data From Contests, Giveaways, and Surveys
          </Typography>
          <Typography variant="h5" gutterBottom>
            2. Use of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            - Create and manage your account
            - Email you regarding your account or order
            - Fulfill and manage purchases, orders, payments, and other transactions related to the Site
            - Generate a personal profile about you to make future visits to the Site more personalized
            - Increase the efficiency and operation of the Site
            - Monitor and analyze usage and trends to improve your experience with the Site
            - Offer new products, services, and/or recommendations to you
            - Perform other business activities as needed
            - Prevent fraudulent transactions, monitor against theft, and protect against criminal activity
            - Process payments and refunds
            - Request feedback and contact you about your use of the Site
            - Resolve disputes and troubleshoot problems
            - Respond to product and customer service requests
            - Send you a newsletter
            - Solicit support for the Site
          </Typography>
          <Typography variant="h5" gutterBottom>
            3. Disclosure of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            - By Law or to Protect Rights
            - Third-Party Service Providers
            - Marketing Communications
            - Interactions with Other Users
            - Online Postings
            - Third-Party Advertisers
            - Affiliates
            - Business Partners
            - Other Third Parties
            - Sale or Bankruptcy
          </Typography>
          <Typography variant="body1" paragraph>
            We are not responsible for the actions of third parties with whom you share personal or sensitive data, and we have no authority to manage or control third-party solicitations. If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4. Security of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </Typography>
          <Typography variant="h5" gutterBottom>
            5. Policy for Children
          </Typography>
          <Typography variant="body1" paragraph>
            We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us at: <ContactButton />.
          </Typography>
          <Typography variant="h5" gutterBottom>
            6. Controls for Do-Not-Track Features
          </Typography>
          <Typography variant="body1" paragraph>
            Most web browsers and some mobile operating systems include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy.
          </Typography>
          <Typography variant="h5" gutterBottom>
            7. Options Regarding Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Account Information: You may at any time review or change the information in your account or terminate your account by:
            - Logging into your account settings and updating your account
            - Contacting us using the contact information provided below
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
          </Typography>
          <Typography variant="body1" paragraph>
            Emails and Communications: If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
            - Noting your preferences at the time you register your account with the Site
            - Logging into your account settings and updating your preferences
            - Contacting us using the contact information provided below
            If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly.
          </Typography>
          <Typography variant="h5" gutterBottom>
            8. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have questions or comments about this Privacy Policy, please contact us at: <ContactButton />.
          </Typography>
        </Box>

        {/* Spanish Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Política de Privacidad
          </Typography>
          <Typography variant="body1" paragraph>
            Fecha de Efecto: {date}
          </Typography>
          <Typography variant="body1" paragraph>
            Bienvenido a template.es ("nosotros", "nuestro", "nos"). Esta política de privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web template.es (el "Sitio"). Lea esta política de privacidad detenidamente. Si no está de acuerdo con los términos de esta política de privacidad, no acceda al Sitio.
          </Typography>
          <Typography variant="h5" gutterBottom>
            1. Información que Recopilamos
          </Typography>
          <Typography variant="body1" paragraph>
            Podemos recopilar información sobre usted de varias maneras. La información que podemos recopilar en el Sitio incluye:
            - Datos Personales
            - Datos Derivados
            - Datos Financieros
            - Datos de Redes Sociales
            - Datos de Dispositivos Móviles
            - Datos de Terceros
            - Datos de Concursos, Sorteos y Encuestas
          </Typography>
          <Typography variant="h5" gutterBottom>
            2. Uso de Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            Tener información precisa sobre usted nos permite brindarle una experiencia fluida, eficiente y personalizada. Específicamente, podemos usar la información recopilada sobre usted a través del Sitio para:
            - Crear y administrar su cuenta
            - Enviarle correos electrónicos sobre su cuenta o pedido
            - Cumplir y gestionar compras, pedidos, pagos y otras transacciones relacionadas con el Sitio
            - Generar un perfil personal sobre usted para hacer que las futuras visitas al Sitio sean más personalizadas
            - Aumentar la eficiencia y operación del Sitio
            - Monitorear y analizar el uso y las tendencias para mejorar su experiencia con el Sitio
            - Ofrecerle nuevos productos, servicios y/o recomendaciones
            - Realizar otras actividades comerciales según sea necesario
            - Prevenir transacciones fraudulentas, monitorear contra robos y proteger contra actividades delictivas
            - Procesar pagos y reembolsos
            - Solicitar comentarios y contactarlo sobre su uso del Sitio
            - Resolver disputas y solucionar problemas
            - Responder a solicitudes de productos y servicios al cliente
            - Enviarle un boletín informativo
            - Solicitar apoyo para el Sitio
          </Typography>
          <Typography variant="h5" gutterBottom>
            3. Divulgación de Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            Podemos compartir la información que hemos recopilado sobre usted en ciertas situaciones. Su información puede ser divulgada de la siguiente manera:
            - Por Ley o para Proteger Derechos
            - Proveedores de Servicios de Terceros
            - Comunicaciones de Marketing
            - Interacciones con Otros Usuarios
            - Publicaciones en Línea
            - Anunciantes de Terceros
            - Afiliados
            - Socios Comerciales
            - Otros Terceros
            - Venta o Quiebra
          </Typography>
          <Typography variant="body1" paragraph>
            No somos responsables de las acciones de terceros con quienes comparta datos personales o sensibles, y no tenemos autoridad para gestionar o controlar las solicitudes de terceros. Si ya no desea recibir correspondencia, correos electrónicos u otras comunicaciones de terceros, usted es responsable de contactar al tercero directamente.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4. Seguridad de Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para asegurar la información personal que nos proporciona, tenga en cuenta que, a pesar de nuestros esfuerzos, no hay medidas de seguridad perfectas o impenetrables, y ningún método de transmisión de datos puede garantizarse contra cualquier interceptación u otro tipo de uso indebido.
          </Typography>
          <Typography variant="h5" gutterBottom>
            5. Política para Niños
          </Typography>
          <Typography variant="body1" paragraph>
            No solicitamos información de niños menores de 13 años ni comercializamos a ellos de manera consciente. Si nos enteramos de que hemos recopilado información personal de un niño menor de 13 años sin la verificación del consentimiento de los padres, eliminaremos esa información lo más rápido posible. Si cree que podemos tener información de o sobre un niño menor de 13 años, contáctenos en: <ContactButton />.
          </Typography>
          <Typography variant="h5" gutterBottom>
            6. Controles para Características de No Rastreo
          </Typography>
          <Typography variant="body1" paragraph>
            La mayoría de los navegadores web y algunos sistemas operativos móviles incluyen una función o configuración de No Rastreo ("DNT") que puede activar para señalar su preferencia de privacidad de no tener datos sobre sus actividades de navegación en línea monitoreados y recopilados. No se ha finalizado un estándar de tecnología uniforme para reconocer e implementar señales DNT. Como tal, actualmente no respondemos a las señales del navegador DNT ni a ningún otro mecanismo que comunique automáticamente su elección de no ser rastreado en línea. Si se adopta un estándar para el rastreo en línea que debemos seguir en el futuro, le informaremos sobre esa práctica en una versión revisada de esta política de privacidad.
          </Typography>
          <Typography variant="h5" gutterBottom>
            7. Opciones con Respecto a Su Información
          </Typography>
          <Typography variant="body1" paragraph>
            Información de la Cuenta: Puede en cualquier momento revisar o cambiar la información en su cuenta o terminar su cuenta mediante:
            - Iniciar sesión en la configuración de su cuenta y actualizar su cuenta
            - Contactarnos usando la información de contacto proporcionada a continuación
            Tras su solicitud de terminar su cuenta, desactivaremos o eliminaremos su cuenta e información de nuestras bases de datos activas. Sin embargo, parte de la información puede ser retenida en nuestros archivos para prevenir fraudes, resolver problemas, ayudar con cualquier investigación, hacer cumplir nuestros Términos de Uso y/o cumplir con requisitos legales.
          </Typography>
          <Typography variant="body1" paragraph>
            Correos Electrónicos y Comunicaciones: Si ya no desea recibir correspondencia, correos electrónicos u otras comunicaciones de nosotros, puede optar por no participar mediante:
            - Anotar sus preferencias en el momento en que registre su cuenta en el Sitio
            - Iniciar sesión en la configuración de su cuenta y actualizar sus preferencias
            - Contactarnos usando la información de contacto proporcionada a continuación
            Si ya no desea recibir correspondencia, correos electrónicos u otras comunicaciones de terceros, usted es responsable de contactar al tercero directamente.
          </Typography>
          <Typography variant="h5" gutterBottom>
            8. Contáctenos
          </Typography>
          <Typography variant="body1" paragraph>
            Si tiene preguntas o comentarios sobre esta Política de Privacidad, contáctenos en: <ContactButton />
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default PrivacyPolicy
