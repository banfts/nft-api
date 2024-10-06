import { MongoClient } from 'mongodb';

import { DATABASE_CRAWLER_URI } from './config.js';

const crawler_client = new MongoClient(DATABASE_CRAWLER_URI);

let crawler_connection = await crawler_client.connect();

export const nftDb = crawler_connection.db('crawler');

