"use client";
import { useState } from "react";
import { useZxing } from "react-zxing";

export default function Home() {
  const [result, setResult] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div className="container">
      <video ref={ref} className="video" />
      <div className="resultBox">
        <p className="resultName">Result:</p>
        <p className="resultText">{result}</p>
      </div>
    </div>
  );
}
