const nft_contract_address = "0x10636c9DAE899ED37D9669E83edDd866b0b6688B" 
// nft_contract_matic_mainnet= "0xD2A980a1b60D936A911Dd27290C5F36847F6B177"

initializeWeb3()
const web3 = new Web3(window.ethereum);

async function initializeWeb3(){ 
    Moralis.initialize("OH6pobnEftBqRJizj6cjaP7lTq6p9Km8eNbGu6db"); 
    Moralis.serverURL = "https://gljjqzdhwmyo.usemoralis.com:2053/server";
    Moralis.authenticate();
}

async function mintFood(){
    const characterIndex = 0;
    const character = await mapCharacter(characterIndex);
    const characterName = "Food"
    const metadata = {
        "name":characterName,
        "image":"https://ipfs.moralis.io:2053/ipfs/QmRowxZmntDM5veEhfZFd7J8cbgSCqCMH7RpqBRFwJ7uKG",
    }
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();
    console.log(metadataURI)
    const txt = await mintToken(metadataURI).then(console.log)
}



async function mapCharacter(characterIndex){
    const images = await fetch("static/ipfsData.json")
    const ipfsUris = await images.json()
    return {"URI":ipfsUris[characterIndex]}
}


async function mintToken(_uri){
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
      name: "mintToken",
      type: "function",
      inputs: [{
        type: 'string',
        name: 'tokenURI'
        }]
    }, [_uri]);
  
    const transactionParameters = {
      to: nft_contract_address,
      from: ethereum.selectedAddress,
      data: encodedFunction
    };
    const txt = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });
    return txt
  }