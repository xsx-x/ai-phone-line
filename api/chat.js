export default async function handler(req, res) {

  try {

    const text = req.query.text || "שלום";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "לא התקבלה תשובה";

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("id_list_message=t-" + reply.substring(0,400));

  } catch (e) {

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("id_list_message=t-אירעה שגיאה זמנית");

  }
}
