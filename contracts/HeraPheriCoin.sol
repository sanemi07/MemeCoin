// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HeraPheriCoin is ERC20 {
    address public owner;

    constructor() ERC20("HeraPheriCoin", "HRC") {
        uint256 initialSupply = 7000000000;
        _mint(msg.sender, initialSupply * 10 ** decimals());
        owner = msg.sender;
    }

    modifier OnlyOwner {
        require(msg.sender == owner, "Only owner is allowed");
        _;
    }

    function mint(address to, uint256 amount) public OnlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    function buyToken() public payable{
        require(msg.value>=0,"not enough eth");
        uint256 amount=(msg.value*10**decimals());
        require(balanceOf(owner)>=amount,"not enough tokens");
        _transfer(owner,msg.sender,amount);


    }
    function withdraw()public OnlyOwner {
        payable(owner).transfer(address(this).balance);

    }
}
