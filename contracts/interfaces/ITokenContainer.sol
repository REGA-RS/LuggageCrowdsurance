pragma solidity ^0.4.18;

import "./IERC721SmartToken.sol";

contract ITokenContainer is IERC721SmartToken {
    mapping (uint256 => uint256) public tokenIndexToPoolToken;
    
    function addToken(uint256 _nodeId, uint256 _parentId) public;
    function removeToken(uint256 _nodeId) public;
    function getPoolSize(uint256 _nodeId) view public returns(uint256 size);
}