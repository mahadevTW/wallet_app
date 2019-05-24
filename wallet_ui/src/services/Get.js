const Get = (url) => {
  return new Promise((resolve, reject) => {
    const p = fetch("/walletapi/" + url);
    p.then((response) => {
      if (response.ok) {
        const dataPromise = response.json();
        dataPromise.then((data) => {
          resolve(data)
        })
      } else {
        reject("failed to fetch")
      }
    }).catch((error) => {
      reject(error)
    })
  })
};
export default Get