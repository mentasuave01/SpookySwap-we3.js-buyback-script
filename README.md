# SpookySwap Sample BrewBoo web3.js Caller Script

## Overview
The BrewBoo v2 contract (https://ftmscan.com/address/0x68f598280a843A5Ce07C1b9fB0D3aF00Cd085c31) collects protocol fees from SpookySwap. It permissionlessly allows any party to call the contract  convert the collected protocol fees to BOO, which is then sent to xBOO. Callers will receive a 0.1% bounty for calling the contract.

The javascript script provided in this repo is an example of calling BrewBoo v2.

## Setup
This setup assumes Node.js and pnmp are available.

1. Clone the repo
```
git clone https://github.com/SpookySwap/spookyswap-brewboo-scripts.git
```

2. Navigate to the repo and install the node modules
```
pnpm install
```

3. With your favorite text editor, create a `.env` file to store a wallet's hex private key.
Example of expected contents for the `.env` file:
```
PRIVATE_KEY=4bd1283169c03c542276521992b85c5e17cab72e6ee702e1dbfc687f16327d33
ADDRESS=0x1B38914928B5DaA7E0394d51cfe8D264303c70f9
```

**IMPORTANT:** This is not a real private key. Never reveal your private key to anyone. Compromising your private key compromises all control and funds in the respective wallet. DO NOT CHECK THIS FILE IN ANYWHERE. The `.gitignore` of this repo has `.env` included. It is not recommended to change this.

4. Edit the `index.js` script's token pairs to choose which pairs to convert. BrewBoo v2's value can be tracked with https://zapper.fi/account/0x68f598280a843a5ce07c1b9fb0d3af00cd085c31/fantom

Note: Zapper does not always include newly minted tokens. The analytics page can help find these pairs.

5. Call the script 
Sample call:
```
node.js .
```