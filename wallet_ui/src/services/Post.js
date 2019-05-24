const POST = (url, data) => {
  return new Promise((resolve, reject) => {
    const p = fetch("/walletapi/" + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
    });
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
export default POST