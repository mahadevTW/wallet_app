import React, {Component} from 'react';
import Reflux from 'reflux'
import AppActions from './actions/AppActions'
import './App.css';
import Body from './body/Body'
import MyNavbar from './Navbar'
import AppStore from './stores/AppStore'

const listenermixin = Reflux.ListenerMixin;

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: true,
      wallet: null,
      walletID: null,
      showTransactPanel: false,
      showPassbook: false,
    };
    this.onAppStore = this.onAppStore.bind(this);
    listenermixin.listenTo(AppStore, this.onAppStore)
  }

  onAppStore(triggerObj) {
    if (triggerObj.action === "closeModal") {
      const state = this.state;
      state.showLogin = false;
      this.setState(state);
    }
    if (triggerObj.action === "showTransactPanel") {
      const state = this.state;
      state.showTransactPanel = true;
      state.showPassbook = false;
      this.setState(state);
    }
    if (triggerObj.action === "showPassbook") {
      const state = this.state;
      state.showDepositPanel = false;
      state.showPassbook = true;
      this.setState(state);
    }
    if (triggerObj.action === "login") {
      const state = this.state;
      state.walletID = triggerObj.data.walletId;
      state.showPassbook = true;
      state.showLogin = false;
      this.setState(state);
      AppActions.fetchTransactions(triggerObj.data.walletId);
      AppActions.fetchWallet(triggerObj.data.walletId);
    }
    if (triggerObj.action === "fetchWallet") {
      if (triggerObj.data.success) {
        const state = this.state;
        state.wallet = triggerObj.data.wallet
        this.setState(state);
      }
    }
    if (triggerObj.action === "revert") {
      if (triggerObj.data.success) {
        AppActions.fetchTransactions(this.state.walletID);
        AppActions.fetchWallet(this.state.walletID);
      }
    }
    if (triggerObj.action === "transact") {
      if (triggerObj.data.success) {
        const state = this.state;
        state.showPassbook = true;
        state.showLogin = false;
        this.setState(state);
        AppActions.fetchTransactions(this.state.walletID);
        AppActions.fetchWallet(this.state.walletID);
      } else {

      }
    }
    if (triggerObj.action === "newWallet") {
      if (triggerObj.data.success) {
        alert("New Wallet has been Created, Wallet Id :  " + triggerObj.data.wallet.ID);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <MyNavbar wallet={this.state.wallet}/>
        <Body walletPanel={{
          showTransactPanel: this.state.showTransactPanel,
          showPassbook: this.state.showPassbook,
          walletID: this.state.walletID
        }} showLogin={this.state.showLogin}/>
      </div>
    );
  }
}

export default App;
