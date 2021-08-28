const getKey = async () => {
  try {
    const accounts = (
      await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
    )
    const key = (
      await window.ethereum.request({
        jsonrpc: '2.0',
        method: 'eth_getEncryptionPublicKey',
        params: [accounts[0]],
        from: accounts[0],
      })
    )
    document.getElementById('out').innerHTML = `Public Key: ${key}`
  } catch(err) {
    alert(err.message)
  }
}

getKey()
