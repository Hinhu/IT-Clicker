import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../css/speed-highlight-override.css';
import shuffle from '../utils/shuffle';
import codes from '../assets/code.json';

const linesCountInc = 50;

function Typer() {
  const [linesCount, setLinesCount] = useState<number>(0);
  const [displayState, setDisplayState] = useState<{
    codesOrder: number[],
    currentCodeIndex: number,
    linesDisplayed: { className: string, text: string }[],
    linesDisplayedCount: number,
    linesOfCurrentCodeFileDisplayed: number
  }>({
    codesOrder: [],
    currentCodeIndex: 0,
    linesDisplayed: [],
    linesDisplayedCount: 0,
    linesOfCurrentCodeFileDisplayed: 0
  });
  const codeWindowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const indexes = Array.from(Array(codes.length).keys());
    setDisplayState((prev) => ({ ...prev, codesOrder: shuffle(indexes) }));
  }, []);

  const handleUserKeyPress = useCallback(() => {
    setLinesCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    let timer: NodeJS.Timer;

    timer = setInterval(() => {
      setLinesCount((prev) => prev + linesCountInc);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setDisplayState((prev) => {
      const newState = { ...prev };
      const linesInc = Math.floor(linesCount) - prev.linesDisplayedCount;
      const currentCodeFile = codes[prev.codesOrder[prev.currentCodeIndex]];

      newState.linesDisplayedCount += linesInc;

      if (prev.linesOfCurrentCodeFileDisplayed + linesInc < currentCodeFile.length) {
        newState.linesDisplayed = prev.linesDisplayed.concat(currentCodeFile.slice(prev.linesOfCurrentCodeFileDisplayed, prev.linesOfCurrentCodeFileDisplayed + linesInc));
        newState.linesOfCurrentCodeFileDisplayed += linesInc;
      } else {
        const nextCodeIndex = prev.currentCodeIndex + 1 === codes.length ? 0 : prev.currentCodeIndex + 1;
        const nexcCodeFile = codes[prev.codesOrder[nextCodeIndex]];
        const numOfElementsFromNextFile = newState.linesOfCurrentCodeFileDisplayed + linesInc - currentCodeFile.length;

        newState.currentCodeIndex = nextCodeIndex;
        newState.linesDisplayed = [
          ...prev.linesDisplayed,
          ...currentCodeFile.slice(prev.linesOfCurrentCodeFileDisplayed, currentCodeFile.length),
          { text: '\n==========NEW FILE==========\n\n', className: 'shj-syn-insert' },
          ...nexcCodeFile.slice(0, numOfElementsFromNextFile)
        ];
        newState.linesOfCurrentCodeFileDisplayed = numOfElementsFromNextFile;
      }
      console.log({newState})
      return newState;
    })
  }, [linesCount]);


  useEffect(() => {
    if (codeWindowRef.current) {
      codeWindowRef.current.lastElementChild?.scrollIntoView(false);
    }
  }, [displayState.linesDisplayed])

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex w-auto h-10 border border-solid border-black">
        Lines: {linesCount}
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