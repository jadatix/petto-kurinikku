import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from './logo'

const LinkItem = ({ href, children }) => {
  return (
    <Link href={href}>
      <div className="lg:inline-flex color-text lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-purple-400 hover:text-white">{children}</div>
    </Link>
  );
};

const Navbar = (props) => {
  const [active, setActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <nav className="flex items-center flex-wrap section pl-10 pr-10 p-2 bg-white">
          <Logo src={
            theme === "light"
              ? "/footprint.png"
              : "/footprint-dark.png"
          } />

          <button
            className="inline-flex p-3 hover:bg-purple-400 rounded lg:hidden color-text ml-auto hover:text-white outline-none"
            onClick={handleClick}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button className="lg:hidden hover:bg-purple-400 w-6 h-6 rounded color-text" onClick={switchTheme}>
            {theme === "dark" ? (
              <i className="fas fa-sun pointer-events-none color-text"></i>
            ) : (
              <i className="fas fa-moon pointer-events-none color-text"></i>
            )}
          </button>
        <div
          className={`${active ? "" : "hidden"
            } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <LinkItem href="/">
              <a onClick={handleClick}>
                Головна
              </a>
            </LinkItem>
            <LinkItem href="/services">
              <a onClick={handleClick}>
                Сервіси
              </a>
            </LinkItem>
            <LinkItem href="/doctors">
              <a onClick={handleClick}>
                Лікарі
              </a>
            </LinkItem>
            <LinkItem href="/contact">
              <a onClick={handleClick}>
                Записатися
              </a>
            </LinkItem>
            <button
              className={`${active ? "hidden" : ""
                } rounded color-text justify-center"`}
              onClick={switchTheme}
            >
              {theme === "dark" ? (
                <i className="fas fa-sun pointer-events-none color-text"></i>
              ) : (
                <i className="fas fa-moon pointer-events-none color-text"></i>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
