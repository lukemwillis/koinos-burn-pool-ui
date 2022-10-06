import { SWRConfig } from "swr";

export const SwrProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <SWRConfig value={{ refreshInterval: 5000 }}>{children}</SWRConfig>;
};
