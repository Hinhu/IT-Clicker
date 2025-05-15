import useLinesStore from '../store';

function useLinesIncrementValue() {
  return useLinesStore((state) => state.linesInc);
}

export default useLinesIncrementValue;