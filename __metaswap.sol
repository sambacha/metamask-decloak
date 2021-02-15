// code/contracts/MetaSwap.sol:L87-L100
function swap(
    string calldata aggregatorId,
    IERC20 tokenFrom,
    uint256 amount,
    bytes calldata data
) external payable whenNotPaused nonReentrant {
    Adapter storage adapter = adapters[aggregatorId];

    if (address(tokenFrom) != Constants.ETH) {
        tokenFrom.safeTransferFrom(msg.sender, address(spender), amount);
    }

    spender.swap{value: msg.value}(
        adapter.addr,