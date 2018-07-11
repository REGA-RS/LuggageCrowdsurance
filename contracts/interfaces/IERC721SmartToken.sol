pragma solidity ^0.4.18;

contract IERC721SmartToken {
    function getNFT(uint256 _id) public view returns (uint256 value, string metadata, uint256 kind, uint256 level, uint256 state);
    function createNFT(uint256 _value, string  _metadata, uint256 _kind, address _owner) public returns (uint);
    function setNFT(uint256 _id, uint256 value, string metadata, uint256 kind, uint256 level, uint256 state) public;
    function setNFTValue(uint256 _id, uint256 value) public;
    function setNFTMetadata(uint256 _id, string metadata) public;
    function setNFTKind(uint256 _id, uint256 kind) public;
    function setNFTLevel(uint256 _id, uint256 level) public;
    function setNFTState(uint256 _id, uint256 state) public;
    function getNFTValue(uint256 _id) public view returns (uint256);
    function getNFTMetadata(uint256 _id) public view returns (string);
    function getNFTKind(uint256 _id) public view returns (uint256);
    function getNFTLevel(uint256 _id) public view returns (uint256);
    function getNFTState(uint256 _id) public view returns (uint256);
    function owns(address _claimant, uint256 _tokenId) public view returns (bool);
    function tokensOfOwner(address _owner) external view returns(uint256[] ownerTokens);
    function totalSupply() public view returns (uint);
}