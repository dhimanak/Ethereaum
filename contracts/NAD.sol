pragma solidity ^0.4.2;

contract NAD { 
    bytes32[] public addresses;  
    
    
    function addAddress(bytes32 _state) returns(bool success){        
        
        addresses.push(_state);
        
        return true;
    }
    
    function getAddresses() constant returns(bytes32[]){      
        
        return addresses;
    }
    
  }