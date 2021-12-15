import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import Logo from "./logo";
import ThemeButton from "./navbar/theme-button";
import MenuButton from "./navbar/menu-button";
import Nav from "./navbar/nav";

const switchMount = (initialState) => {
  const [isActive, setActive] = useState(initialState)
  const [isMounted, setIsMounted] = useState(initialState)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const handleClick = useCallback(() => setActive(!isActive), [isActive])
  return [isActive, handleClick]
}

const Navbar = (props) => {
  const [isActive, handleClick] = switchMount(false)
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <nav className="flex items-center flex-wrap section pl-10 pr-10 p-2 bg-white">
        <Logo color={theme} />

        <div className="hidden md:block md:flex navbar">
          <Nav isActive={isActive} switchTheme={switchTheme} theme={theme} desktop={true} />
        </div>

        <MenuButton handleClick={handleClick} isActive={isActive} />

        <ThemeButton tailwindClasses={"lg:hidden hover:bg-purple-400 w-6 h-6 rounded color-text"} switchTheme={switchTheme} theme={theme} />

        <div className="md:hidden">
          <div className={`${isActive ? "" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
            <div className="navbar">
              <Nav handleClick={handleClick} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
