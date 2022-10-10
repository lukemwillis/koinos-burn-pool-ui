import { ExternalLinkIcon } from "@chakra-ui/icons";

interface OutboundLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function OutboundLink({ href, children }: OutboundLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "underline" }}
    >
      {children}
      <ExternalLinkIcon paddingBottom="0.2em" />
    </a>
  );
}
