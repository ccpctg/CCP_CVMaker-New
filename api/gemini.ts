import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export interface ProfileSuggestionRequest {
  jobTitle: string;
  mode: "job" | "matrimonial";
  language: "bn" | "en";
  existingSummary?: string;
  fieldOfStudy?: string;
}

export interface ProfileSuggestionResponse {
  summary: string;
  skills: Array<{ name: string; level: number; category: "technical" | "soft" }>;
  experiences: Array<{
    role: string;
    organization: string;
    period: string;
    description: string;
  }>;
  partnerExpectations?: string;
  keyProjects?: Array<{
    title: string;
    description: string;
  }>;
}

export async function generateProfileSuggestions(
  params: ProfileSuggestionRequest
): Promise<ProfileSuggestionResponse> {
  const { jobTitle, mode, language, existingSummary, fieldOfStudy } = params;

  const isBengali = language === "bn";
  const isMatrimonial = mode === "matrimonial";

  const systemInstruction = isBengali
    ? `আপনি একজন শীর্ষস্থানীয় পেশাদার সিভি কনসালট্যান্ট এবং বাংলাদেশি পারিবারিক বায়োডাটা স্পেশালিস্ট। ব্যবহারকারীর পেশা এবং মোডের উপর ভিত্তি করে অত্যন্ত মানসম্মত, বাস্তবিক ও সুন্দর বাংলা ও ইংরেজি পরিভাষা সমৃদ্ধ তথ্য তৈরি করুন। সংখ্যা ও সাল স্পষ্ট রাখুন।`
    : `You are an elite executive career consultant and Bangladeshi cultural biodata specialist. Craft compelling, authentic, professional CV content or respectful matrimonial biodata content tailored to the user's role.`;

  const prompt = `
Generate profile recommendations for:
- Profession/Role: "${jobTitle || (isMatrimonial ? "Professional / Business" : "Software Engineer / Designer")}"
- Mode: ${mode} (${isMatrimonial ? "Matrimonial Biodata (পাত্র/পাত্রীর বায়োডাটা)" : "Professional Job CV (জব সিভি)"})
- Output Language: ${isBengali ? "Bengali (বাংলা)" : "English"}
${fieldOfStudy ? `- Field of Study: ${fieldOfStudy}` : ""}
${existingSummary ? `- Context notes: ${existingSummary}` : ""}

Requirements:
1. "summary": A crisp, high-impact 2-3 sentence executive profile summary or personal introduction (in ${isBengali ? "Bengali" : "English"}).
2. "skills": An array of 6 to 8 relevant skills (both technical and soft) with a recommended proficiency level percentage (60 to 95) and category ("technical" or "soft").
3. "experiences": 2 to 3 standard role/venture examples with role title, organization or company type, realistic timeframe, and 1-2 bullet points of achievements.
4. "keyProjects": 2 realistic projects, ventures, or accomplishments.
5. "partnerExpectations": ${
    isMatrimonial
      ? `A culturally respectful, warm 2-3 sentence partner expectation statement reflecting sound family values, mutual respect, education, and religiosity (in ${isBengali ? "Bengali" : "English"}).`
      : `An empty string.`
  }
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "Executive summary or biodata self-introduction",
            },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  level: { type: Type.NUMBER },
                  category: { type: Type.STRING },
                },
                required: ["name", "level", "category"],
              },
            },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  organization: { type: Type.STRING },
                  period: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["role", "organization", "period", "description"],
              },
            },
            keyProjects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["title", "description"],
              },
            },
            partnerExpectations: {
              type: Type.STRING,
              description: "Expectations from prospective life partner",
            },
          },
          required: ["summary", "skills", "experiences"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    const parsed: ProfileSuggestionResponse = JSON.parse(text);
    return parsed;
  } catch (error: any) {
    console.error("Gemini suggestion error:", error);
    // Graceful intelligent fallback if offline or API key missing
    if (isMatrimonial) {
      return {
        summary: isBengali
          ? `পারিবারিক মূল্যবোধ ও ধর্মীয় অনুশাসনে বিশ্বাসী একজন আত্মপ্রত্যয়ী মানুষ। কর্মজীবনে নিষ্ঠার সাথে এগিয়ে চলার পাশাপাশি একটি সুন্দর, সুখী ও প্রশান্তিময় পরিবার গঠনে আন্তরিক।`
          : `A grounded professional with strong family values and faith, dedicated to career growth while seeking to build a warm, peaceful, and balanced life.`,
        skills: [
          { name: isBengali ? "যোগাযোগ দক্ষতা" : "Communication", level: 90, category: "soft" },
          { name: isBengali ? "পারিবারিক দায়িত্ববোধ" : "Family Orientation", level: 95, category: "soft" },
          { name: isBengali ? "সময়ানুবর্তিতা" : "Punctuality", level: 85, category: "soft" },
          { name: isBengali ? "সমস্যা সমাধান" : "Problem Solving", level: 80, category: "soft" },
        ],
        experiences: [
          {
            role: isBengali ? "উদ্যোক্তা / পেশাজীবী" : "Professional / Entrepreneur",
            organization: isBengali ? "প্রতিষ্ঠিত প্রতিষ্ঠান" : "Established Organization",
            period: isBengali ? "২০২২ - বর্তমান" : "2022 - Present",
            description: isBengali ? "দায়িত্বশীলতার সাথে ব্যবসায়িক কার্যক্রম পরিচালনা ও টিম ব্যবস্থাপনা।" : "Managing operations and growth initiatives effectively.",
          },
        ],
        partnerExpectations: isBengali
          ? `শিক্ষিত, মার্জিত, পরোপকারী এবং ধার্মিক জীবনসঙ্গী প্রত্যাশিত যিনি পারিবারিক বন্ধন ও পরস্পরকে সম্মান জানিয়ে একসাথে সুন্দর জীবন গড়তে আগ্রহী।`
          : `Seeking an educated, modest, and family-oriented life partner with sound values, mutual respect, and positive mindset.`,
      };
    } else {
      return {
        summary: isBengali
          ? `সৃজনশীল ও লক্ষ্যনিষ্ঠ পেশাজীবী যিনি আধুনিক প্রযুক্তি, কার্যকর দল পরিচালনা ও ব্যবসায়িক সাফল্যে প্রতিশ্রুতিবদ্ধ। গতিশীল পরিবেশে উদ্ভাবনী সমাধান উদ্ভাবনে অভিজ্ঞ।`
          : `A driven and results-oriented professional with a strong track record of delivering innovative solutions, cross-functional leadership, and measurable business value.`,
        skills: [
          { name: isBengali ? "সৃজনশীল ডিজাইন ও ব্র্যান্ডিং" : "Creative Design & Branding", level: 92, category: "technical" },
          { name: isBengali ? "প্রজেক্ট ম্যানেজমেন্ট" : "Project Management", level: 88, category: "technical" },
          { name: isBengali ? "নেতৃত্ব ও টিমওয়ার্ক" : "Leadership & Teamwork", level: 85, category: "soft" },
          { name: isBengali ? "কৌশলগত পরিকল্পনা" : "Strategic Planning", level: 80, category: "technical" },
          { name: isBengali ? "ক্লায়েন্ট কমিউনিকেশন" : "Client Relations", level: 90, category: "soft" },
        ],
        experiences: [
          {
            role: isBengali ? "সিনিয়র স্পেশালিস্ট" : "Senior Specialist",
            organization: "Creative Concept Point",
            period: isBengali ? "২০২৩ - বর্তমান" : "2023 - Present",
            description: isBengali ? "ব্র্যান্ডিং, ডিজিটাল প্রচারণা ও কৌশলগত প্রজেক্ট সফলভাবে বাস্তবায়ন।" : "Successfully leading branding initiatives, project deliverables, and client solutions.",
          },
        ],
        keyProjects: [
          {
            title: isBengali ? "ব্র্যান্ড আইডেন্টিটি ও অটোমেশন" : "Brand Identity & Automation",
            description: isBengali ? "কর্পোরেট ক্লায়েন্টদের জন্য আধুনিক ভিজ্যুয়াল আইডেন্টিটি ডিজাইন ও ডিজিটাল আর্কিটেকচার।" : "Developed modernized brand identities and digital workflows for premier corporate clients.",
          },
        ],
      };
    }
  }
}

export interface ProfileTranslationRequest {
  targetLanguage: "bn" | "en";
  data: any;
}

export async function translateProfileData(
  params: ProfileTranslationRequest
): Promise<any> {
  const { targetLanguage, data } = params;
  const isTargetBengali = targetLanguage === "bn";

  const systemInstruction = isTargetBengali
    ? `আপনি একজন দক্ষ দ্বিভাষিক (ইংরেজি ও বাংলা) পেশাদার অনুবাদক ও সিভি স্পেশালিস্ট। প্রদত্ত জীবনবৃত্তান্তের সমস্ত টেক্সট অত্যন্ত নির্ভুল ও প্রাতিষ্ঠানিক প্রমিত বাংলায় রূপান্তর করুন। নাম, পদবি, অভিজ্ঞতা, প্রতিষ্ঠানের নাম, ডিগ্রি ও পারিবারিক তথ্য প্রমিত বাংলায় অনুবাদ করুন বা উপযুক্ত ক্ষেত্রে প্রতিবর্ণীকরণ করুন। সংখ্যা ও সাল বাংলা সংখ্যায় (যেমন ২০২৪) রূপান্তর করুন।`
    : `You are an elite bilingual (Bengali and English) executive resume specialist. Accurately translate and polish all fields from Bengali into natural, professional international corporate English. Standardize dates, titles, and educational terminology cleanly.`;

  const prompt = `
Translate the following CV / Biodata JSON data into ${
    isTargetBengali ? "Bengali (বাংলা)" : "English"
  }.
Preserve identical JSON structure and IDs.

Input JSON:
${JSON.stringify({
  personal: data.personal,
  professionalSummary: data.professionalSummary,
  family: data.family,
  matrimonial: data.matrimonial,
  experiences: data.experiences,
  organizationalExperience: data.organizationalExperience,
  education: data.education,
  skills: data.skills,
  customSections: data.customSections,
})}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text from Gemini translation");
    }

    const translatedObj = JSON.parse(text);
    return translatedObj;
  } catch (error: any) {
    console.error("Translation error:", error);
    throw error;
  }
}

