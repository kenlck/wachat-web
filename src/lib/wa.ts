export async function sendWhatsAppMessage(to: string, message: string) {
  const response = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token")}`,
    },
    body: new URLSearchParams({
      From: "whatsapp:+14155238886",
      To: `whatsapp:${to}`,
      Body: message,
    }),
  });

  if (response.ok) {
    console.log("Message sent successfully!");
  } else {
    console.error("Failed to send message.");
  }
}
