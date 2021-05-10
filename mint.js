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
const MAX_FRAGMENTS = 5;
//const NUM_LOOTBOXES = 4;
//const DEFAULT_OPTION_ID = 0;
//const LOOTBOX_OPTION_ID = 2;

const SOUL_NAME = "William Shakespeare"
let fileName = SOUL_NAME.replace(/ /g,'');
let description = "\"To be, or not to be. That is the question...\" - William Shakespeare"
let birthdayUnix = 1546360800;
let deathDayUnix = 1546360800;
let imgPath = "./imgs/WilliamShakespeare.jpg"

let userInput = true;
let lastChoice = "";

if (!MNEMONIC || !ALCHEMY_API_KEY || !OWNER_ADDRESS ) {
  console.error(
    "Please set a mnemonic, Alchemy key, owner, and contract address."
  );
  return;
}

function confirmMint(tokenUri) {
  if(lastChoice != "ya") {
    userInput = true;
    console.log('Are you sure you want to mint this? It cannot be undone. '
    + 'Review the metadata first at ' + tokenUri + " and confirm yes to " 
    + "this iteration (y) yes to all future iterations (ya) or cancel (c)")

    while(userInput) {
      let choice = prompt(" >");

      lastChoice = choice;

      if(choice == "c") {
        process.exit(1);
      } else if(choice == "y" || choice == "ya") {
        userInput = false;
      } 
    }
  }
}

const uploadImage = async (path) => {
  const readableStreamForFile = fs.createReadStream(path);
  const options = {
    pinataMetadata: {
        name: fileName
    }
  };
  const res = pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
      return result;
    }).catch((err) => {
      return err;
    });
  return res;
}

const uploadMetadata = async (birthdayUnix, deathDayUnix, description, count, imgUri) => {
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
    "image": imgUri,
    "name": SOUL_NAME
  }
  const options = {
    pinataMetadata: {
        name: fileName + ".json"
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
      const maxFragments = await factoryContract.methods.getMaxFragmentSupply(SOUL_NAME).call();
    if(maxFragments == 0) {
      await factoryContract.methods.setMaxFragmentSupply(SOUL_NAME, MAX_FRAGMENTS).send({ from: OWNER_ADDRESS })
    }

    // //upload img first
    let imgUri = "https://gateway.pinata.cloud/ipfs/QmPV6CsWGgKhSdVRzYyxyMtjgYQCCxpcibuBL3X24LT7DZ?filename=WilliamShakespeare.jpeg"
    // const imgRes = await uploadImage(imgPath);
    // if(imgRes.IpfsHash) {
    //   imgUri = "https://gateway.pinata.cloud/ipfs/" + 
    //     JSON.parse(JSON.stringify(imgRes.IpfsHash)) + "?filename=" + fileName
    //   console.log("Image successfully pinned: " + imgUri)
    // }
   // SoulFragments issued directly to the owner.
    let tokenUri;
    for (var i = 0; i < NUM_FRAGMENTS; i++) {
      try {
        const ipfsObj = await uploadMetadata(birthdayUnix, deathDayUnix, description, i + 5, imgUri);
        if(ipfsObj.IpfsHash) {
          tokenUri =  "https://gateway.pinata.cloud/ipfs/" 
            + JSON.parse(JSON.stringify(ipfsObj.IpfsHash)) + "?filename=" + fileName + ".json"
            console.log("JSON successfully pinned: " + tokenUri)
        }

        confirmMint(tokenUri);

        if(tokenUri && tokenUri !== "") {
          const result = await factoryContract.methods
            .mintTokenURI(tokenUri, OWNER_ADDRESS, NUM_FRAGMENTS,
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
