pragma solidity ^0.4.17;

import "./LuggageCrowdsurance.sol";

contract LCSToken is LuggageCrowdsurance {
  
  function LCSToken(address _rst) LuggageCrowdsurance(_rst, uint256(0), false, uint8(0)) public {
    _rst;
  }
}