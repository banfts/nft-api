import { verifyAddress } from '../services/banano.js';
import { findMintedNftsByOwnerAddress } from '../services/nft.js';

export async function getAccountAssetsByAccountAddress(req, res, next) {
  try {
    const address = req.params.address;
    const isAddressValid = verifyAddress(address, true);

    if (!isAddressValid.valid) {
      return res.status(200).json({
        success: false,
        message: isAddressValid.message,
      });
    }

    const nfts = await findMintedNftsByOwnerAddress(address);

    return res.status(200).json({
      success: true,
      account: {
        address: address,
        assets: nfts ?? [],
      },
    });
  } catch (error) {
    return next(error);
  }
}
