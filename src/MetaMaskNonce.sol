/// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;


/// @title MetaMaskNonce
contract MetaMaskNonce {
    uint256 nonce = 0;
    
    // @function increment
    function increment() external returns (uint256) {
        nonce = nonce + 1;
        // @returns nonce
        return nonce;
    }
    
    // @function getNonceIncrementedBy
    function getNonceIncrementedBy(uint256 increment) view external returns(uint256) {
        return nonce + increment;
    }
}
