import { useContext } from 'react';
import { LinesDispatchContext } from '../components/LinesProvider';

function useLinesIncrement() {
  const dispatch = useContext(LinesDispatchContext);

  if (!dispatch) {
    throw new Error('useLinesIncrement used outside LinesProvider')
  }

  return () => dispatch({ type: 'increment' });
}

export default useLinesIncrement;