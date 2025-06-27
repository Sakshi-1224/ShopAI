import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function parseGeminiResponse(text) {
  try {
    let cleanText = text.replace(/```json|```/g, '').trim();
    const jsonStart = cleanText.indexOf('[');
    const jsonEnd = cleanText.lastIndexOf(']') + 1;
    if (jsonStart !== -1 && jsonEnd > 0) {
      cleanText = cleanText.substring(jsonStart, jsonEnd);
    }
    return JSON.parse(cleanText);
  } catch (parseError) {
    console.error('Failed to parse:', text);
    throw new Error(`Invalid JSON response: ${parseError.message}`);
  }
}

export const getProductRecommendations = async (req, res) => {
  try {
    const { userNeeds } = req.body;
    
    if (!userNeeds || typeof userNeeds !== 'string') {
      return res.status(400).json({ 
        error: "Please provide valid clothing needs description",
        example: "summer dresses for beach vacation"
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    });
    
    const prompt = `
      As an expert fashion recommender for OneCart, suggest 5 clothing items matching:
      "${userNeeds}"

      Return ONLY a JSON array with items following EXACTLY this format:
      [
        {
          "name": "Short product name (max 4 words)",
          "description": "Key features in 12-18 words",
          "category": "Specific clothing type",
          "reason": "Why this matches the request (12-15 words)"
        }
      ]

      Requirements:
      - Only include name, description, category, and reason
      - No price ranges or other fields
      - No additional text outside the JSON array
      - Items must be relevant to clothing/fashion

      Example valid response:
      [
        {
          "name": "Linen Summer Dress",
          "description": "Breathable fabric with sun protection, perfect for hot weather",
          "category": "Women's Dresses",
          "reason": "Lightweight and stylish for beach outings"
        }
      ]
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recommendations = parseGeminiResponse(response.text());
    
    if (!Array.isArray(recommendations)) {
      throw new Error('Invalid response format');
    }

    res.json({
      success: true,
      recommendations: recommendations.slice(0, 5) // Ensure max 5 items
    });
    console.log(recommendations);
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: "Recommendation service unavailable",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};