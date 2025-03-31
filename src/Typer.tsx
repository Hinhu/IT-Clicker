import React, { useEffect, useRef, useState, useCallback } from 'react';
import './css/speed-highlight-override.css';
import shuffle from './utils/shuffle';
import codes from './code.json';

const linesCountInc = 3;

function Typer() {
  const [linesCount, setLinesCount] = useState<number>(0);
  const [displayState, setDisplayState] = useState<{
    codesOrder: number[] | undefined,
    currentCodeIndex: number,
    linesDisplayed: { className: string, text: string }[],
    linesDisplayedCount: number,
  }>({
    codesOrder: [],
    currentCodeIndex: 0,
    linesDisplayed: [],
    linesDisplayedCount: 0
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
      const nextCodeIndex = prev.currentCodeIndex + 1 === codes.length ? 0 : prev.currentCodeIndex + 1;
      const prevLinesDisplayedLength = prev.linesDisplayed.length;
      
      newState.linesDisplayedCount += linesInc;

      if (prevLinesDisplayedLength + linesInc <= codes[prev.currentCodeIndex].length) {
        newState.linesDisplayed = prev.linesDisplayed.concat(codes[prev.currentCodeIndex].slice(prevLinesDisplayedLength, prevLinesDisplayedLength + linesInc));
      } else {
        const numOfElementsFromNextFile = prevLinesDisplayedLength + linesInc - codes[prev.currentCodeIndex].length;
        newState.currentCodeIndex = nextCodeIndex;
        newState.linesDisplayed = [
          ...prev.linesDisplayed,
          ...codes[prev.currentCodeIndex].slice(prevLinesDisplayedLength, codes[prev.currentCodeIndex].length - 1),
          ...codes[nextCodeIndex].slice(0, numOfElementsFromNextFile)
        ];
      }

      return newState;
    })
  }, [linesCount]);



  /*
  useEffect(() => {
    let timer: NodeJS.Timer;
    const { currentCodeIndex, linesDisplayed: lines, codesOrder } = typerState;
    if (currentCodeIndex !== undefined && codesOrder.length > 0) {
      timer = setInterval(() => {
        let splittedCode = codes[codesOrder[currentCodeIndex]];
        if (lines.length < splittedCode.length) {
          setTyperState((prev) => ({
            ...prev,
            linesDisplayed: [...prev.linesDisplayed, splittedCode[prev.linesDisplayed.length]]
          }));
        } else {
          setTyperState((prev) => ({
            ...prev,
            linesDisplayed: [],
            currentCodeIndex: prev.currentCodeIndex + 1 === prev.codesOrder.length ? 0 : prev.currentCodeIndex + 1
          }));
        }
      }, 10);
    }

    return () => clearInterval(timer);
  }, [typerState])
  */

  useEffect(() => {
    if (codeWindowRef.current) {
      codeWindowRef.current.lastElementChild?.scrollIntoView(false);
    }
  }, [displayState.linesDisplayed])

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex w-auto h-10 border border-solid border-black">
        Lines: {Math.floor(linesCount)}
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