import React from 'react'
import {Chip, Navbar, NavItem} from 'react-materialize'
import AppActions from './actions/AppActions'

export default class MyNavbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    const wallet = this.props.wallet;
    return <div>
      <Navbar right>
        {this.getWalletInfo(wallet)}
        <NavItem onClick={() => AppActions.showPassbook()}>Passbook</NavItem>
        <NavItem onClick={() => AppActions.showTransactPanel()}>Do Transaction</NavItem>
      </Navbar>
    </div>
  }

  getWalletInfo(wallet) {
    if (wallet == null) {
      return null;
    } else {
      return <NavItem>
        <Chip>
          {wallet.Balance}
        </Chip>
      </NavItem>
    }
  }
}