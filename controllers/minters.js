import { verifyAddress } from '../services/banano.js';

import { findAllMinters, findMinterByAddress, findNftsByMinterAddress } from '../services/minters.js';

export async function getAllMinters(req, res, next) {
  try {
    const allMinters = await findAllMinters();

    return res.status(200).json({
      success: true,
      minters: allMinters,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getMinterByAddress(req, res, next) {
  try {
    const minterAddress = req.params.minterAddress;
    const isAddressValid = verifyAddress(minterAddress, true);

    if (!isAddressValid.valid) {
      return res.status(200).json({
        success: false,
        message: isAddressValid.message,
      });
    }

    const minter = await findMinterByAddress(minterAddress);

    if (!minter) {
      return res.status(200).json({
        success: false,
        message: 'No minter with that address found',
      });
    }

    return res.status(200).json({
      success: true,
      minters: {
        address: minterAddress,
        minter: minter,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAssetsSupplyByMinterAddress(req, res, next) {
  try {
    const minterAddress = req.params.minterAddress;
    const isAddressValid = verifyAddress(minterAddress, true);

    if (!isAddressValid.valid) {
      return res.status(200).json({
        success: false,
        message: isAddressValid.message,
      });
    }
    const nfts = await findNftsByMinterAddress(minterAddress);

    if (nfts.length === 0) {
      return res.status(200).json({
        success: true,
        minters: {
          address: minterAddress,
          supply: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      minters: {
        address: minterAddress,
        supply: nfts,
      },
    });
  } catch (error) {
    return next(error);
  }
}
