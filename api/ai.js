export default async function handler(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	const {prompt} = req.query;
	if (req.method == "OPTIONS" || !prompt) {
	  return res.status(200).end();
	}
	
	const ua = req.headers["user-agent"] || "";
  	if (ua.includes("vercel")) {
    	return res.status(204).end();
  	}

	const apiKey = process.env.GOOGLE_API_KEY;
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`;
	
	const requestBody = {
		contents: [{
			role: "user",
			parts: [{ text: decodeURIComponent(prompt) }],
		}],
		generationConfig: {
			responseModalities: ['Image', 'Text'],
		}
	};
	
	const response = await fetch(url, {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	});
	
	res.status(200).json(await response.json());
}
