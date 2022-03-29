//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {
    address public manager;
    address[] public players;
    address payable public recentWinner;

    constructor() {
        manager = msg.sender;
    }

    function playLottery() public payable {
        require(msg.value >= 0.1 * 10**18, "not enough ETH!");

        console.log("lottery entered by user: %s", msg.sender);
        players.push(msg.sender);
    }

    function pickWinner() public payable {
        require(players.length >= 3, "not enough players yet!");

        // pick winner
        uint winnerNr = random() % players.length;
        recentWinner = payable(players[winnerNr]);
        recentWinner.transfer(address(this).balance);

        // reset lottery
        players = new address[](0);
    }

    function random() private view returns(uint) {
         return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.number)));
    }




}