export async function parseBioFromText(rawText: string, preferredLanguage: "bn" | "en"): Promise<any> {
  const systemInstruction = `You are an expert Bangladeshi career and matrimonial biodata data extractor. Extract personal, contact, educational, professional, and family details from unstructured text, SMS, WhatsApp bio, or resume into structured JSON. If fields are absent, return sensible empty strings. Standardize Bangladeshi phone numbers (e.g. 01XXXXXXXXX) and format addresses properly.`;

  const prompt = `
Extract all biographical and CV information from this raw text:
"""
${rawText}
"""

Target Language for extracted text: ${preferredLanguage === "bn" ? "Bengali (বাংলা)" : "English"}

Return structured JSON with this exact shape:
{
  "personal": {
    "fullName": "...",
    "tagline": "...",
    "phone": "...",
    "email": "...",
    "currentAddress": "...",
    "permanentAddress": "...",
    "dob": "...",
    "age": "...",
    "height": "...",
    "weight": "...",
    "complexion": "...",
    "bloodGroup": "...",
    "maritalStatus": "...",
    "religion": "..."
  },
  "professionalSummary": "...",
  "family": {
    "fatherName": "...",
    "fatherOccupation": "...",
    "motherName": "...",
    "motherOccupation": "...",
    "siblingsCount": "...",
    "positionInFamily": "...",
    "sistersStatus": "..."
  },
  "matrimonial": {
    "religiousPractice": "...",
    "partnerExpectations": "...",
    "guardianContact": "..."
  },
  "experiences": [
    { "id": "exp-1", "role": "...", "organization": "...", "period": "...", "description": "...", "isVenture": false }
  ],
  "education": [
    { "id": "edu-1", "degree": "...", "institution": "...", "yearOrSession": "...", "result": "..." }
  ],
  "skills": [
    { "id": "sk-1", "name": "...", "level": 85, "category": "technical" }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini extraction");
    return JSON.parse(text);
  } catch (err: any) {
    console.error("Bio parsing error:", err);
    throw err;
  }
}

