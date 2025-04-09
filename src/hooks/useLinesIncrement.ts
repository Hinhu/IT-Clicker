import useLinesStore from '../store';

function useLinesIncrement() {
  return useLinesStore((state) => state.increment);
}

export default useLinesIncrement;