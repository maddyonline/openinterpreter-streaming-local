async function fetchWithImport() {
  const fetch = (await import('node-fetch')).default;
  return fetch;
}

async function streamOpenAI() {
  const fetch = await fetchWithImport();
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const body = {
    model: "gpt-3.5-turbo", // Replace with the actual model you have access to
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: "Hello!"
      }
    ],
    stream: true
  };

  const response = await fetch('http://127.0.0.1:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message: "using a loop, compute first 100 fibonnacci numbers. then output the 100th number"})
  });

  // Handling the response stream properly in Node.js
  response.body.on('data', (chunk) => {
    console.log("Received chunk:", chunk.toString());
  });

  response.body.on('end', () => {
    console.log("Stream ended");
  });
}

streamOpenAI().catch(console.error);

