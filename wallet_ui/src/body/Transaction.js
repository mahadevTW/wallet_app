import React from 'react'
import {CardPanel, Chip, Col, Row} from 'react-materialize'
import AppActions from '../actions/AppActions'

export default class Transaction extends React.Component {
  constructor() {
    super()
    this.revert = this.revert.bind(this)
  }

  getAmountChip(transaction) {
    if (transaction.type == "CREDIT") {
      return <Chip>
        + {transaction.amount}
      </Chip>
    } else {
      return <Chip>
        - {transaction.amount}
      </Chip>
    }
  }

  getTranTime(transaction) {
    let tranDate = new Date(transaction.CreatedAt);
    const localDate = tranDate.toLocaleDateString();
    const time = tranDate.getHours() + ":" + tranDate.getMinutes();
    return <Chip>
      {
        localDate + ", " + time
      }
    </Chip>

  }

  revert() {
    const tran = this.props.transaction;
    AppActions.revert(tran.ID);
  }

  render() {
    const transaction = this.props.transaction;
    return <Row>
      <Col m={12}>
        <CardPanel className="teal">
          {
            this.getAmountChip(transaction)
          }
          {
            this.getTranTime(transaction)
          }
          {
            this.getTranDescription(transaction)
          }
          <span style={{padding: "2%"}}> | Closing Balance : {transaction.ClosingBalance}</span>
          <button style={{paddingRight: "2%"}} onClick={this.revert}>Revert</button>
        </CardPanel>
      </Col>
    </Row>
  }

  getTranDescription(transaction) {
    return transaction.Description
  }
}