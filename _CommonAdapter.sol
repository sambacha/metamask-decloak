///code/contracts/adapters/CommonAdapter.sol:L57-L62
// Transfer remaining balance of tokenTo to sender
if (address(tokenTo) != Constants.ETH) {
    uint256 balance = tokenTo.balanceOf(address(this));
    require(balance >= amountTo, "INSUFFICIENT_AMOUNT");
    _transfer(tokenTo, balance, recipient);
} else {

