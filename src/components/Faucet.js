import { useState } from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Message from './Message'

const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

// Build out the Faucet component that we passed our contract to as props thru the component instance
const Faucet = (props) => {

  // Use useState hook so that we can use state in our functional component
  // Where balance = current value of state and setBalance is the function we get from the second value of the useState array that allows us to set new state
  const [balance, setBalance] = useState()
  // 
  const [showBalance, setShowBalance] = useState(false)


  // Our getBalance() and faucet() functions need to be async as we are calling the contract that lives on the blockchain so we need them to wait at times
  async function getBalance() {
    // Validate users wallet using typeOf operator
    // "If the data type of the users' wallet is not undefined, then do these things..."
    // Show users balance 
    if (typeof window.ethereum !== 'undefined') {
      // Request user address
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

      // Get the data we need using the ethers.js library and assign that data to local variables
        // We access this data via our ABI which we imported at App.js and passed in as props via <Faucet /> contract instance
      // Connect to ethereum via ether.js and Ethereum API 
        // We pass window.ethereum to etheres because this provides the Ethereum API
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Create a contract instance
        // tokenAddress declared above
        // tokenContract.abi is passed as props 'Token'
        // provider declared and fetched above
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider)
      // Declare and fetch balance
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  } 

  async function faucet() {
    // // Validate faucet's wallet using typeOf operator
    if (typeof window.ethereum !== 'undefined') {
      // Request faucet address
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Web3 provider injected via MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
      contract.faucet(account[0], 100);
    }
  }
    return (
        <div>
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle>Faucet
        </Card.Subtitle><br></br>
        <div className="d-grid gap-2">
        <Button onClick={faucet}>Open Spigot!</Button>
        <Button onClick={getBalance} variant="warning">Check Balance</Button>   
        {/* 
          If showBalance is true, then show the Message component, otherwise don't show
          showBalance is set to true when getBalance is called via the onClick Event
        */}
        { showBalance ? <Message balance={balance}/> : null }
        </div>
        </Card.Body>
        </Card>
        </div>
    )
}

export default Faucet