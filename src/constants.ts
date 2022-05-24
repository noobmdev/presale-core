if (!process.env.REACT_APP_CHAIN_ID) throw Error("ChainID is required");
if (!process.env.REACT_APP_RPC_NODE) throw Error("RPC node URL is required");
if (!process.env.REACT_APP_PRE_SALE_ADDRESS)
  throw Error("PreSale address is required");
if (!process.env.REACT_APP_URL) throw Error("App URL is required");
if (!process.env.REACT_APP_AIRDROP_FEE) throw Error("Airdrop fee is required");

export const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
export const RPC_NODE = process.env.REACT_APP_RPC_NODE;

export const PRE_SALE_ADDRESS = process.env.REACT_APP_PRE_SALE_ADDRESS;
export const AIRDROP_FEE = process.env.REACT_APP_AIRDROP_FEE;

export const APP_URL = process.env.REACT_APP_URL;

export const PRE_SALE_METHODS = {
  claimToken: "airdrop",
  buyToken: "buy",
};

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
