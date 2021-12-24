const nft_contract_address = "0xDBBE3e844E7BC0942f7315868CAa824ED98F8862" 

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
    const characterName = "sample"
    const metadata = {
        "name":characterName,
        "image":character["URI"],
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