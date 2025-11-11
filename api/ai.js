export default async function handler(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
	if (req.method == "OPTIONS") {
	  return res.status(200).end();
	}

	const {prompt} = req.query;
	const apiKey = process.env.GOOGLE_API_KEY;
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
	
	const requestBody = {
		contents: [
		{
			role: "user",
			parts: [{ text: decodeURIComponent(prompt) }],
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
	
	res.status(200).json(await response.json());
}