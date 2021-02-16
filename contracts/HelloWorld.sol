// SPDX-License-Identifier: MIT
// from: https://docs.openzeppelin.com/learn/developing-smart-contracts#setting-up-a-solidity-project
pragma solidity >=0.4.22 <0.8.0;

contract HelloWorld {
    string public word = "Hello World";

    // Emitted when the stored value changes
    event WordChanged(string newWord);

    // Stores a new value in the contract
    function Change_Word(string memory newWord) public {
        word = newWord;
        emit WordChanged(newWord);
    }

    // Reads the last stored value
    function read_word() public view returns (string memory) {
        return word;
    }
}
