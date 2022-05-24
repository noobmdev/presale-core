export const formatAddress = (account: string | undefined): string => {
  if (!account) return "";
  if (account.length < 10) return account;
  const k = account.length;
  return `${account.slice(0, 5)}...${account.slice(k - 5, k)}`;
};
