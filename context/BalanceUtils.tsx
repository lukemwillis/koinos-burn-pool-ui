import { Contract, Provider, utils } from "koilib";
import useSWR from "swr";
import { useContracts } from "./ContractsProvider";

export const useKoinBalance = (account: string) => {
  const { koin } = useContracts();
  return useSWR(`${account}_koin`, getTokenBalanceFetcher(account, koin));
};

export const useVhpBalance = (account: string) => {
  const { vhp } = useContracts();
  return useSWR(`${account}_vhp`, getTokenBalanceFetcher(account, vhp));
};

export const usePvhpBalance = (account: string) => {
  const { pvhp } = useContracts();
  return useSWR(`${account}_pvhp`, getTokenBalanceFetcher(account, pvhp));
};

export const usePoolBalance = (account: string) => {
  const { pool } = useContracts();
  return useSWR(`${account}_pool`, getPoolBalanceFetcher(account, pool));
};

export const useManaBalance = (account: string) => {
  const { provider } = useContracts();
  return useSWR(`${account}_mana`, getManaBalanceFetcher(account, provider));
};

const getPoolBalanceFetcher =
  (
    account: string | undefined,
    pool: Contract | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!account || !pool) return;

    try {
      const { result } = await pool!.functions.balance_of<{
        value: string;
      }>({
        account,
      });

      return result?.value || "0";
    } catch (e) {
      return "0";
    }
  };

const getTokenBalanceFetcher =
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

    return result?.value || "0";
  };

const getManaBalanceFetcher =
  (
    account: string | undefined,
    provider: Provider | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!account || !provider) return;

    const mana = await provider.getAccountRc(account);

    return mana || "0";
  };

export function asFloat(value: string): number {
  if (!value) return 0;
  return parseFloat(utils.formatUnits(value, 8));
}
