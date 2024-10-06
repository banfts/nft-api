import * as bananojs from '@bananocoin/bananojs';
import { bananoIpfs } from 'banano-nft-crawler/dist/lib/banano-ipfs.js';

export function verifyAddress(address, verbose = false) {
  const verifiedAddress = bananojs.BananoUtil.getBananoAccountValidationInfo(address);
  return verbose === true ? verifiedAddress : verifiedAddress.valid;
}

export function mintHashToAssetRep(mintHash) {
  return bananoIpfs.publicKeyToAccount(mintHash);
}
