function earned(IERC20 token, address recipient) public view returns (uint256) {
    uint256 totalReceived = tokenBalance(token).add(_totalWithdrawn[token]);
    return totalReceived.mul(shares[recipient]).div(totalShares);
}

function available(IERC20 token, address recipient) public view returns (uint256) {
    return earned(token, recipient).sub(_withdrawn[token][recipient]);
}

function withdraw(IERC20[] calldata tokens) external {
    for (uint256 i = 0; i < tokens.length; i++) {
        IERC20 token = tokens[i];
        uint256 amount = available(token, msg.sender);

        _withdrawn[token][msg.sender] += amount;
        _totalWithdrawn[token] += amount;
        _transfer(token, msg.sender, amount);
    }
    emit Withdrawal(tokens, msg.sender);
}

