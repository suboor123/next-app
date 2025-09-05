import { useEffect } from "react";

// ====== Score Page Component ======
export const ScorePage = ({ scores, onRestart }) => {
  const totalScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const sendEmail = async (subject, html) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const body = {
      subject,
      html,
    };

    const requestBody = JSON.stringify(body);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: requestBody,
      redirect: "follow",
    };

    try {
      const response = await fetch("/api/send-email", requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  useEffect(() => {
    const subject = "Umama's Love Game Final Scores 💖";

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #C2185B; background: #fff0f6; padding: 30px; border-radius: 12px; max-width: 450px; margin: auto; box-shadow: 0 4px 15px rgba(194, 24, 91, 0.25);">
        <h1 style="color: #880e4f; text-align: center; font-weight: 700; margin-bottom: 25px;">
          Umama's Final Scores from the Love Game 💖
        </h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
          <thead>
            <tr style="background-color: #f8bbd0;">
              <th style="padding: 12px; border: 1px solid #e91e63; text-align: left; border-radius: 8px 0 0 8px;">Level</th>
              <th style="padding: 12px; border: 1px solid #e91e63; text-align: right; border-radius: 0 8px 8px 0;">Score</th>
            </tr>
          </thead>
          <tbody>
            ${scores
              .map(
                (score, idx) =>
                  `<tr style="background-color: ${idx % 2 === 0 ? "#fce4ec" : "#f8bbd0"};">
                    <td style="padding: 12px; border: 1px solid #e91e63;">Level ${idx + 1}</td>
                    <td style="padding: 12px; border: 1px solid #e91e63; text-align: right; font-weight: 600;">${score}%</td>
                  </tr>`
              )
              .join("")}
            <tr style="background-color: #e91e63; color: #fff; font-weight: 700;">
              <td style="padding: 12px; border: 1px solid #e91e63; border-radius: 0 0 0 8px;">Average</td>
              <td style="padding: 12px; border: 1px solid #e91e63; text-align: right; border-radius: 0 0 8px 0;">${totalScore}%</td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: center; margin-top: 30px; font-style: italic; font-size: 18px; color: #ad1457;">
          Thanks for playing, Umama! 💕
        </p>
      </div>
    `;

    sendEmail(subject, html);
  }, [scores, totalScore]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-pink-50 p-4 text-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-6">Umama's Final Score</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        {scores.map((score, idx) => (
          <div key={idx} className="mb-4 text-pink-700">
            Level {idx + 1} Score: <span className="font-extrabold">{score}%</span>
          </div>
        ))}
        <hr className="my-4 border-pink-300" />
        <div className="text-2xl font-bold text-pink-700 mb-6">Average Score: {totalScore}%</div>
        <button
          onClick={onRestart}
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
