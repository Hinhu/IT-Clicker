import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../css/speed-highlight-override.css';
import codes from '../assets/code.json';
import useLinesCount from '../hooks/useLinesCount';
import useLinesIncrement from '../hooks/useLinesIncrement';
import useLinesKeyboardClick from '../hooks/useLinesKeyboardClick';
import useEarnedLines from '../hooks/useEarnedLines';
import useLinesIncrementValue from '../hooks/useLinesIncrementValue';

function Typer() {
  const linesCount = useLinesCount();
  const earnedLines = useEarnedLines();
  const linesInc = useLinesIncrementValue();
  const incrementLines = useLinesIncrement();
  const keyboardLinesIncrement = useLinesKeyboardClick();
  const [displayState, setDisplayState] = useState<{
    linesDisplayed: { className: string, text: string }[],
    linesDisplayedCount: number,
    linesOfCurrentCodeFileDisplayed: number
  }>({
    linesDisplayed: [],
    linesDisplayedCount: 0,
    linesOfCurrentCodeFileDisplayed: 0
  });
  const codeWindowRef = useRef<HTMLDivElement | null>(null);


  const handleUserKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    keyboardLinesIncrement();
  }, [keyboardLinesIncrement]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    let timer: NodeJS.Timer;

    timer = setInterval(() => {
      incrementLines();
    }, 1000);

    return () => clearInterval(timer);
  }, [incrementLines]);

  useEffect(() => {
    setDisplayState((prev) => {
      const newState = { ...prev };
      const ticLinesInc = Math.floor(earnedLines) - prev.linesDisplayedCount;
      const currentCodeFile = codes;

      newState.linesDisplayedCount += ticLinesInc;

      newState.linesDisplayed = prev.linesDisplayed.concat(currentCodeFile.slice(prev.linesOfCurrentCodeFileDisplayed, prev.linesOfCurrentCodeFileDisplayed + ticLinesInc));
      newState.linesOfCurrentCodeFileDisplayed += ticLinesInc;

      return newState;
    })
  }, [earnedLines]);


  useEffect(() => {
    if (codeWindowRef.current) {
      codeWindowRef.current.lastElementChild?.scrollIntoView(false);
    }
  }, [displayState.linesDisplayed])

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex w-auto h-10 border border-solid border-black">
        Lines: {linesCount} Lines/s: {linesInc}
      </div>
      <div ref={codeWindowRef} className="shj-lang-js h-full w-auto overflow-hidden text-wrap">
        {displayState.linesDisplayed.map(({ className, text }, index) => (
          <span className={className} key={index}>{text}</span>
        ))}
      </div>
    </div>
  )
}

export default Typer;