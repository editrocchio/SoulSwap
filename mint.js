const { NFT_CONTRACT_ADDRESS, OWNER_ADDRESS, MNEMONIC, ALCHEMY_API_KEY, FACTORY_CONTRACT_ADDRESS, PRIVATE_KEY } = require('./secrets/secrets.json');
const fs = require('fs');

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const NFT_ABI = JSON.parse(fs.readFileSync(__dirname + "\\build\\contracts\\SoulFragment.json", 'utf-8')).abi;
const FACTORY_ABI = JSON.parse(fs.readFileSync(__dirname + '\\build\\contracts\\SoulFragmentFactory.json')).abi;

const NUM_FRAGMENTS = 1;
//const NUM_LOOTBOXES = 4;
const DEFAULT_OPTION_ID = 0;
//const LOOTBOX_OPTION_ID = 2;

const TOKEN_URI = "QmYkx4zrfZJz54GNJoa4zy8WUSpdzQayUvVYYaetSogC5P?filename=ipfs.json";

if (!MNEMONIC || !ALCHEMY_API_KEY || !OWNER_ADDRESS ) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, and contract address."
  );
  return;
}

const main = async () => {
   const provider = new HDWalletProvider(
     PRIVATE_KEY, ALCHEMY_API_KEY);
   const web3Instance = new web3(provider);
    
   if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

   // SoulFragments issued directly to the owner.
    for (var i = 0; i < NUM_FRAGMENTS; i++) {
      const result = await factoryContract.methods
        .mintTokenURI(DEFAULT_OPTION_ID, TOKEN_URI, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted FRAGMENT. Transaction: " + result.transactionHash);
    }
  

  // // Lootboxes issued directly to the owner.
  // for (var i = 0; i < NUM_LOOTBOXES; i++) {
  //   const result = await factoryContract.methods
  //     .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
  //     .send({ from: OWNER_ADDRESS });
  //   console.log("Minted lootbox. Transaction: " + result.transactionHash);
  // }
  } else if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    // SoulFragments issued directly to the owner.
    for (var i = 0; i < NUM_FRAGMENTS; i++) {
      const result = await nftContract.methods
        .mintTo(OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted FRAGMENT. Transaction: " + result.transactionHash);
    }
  } else {
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();