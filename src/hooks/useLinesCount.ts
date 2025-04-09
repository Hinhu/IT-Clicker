import useLinesStore from '../store';

function useLinesCount() {
  return useLinesStore((state) => state.linesCount);
}

export default useLinesCount;