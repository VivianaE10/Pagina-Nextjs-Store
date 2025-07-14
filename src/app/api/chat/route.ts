import { StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

// ✅ Este runtime lo puedes dejar (o quitar si no usas edge)
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const lastMessage =
      messages?.at(-1)?.content || "Hola, ¿en qué puedo ayudarte?";
    const simulatedReply = `🤖 Respuesta simulada: "${lastMessage}" (sin OpenAI).`;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(simulatedReply));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("❌ ERROR en /api/chat:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}
// //edge:"Ejecutar tu código en el servidor más cercano al usuario (cliente), para que la respuesta sea más rápida."
// // streaming datos enviados en tiempo real por partes
// //El streaming de datos es un proceso en el que los datos se envían y procesan de forma continua
