export function updateAndSetCustomRpc(
  newRpc,
  chainId,
  ticker = 'ETH',
  nickname,
  rpcPrefs,
) {
  return async (dispatch) => {
    log.debug(
      `background.updateAndSetCustomRpc: ${newRpc} ${chainId} ${ticker} ${nickname}`,
    );
    try {
      await promisifiedBackground.updateAndSetCustomRpc(
        newRpc,
        chainId,
        ticker,
        nickname || newRpc,
        rpcPrefs,
      );
    } catch (error) {
      log.error(error);
      dispatch(displayWarning('Had a problem changing networks!'));
      return;
    }
    dispatch({
      type: actionConstants.SET_RPC_TARGET,
      value: newRpc,
    });
  };
}
export function editRpc(
  oldRpc,
  newRpc,
  chainId,
  ticker = 'ETH',
  nickname,
  rpcPrefs,
) {
  return async (dispatch) => {
    log.debug(`background.delRpcTarget: ${oldRpc}`);
    try {
      promisifiedBackground.delCustomRpc(oldRpc);
    } catch (error) {
      log.error(error);
      dispatch(displayWarning('Had a problem removing network!'));
      return;
    }
    try {
      await promisifiedBackground.updateAndSetCustomRpc(
        newRpc,
        chainId,
        ticker,
        nickname || newRpc,
        rpcPrefs,
      );
    } catch (error) {
      log.error(error);
      dispatch(displayWarning('Had a problem changing networks!'));
      return;
    }
    dispatch({
      type: actionConstants.SET_RPC_TARGET,
      value: newRpc,
    });
  };
}
export function setRpcTarget(newRpc, chainId, ticker = 'ETH', nickname) {
  return async (dispatch) => {
    log.debug(
      `background.setRpcTarget: ${newRpc} ${chainId} ${ticker} ${nickname}`,
    );
    try {
      await promisifiedBackground.setCustomRpc(
        newRpc,
        chainId,
        ticker,
        nickname || newRpc,
      );
    } catch (error) {
      log.error(error);
      dispatch(displayWarning('Had a problem changing networks!'));
    }
  };
}
