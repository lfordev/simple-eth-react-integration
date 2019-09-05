import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import './App.css';

const App = () => {
  const [account, setAccount] = useState("Cuenta no conectada")

  useEffect(() => {
    startWeb3()
  }, [])

  const startWeb3 = async() => {
    const web3 = new Web3(Web3.currentProvider || "http://localhost:7545")
    const network = await web3.eth.net.getNetworkType()
    console.log("Network: ", network)
    web3.eth.getAccounts((err, accounts) => {
      setAccount(accounts[0])
    })
  }

  return (
    <div className="container">
      <h1>Bienvenido</h1>
      <p>{account}</p>
    </div>
  );
}

export default App;
