pragma solidity ^0.4.17;

import "./LuggageCrowdsurance.sol";

contract LCSToken is LuggageCrowdsurance {
    constructor(address _rst, address _pool) LuggageCrowdsurance(_rst, _pool, uint256(0), false, uint8(0)) public {
        _rst;
        _pool;
    }
}