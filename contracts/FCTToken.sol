//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract FCTToken is ERC20 {

    // Initialize the smart contract parameters name and symbol with values that will be passed to it when it is deployed
      // Parameter 1 = name = Faucet
      // Parameter 1 = symbol = FCT
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10 ** 18));
    }

    function faucet (address recipient , uint amount) external {
      _mint(recipient, amount);
    }
}