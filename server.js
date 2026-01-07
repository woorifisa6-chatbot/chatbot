import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors()); // 필요하면 origin 제한 걸어도 됨
app.use(express.json());

const INVOKE_URL = process.env.CLOVA_INVOKE_URL;
const SECRET_KEY = process.env.CLOVA_SECRET_KEY;

if (!INVOKE_URL || !SECRET_KEY) {
    throw new Error("Missing CLOVA_INVOKE_URL or CLOVA_SECRET_KEY");
}

// Signature 생성
function makeSignature(bodyString) {
    return crypto
      .createHmac("sha256", SECRET_KEY)
      .update(bodyString, "utf8")
      .digest("base64");
}

// CLOVA 응답에서 텍스트를 추출
function extractBotText(clovaResponse) {
    const content = clovaResponse.bubbles ?? clovaResponse.content ?? [];
    for (const c of content) {
      const type = c.type;
      const data = c.data;
  
      if (type === "text") {
        if (typeof data.description === "string") return data.description;
        if (typeof data.details === "string") return data.details;
        if (typeof data.text === "string") return data.text;
      }
    }
  
    if (typeof clovaResponse.message === "string") {
        return clovaResponse.message;
    }
    
    return "(챗봇 응답을 해석하지 못했어요)";
}


app.post("/chat", async (req, res) => {
    try {
      const { text } = req.body;
      const userId = "12345";
  
      if (!text || typeof text !== "string") {
        return res.status(400).json({ message: "text를 입력해야 합니다." });
      }
  
      const clovaBody = {
        userId,
        timestamp: Date.now(),
        content: [
          {
            type: "text",
            data: {
              details: text,
            },
          },
        ],
        event: "send",
      };
  
      const requestBody = JSON.stringify(clovaBody);
      const signature = makeSignature(requestBody);
  
      const r = await fetch(INVOKE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;UTF-8",
          "X-NCP-CHATBOT_SIGNATURE": signature,
        },
        body: requestBody,
      });
  
      const data = await r.json().catch(() => {
        console.log('Clova Chat으로부터 응답이 오지 않음');
        return {};
      });
  
      if (!r.ok) {
        return res.status(r.status).json({
          message: "CLOVA CHAT 요청 실패",
          status: r.status,
          clovaError: data,
        });
      }
  
      const reply = extractBotText(data);
  
      return res.json(reply);
    } catch (e) {
      return res.status(500).json({ message: "Server error", detail: String(e) });
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(`서버가 http://localhost:3000에서 실행됨`);
  });