export default async function handler(prompt = "") {
	const apiKey = process.env.GOOGLE_API_KEY;
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
	
	const requestBody = {
		contents: [
		{
			role: "user",
			parts: [{ text: prompt }],
		},
		],
	};
	
	const response = await fetch(url, {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	});
	
	return response;
}