import Reflux from 'reflux'
import Actions from '../actions/AppActions'
import Delete from "../services/Delete";
import Get from '../services/Get'
import POST from "../services/Post";

const store = Reflux.createStore({
  listenables: [Actions],
  showPassbook() {
    this.trigger({
      action: "showPassbook",
    })
  },
  showTransactPanel() {
    this.trigger({
      action: "showTransactPanel",
    })
  },
  login(walletId) {
    this.trigger({
      action: "login",
      data: {walletId}
    })
  },
  closeModal() {
    this.trigger({
      action: "closeModal",
    })
  },
  fetchTransactions(walletId) {
    const promise = Get("wallet/" + walletId + "/transactions");
    promise.then((data) => {
      console.log("------------------ data from network", data);
      const triggerObj = {
        action: "fetchTransactions",
        data: {
          success: true,
          transactions: data
        }
      };
      this.trigger(triggerObj);
    }).catch((error) => {
      console.log("Error------------", error)
      const triggerObj = {
        action: "fetchTransactions",
        data: {
          success: false
        }
      };
      this.trigger(triggerObj);
    })
  },

  fetchWallet(walletId) {
    const promise = Get("wallet/" + walletId);
    promise.then((data) => {
      console.log("------------------ data from network", data);
      const triggerObj = {
        action: "fetchWallet",
        data: {
          success: true,
          wallet: data
        }
      };
      this.trigger(triggerObj);
    }).catch((error) => {
      console.log("Error------------", error)
      const triggerObj = {
        action: "fetchWallet",
        data: {
          success: false
        }
      };
      this.trigger(triggerObj);
    })
  },
  revert(tranId) {
    const promise = Delete("transaction/" + tranId);
    promise.then((data) => {
      console.log("------------------ data from network", data);
      const triggerObj = {
        action: "revert",
        data: {
          success: true,
          wallet: data
        }
      };
      this.trigger(triggerObj);
    }).catch((error) => {
      console.log("Error------------", error)
      const triggerObj = {
        action: "revert",
        data: {
          success: false
        }
      };
      this.trigger(triggerObj);
    })
  },

  transact(wallet_id, type, description, amount) {
    const data = {wallet_id, amount, type, description};
    const promise = POST("transaction", data);
    promise.then((data) => {
      console.log("------------------ data from network", data);
      const triggerObj = {
        action: "transact",
        data: {
          success: true,
          transaction: data
        }
      };
      this.trigger(triggerObj);
    }).catch((error) => {
      console.log("Error------------", error)
      const triggerObj = {
        action: "transact",
        data: {
          success: false
        }
      };
      this.trigger(triggerObj);
    })
  },
  newWallet() {
    const promise = POST("wallet", {});
    promise.then((data) => {
      console.log("------------------ data from network", data);
      const triggerObj = {
        action: "newWallet",
        data: {
          success: true,
          wallet: data
        }
      };
      this.trigger(triggerObj);
    }).catch((error) => {
      console.log("Error------------", error)
      const triggerObj = {
        action: "newWallet",
        data: {
          success: false
        }
      };
      this.trigger(triggerObj);
    })
  }
});

export default store