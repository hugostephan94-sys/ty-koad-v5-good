// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, website } = body;

    // honeypot anti-bot : si rempli, on ignore silencieusement
    if (website && website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, e-mail et message sont obligatoires." },
        { status: 400 }
      );
    }

    const subjectLine =
      subject && subject !== "Question générale"
        ? `[Contact Ty-Koad] ${subject}`
        : "[Contact Ty-Koad] Nouveau message";

    // ✉️ mail vers toi (Hugo & Nina)
    await resend.emails.send({
      from: "Les Chalets Ty-Koad <onboarding@resend.dev>",
      to: "hugostephan94@gmail.com",
      subject: subjectLine,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : "",
        "",
        "Message :",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erreur /api/contact:", e);
    return NextResponse.json(
      { error: "Erreur à l’envoi de l’e-mail." },
      { status: 500 }
    );
  }
}
