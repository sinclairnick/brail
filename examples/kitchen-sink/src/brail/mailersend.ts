const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

// Example using Mailersend to send an email
export const sendMail = (to: string, subject: string, html: string) => {
  const url = `https://api.mailersend.com/v1`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${MAILERSEND_API_KEY}`,
    "X-Requested-With": "XMLHttpRequest",
  };

  return fetch(`${url}/email`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      html,
      to: [{ email: to }],
      from: { email: FROM_EMAIL },
      subject,
    }),
  });
};
