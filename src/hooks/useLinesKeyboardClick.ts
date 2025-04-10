import useLinesStore from '../store';

function useLinesKeyboardClick() {
  return useLinesStore((state) => state.actions.click);
}

export default useLinesKeyboardClick;