import React from 'react'
import AppActions from '../actions/AppActions'
import Transaction from "./Transaction";

export default class Passbook extends React.Component {
  componentDidMount() {
    AppActions.fetchTransactions(this.props.walletId)
  }

  render() {
    const transactions = this.props.transactions;
    return transactions.map(t => {
      return <Transaction transaction={t} key={t.ID}/>
    })
  }
}