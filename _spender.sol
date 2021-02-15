// code/contracts/Spender.sol:L15-L16
function swap(address adapter, bytes calldata data) external payable {
    require(adapter != address(0), "ADAPTER_NOT_SUPPORTED");