import { nftDb } from '../database.js';

const minters = nftDb.collection('minters');
const info = nftDb.collection('info');

export async function findAllMinters() {
  const allMinters = await minters.find({}, { projection: { _id: 0 } });
  return allMinters.toArray();
}

export async function findMinterByAddress(minterAddress) {
  const minter = await minters.findOne({ address: minterAddress }, { projection: { _id: 0 } });
  return minter;
}

export async function findNftsByMinterAddress(minterAddress) {
  const nfts = info.find({ minter_address: minterAddress }, { projection: { _id: 0 } });
  return nfts.toArray();
}
