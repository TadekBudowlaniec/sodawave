import "dotenv/config";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json({ limit: "200kb" }));

function getEnv(name, fallback = undefined) {
  const v = process.env[name];
  return v && String(v).trim() ? String(v).trim() : fallback;
}

function buildTransport() {
  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT", "587"));
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const secure = getEnv("SMTP_SECURE", "false") === "true";

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function sanitize(str, maxLen = 300) {
  return String(str ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(str ?? "").trim());
}

async function sendMail({ subject, html, replyTo }) {
  const transport = buildTransport();
  if (!transport) {
    const err = new Error("SMTP is not configured (missing SMTP_* env vars).");
    err.code = "SMTP_NOT_CONFIGURED";
    throw err;
  }

  const mailTo = getEnv("MAIL_TO", "sodawave@sodawave.pl");
  const fromName = getEnv("MAIL_FROM_NAME", "SodaWave");
  const fromEmail = getEnv("MAIL_FROM_EMAIL", getEnv("SMTP_USER"));

  return transport.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: mailTo,
    subject,
    html,
    replyTo: replyTo || undefined,
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const fullName = sanitize(req.body?.fullName, 120);
    const email = sanitize(req.body?.email, 160);
    const phone = sanitize(req.body?.phone, 80);
    const message = sanitize(req.body?.message, 5000);

    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({ ok: false, error: "Uzupełnij wszystkie pola." });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Podaj poprawny adres e-mail." });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${fullName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    await sendMail({
      subject: `SodaWave — Kontakt: ${fullName}`,
      html,
      replyTo: email,
    });

    return res.json({ ok: true });
  } catch (e) {
    const msg =
      e?.code === "SMTP_NOT_CONFIGURED"
        ? "Serwer pocztowy nie jest skonfigurowany (SMTP)."
        : "Nie udało się wysłać wiadomości. Spróbuj ponownie.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

app.post("/api/b2b", async (req, res) => {
  try {
    const companyName = sanitize(req.body?.companyName, 180);
    const nip = sanitize(req.body?.nip, 16);
    const fullName = sanitize(req.body?.fullName, 120);
    const email = sanitize(req.body?.email, 160);
    const phone = sanitize(req.body?.phone, 80);
    const address = sanitize(req.body?.address, 240);

    if (!companyName || !nip || !fullName || !email || !phone || !address) {
      return res.status(400).json({ ok: false, error: "Uzupełnij wszystkie pola." });
    }
    if (!/^[0-9]{10}$/.test(nip)) {
      return res.status(400).json({ ok: false, error: "NIP powinien składać się z 10 cyfr." });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Podaj poprawny adres e-mail." });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Nowe zgłoszenie B2B</h2>
        <p><strong>Nazwa firmy:</strong> ${companyName}</p>
        <p><strong>NIP:</strong> ${nip}</p>
        <p><strong>Osoba kontaktowa:</strong> ${fullName}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Adres lokalu:</strong> ${address}</p>
      </div>
    `;

    await sendMail({
      subject: `SodaWave — B2B: ${companyName}`,
      html,
      replyTo: email,
    });

    return res.json({ ok: true });
  } catch (e) {
    const msg =
      e?.code === "SMTP_NOT_CONFIGURED"
        ? "Serwer pocztowy nie jest skonfigurowany (SMTP)."
        : "Nie udało się wysłać zgłoszenia. Spróbuj ponownie.";
    return res.status(500).json({ ok: false, error: msg });
  }
});

const port = Number(getEnv("MAIL_SERVER_PORT", "5174"));
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[mail-server] listening on http://localhost:${port}`);
});

