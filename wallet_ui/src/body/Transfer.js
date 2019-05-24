import React from 'react'
import {Button, Input, Row, Select} from 'react-materialize'
import AppActions from "../actions/AppActions";

export default class Transfer extends React.Component {
  constructor() {
    super();
    this.state = {
      tranType: "CREDIT"
    };
    this.handleChange = this.handleChange.bind(this);
    this.transferClicked = this.transferClicked.bind(this);
  }

  handleChange = (e, tranType) => {
    console.log("Change : ", tranType, " : ", e.target.value)
    this.setState({tranType: e.target.value});
  };

  transferClicked(e) {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const type = this.state.tranType;
    const walletId = this.props.walletId;
    AppActions.transact(parseInt(walletId), type, description, parseInt(amount))
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form>
          <Row>
            <Input type="select" browserDefault value={this.state.tranType} onChange={this.handleChange}>
              <option value="CREDIT">
                CREDIT
              </option>
              <option value="DEBIT">
                DEBIT
              </option>
            </Input>
            <Input type="number" label="Amount" s={6} id="amount"/>
            <Input type="text" label="Description" s={6} id="description"/>
          </Row>
          <Row>
            <Button onClick={this.transferClicked}>Transact</Button>
          </Row>
        </form>
      </div>)
  }
}