import { nftDb } from '../database.js';

const info = nftDb.collection('info');
const ownership = nftDb.collection('ownership');

export async function findMintedNftsByOwnerAddress(address) {
  const mintedNfts = await ownership.find({ owner: address }, { projection: { _id: 0 } });
  return mintedNfts.toArray();
}

export async function findMintedNftByHash(mintHash) {
  const mintNft = await ownership.findOne({ mint_hash: mintHash }, { projection: { _id: 0 } });
  return mintNft;
}

export async function findSupplyNftByHash(supplyHash) {
  const supplyNft = await info.findOne({ supply_hash: supplyHash }, { projection: { _id: 0 } });
  return supplyNft;
}

export async function findMintedNftsBySupplyHash(supplyHash, pageNum, perPage) {
  const mintedNfts = await ownership
    .find({ supply_hash: supplyHash }, { projection: { _id: 0 } })
    .skip((pageNum - 1) * perPage)
    .limit(perPage);
  return mintedNfts.toArray();
}

export async function countMintedNftsBySupplyHash(supplyHash) {
  return await ownership.countDocuments({ supply_hash: supplyHash });
}

