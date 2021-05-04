const SoulFragment = artifacts.require("./SoulFragment.sol");
const SoulFragmentFactory = artifacts.require("./SoulFragmentFactory.sol");
const SoulFragmentLootBox = artifacts.require("./SoulLootBox.sol");

// If you want to hardcode what deploys, comment out process.env.X and use
// true/false;
const DEPLOY_ALL = true; /*process.env.DEPLOY_ALL;*/
const DEPLOY_ACCESSORIES_SALE = false; /*process.env.DEPLOY_ACCESSORIES_SALE || DEPLOY_ALL;*/
const DEPLOY_ACCESSORIES = false /*process.env.DEPLOY_ACCESSORIES || DEPLOY_ACCESSORIES_SALE || DEPLOY_ALL;*/
const DEPLOY_SOUL_FRAGMENTS_SALE = true; /*process.env.DEPLOY_SOUL_FRAGMENTS_SALE || DEPLOY_ALL;*/
// Note that we will default to this unless DEPLOY_ACCESSORIES is set.
// This is to keep the historical behavior of this migration.
const DEPLOY_SOUL_FRAGMENTS = true; /*process.env.DEPLOY_SOUL_FRAGMENTS || DEPLOY_SOUL_FRAGMENTS_SALE || DEPLOY_ALL || (! DEPLOY_ACCESSORIES);*/

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  if (DEPLOY_SOUL_FRAGMENTS) {
    await deployer.deploy(SoulFragment, proxyRegistryAddress, {gas: 5000000});
  }

  if (DEPLOY_SOUL_FRAGMENTS_SALE) {
    await deployer.deploy(SoulFragmentFactory, proxyRegistryAddress, SoulFragment.address, {gas: 7000000});
    const soulFrag = await SoulFragment.deployed();
    await soulFrag.transferOwnership(SoulFragmentFactory.address);
  }

  // if (DEPLOY_ACCESSORIES) {
  //   await deployer.deploy(
  //     SoulFragmentAccessory,
  //     proxyRegistryAddress,
  //     { gas: 5000000 }
  //   );
  //   const accessories = await SoulFragmentAccessory.deployed();
  //   await setupSoulFragmentAccessories.setupAccessory(
  //     accessories,
  //     addresses[0]
  //   );
  // }

  // if (DEPLOY_ACCESSORIES_SALE) {
  //   await deployer.deploy(LootBoxRandomness);
  //   await deployer.link(LootBoxRandomness, SoulFragmentAccessoryLootBox);
  //   await deployer.deploy(
  //     SoulFragmentAccessoryLootBox,
  //     proxyRegistryAddress,
  //     { gas: 6721975 }
  //   );
  //   const lootBox = await SoulFragmentAccessoryLootBox.deployed();
  //   await deployer.deploy(
  //     SoulFragmentAccessoryFactory,
  //     proxyRegistryAddress,
  //     SoulFragmentAccessory.address,
  //     SoulFragmentAccessoryLootBox.address,
  //     { gas: 5000000 }
  //   );
  //   const accessories = await SoulFragmentAccessory.deployed();
  //   const factory = await SoulFragmentAccessoryFactory.deployed();
  //   await accessories.setApprovalForAll(
  //     addresses[0],
  //     SoulFragmentAccessoryFactory.address
  //   );
  //   await accessories.transferOwnership(
  //     SoulFragmentAccessoryFactory.address
  //   );
  //   await setupSoulFragmentAccessories.setupAccessoryLootBox(lootBox, factory);
  //   await lootBox.transferOwnership(factory.address);
  // }
};