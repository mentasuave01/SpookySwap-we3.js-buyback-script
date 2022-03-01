//libraries
const Web3 = require('web3');   //web3 library
require('dotenv').config() // Load .env variables


//variables
const tokens = require('./token-list.json'); //token list
const BREWBOO_ABI = require('./BrewBoo_ABI.json'); //BrewBoo ABI
const BREWBOO_ADDRESS = "0x68f598280a843A5Ce07C1b9fB0D3aF00Cd085c31" //BrewBoo address



 var token0 = []
 var token1 = []
 var i=0,j=0;

 //FANTOM PAIRS
const FTM_PAIRS = [
    // ADD OR REMOVE TOKENS HERE.
    tokens.USDC,
    tokens.TOMB,
    tokens.TSHARE,
    tokens.fUSDT,
    tokens.DAI,
    tokens._3SHARES,
    tokens._2OMB,
    tokens.IB,
    tokens.SPELL,
    tokens.TREEB,
    tokens.MULTI,
    tokens.ANY,
    tokens.BIFI,
    tokens.GEIST,
    tokens.BOO,
  ]

while (i<=FTM_PAIRS.length-1) {
    token0.push(tokens.FTM)
    token1.push(FTM_PAIRS[i])
    i++;
}

// // //DAI PAIRS
 const  DAI_PAIRS = [
    // ADD OR REMOVE TOKENS HERE.
     tokens.USDC,
   ]

   while (j<DAI_PAIRS.length-1) {
     token0.push(tokens.DAI)
     token1.push(DAI_PAIRS[i])
     j++;
 }

//custom token example
 token0.push(tokens.USDC)
 token1.push(tokens.OXD)

//(token0.length==token1.length) ? console.log("token0 and token1 are the same length") : console.log("token0 and token1 are not the same length")

//RPC configuration
const w3 = new Web3("https://rpc.ankr.com/fantom")

//contract Call
const contractCall = async  () => {
    const account = process.env.ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = BREWBOO_ADDRESS
    

    //init contract
    const brewBoo = new w3.eth.Contract(BREWBOO_ABI, BREWBOO_ADDRESS ) 

    // get nonce
    const transactionCount = await w3.eth.getTransactionCount(account);
    //console.log(transactionCount);

    // //get balance
    // const balance = await w3.eth.getBalance(account);
    // //console.log(balance);

    //get gasPrice
    const gasPriceWei = await w3.eth.getGasPrice();
    //const gasPriceFTM = w3.utils.fromWei(gasPriceWei,"ether")
    //console.log(gasPriceWei+" wei");
    //console.log(gasPriceFTM +" FTMs");

      //BrewBOO function create
     const data = brewBoo.methods.convertMultiple(
        token0,
        token1
    ).encodeABI()
    console.log(data);

    
   //build transaction 
   const txOptions={
        "from": account,
        "to": contractAddress,
        "data": data,
        "value": 0,
        "gasPrice": gasPriceWei,
        "gas": 9000000,
        "nonce": transactionCount
     }
    //console.log(txOptions);

    //sign transaction
    signed_tx= await w3.eth.accounts.signTransaction(txOptions,privateKey)
    //console.log(signed_tx);

    //send transaction
    w3.eth.sendSignedTransaction(signed_tx.rawTransaction)
    .then((result) => {
        console.log(`https://ftmscan.com/tx/${signed_tx.transactionHash}`)
        
    }).catch((err) => {
        console.log(`ERROR NOT SENDED`
    });
    

    

}
contractCall();







