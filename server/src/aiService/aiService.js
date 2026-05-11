const axios = require('axios');

/**
 * Detect logical fallacies using Google Gemini
 * @param {string} argumentText
 * @param {string} context
 * @returns {Array}
 */
const detectFallacies = async (argumentText, context = '') => {
  // Check API key
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY not configured.');
    return [];
  }

  try {
    console.log('🤖 Calling Gemini AI for fallacy detection...');

    const prompt = `
You are an expert in logic and critical thinking.

Analyze the following argument for logical fallacies.

Context: ${context}

Argument: "${argumentText}"

Common fallacies to check for:
- Ad Hominem
- Straw Man
- Appeal to Authority
- False Dichotomy
- Slippery Slope
- Circular Reasoning
- Hasty Generalization
- Red Herring
- Appeal to Emotion
- Tu Quoque
- Bandwagon
- No True Scotsman

Return ONLY a valid JSON array.

Each object must contain:
- type: string
- confidence: number between 0 and 1
- explanation: string

If no fallacies exist return:
[]

DO NOT use markdown.
DO NOT include explanations outside JSON.
Return ONLY the JSON array.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1000
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract Gemini response text
    const content =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Remove markdown if Gemini adds it
    const cleanContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    console.log(
      '📄 Gemini response:',
      cleanContent.substring(0, 200) + '...'
    );

    // Parse JSON
    const fallacies = JSON.parse(cleanContent);

    // Validate
    if (!Array.isArray(fallacies)) {
      console.error('❌ Invalid response format');
      return [];
    }

    const validFallacies = fallacies.filter((f) => {
      return (
        f &&
        typeof f.type === 'string' &&
        typeof f.confidence === 'number' &&
        typeof f.explanation === 'string' &&
        f.confidence >= 0 &&
        f.confidence <= 1
      );
    });

    console.log(
      `✅ Fallacy detection completed: ${validFallacies.length} found`
    );

    return validFallacies;
  } catch (error) {
    if (error.response) {
      console.error(
        '❌ Gemini API Error:',
        error.response.status,
        error.response.data
      );
    } else if (error.message.includes('JSON')) {
      console.error('❌ JSON Parse Error:', error.message);
    } else {
      console.error('❌ Error:', error.message);
    }

    return [];
  }
};

module.exports = { detectFallacies };