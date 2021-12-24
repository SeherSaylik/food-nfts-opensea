// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Foods is ERC721 {
    constructor() ERC721("Foods", "FOOD") {}

    function mintToken(uint256 tokenURI) public payable {
        _mint(msg.sender, tokenURI);
    }
}
