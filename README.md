Setup Hardhat project:
```shell
npm init
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npx hardhat
```

Other commands:
```shell
npx hardhat compile
npx hardhat test
npx hardhat node (to start hardhat local network)
npx hardhat run .\scripts\sample-script.js --network localhost
npx hardhat help
```