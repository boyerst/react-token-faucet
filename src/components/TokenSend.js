// Import useState hook
import { useState } from 'react';
// Import ethers library 
import { ethers } from 'ethers'
// Import Card component from react-bootstrap
import Card from 'react-bootstrap/Card'
// Import Button from react-bootstrap
import Button from 'react-bootstrap/Button'

const tokenAddress = "0x87EbDA903aaeb1213056e63F49871683E62783bE"

const TokenSend = (props) => {

  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  // Request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function sendCoins() {
  // Validate users wallet using typeOf operator
  // "If the data type of the users' wallet is not undefined, then do these things..."
  if (typeof window.ethereum !== 'undefined') {
    // Wait for requestAccount() approval by user
    await requestAccount()
    // Connect to ethereum via ether.js and Ethereum API 
      // We pass window.ethereum to etheres because this provides the Ethereum API
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
    const transaction = await contract.transfer(userAccount, amount);
    await transaction.wait();
    console.log(`${amount} Coins successfully sent to ${userAccount}`);
  }
}
    return (
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle> send faucet to an address
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Payee 0x address" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <Button onClick={sendCoins} variant="success">send </Button>
        </div>
        </Card.Body>
        </Card>
    )
}

export default TokenSend