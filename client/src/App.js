import React, { Component } from "react";
import BankContract from "./contracts/bank.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
 constructor(props){
  super(props); 
  this.handleChange = this.handleChange.bind(this); 
  this.handleDeposit = this.handleDeposit.bind(this);
  this.handleWithdraw = this.handleWithdraw.bind(this); 
 } 
  
  state = { formInput: null , web3: null, accounts: null, contract: null, value:'' };
 
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = BankContract.networks[networkId]
      const instance = new web3.eth.Contract(
       BankContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      this.setState({ web3, accounts, contract: instance });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

textValidation(userText){
  if(/^[1-9]/.test(userText)) { return true} 
  alert('please enter a valid eth amount') 
  return false 
} 
  
 handleChange(event) {
  this.setState({ value:event.target.value })
 } 

 handleDeposit(event){ 
  if(!this.textValidation(this.state.value)) { return} 
  event.preventDefault(); 
  try{ (async () => { 
    const { web3, accounts, contract } = this.state
    await contract.methods.deposit().send({ from: accounts[0], value: web3.utils.toWei(this.state.value, "ether") })})()
     }catch(error){console.log(error)} 
 } 

 handleWithdraw(event){ 
 try{ 
   (async () => { 
    const { web3, accounts, contract } = this.state
    await contract.methods.withdraw().send({ from: accounts[0] })})()
    }catch(error){ console.log(error) }
 }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <h1>Ethereum Bank</h1>
        <div> 
          <form onSubmit={this.handleDeposit}>
            <label> 
             Deposit ->    
              <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label> 
            <input type='submit' value='Submit'/> 
          </form>
        </div>
        <div style={{ marginTop: 25}} > 
        <button onClick={this.handleWithdraw}>
         <p> withdraw all! </p> 
        </button>
        </div> 
      </div>
    );
  }
}

export default App;
