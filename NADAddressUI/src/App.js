import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var Ethereum_client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var nadAddressStoreAbi =[ { constant: true,
    inputs: [],
    name: 'getAddresses',
    // outputs: [ [], [], [], [] ],
    outputs:  [{name: 'd', type: 'bytes32[]'}],
    payable: false,
    type: 'function' },
  { constant: false,
    inputs: [ {name: 'd', type: 'bytes32'}],
    name: 'addAddress',
    outputs: [ {name: 'd', type: 'bytes32'} ],
    payable: false,
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'addresses',
    outputs: [ [Object], [Object], [Object], [Object] ],
    payable: false,
    type: 'function' } ];

var nadAddressStoreAddress = "0x7d9520534faa89cfbf2da9334152a617fa916aac";

var nadAddressStoreContract = Ethereum_client.eth.contract(nadAddressStoreAbi).at(nadAddressStoreAddress);


var airlockAbi = [ { constant: true,
    inputs: [],
    name: 'content_count',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: false,
    inputs: [{name: 'd', type: 'bytes32'}],
    name: 'SubmitContent',
    outputs: [],
    payable: false,
    type: 'function' },
  { anonymous: false,
    inputs: [ [Object] ],
    name: 'NewContent',
    type: 'event' } ];

var airlockAddress = "0x6143ddc126925179b091f39c5e8f7aeb5d1bb138";


var airlockContract = Ethereum_client.eth.contract(airlockAbi).at(airlockAddress);


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      states: [],
      counties: [],
      pos:[],
      guids:[]
    }
  }

  componentWillMount(){

      var multihash = "QmdmaV1YZiXgD6hrdB4e6TGSGBXDFGVirTLD6ndVCUEJvX";
      Ethereum_client.eth.defaultAccount = Ethereum_client.eth.accounts[0];
      try {
        var txhash = airlockContract.SubmitContent(multihash,
          {from: Ethereum_client.eth.accounts[0]}
        );
      }
      catch (err) {
        console.log(err.message);
      }
      var args = "asdfkashkdfjhask,djfhadskfhaskdkalsdklsdkjas,dklsdlsjdfasdfasdfl,jljkljkljdfkljdfkljkjakjl,asdsakhjfdsafasf,jkajhskjaklfasdfsdfksjfdhjjkdsjfjksfdjkjkdsf1234abcsdfasdasdfasewrwesfsdfadsfsadfasasdfasdfsafdghgfhgh23456gdfgsdfgsdfsgfd";
      args = Ethereum_client.toHex(args);
      console.log(args);
      var ascii = Ethereum_client.toAscii(args);
      console.log(ascii);
       //var d = nadAddressStoreContract.addAddress();
    
      
      // var json = {
      //         "id": 1,
      //         "name": "A green door",
      //         "price": 12.50,
      //         "tags": ["home", "green"]
      //  };
      //
       nadAddressStoreContract.addAddress(args,{from: Ethereum_client.eth.accounts[0]});
       var data = nadAddressStoreContract.getAddresses();
       console.log(data);
    }
   
   render() {

    var tableRows = [];
   
    // _.each(this.state.states, (value, index) => {
    //   tableRows.push(
    //       <tr>
    //           <td>{Ethereum_client.toAscii(this.state.states[index])}</td>
    //           <td>{Ethereum_client.toAscii(this.state.counties[index])}</td>
    //           <td>{Ethereum_client.toAscii(this.state.pos[index])}</td>
    //           <td>{Ethereum_client.toAscii(this.state.guids[index])}</td>
    //       </tr>
    //     )
    // })

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to NADAddress DAPP</h2>
        </div>

        <div className="text-right"><h2>NAD Addresses Lookup </h2></div>
        <div className="App-Content">
          <table>
          <thead>
            <tr>
              <th>STATE</th>
              <th>COUNTY</th>
              <th>POS</th>
              <th>GUID</th>
            </tr>
          </thead>
          <tbody>
           {tableRows}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
