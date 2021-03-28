// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract bank {
  mapping(address => uint) public etherBalance; 
  mapping(address => uint) public depoitStart;
  mapping(address => bool) public isDeposited; 
 
  function deposit() public payable {
    etherBalance[msg.sender] = etherBalance[msg.sender] + msg.value; 
    isDeposited[msg.sender] = true;  
  }

  function withdraw()public{ 
    require(isDeposited[msg.sender] == true, 'error not deposited'); 
    msg.sender.transfer(etherBalance[msg.sender]); 
   }  
 } 
