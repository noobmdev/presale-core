import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import { ADDRESS_ZERO, PRE_SALE_ADDRESS } from "../constants";
import PreSaleABI from "../abis/PreSale.json";
import { Web3Provider } from "@ethersproject/providers";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account: string | undefined = undefined
) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account: string | undefined = undefined
): Contract {
  if (!isAddress(address) || address.toString() === ADDRESS_ZERO) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  if (!library) throw Error("No provider or signer");

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export async function callContract(
  contract: Contract,
  method: string,
  args: any[],
  overrides = {}
) {
  try {
    const tx = await contract[method](...args, {
      ...overrides,
    });
    if (typeof tx.wait !== "function") return tx;
    if (!tx) throw new Error("cannot create transaction");
    const res = await tx.wait();
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getPreSaleContract(
  library: Web3Provider,
  account: string | undefined = undefined
): Contract {
  return getContract(PRE_SALE_ADDRESS, PreSaleABI, library, account);
}
