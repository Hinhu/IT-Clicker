import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../css/speed-highlight-override.css';
import codes from '../assets/code.json';
import useLinesCount from '../hooks/useLinesCount';
import useLinesIncrement from '../hooks/useLinesIncrement';
import useLinesKeyboardClick from '../hooks/useLinesKeyboardClick';
import useLinesIncrementValue from '../hooks/useLinesIncrementValue';

const BASE_UPDATE_DELAY = 10000;
const MIN_UPDATE_DELAY = 10;

function Typer() {
  const linesCount = useLinesCount();
  const linesInc = useLinesIncrementValue();
  const incrementLines = useLinesIncrement();
  const keyboardLinesIncrement = useLinesKeyboardClick();
  const [displayState, setDisplayState] = useState<{
    linesDisplayed: { className: string, text: string }[],
    linesDisplayedCount: number,
    linesOfCurrentCodeFileDisplayed: number,
    updateDelay: number
  }>({
    linesDisplayed: [],
    linesDisplayedCount: 0,
    linesOfCurrentCodeFileDisplayed: 0,
    updateDelay: 0
  });
  const codeWindowRef = useRef<HTMLDivElement | null>(null);

  const addCodeSymbolToDisplay = useCallback(() => {
    setDisplayState((prev) => {
      const newState = { ...prev };

      newState.linesDisplayedCount += 1;
      newState.linesDisplayed = prev.linesDisplayed.concat(codes.slice(prev.linesOfCurrentCodeFileDisplayed, prev.linesOfCurrentCodeFileDisplayed + 1));
      newState.linesOfCurrentCodeFileDisplayed += 1;

      return newState;
    });
  }, []);

  const handleUserKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    keyboardLinesIncrement();
    addCodeSymbolToDisplay();
  }, [keyboardLinesIncrement, addCodeSymbolToDisplay]);

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
    setDisplayState((prev) => ({
      ...prev,
      updateDelay: linesInc > 0 ? Math.max(MIN_UPDATE_DELAY, Math.floor(BASE_UPDATE_DELAY / linesInc)) : 0
    }));
  }, [linesInc]);

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (displayState.updateDelay) {
      timer = setInterval(() => {
        addCodeSymbolToDisplay();
      }, displayState.updateDelay);
    }

    return () => clearInterval(timer);
  }, [displayState.updateDelay, addCodeSymbolToDisplay]);

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
          <span className={className} key={window.performance.now() + index}>{text}</span>
        ))}
      </div>
    </div>
  )
}

export default Typer;