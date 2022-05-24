// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EventMinter is ERC1155, ERC1155Holder {
    using Counters for Counters.Counter;
    address owner;

    Counters.Counter public eventIds;
    Counters.Counter public bodyIds;

    struct Event {
        string URI;
        address organizer;
        uint256 quantity;
    }
    struct Body {
        string URI;
        address bodyowner;
    }

    //event eventId => eventURI
    mapping(uint256 => Event) public events;
    //body bodyId => bodyURI
    mapping(uint256 => Body) public bodies;
    //user => array of nfts owned
    mapping(address => uint256[]) internal eventNFTOwnedByUser;
    //user => bodyId
    mapping(address => uint256) internal iDofBodyOwnedbyUser;

    constructor() ERC1155("") {
        owner = msg.sender;
    }

    function checkIfEventIdisClaimed(uint256[] memory _array, uint256 _eventId)
        internal
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_eventId == _array[i]) {
                return false;
            }
        }
        return true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Returns an URI for a given token ID
     */
    function tokenURI(uint256 _eventId) public view returns (string memory) {
        return events[_eventId].URI;
    }

    //https://forum.openzeppelin.com/t/how-do-i-let-a-user-transfer-erc1155-token-from-my-contract-address-to-his-address/12415/8
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //
    function mintBody(string memory _URI) external returns (uint256) {
        uint256 bodyId = bodyIds.current();

        bodies[bodyId] = Body({URI: _URI, bodyowner: payable(msg.sender)});
        _mint(address(msg.sender), bodyId, 1, "");
        // setApprovalForAll(address(this), true);
        bodyIds.increment();
        iDofBodyOwnedbyUser[msg.sender] = bodyId;
        // emit some success notification
        return bodyId;
    }

    function mintEventNFT(uint256 _quantity, string memory _URI)
        external
        returns (uint256)
    {
        uint256 eventId = eventIds.current();

        events[eventId] = Event({
            URI: _URI,
            organizer: payable(msg.sender),
            quantity: _quantity
        });
        _mint(address(this), eventId, _quantity, "");
        setApprovalForAll(address(this), true);
        eventIds.increment();
        // emit some success notification
        return eventId;
    }

    function claim(uint256 _eventId) public payable returns (bool) {
        require(msg.sender != address(0), "Cannot have zero address");
        require(
            checkIfEventIdisClaimed(eventNFTOwnedByUser[msg.sender], _eventId),
            "U cannot claim more than 1"
        );
        //transfer
        _safeTransferFrom(address(this), msg.sender, _eventId, 1, "");
        eventNFTOwnedByUser[msg.sender].push(_eventId);

        return true;
        //return tokenId
    }

    //events NFTs owned by user
    function getIds(address user) external view returns (uint256[] memory) {
        return eventNFTOwnedByUser[user];
    }
}
