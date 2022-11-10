import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  useColorMode,
  IconButton,
  Input,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  SettingsIcon,
  TriangleUpIcon,
  TriangleDownIcon,
  AddIcon,
} from "@chakra-ui/icons";
import {
  ExperienceMode,
  useExperienceMode,
} from "../context/ExperienceModeProvider";
import { useRpc } from "../context/RpcProvider";
import { ChangeEvent, useRef, useState } from "react";

export default function SettingsDrawer() {
  const { colorMode, setColorMode } = useColorMode();
  const { experienceMode, setExperienceMode } = useExperienceMode();
  const { rpc, setRpc } = useRpc();
  const [customRpcSelected, setCustomRpcSelected] = useState(
    !!rpc && !process.env.NEXT_PUBLIC_KOINOS_RPC_URL?.includes(rpc)
  );
  const [customRpc, setCustomRpc] = useState(customRpcSelected ? rpc! : "");
  const customRpcInput = useRef<HTMLInputElement>(null);

  const selectStandardRpc = (url: string) => {
    setCustomRpcSelected(false);
    setRpc(url);
  };

  const selectCustomRpc = () => {
    setCustomRpcSelected(true);
    setRpc(customRpc);
    customRpcInput.current?.focus();
  };

  const updateCustomRpc = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomRpc(e.target.value);
    setRpc(e.target.value);
  };

  return (
    <Menu closeOnSelect={false} placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Settings"
        icon={<SettingsIcon />}
        variant="outline"
      />
      <MenuList minWidth="240px" zIndex={2}>
        <MenuOptionGroup
          value={experienceMode}
          title="Layout"
          type="radio"
          onChange={(val) => setExperienceMode(val as ExperienceMode)}
        >
          <MenuItemOption value="basic" icon={<TriangleDownIcon />}>
            Basic
          </MenuItemOption>
          <MenuItemOption value="advanced" icon={<TriangleUpIcon />}>
            Advanced
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          value={colorMode}
          title="Theme"
          type="radio"
          onChange={setColorMode}
        >
          <MenuItemOption value="light" icon={<SunIcon />}>
            Light
          </MenuItemOption>
          <MenuItemOption value="dark" icon={<MoonIcon />}>
            Dark
          </MenuItemOption>
        </MenuOptionGroup>
        {experienceMode === "advanced" && (
          <>
            <MenuDivider />
            <MenuOptionGroup
              value={customRpcSelected ? "custom" : rpc}
              title="RPC Endpoint"
              type="radio"
            >
              {process.env.NEXT_PUBLIC_KOINOS_RPC_URL?.split(",").map((url) => (
                <MenuItemOption
                  key={url}
                  value={url}
                  onClick={() => selectStandardRpc(url)}
                >
                  {url}
                </MenuItemOption>
              ))}
              <MenuItemOption
                value="custom"
                icon={<AddIcon />}
                onClick={selectCustomRpc}
              >
                <Input
                  value={customRpc}
                  onChange={updateCustomRpc}
                  placeholder="https://..."
                  ref={customRpcInput}
                />
              </MenuItemOption>
            </MenuOptionGroup>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
