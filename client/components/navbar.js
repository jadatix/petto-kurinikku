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
      <nav className="flex items-center flex-wrap pl-10 pr-10 p-2 border-b border-gray-900/10 lg:px-8 lg:border-0 dark:border-gray-300/10">
        <Logo color={theme} />

        <div className="hidden lg:block lg:flex navbar">
          <Nav isActive={isActive} switchTheme={switchTheme} theme={theme} desktop={true} />
        </div>

        <MenuButton handleClick={handleClick} isActive={isActive} />

        <ThemeButton tailwindClasses={"lg:hidden w-6 h-6 rounded color-text"} switchTheme={switchTheme} theme={theme} />

        <div className="lg:hidden">
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
