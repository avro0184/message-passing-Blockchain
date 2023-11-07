// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


contract MessagePassing {

  string message;


 function SetMessage( string memory _message) public {
     message = _message ;
 }

    function GetMessage() public view returns(string memory)
    {
        return message;
    }

}