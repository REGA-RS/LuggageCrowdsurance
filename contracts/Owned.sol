pragma solidity ^0.4.18;

import "./interfaces/IOwned.sol";

/*
    Provides support and utilities for contract ownership
*/
contract Owned is IOwned {
    address public owner;
    address public newOwner;

    mapping (address => address) public connectors;

    event OwnerUpdate(address indexed _prevOwner, address indexed _newOwner);
    event ReceiverUpdate(address _sender, address _receiver);
    event SenderUpdate(address _sender, address _receiver);

    /**
        @dev constructor
    */
    constructor() public {
        owner = msg.sender;
    }

    // allows execution by the owner only
    modifier ownerOnly {
        assert(msg.sender == owner);
        _;
    }

    modifier connectorOnly {
        assert(address(this) == connectors[msg.sender]);
        _;
    }

    modifier ownerOrConnector {
        assert(address(this) == connectors[msg.sender] || msg.sender == owner);
        _;
    }

    /**
        @dev allows transferring the contract ownership
        the new owner still needs to accept the transfer
        can only be called by the contract owner

        @param _newOwner    new contract owner
    */
    function transferOwnership(address _newOwner) public ownerOnly {
        require(_newOwner != owner);
        newOwner = _newOwner;
    }

    function setReceiver(address _receiver) public ownerOnly {
        connectors[address(this)] = _receiver;
        emit ReceiverUpdate(address(this), _receiver);
    }

    function setSender(address _sender) public ownerOnly {
        connectors[_sender] = address(this);
        emit SenderUpdate(_sender, address(this));
    }

    /**
        @dev used by a new owner to accept an ownership transfer
    */
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnerUpdate(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}