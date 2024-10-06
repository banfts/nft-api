import { Router } from 'express';

import * as pingController from './controllers/ping.js';
import * as accountController from './controllers/account.js';
import * as assetsController from './controllers/assets.js';
import * as mintersController from './controllers/minters.js';

const router = Router();

const API_V1_PATH = "/api/v1";

router.get(`/`, pingController.getPing);

router.get(`${API_V1_PATH}/ping`, pingController.getPing);

// Get account assets by owner address
router.get(`${API_V1_PATH}/account/:address/assets`, accountController.getAccountAssetsByAccountAddress);

// Get asset by mint hash
router.get(`${API_V1_PATH}/assets/:mintHash`, assetsController.getAssetByMintHash);
// Get asset supply by supply hash
router.get(`${API_V1_PATH}/assets/supply/:supplyHash`, assetsController.getAssetSupplyByHash);
// Get assets by supply hash
router.get(`${API_V1_PATH}/assets/supply/:supplyHash/assets`, assetsController.getAssetsBySupplyHash);
router.get(`${API_V1_PATH}/assets/supply/:supplyHash/assets/count`, assetsController.countAssetsBySupplyHash);

// Get all known minters
router.get(`${API_V1_PATH}/minters`, mintersController.getAllMinters);
// Get minter data by address
router.get(`${API_V1_PATH}/minters/:minterAddress`, mintersController.getMinterByAddress);
// Get every asset supply for a minter address
router.get(`${API_V1_PATH}/minters/:minterAddress/supply`, mintersController.getAssetsSupplyByMinterAddress);

export const apiRouter = router;
