import { db } from "@/server/db";
import { NextResponse } from "next/server";

const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;
const businessId = process.env.BUSINESS_ID;

export async function POST(req: Request) {
  try {
    const { message, phoneNumber } = await req.json();

    if (typeof message !== "string") {
      throw new Error("Invalid message format");
    }

    const textResponse = await fetch(
      `https://graph.facebook.com/v20.0/${businessId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        body: JSON.stringify({
          // messaging_product: "whatsapp",
          // recipient_type: "individual",
          // to: phoneNumber,
          // type: "text",
          // text: { body: message },

          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: phoneNumber,
          type: "text",
          text: {
            body: message,
          },
        }),
      },
    );

    const textResponseJson = await textResponse.json();

    console.log(textResponse);
    console.log(textResponseJson);
    //save into message table
    await db.message.create({
      data: {
        waMessageId: textResponseJson.messages[0].id,
        waAccountId: textResponseJson.contacts[0].wa_id,
        phoneNumberId: textResponseJson.contacts[0].wa_id,
        timestamp: new Date(),
        profileName: "API",
        body: message,
        messageType: "text",
        type: "api",
      },
    });

    // Process the message and generate a response
    // This is where you'd integrate with your actual chat logic or external API
    const response = `You said: ${message}`;

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
