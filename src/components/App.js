import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import PhotoChain from '../abis/PhotoChain.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  // life cycle call back
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // get etherium provider from meta mask to instantiate connection to blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Use MetaMask.')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3 

    const accounts = await web3.eth.getAccounts()
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            // Code...
            />
          }
        }
      </div>
    );
  }
}

export default App;