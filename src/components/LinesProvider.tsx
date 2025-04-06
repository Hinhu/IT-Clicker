import React, { createContext, useReducer } from 'react';

export const LinesContext = createContext<LinesState | null>(null);
export const LinesDispatchContext = createContext<LinesDispatch | null>(null);

type LinesState = {
  linesCount: number,
  linesInc: number
}

interface LinesAction  {
  type: 'increment' | 'click'
}

type LinesDispatch = (action: LinesAction) => null

function linesReducer(linesState: LinesState, action: LinesAction) {
  switch (action.type) {
    case 'increment': {
      return {
        ...linesState,
        linesCount: linesState.linesCount + linesState.linesInc
      };
    }
    case 'click': {
      return {
        ...linesState,
        linesCount: linesState.linesCount + 1
      };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialLines = {
  linesCount: 0,
  linesInc: 1
}

function LinesProvider({ children }: { children: React.JSX.Element | React.JSX.Element[] }) {
  const [lines, dispatch] = useReducer(linesReducer, initialLines);

  return (
    <LinesContext.Provider value={lines}>
      <LinesDispatchContext.Provider value={dispatch as any}>
        {children}
      </LinesDispatchContext.Provider>
    </LinesContext.Provider>
  );
}

export default LinesProvider;
