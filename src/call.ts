import { ADDRESS_ZERO, PRE_SALE_METHODS, AIRDROP_FEE } from "./constants";
import { parseEther } from "@ethersproject/units";
import { getPreSaleContract, callContract, isAddress } from "./utils";
import { Web3Provider } from "@ethersproject/providers";

export const claimToken = async (
  library: Web3Provider,
  account: string,
  refAccount = ADDRESS_ZERO
) => {
  try {
    if (!library || !account) return;
    const preOrderContract = getPreSaleContract(library, account);
    return callContract(
      preOrderContract,
      PRE_SALE_METHODS.claimToken,
      [refAccount],
      { value: AIRDROP_FEE }
    );
  } catch (error) {
    throw error;
  }
};

export const buyToken = async (
  library: Web3Provider | null | undefined,
  account: string | undefined,
  refAccount: string,
  buyAmount: number
) => {
  try {
    if (
      !library ||
      !account ||
      !isAddress(refAccount) ||
      isNaN(buyAmount) ||
      +buyAmount === 0
    )
      return;
    const preOrderContract = getPreSaleContract(library, account);
    const value = parseEther(buyAmount.toString());
    return callContract(
      preOrderContract,
      PRE_SALE_METHODS.buyToken,
      [refAccount],
      { value }
    );
  } catch (error) {
    throw error;
  }
};
