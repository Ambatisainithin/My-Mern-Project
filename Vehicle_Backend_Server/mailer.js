const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function currency(val) {
  if (typeof val !== 'number') return '';
  return `₹${val.toFixed(2)}`;
}

function buildEmailHTML({ name, serviceType, date, status, billing }) {
  const title = status === 'completed' ? 'Service Completed' : status === 'pending' ? 'Booking Received' : 'Booking Confirmation';
  const intro = status === 'completed'
    ? `Your <strong>${serviceType}</strong> service on <strong>${date}</strong> has been completed.`
    : status === 'pending'
    ? `We have received your booking request for <strong>${serviceType}</strong> on <strong>${date}</strong>. Our team will review and confirm shortly.`
    : `Your booking for <strong>${serviceType}</strong> on <strong>${date}</strong> is confirmed.`;

  const payment = billing && typeof billing.basePrice === 'number' ? `
    <tr>
      <td style="padding:0 0 16px 0">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f8fafc;border-radius:8px">
          <tr>
            <td style="padding:16px 20px;font-family:Arial,sans-serif;color:#0f172a">
              <h3 style="margin:0 0 12px 0;font-size:16px;color:#0f172a">Payment Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;color:#0f172a">
                <tr>
                  <td style="padding:6px 0">Base Price</td>
                  <td style="padding:6px 0;text-align:right">${currency(billing.basePrice)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0">GST (18%)</td>
                  <td style="padding:6px 0;text-align:right">${currency(billing.gst)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0">Service Tax (5%)</td>
                  <td style="padding:6px 0;text-align:right">${currency(billing.serviceTax)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0"><strong>Total</strong></td>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;text-align:right"><strong>${currency(billing.finalAmount)}</strong></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : '';

  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f1f5f9;padding:24px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);overflow:hidden">
          <tr>
            <td style="background:#0ea5e9;padding:20px 24px;color:#ffffff;font-family:Arial,sans-serif">
              <h1 style="margin:0;font-size:20px">Honda Service Center</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;font-family:Arial,sans-serif;color:#0f172a">
              <p style="margin:0 0 12px 0">Hi ${name},</p>
              <p style="margin:0 0 16px 0">${intro}</p>
              <p style="margin:0 0 16px 0;color:#334155">Service: <strong>${serviceType}</strong><br/>Date: <strong>${date}</strong></p>
            </td>
          </tr>
          ${payment}
          <tr>
            <td style="padding:0 24px 24px 24px;font-family:Arial,sans-serif;color:#334155">
              <p style="margin:0">Regards,<br/>Honda Service Team</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:12px 24px;text-align:center;color:#64748b;font-family:Arial,sans-serif;font-size:12px">
              © ${new Date().getFullYear()} Honda Service Center
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function buildEmailText({ name, serviceType, date, status, billing }) {
  const title = status === 'completed' ? 'Service Completed' : status === 'pending' ? 'Booking Received' : 'Booking Confirmation';
  let text = `Hi ${name},\n`;
  text += status === 'completed'
    ? `Your ${serviceType} service on ${date} has been completed.\n`
    : status === 'pending'
    ? `We have received your booking request for ${serviceType} on ${date}. Our team will review and confirm shortly.\n`
    : `Your booking for ${serviceType} on ${date} is confirmed.\n`;
  if (billing && typeof billing.basePrice === 'number') {
    text += `\nPayment Summary:\n`;
    text += `Base Price: ${billing.basePrice}\n`;
    text += `GST (18%): ${billing.gst}\n`;
    text += `Service Tax (5%): ${billing.serviceTax}\n`;
    text += `Total: ${billing.finalAmount}\n`;
  }
  text += `\nRegards,\nHonda Service Team`;
  return text;
}

const sendConfirmationEmail = (
  to,
  name,
  serviceType,
  date,
  status = "accepted",
  billing = {}
) => {
  const subject = status === "completed" ? "Service Completed" : status === "pending" ? "Booking Received - Honda Service" : "Booking Confirmation";
  const html = buildEmailHTML({ name, serviceType, date, status, billing });
  const text = buildEmailText({ name, serviceType, date, status, billing });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
