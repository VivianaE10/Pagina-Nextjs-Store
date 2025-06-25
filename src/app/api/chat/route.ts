import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        for await (const chunk of response) {
          const text = chunk.choices[0].delta?.content;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }

        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
    console.error("❌ ERROR EN /api/chat:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}

// import OpenAI from "openai";

// // Crea el cliente OpenAI (edge friendly)
// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// // IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Solicita la completación con streaming activado
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages,
//     stream: true,
//   });

//   // Crea un stream legible con la respuesta
//   const stream = new ReadableStream({
//     async start(controller) {
//       try {
//         for await (const chunk of response) {
//           const text = chunk.choices[0].delta?.content;
//           if (text) {
//             const encoder = new TextEncoder();
//             controller.enqueue(encoder.encode(text));
//           }
//         }
//         controller.close();
//       } catch (error) {
//         controller.error(error);
//       }
//     },
//   });

//   return new Response(stream);
// }

// //edge:"Ejecutar tu código en el servidor más cercano al usuario (cliente), para que la respuesta sea más rápida."
// // streaming datos enviados en tiempo real por partes
// //El streaming de datos es un proceso en el que los datos se envían y procesan de forma continua
