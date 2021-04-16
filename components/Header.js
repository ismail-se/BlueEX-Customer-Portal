import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ClearIcon from "@material-ui/icons/Clear";
import { useState, useEffect } from "react";
import { Drawer } from "@material-ui/core";
import SidebarInner from "./SidebarInner";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

const Header = () => {
  const [{ name }, dispatch] = useStateValue();
  const [state, setState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <div
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex flex-row-reverse pt-2 pr-2">
        <ClearIcon
          className="cursor-pointer"
          onClick={toggleDrawer(anchor, false)}
        />
      </div>
      <SidebarInner />
    </div>
  );

  return (
    <header className="bg-white shadow-md py-[0.5rem] px-[2rem] fixed z-20 w-full">
      <div className="flex justify-between items-center h-11">
        <div className="flex items-center space-x-4">
          <div className="lg:hidden">
            <MenuIcon onClick={toggleDrawer("left", true)} />
          </div>
          <img src="/images/logoinner.svg" className="w-[120px] sm:w-[180px]" />
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-xs text-right hidden md:block">
            Do you need help? Please call us at: &nbsp;
            <span className="text-sm text-[#0047ba] font-semibold block lg:inline-block ">
              021-111-BLUE-EX (021-111-258339)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationsIcon className="text-gray-400 bell" />
            <ShareIcon className="text-gray-400" />
            <AccountCircleIcon className="text-gray-400" />
            <div className="hidden sm:block">
              HELLO <span className="font-bold uppercase">{name} !</span>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </header>
  );
};

export default Header;
