import {asyncActionStart, asyncActionEnd} from 'reducers/commonSlice';
import {AppDispatch} from 'store';

import utils from 'helpers/utils';

export default {
  dispatchAsyncAction
};

const throwError = false;

//performes async action
//action is function which has (dispatch, getState) arguments like redux thunk
function dispatchAsyncAction(action, showOverlay = true) {
  return async (dispatch: AppDispatch, getState) => {
    const actionId = utils.getRandomUid();

    try {
      if (showOverlay) dispatch(asyncActionStart(actionId));

      const result = await action(dispatch, getState);

      if (showOverlay) dispatch(asyncActionEnd(actionId));

      if (!result) return null;

      return result;
    } catch (error) {
      if (!showOverlay) dispatch(asyncActionEnd(actionId));
      if (throwError) throw error;
    } finally {
      dispatch(asyncActionEnd(actionId));
    }
  };
}
