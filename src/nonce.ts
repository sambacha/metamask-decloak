export function setNextNonce(nextNonce) {
  return {
    type: actionConstants.SET_NEXT_NONCE,
    value: nextNonce,
  };
}

export function getNextNonce() {
  return (dispatch, getState) => {
    const address = getState().metamask.selectedAddress;
    return new Promise((resolve, reject) => {
      background.getNextNonce(address, (err, nextNonce) => {
        if (err) {
          dispatch(displayWarning(err.message));
          reject(err);
          return;
        }
        dispatch(setNextNonce(nextNonce));
        resolve(nextNonce);
      });
    });
  };
}
