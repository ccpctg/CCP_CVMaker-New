import express, { Request, Response } from "express";
import { generateProfileSuggestions, translateProfileData, parseBioFromText } from "./gemini.js";

const app = express();
app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    app: "Creative Concept Point CV Maker",
    time: new Date().toISOString(),
  });
});

// Gemini profile suggestions endpoint
app.post("/api/gemini/suggest-profile", async (req: Request, res: Response) => {
  try {
    const { jobTitle, mode, language, existingSummary, fieldOfStudy } = req.body || {};

    const suggestions = await generateProfileSuggestions({
      jobTitle: String(jobTitle || ""),
      mode: mode === "matrimonial" ? "matrimonial" : "job",
      language: language === "en" ? "en" : "bn",
      existingSummary: existingSummary ? String(existingSummary) : undefined,
      fieldOfStudy: fieldOfStudy ? String(fieldOfStudy) : undefined,
    });

    res.json({ success: true, data: suggestions });
  } catch (error: any) {
    console.error("API error in suggest-profile:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate suggestions",
    });
  }
});

// Gemini profile full auto-translate endpoint
app.post("/api/gemini/translate-profile", async (req: Request, res: Response) => {
  try {
    const { targetLanguage, data } = req.body || {};
    const translated = await translateProfileData({
      targetLanguage: targetLanguage === "en" ? "en" : "bn",
      data,
    });
    res.json({ success: true, data: translated });
  } catch (error: any) {
    console.error("API error in translate-profile:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to translate profile",
    });
  }
});

// Gemini parse bio from mobile text / resume
app.post("/api/gemini/parse-bio", async (req: Request, res: Response) => {
  try {
    const { rawText, preferredLanguage } = req.body || {};
    if (!rawText || typeof rawText !== "string") {
      return res.status(400).json({ success: false, error: "Missing rawText" });
    }
    const parsed = await parseBioFromText(rawText, preferredLanguage === "en" ? "en" : "bn");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("API error in parse-bio:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to parse text",
    });
  }
});

export default app;
