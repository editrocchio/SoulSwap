const { NFT_CONTRACT_ADDRESS, OWNER_ADDRESS, MNEMONIC, ALCHEMY_API_KEY, FACTORY_CONTRACT_ADDRESS, 
  PRIVATE_KEY, PINATA_API, PINATA_SECRET } = require('./secrets/secrets.json');
const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const pinataSDK = require('@pinata/sdk');
const prompt = require('prompt-sync')({sigint: true});

const pinata = pinataSDK(PINATA_API, PINATA_SECRET);
const NFT_ABI = JSON.parse(fs.readFileSync(__dirname + "\\build\\contracts\\SoulFragment.json", 'utf-8')).abi;
const FACTORY_ABI = JSON.parse(fs.readFileSync(__dirname + '\\build\\contracts\\SoulFragmentFactory.json')).abi;

const NUM_FRAGMENTS = 1;
const MAX_FRAGMENTS = 1;
//const NUM_LOOTBOXES = 4;
//const DEFAULT_OPTION_ID = 0;
//const LOOTBOX_OPTION_ID = 2;

const SOUL_NAME = "Jesus Christ"
let fileName = SOUL_NAME.replace(/ /g,'');
let description = ""
let image = ""
let birthdayUnix;
let deathDayUnix;

if (!MNEMONIC || !ALCHEMY_API_KEY || !OWNER_ADDRESS ) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, and contract address."
  );
  return;
}

const uploadMetadata = async (count) => {
  let body = {
    "attributes": [
      {
        "display_type": "date", 
        "trait_type": "birthday", 
        "value": birthdayUnix
      },
      {
        "display_type": "date", 
        "trait_type": "died", 
        "value": deathDayUnix
      },
      {
        "display_type": "number", 
        "trait_type": "Fragment", 
        "value": count,
        "max_value": MAX_FRAGMENTS
      }
    ], 
    "description": description,
    "image": image,
    "name": SOUL_NAME
  }
  const options = {
    pinataMetadata: {
        name: fileName
    }
  };
  const res = await pinata.pinJSONToIPFS(body, options).then((result) => {
    //handle results here
    return result;
  }).catch((err) => {
    return err;
  });
  return res;
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
      //TODO: do the check here to save transaction
    await factoryContract.methods.setMaxFragmentSupply(SOUL_NAME, MAX_FRAGMENTS).send({ from: OWNER_ADDRESS })
    
   // SoulFragments issued directly to the owner.
    let tokenUri;
    for (var i = 0; i < NUM_FRAGMENTS; i++) {
      try {
        const ipfsObj = await uploadMetadata(i + 1);
        if(ipfsObj.IpfsHash) {
          tokenUri = JSON.stringify(ipfsObj.IpfsHash) + "?filename=" + fileName + ".json"
        }
        
        if(tokenUri && tokenUri !== "") {
          const result = await factoryContract.methods
            .mintTokenURI(TOKEN_URI, OWNER_ADDRESS, NUM_FRAGMENTS,
              SOUL_NAME)
            .send({ from: OWNER_ADDRESS });
          console.log("Minted FRAGMENT. Transaction: " + result.transactionHash);
        }
      } catch(e) {
        console.log(e);
      }
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
// const name = prompt('What is your name?');
// console.log(`Hey there ${name}`);
