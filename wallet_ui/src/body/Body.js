import React from 'react'
import {Button, Input, Modal, Row} from 'react-materialize'
import Reflux from "reflux";
import AppActions from '../actions/AppActions'
import AppStore from "../stores/AppStore";
import Passbook from "./Passbook";
import Transfer from "./Transfer";

const listenermixin = Reflux.ListenerMixin;
export default class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
    this.getBody = this.getBody.bind(this);
    this.onAppStore = this.onAppStore.bind(this);
    this.getUserPopup = this.getUserPopup.bind(this);
    listenermixin.listenTo(AppStore, this.onAppStore)
  }

  onAppStore(triggerObj) {
    console.log("Action : ", triggerObj);
    if (triggerObj.action === "fetchTransactions" && triggerObj.data.success) {
      const state = this.state;
      state.transactions = triggerObj.data.transactions;
      this.setState(state);
    }
  }

  getBody() {
    if (this.props.walletPanel.showPassbook) {
      return <Passbook transactions={this.state.transactions} walletId={this.props.walletPanel.walletID}/>
    }
    if (this.props.walletPanel.showTransactPanel) {
      return <Transfer walletId={this.props.walletPanel.walletID}/>
    }
    return null;
  }

  loginClicked() {
    const walletId = document.getElementById("walletId").value;
    AppActions.login(walletId)
  }

  newWallet() {
    AppActions.newWallet()
  }

  onModalClose() {
    AppActions.closeModal()
  }

  getUserPopup() {
    return <div>
      <Modal open={this.props.showLogin}
             actions={
               <div>
                 <Button waves="light" className="red darken-2" onClick={this.onModalClose}>Close</Button>
               </div>
             }>
        <Row>
          <Input type="number" label="wallet Id" s={12} id="walletId"/>
        </Row>
        <Row>
          <Button onClick={this.loginClicked}>Go</Button>
          <Button onClick={this.newWallet}>New Wallet</Button>
        </Row>
      </Modal>
    </div>;
  }

  render() {
    return <div className="body">
      {this.getBody()}
      {this.getUserPopup()}
    </div>
  }
}