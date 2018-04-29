pragma solidity ^0.4.17;

import "./ERC20Token.sol";

contract TutorialToken is ERC20Token {
  string public name = "TutorialToken";
  string public symbol = "TT";
  uint public decimals = 2;
  uint public INITIAL_SUPPLY = 12000;

  function TutorialToken() public {
    totalSupply = INITIAL_SUPPLY;
    balanceOf[msg.sender] = INITIAL_SUPPLY;
  }
}
