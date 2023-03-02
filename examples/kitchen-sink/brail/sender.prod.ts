const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;

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
      from: { email: "test@grossr.com" },
      subject,
    }),
  });
};
