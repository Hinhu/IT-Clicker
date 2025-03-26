import React, { useEffect, useState } from 'react';

import codes from './code.json';

const LINES_CAP = 50;

const shuffle = (array: number[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

function Typer() {
  const [codesOrder, setCodesOrder] = useState<Array<number>>([]);
  const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const indexes = Array.from(Array(codes.length).keys());
    setCodesOrder(shuffle(indexes));
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (currentCodeIndex !== undefined && codesOrder.length > 0) {
      timer = setInterval(() => {
        let splittedCode = codes[codesOrder[currentCodeIndex]].split('\n');
        if (lines.length < splittedCode.length) {
          setLines((prevLines) => {
            let newLines = [...prevLines, splittedCode[prevLines.length]];
            if (prevLines.length > LINES_CAP) {
              newLines.shift();
            }

            return newLines;
          });
        } else {
          setCurrentCodeIndex((prev) => prev + 1);
        }
      }, 300);
    }

    return () => clearInterval(timer);
  }, [lines, codesOrder, currentCodeIndex])

  console.log(lines)
  return (
    <div className="flex flex-col border border-solid text-green-500 border-black bg-slate-800 h-screen h-max-screen w-max flex-grow overflow-hidden">
      {lines.map((text, i) => (
        <div className="flex flex-shrink-0 text-sm whitespace-pre overflow-hidden" key={i}>{text}</div>
      ))}
    </div>
  )
}

export default Typer;