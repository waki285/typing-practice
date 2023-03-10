import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { MobileView, BrowserView } from "react-device-detect";
import randomWords from "random-words";
import { AdMaxSwitch } from "./components/AdMax";

const UeAd = memo(() => {
  return (
    <AdMaxSwitch id="ebfd32a946517240984de77e3c4c53da" className="fixed top-8 -translate-x-1/2 left-1/2" />
  )
});
const SitaAd = memo(() => {
  return (
    <AdMaxSwitch id="cfa178e5ac7ae0e7732ca2b7eedb35e9" className="fixed bottom-8 -translate-x-1/2 left-1/2" />
  )
});

export default function App() {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [answer, setAnswer] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answeredQuestion, setAnsweredQuestion] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);
  const [correctOrNot, setCorrectOrNot] = useState<boolean | null>(null);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !started) {
      startRef.current!.click();
    }
  });
  const start = useCallback(() => {
    if (started) return;
    const a = prompt("何問出題しますか？(デフォルト 20)");
    setTotalQuestion(!isNaN(Number(a)) ? parseInt(a || "20") : 20);
    setQuestions(randomWords({ exactly: !isNaN(Number(a)) ? parseInt(a || "20") : 20, maxLength: 10 }));
    setStarted(true);
    setTimerId(setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000));
    inputRef.current!.focus();
  }, [started]);
  useEffect(() => {
    inputRef.current!.focus();
  }, [started]);
  const submit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!started) return;
    if (answer === questions[answeredQuestion]) {
      setCorrectOrNot(true);
      setAnsweredQuestion((answeredQuestion) => answeredQuestion + 1);
      setAnswer("");
      console.log(answeredQuestion);
      console.log(totalQuestion);
      if (answeredQuestion + 1 > totalQuestion) {
        setQuestions((q) => [...q, ...randomWords({ exactly: 1, maxLength: 10 })]);
      } else if (answeredQuestion + 1 === totalQuestion) {
        clearInterval(timerId!);
        alert(`お疲れ様でした！${timer}秒で${totalQuestion}問中${(totalQuestion - incorrect.length)}問間違えずに正解しました！`);
        alert(`WPS: ${Math.floor(totalQuestion / timer * 10) / 10} LPS: ${Math.floor(questions.map(xx => xx.length).reduce((a,b) => a + b) / timer * 10) / 10}`)
        alert("リロードしてもう一度挑戦してみましょう！");
        setQuestions((q) => [...q, ...randomWords({ exactly: 1, maxLength: 10 })]);
      }
    } else {
      setCorrectOrNot(false);
      if (!incorrect.includes(answeredQuestion)) {
        setIncorrect((incorrect) => [...incorrect, answeredQuestion]);
      }
      setAnswer("");
    }
  }, [answer, answeredQuestion, questions, started, timer, timerId, totalQuestion])
  return (
    <>
      <main className="h-full font-sans bg-black text-white">
        <UeAd />
        <div className="h-full grid place-items-center">
          <div className={`flex-col gap-16 items-center ${started ? "hidden":"flex"}`}>
            <section className="text-7xl pc:text-8xl text-center whitespace-nowrap">英単語<wbr />タイピング</section>
            <div>
              <button className="bg-green-500 px-12 py-6 text-4xl rounded-md hover:bg-green-600" onClick={start} ref={startRef}>スタート</button>
            </div>
          </div>
          <div className={`${started ? "flex":"hidden"} flex-col gap-12 items-center`}>
            <section className="flex justify-between w-4/5 pc:w-full">
              <p className="text-xl">問題数: {answeredQuestion}/{totalQuestion}</p>
              <p className="text-xl">タイム: {timer}</p>
            </section>
            <section>
              <p className="text-6xl text-center">下の文字を打ち込んでください</p>
              <p className="text-4xl text-center font-serif">{questions[answeredQuestion]}</p>
            </section>
            <form onSubmit={submit} className="w-4/5 pc:w-full">
              <input className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-4xl px-4 py-2 rounded-md border border-white focus:border-2 font-serif w-full" type="text" autoComplete="off" value={answer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)} ref={inputRef} />
            </form>
            <p>{correctOrNot === null ? "ここに正誤判定が表示されます":correctOrNot ? "正解":"間違い"}</p>
          </div>
        </div>
        <SitaAd />
      </main>
    </>
  );
};