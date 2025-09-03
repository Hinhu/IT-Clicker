import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../css/speed-highlight-override.css';
import codes from '../assets/code.json';
import useLinesCount from '../hooks/useLinesCount';
import useLinesIncrement from '../hooks/useLinesIncrement';
import useLinesKeyboardClick from '../hooks/useLinesKeyboardClick';
import useLinesIncrementValue from '../hooks/useLinesIncrementValue';

const INCREMENT_DELAY = 1000;
const BASE_UPDATE_DELAY = 10;
const MIN_UPDATE_DELAY = 10;
const MAX_LINES_DISPLAYED = 30;

function Typer() {
  const linesCount = useLinesCount();
  const linesInc = useLinesIncrementValue();
  const incrementLines = useLinesIncrement();
  const keyboardLinesIncrement = useLinesKeyboardClick();
  const [displayState, setDisplayState] = useState<{
    tokensDisplayed: { className: string, text: string, hasNewLineSymbol: boolean }[],
    linesDisplayedCount: number,
    charsOfCurrentTokenDisplayed: number,
    currentTokenIndex: number,
    updateDelay: number
  }>({
    tokensDisplayed: [],
    linesDisplayedCount: 0,
    charsOfCurrentTokenDisplayed: 0,
    currentTokenIndex: 0,
    updateDelay: 0
  });
  const codeWindowRef = useRef<HTMLDivElement | null>(null);

  const addCodeSymbolToDisplay = useCallback(() => {
    setDisplayState((prev) => {
      const newState = { ...prev };

      newState.linesDisplayedCount++;
      if (newState.currentTokenIndex === 0 && newState.charsOfCurrentTokenDisplayed === 0) {
        const newSymbol = codes[0].text[0];
        newState.tokensDisplayed = prev.tokensDisplayed.concat({
          className: codes[0].className,
          text: newSymbol,
          hasNewLineSymbol: newSymbol === '\n'
        });
      } else if (prev.charsOfCurrentTokenDisplayed >= codes[prev.currentTokenIndex].text.length) {
        newState.charsOfCurrentTokenDisplayed = 0;
        newState.currentTokenIndex++;
        const newSymbol = codes[newState.currentTokenIndex].text[newState.charsOfCurrentTokenDisplayed];
        newState.tokensDisplayed = prev.tokensDisplayed.concat({
          className: codes[newState.currentTokenIndex].className,
          text: newSymbol,
          hasNewLineSymbol: newSymbol === '\n'
        });
      } else {
        const newSymbol = codes[newState.currentTokenIndex].text[newState.charsOfCurrentTokenDisplayed];
        newState.tokensDisplayed[newState.tokensDisplayed.length - 1].text = prev.tokensDisplayed[newState.tokensDisplayed.length - 1].text
          .concat(codes[newState.currentTokenIndex].text[newState.charsOfCurrentTokenDisplayed]);
        if (newSymbol === '\n') {
          newState.tokensDisplayed[newState.tokensDisplayed.length - 1].hasNewLineSymbol = true;
        }
      }
      newState.charsOfCurrentTokenDisplayed++;

      const linesOfTokensDisplayed = newState.tokensDisplayed.reduce((result, token) => result + (token.hasNewLineSymbol ? 1 : 0), 0);

      if (linesOfTokensDisplayed > MAX_LINES_DISPLAYED) {
        console.log({linesOfTokensDisplayed})
        let linesToDelete = linesOfTokensDisplayed - MAX_LINES_DISPLAYED;

        while (linesToDelete > 0) {
          let deletedToken = newState.tokensDisplayed.shift();

          if (deletedToken?.hasNewLineSymbol) {
            linesToDelete--;
          }
        }
        console.log()
      }

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
    }, INCREMENT_DELAY);

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
      //codeWindowRef.current.lastElementChild?.scrollIntoView(false);
    }
  }, [displayState.tokensDisplayed.length])

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex w-auto h-10 border border-solid border-black">
        Lines: {linesCount} Lines/s: {linesInc}
      </div>
      <div ref={codeWindowRef} className="shj-lang-js h-full w-auto overflow-hidden text-wrap">
        {displayState.tokensDisplayed.map(({ className, text }, index) => (
          <span className={className} key={window.performance.now() + index}>{text}</span>
        ))}
      </div>
    </div>
  )
}

export default Typer;