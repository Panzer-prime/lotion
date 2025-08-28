import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";


export const model = createGoogleGenerativeAI({
	apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY as string,
})("gemini-2.5-flash");

export const getAiResponse = async (promt: string) => {
	const basePrompt = `
    You will answear to every prompt in markdown format and not inside of code block
    
    
    
    ${promt}
    `;
	const { text } = await generateText({
		model: model,
		prompt: basePrompt,
	});

	return text;
};
