export function welcomeEmailHtml(nombre: string): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
        <h1 style="font-size: 24px; margin: 0 0 8px; color: #111827;">
          ¡Bienvenido, ${nombre}!
        </h1>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 20px;">
          Tu cuenta ha sido creada correctamente.
        </p>

        <div style="background-color: #fef9c3; padding: 16px 20px; border-radius: 6px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Cuenta pendiente de activación</strong>
          </p>

          <p style="margin: 8px 0 0; font-size: 14px; color: #92400e;">
            Un administrador revisará y activará tu cuenta para que puedas comenzar a usar la plataforma.
            Te notificaremos por correo cuando esté lista.
          </p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Saludos,</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0;">
          <strong>El equipo de Algorithmics</strong>
        </p>
      </div>

      <div style="text-align: center; padding: 20px 0; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0;">Este es un mensaje automático, por favor no respondas a este correo.</p>
      </div>
    </div>
  `;
}
