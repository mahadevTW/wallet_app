const showToast = (message, durationMiliSecond = 4000) => {
  window.Materialize.toast(message, durationMiliSecond)
};

module.exports = {
  showToast
};
