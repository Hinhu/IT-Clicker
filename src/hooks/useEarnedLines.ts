import useLinesStore from '../store';

function useEarnedLines() {
  return useLinesStore((state) => state.earnedLines);
}

export default useEarnedLines;