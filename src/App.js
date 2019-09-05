import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { TODO_ABI, TODO_ADDRESS } from './eth-config'
import './App.css';

const App = () => {
  const [account, setAccount] = useState("Empty")
  const [networkType, setNetworkType] = useState("Empty")
  const [taskCount, setTaskCount] = useState(0)

  useEffect(() => {
    initializeWeb3Js()
  }, [])

  const initializeWeb3Js = async() => {
    const web3js = new Web3(Web3.currentProvider || "http://localhost:7545")
    const network = await web3js.eth.net.getNetworkType()
    setNetworkType(network)
    web3js.eth.getAccounts((err, accounts) => {
      setAccount(accounts[0])
    })
    loadTodoContract(web3js)
  }

  const loadTodoContract = async (web3js) => {
    const todoContract = new web3js.eth.Contract(TODO_ABI, TODO_ADDRESS)
    const taskCount = await todoContract.methods.taskCount().call()
    setTaskCount(taskCount)
  }

  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>Connected account: {account}</p>
      <p>Network Type: {networkType}</p>
      <p>Task Count: {taskCount}</p>
    </div>
  );
}

export default App;
