import { useEffect, useRef, useState } from "react";
import "./App.css";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxdLstnf6nLKJ5upETacm36DrOm-Jo_IAidww9fZ_q-XqOr6esIhDKc27ZklhzM0Ojb/exec";

const getDateString = (minusDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - minusDays);

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
};

const today = getDateString(0);
const yesterday = getDateString(1);

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callback =
      "jsonp_callback_" + Date.now() + Math.floor(Math.random() * 100000);

    const script = document.createElement("script");

    window[callback] = (data) => {
      resolve(data);
      delete window[callback];
      script.remove();
    };

    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callback}`;
    script.onerror = () => {
      delete window[callback];
      script.remove();
      reject(new Error("JSONP request failed"));
    };

    document.body.appendChild(script);
  });
}

const normalizeDate = (value) => {
  const d = new Date(value);
  if (!isNaN(d)) return d.toISOString().slice(0, 10);

  return String(value || "").replace("'", "").trim().slice(0, 10);
};

export default function App() {
  const submittingRef = useRef(false);
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(150);
  const [answers, setAnswers] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [yesterdayAnswers, setYesterdayAnswers] = useState([]);

  const loadQuestions = async () => {
    try {
      setQuestionLoading(true);

      const res = await jsonp(
        `${API_URL}?action=getQuestions&quizDate=${today}&t=${Date.now()}`
      );

      if (res.success && Array.isArray(res.questions)) {
        setQuestions(res.questions);
      } else {
        alert("Questions load failed");
      }
    } catch (err) {
      console.error("Questions error:", err);
      alert("Questions load failed");
    } finally {
      setQuestionLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    try {
      setLoadingBoard(true);

      const data = await jsonp(`${API_URL}?t=${Date.now()}`);

      const filtered = data
        .filter((item) => normalizeDate(item.quizDate) === today)
        .sort(
          (a, b) =>
            Number(b.score) - Number(a.score) ||
            Number(a.timeTaken) - Number(b.timeTaken)
        );

      setLeaderboard(filtered);
    } catch (err) {
      console.error("Leaderboard error:", err);
      alert("Leaderboard load failed");
    } finally {
      setLoadingBoard(false);
    }
  };

  const loadYesterdayAnswers = async () => {
    try {
      const res = await jsonp(
        `${API_URL}?action=getAnswers&quizDate=${yesterday}&t=${Date.now()}`
      );

      if (res.success && Array.isArray(res.questions)) {
        setYesterdayAnswers(res.questions);
      } else {
        setYesterdayAnswers([]);
      }
    } catch (err) {
      console.error("Yesterday answers error:", err);
      setYesterdayAnswers([]);
    }
  };

  useEffect(() => {
    loadQuestions();
    loadLeaderboard();
    loadYesterdayAnswers();
  }, []);

  useEffect(() => {
    if (!started || done) return;

    if (time <= 0) {
      submitQuiz();
      return;
    }

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, started, done]);

  const startQuiz = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (questions.length !== 5) {
      alert("Questions not loaded yet");
      return;
    }

    const already = leaderboard.some(
      (u) => String(u.name).toLowerCase() === name.trim().toLowerCase()
    );

    if (already) {
      alert("You already submitted today");
      return;
    }

    setTime(150);
    setAnswers({});
    setStarted(true);
    setDone(false);
    submittingRef.current = false;
  };

  const submitQuiz = async () => {
    if (loading || done || submittingRef.current) return;

    submittingRef.current = true;
    setLoading(true);

    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    const submitUrl =
      `${API_URL}?action=submit` +
      `&name=${encodeURIComponent(name.trim())}` +
      `&score=${score}` +
      `&total=${questions.length}` +
      `&timeTaken=${150 - time}` +
      `&quizDate=${today}` +
      `&t=${Date.now()}`;

    try {
      const result = await jsonp(submitUrl);

      if (result.success) {
        setStarted(false);
        setDone(true);
        await loadLeaderboard();
      } else {
        alert(result.message || "Submit failed");
        setStarted(false);
        setDone(true);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submit failed");
      submittingRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="badge">Daily Tech Quiz</p>
          <h1>Quiz Challenge</h1>
          <p>
            Daily AI generated 5 questions · React · Java · Node.js · JS · HTML · CSS
          </p>
        </div>

        <div className="timer">
          {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </div>
      </section>

      {!started && !done && (
        <section className="card join">
          <h2>Enter Name to Participate</h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button disabled={questionLoading} onClick={startQuiz}>
            {questionLoading ? "Loading AI Questions..." : "Start Quiz"}
          </button>
        </section>
      )}

      {started && (
        <section className="quiz">
          {questions.map((q, index) => (
            <div className="card question" key={index}>
              <span>{q.topic}</span>

              <h3>
                {index + 1}. {q.q}
              </h3>

              <div className="options">
                {q.options.map((option) => (
                  <button
                    key={option}
                    className={answers[index] === option ? "active" : ""}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        [index]: option,
                      })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            className="submit"
            disabled={loading || submittingRef.current}
            onClick={submitQuiz}
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        </section>
      )}

      {done && (
        <section className="card result">
          <h2>Quiz Submitted ✅</h2>
          <p>Your score has been added to leaderboard.</p>
        </section>
      )}

      <section className="card leaderboard">
        <div className="leader-head">
          <h2>Leaderboard - {today}</h2>

          <button onClick={loadLeaderboard} disabled={loadingBoard}>
            {loadingBoard ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loadingBoard ? (
          <p>Loading leaderboard...</p>
        ) : leaderboard.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={`${user.name}-${index}`}>
                  <td>#{index + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.score}/{user.total}
                  </td>
                  <td>{user.timeTaken}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="card leaderboard">
        <h2>Yesterday Questions & Answers - {yesterday}</h2>

        {yesterdayAnswers.length === 0 ? (
          <p>No previous day answers found.</p>
        ) : (
          yesterdayAnswers.map((q, index) => (
            <div className="answer-box" key={index}>
              <h3>
                {index + 1}. {q.q}
              </h3>

              <p>
                <b>Topic:</b> {q.topic}
              </p>

              <p>
                <b>Answer:</b> {q.answer}
              </p>

              <div className="answer-options">
                {q.options.map((option) => (
                  <span
                    key={option}
                    className={option === q.answer ? "correct-option" : ""}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
      <section style={{ marginTop: "30px", textAlign: "center" }}>
          <p style={{ fontSize: "12px" }}>
            Developed by - Chandan Raj
          </p>
      </section>
    </main>
  );
}