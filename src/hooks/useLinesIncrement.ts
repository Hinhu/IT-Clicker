import useLinesStore from '../store';

function useLinesIncrement() {
  return useLinesStore((state) => state.actions.increment);
}

export default useLinesIncrement;