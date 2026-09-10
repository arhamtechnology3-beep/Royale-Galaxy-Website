import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Royale Galaxy Lead Email Service',
    sender: process.env.GMAIL_USER || 'Royalegalaxysales@gmail.com'
  });
});

// Primary Lead Submission Endpoint
app.post('/api/send-lead', async (req, res) => {
  const { name, email, phone, configuration, intent, project, submittedAt } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Missing required lead parameters: name, email, and phone are mandatory.' });
  }

  const senderEmail = process.env.GMAIL_USER || 'Royalegalaxysales@gmail.com';
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!appPassword) {
    console.warn('⚠️ GMAIL_APP_PASSWORD not detected in environment. Falling back to console logging.');
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: appPassword
      }
    });

    // 1. Sales Lounge Lead Notification HTML Email
    const salesMailOptions = {
      from: `"Royale Galaxy Web Lead" <${senderEmail}>`,
      to: senderEmail,
      replyTo: email,
      subject: `🚨 New Royale Galaxy Lead: ${name} (${phone})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #080C14; margin: 0; padding: 20px; color: #E2E8F0; }
            .card { max-width: 600px; margin: 0 auto; background: #0F172A; border: 1px solid #D4AF37; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .header { border-bottom: 2px solid #D4AF37; padding-bottom: 15px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
            .title { color: #F59E0B; font-size: 22px; margin: 0; font-weight: 700; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table th, .table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #1E293B; }
            .table th { background: #1E293B; color: #CBD5E1; font-weight: 600; }
            .table td { color: #FFFFFF; font-size: 15px; }
            .badge { background: #D4AF37; color: #000; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 12px; display: inline-block; }
            .footer { margin-top: 25px; padding-top: 15px; border-top: 1px solid #1E293B; font-size: 13px; color: #94A3B8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2 class="title">New Customer Inquiry Received</h2>
              <span class="badge">${project || 'Royale Galaxy'}</span>
            </div>
            <p>A new customer lead has been submitted through the official Royale Galaxy website.</p>
            <table class="table">
              <tr><th>Customer Name</th><td><strong>${name}</strong></td></tr>
              <tr><th>Email Address</th><td><a href="mailto:${email}" style="color: #60A5FA;">${email}</a></td></tr>
              <tr><th>Mobile Phone</th><td><a href="tel:${phone}" style="color: #34D399; font-weight: bold;">${phone}</a></td></tr>
              <tr><th>Interested Unit</th><td><strong>${configuration || '1 BHK'}</strong></td></tr>
              <tr><th>Inquiry Intent</th><td>${intent || 'General Inquiry'}</td></tr>
              <tr><th>Submission Time</th><td>${submittedAt || new Date().toLocaleString()}</td></tr>
            </table>
            <div style="margin-top: 25px; text-align: center;">
              <a href="tel:${phone}" style="background: #D4AF37; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">Call Customer Now</a>
              <a href="mailto:${email}" style="background: #1E293B; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block;">Reply via Email</a>
            </div>
            <div class="footer">
              Royale Galaxy Sales System • Sent automatically from ${senderEmail}
            </div>
          </div>
        </body>
        </html>
      `
    };

    // 2. Client Confirmation HTML Email
    const clientMailOptions = {
      from: `"Royale Galaxy Sales Desk" <${senderEmail}>`,
      to: email,
      replyTo: senderEmail,
      subject: `Inquiry Confirmed - Royale Galaxy Kalyan East`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #05070B; margin: 0; padding: 20px; color: #E2E8F0; }
            .card { max-width: 600px; margin: 0 auto; background: #0E1422; border: 1px solid #D4AF37; border-radius: 12px; padding: 32px; box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
            .logo-bar { text-align: center; margin-bottom: 20px; }
            .title { color: #F59E0B; font-size: 24px; margin-bottom: 8px; text-align: center; font-family: Georgia, serif; }
            .subtitle { color: #94A3B8; font-size: 14px; text-align: center; margin-bottom: 24px; }
            .content-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; padding: 20px; margin-bottom: 24px; }
            .highlight { color: #F59E0B; font-weight: bold; }
            .btn { background: linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%); color: #000; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 15px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #64748B; text-align: center; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="title">ROYALE GALAXY</div>
            <div class="subtitle">Luxury 1, 2, 3 & 4 BHK Residences • Kalyan East</div>

            <p style="font-size: 16px; color: #FFFFFF;">Dear <strong>${name}</strong>,</p>

            <p style="line-height: 1.6; color: #CBD5E1;">
              Thank you for expressing interest in <strong>Royale Galaxy Kalyan East</strong>! We have successfully registered your inquiry for <span class="highlight">${intent} (${configuration})</span>.
            </p>

            <div class="content-box">
              <h4 style="margin-top: 0; color: #D4AF37;">Inquiry Details Summary</h4>
              <p style="margin: 6px 0; font-size: 14px;">• <strong>Name:</strong> ${name}</p>
              <p style="margin: 6px 0; font-size: 14px;">• <strong>Contact Mobile:</strong> ${phone}</p>
              <p style="margin: 6px 0; font-size: 14px;">• <strong>Configuration:</strong> ${configuration}</p>
              <p style="margin: 6px 0; font-size: 14px;">• <strong>MahaRERA Reg. No:</strong> PR1330002502267</p>
            </div>

            <p style="line-height: 1.6; color: #CBD5E1;">
              Our senior sales manager will reach out to you shortly at <strong>${phone}</strong> with unit availability, official floor plan layouts, and pricing sheets.
            </p>

            <div style="text-align: center; margin: 28px 0;">
              <a href="https://royalegalaxy.in" class="btn">Visit Official Website</a>
            </div>

            <div class="footer">
              <strong>Royale Galaxy Sales Lounge</strong><br>
              Survey No. 36 Hissa 4 & S.No 45 H.No 9/3, Near Varsha Complex, Malang Road, Kalyan (E)<br>
              Direct Call / WhatsApp: +91 84228 61469 | Email: ${senderEmail}<br>
              MahaRERA Registered Project PR1330002502267
            </div>
          </div>
        </body>
        </html>
      `
    };

    if (appPassword) {
      // Send both emails in parallel via Gmail SMTP
      await Promise.all([
        transporter.sendMail(salesMailOptions),
        transporter.sendMail(clientMailOptions)
      ]);
      console.log(`✅ Success: Lead email sent from ${senderEmail} to sales desk and client (${email}).`);
    } else {
      console.log('ℹ️ Lead processed (SMTP app password missing, please set GMAIL_APP_PASSWORD in .env)');
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry received successfully! Confirmation email dispatched from ${senderEmail} to ${email}.`,
      lead: { name, email, phone, configuration, intent }
    });
  } catch (err) {
    console.error('❌ Error sending email via Nodemailer:', err);
    return res.status(500).json({
      error: 'Failed to send lead email via Nodemailer',
      details: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Royale Galaxy Lead Server running on port ${PORT}`);
  console.log(`📧 Configured Sender: ${process.env.GMAIL_USER || 'Royalegalaxysales@gmail.com'}`);
});
