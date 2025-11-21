import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      email,
      firstname,
      checkin,
      checkout,
      chalet,
      price,
    } = data;

    // Email client
    await resend.emails.send({
      from: "Ty-Koad <reservation@tykoad.fr>",
      to: email,
      subject: "Votre réservation au chalet Ty-Koad",
      html: `
        <h2>Bonjour ${firstname},</h2>
        <p>Merci pour votre réservation au <strong>Chalet ${chalet}</strong>.</p>
        <p>📅 Séjour : <strong>${checkin}</strong> → <strong>${checkout}</strong></p>
        <p>💳 Montant payé : <strong>${price} €</strong></p>
        <br />
        <p>Nous restons disponibles pour toute question.</p>
        <p>À très bientôt,<br>Hugo & Nina – Chalets Ty-Koad</p>
      `,
    });

    // Email admin (copie)
    await resend.emails.send({
      from: "Ty-Koad <reservation@tykoad.fr>",
      to: process.env.ADMIN_EMAIL.split(";"),
      subject: "Nouvelle réservation – Ty-Koad",
      html: `
        <h2>Nouvelle réservation confirmée</h2>
        <p><strong>${firstname}</strong> a réservé le chalet <strong>${chalet}</strong>.</p>
        <p>📅 Dates : <strong>${checkin}</strong> → <strong>${checkout}</strong></p>
        <p>💶 Montant : <strong>${price} €</strong></p>
        <p>📧 Email client : ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
