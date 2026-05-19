import React, { useState, useEffect } from "react";

const TypingAnimation = ({
  sequence = [
    "Frontend Development",
    "QA Automation Testing",
    "Creative Problem Solving",
    "AI-Driven Orchestration",
  ],
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetween = 2000,
  className = "",
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % sequence.length;
      const fullText = sequence[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setSpeed(deletingSpeed);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setSpeed(typingSpeed);
      }

      if (!isDeleting && text === fullText) {
        setSpeed(delayBetween);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setSpeed(typingSpeed);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, sequence, speed, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={`inline-flex items-center text-cyan-400 font-black ${className}`}>
      <span>{text}</span>
      <span className="w-1.5 h-[1.1em] bg-cyan-400 ml-1.5 inline-block animate-[blink_1s_step-end_infinite]" />
      
      {/* Inline styles for the blink cursor to keep it self-contained */}
      <style>{`
        @keyframes blink {
          from, to { background-color: transparent }
          50% { background-color: rgb(34, 211, 238) }
        }
      `}</style>
    </span>
  );
};

export default TypingAnimation;
