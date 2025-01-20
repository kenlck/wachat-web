import { db } from "@/server/db";
import { NextResponse } from "next/server";

const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN ?? "HAPPY";

type WhatsAppMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text: {
    body: string;
  };
};

type WhatsAppWebhookBodyDTO = {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      field: string;
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
        messages: WhatsAppMessage[];
      };
    }>;
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    return new NextResponse(challenge);
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as WhatsAppWebhookBodyDTO;

  try {
    for (const entry of body.entry) {
      for (const change of entry.changes) {
        if (change.value.messages) {
          for (const message of change.value.messages) {
            await db.message.create({
              data: {
                waMessageId: message.id,
                waAccountId: change.value.metadata.phone_number_id,
                phoneNumberId: change.value.metadata.phone_number_id,
                timestamp: new Date(parseInt(message.timestamp) * 1000),
                profileName: change.value.contacts[0]?.profile?.name ?? "",
                body: message.text.body,
                messageType: message.type,
              },
            });
          }
        }
      }
    }

    console.log("Received webhook:\n", JSON.stringify(body));
    return NextResponse.json({ status: "ok" });
  } catch (_error) {
    console.error("Error storing message");
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
