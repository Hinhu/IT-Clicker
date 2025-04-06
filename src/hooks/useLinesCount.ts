import { useContext } from 'react';
import { LinesContext } from '../components/LinesProvider';

function useLinesCount() {
  const linesContext = useContext(LinesContext);

  if (!linesContext) {
    throw new Error('useLinesCount used outside LinesProvider')
  }

  return linesContext.linesCount;
}

export default useLinesCount;