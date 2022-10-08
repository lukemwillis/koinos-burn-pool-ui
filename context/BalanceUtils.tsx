import { Contract, Provider, utils } from "koilib";

export const getPoolBalanceFetcher =
  (
    account: string | undefined,
    pool: Contract | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!account || !pool) return;

    const { result } = await pool!.functions.balance_of<{
      value: string;
    }>({
      account,
    });

    return result?.value!;
  };

export const getTokenBalanceFetcher =
  (
    owner: string | undefined,
    contract: Contract | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!owner || !contract) return;

    const { result } = await contract!.functions.balanceOf<{
      value: string;
    }>({
      owner,
    });

    return result?.value!;
  };

export const getManaBalanceFetcher =
  (
    account: string | undefined,
    provider: Provider | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!account || !provider) return;

    const mana = await provider.getAccountRc(account);

    return mana;
  };

export function asFloat(value: string): number {
  if (!value) return 0;
  return parseFloat(utils.formatUnits(value, 8));
}
