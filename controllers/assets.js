import { findMintedNftByHash, findSupplyNftByHash, findMintedNftsBySupplyHash, countMintedNftsBySupplyHash } from '../services/nft.js';
import { mintHashToAssetRep } from '../services/banano.js';

import { validateHexHash } from '../utils/hash.js';

export async function getAssetByMintHash(req, res, next) {
  try {
    const mintHash = req.params.mintHash;

    if (!validateHexHash(mintHash)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid mint hash',
      });
    }

    const mintedAsset = await findMintedNftByHash(mintHash);

    if (!mintedAsset) {
      return res.status(200).json({
        success: false,
        message: 'The requested asset does not exist or has not been cached',
      });
    }

    return res.status(200).json({
      success: true,
      assets: {
        mintHash: mintHash,
        assetRep: mintHashToAssetRep(mintHash),
        asset: mintedAsset,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAssetSupplyByHash(req, res, next) {
  try {
    const supplyHash = req.params.supplyHash;

    if (!validateHexHash(supplyHash)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid supply hash',
      });
    }

    const assetSupply = await findSupplyNftByHash(supplyHash);

    if (!assetSupply) {
      return res.status(200).json({
        success: false,
        message: 'The requested asset supply does not exist or has not been cached',
      });
    }

    return res.status(200).json({
      success: true,
      assets: {
        supply_hash: supplyHash,
        asset_supply: assetSupply,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAssetsBySupplyHash(req, res, next) {
  try {
    const supplyHash = req.params.supplyHash;
    const pageNumQuery = parseInt(req.query.page_num, 10);
    const perPageQuery = parseInt(req.query.per_page, 10);

    if (!validateHexHash(supplyHash)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid supply hash',
      });
    }

    const pageNum = !Number.isNaN(pageNumQuery) && pageNumQuery > 0 ? pageNumQuery : 1;
    const perPage = !Number.isNaN(perPageQuery) && perPageQuery > 0 && perPageQuery <= 100 ? perPageQuery : 100;

    const mintedAssets = await findMintedNftsBySupplyHash(supplyHash, pageNum, perPage);

    return res.status(200).json({
      success: true,
      assets: {
        supply_hash: supplyHash,
        minted: mintedAssets,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function countAssetsBySupplyHash(req, res, next) {
  try {
    const supplyHash = req.params.supplyHash;

    if (!validateHexHash(supplyHash)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid supply hash',
      });
    }

    const mintedAssetsCount = await countMintedNftsBySupplyHash(supplyHash);

    return res.status(200).json({
      success: true,
      count: mintedAssetsCount,
    });
  } catch (error) {
    return next(error);
  }
}
