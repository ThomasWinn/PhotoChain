# PhotoChain
Decentralized Photo Sharing App

## PhotoChain Commands
`truffle migrate --reset` 
Clear the blockchain
<br>
`truffle console` 
opens up an interactive JS environment for the blockchain


## JS environment 
`photochain = await PhotoChain.deployed()` 
- fetched photochain from the blockchain
- async function call else returns the JS promise

## Test.js
- mocha testing framework (https://mochajs.org/)
- chai assertion library (https://www.chaijs.com/)
- Testing is important for smart contracts because it is immutable. You can't change once deployed and only a new copy if so
- truffle migrate --reset ... This reset flag allows us to deploy a new version of the smart contract 

## PhotoChain.sol
use `memory` because this is what will be pulled from IPFS
`msg` represents the global message coming in from the etherium transaction
`msg.sender` person calling this message their etherium address
`emit` triggers an event

## Benefits
- Prevents owners from censoring posts
- Prevents shadow banning
- Prevents owners from promoting specific content

## How it works 
Web and wallet -> HTML code -> block chain and etherium smart contract (immutable) -> 

#### Front end
- new terminal `npm run start`

#### block chain and etherium smart contract (immutable)
- stores IPFS hash on block chain
- smart contracts in charge of listing posts, creating posts, and tipping

#### IPFS
- blockchain decentralized storage system
- contains hashes

## Dependencies
Node JS v14.16.1
Truffle 
Ganache deploy smart contracts without actually using real money