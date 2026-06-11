export function resetPasswordEmailHtml(
  nombre: string,
  resetLink: string,
): string {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
        <h1 style="font-size: 24px; margin: 0 0 8px; color: #111827;">
          Recuperación de contraseña
        </h1>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 20px;">
          Hola, ${nombre}.
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 20px;">
          Recibimos una solicitud para restablecer tu contraseña. Hacé clic en el siguiente botón para crear una nueva:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}"
             style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
            Restablecer contraseña
          </a>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 0 0 20px;">
          Este enlace expira en <strong>1 hora</strong>. Si no solicitaste este cambio, ignorá este mensaje.
        </p>

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
