from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from interpreter import interpreter

interpreter.auto_run = True

app = FastAPI()


class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    def event_stream():
        for result in interpreter.chat(chat_request.message, stream=True):
            yield f"data: {result}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@app.get("/history")
def history_endpoint():
    return interpreter.messages

