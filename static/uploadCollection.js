Moralis.initialize("OH6pobnEftBqRJizj6cjaP7lTq6p9Km8eNbGu6db"); // Application id 
Moralis.serverURL = "https://gljjqzdhwmyo.usemoralis.com:2053/server"; //Server url 

async function upload(){
    await Moralis.authenticate() 
    const fileInput = document.getElementById("files");
    const ipfsUris = {}
    for (i=0;i< fileInput.files.length; i++){
        console.log(fileInput.files[i].name);
        let data = fileInput.files[i];
        let imageFile = new Moralis.File(data.name, data);
        await imageFile.saveIPFS();
        ipfsUris[i+1] = imageFile.ipfs();
    }
    console.log(ipfsUris);
}