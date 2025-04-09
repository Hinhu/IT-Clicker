import useLinesStore from '../store';

function useLinesKeyboardClick() {
  return useLinesStore((state) => state.click);
}

export default useLinesKeyboardClick;