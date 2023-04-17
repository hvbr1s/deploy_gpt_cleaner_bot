import { createRequire } from "module"
import { v4 as uuidv4 } from "uuid";
const require = createRequire(import.meta.url)
require('dotenv').config()
import cookieParser from 'cookie-parser';
import path from 'path';
const __dirname = path.resolve();
import Web3 from "web3";
import Contract from "web3-eth-contract";
import express from "express";
import { Configuration, OpenAIApi } from "openai";
const PORT = 4888

const configuration = new Configuration({
    organization: process.env.ORGANIZATION ,
    apiKey: process.env.SECRET_API_KEY,
});


const openai = new OpenAIApi(configuration);


const app = express();

//init web 3
const web3 = new Web3("https://rpc-mumbai.maticvigil.com/")

// middleware
app.use(cookieParser());
app.use(express.json()) 

function safeStringify(obj) {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return; // Omit circular references
      }
      cache.add(value);
    }
    return value;
  });
}


app.get('/' , (req, res) => {
  res.sendFile(path.join(__dirname, 'public/auth.html'))
})

app.get('/auth', async (req, res,) =>{

    var address = await web3.eth.accounts.recover("Access to chat bot", req.query.signature)
    console.log(address)
  
    var balance = Number(await contract.methods.balanceOf(address).call())
    console.log("Balance is ", balance)
  
    if (balance > 0) {
      const token = uuidv4();
      res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" });
      res.redirect("https://gpt-cleaner-bot.onrender.com/gpt")
    } else {
      res.send(`You don't have the required NFT!`);
    }    

})

app.get("/gpt", (req, res) => {
  const authToken = req.cookies.authToken;
  if (authToken) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  } else {
    res.redirect("https://gpt-cleaner-bot.onrender.com");
  }
});


app.post("/chat", async (req, res) => {
  const { question } = req.body;
  console.log(question);
  try {
    let chatResponse = await openai.createChatCompletion({
      "model": "gpt-3.5-turbo",
      "messages": 
        [{ "role": "user","content": question }]
      ,
    });

    const answer = chatResponse.data.choices[0].message.content;
    res.status(200).send({ response: answer });
    console.log(answer);
  } catch (error) {
    console.error("Error during chat completion:", error);
    res.status(500).send({ error: "Error during chat completion" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/ and ready to receive requests.`);
});

const ADDRESS = "0xb022C9c672592c274397557556955eE968052969"
const ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"safeMint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contract = new web3.eth.Contract(ABI, ADDRESS)
