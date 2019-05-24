import Reflux from 'reflux'

const actions = Reflux.createActions([
  "login",
  "closeModal",
  "showPassbook",
  "showTransactPanel",
  "fetchTransactions",
  "fetchWallet",
  "revert",
  "transact",
  "newWallet"
]);
export default actions;