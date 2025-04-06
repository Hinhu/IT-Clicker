import { useContext } from 'react';
import { LinesDispatchContext } from '../components/LinesProvider';

function useLinesKeyboardClick() {
  const dispatch = useContext(LinesDispatchContext);

  if (!dispatch) {
    throw new Error('useLinesIncrement used outside LinesProvider')
  }

  return () => dispatch({ type: 'click' });
}

export default useLinesKeyboardClick;