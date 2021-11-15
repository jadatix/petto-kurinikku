import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const LinkItem = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a className="lg:inline-flex color-text lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center hover:bg-pink-600 hover:text-white">
        {children}
      </a>
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
      <nav className="flex items-center flex-wrap section p-3">
        <button
          className="inline-flex p-3 hover:bg-pink-600 rounded lg:hidden color-text ml-auto hover:text-white outline-none"
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
        <button className="lg:hidden rounded color-text" onClick={switchTheme}>
          {theme === "dark" ? (
            <i className="fas fa-sun pointer-events-none color-text"></i>
          ) : (
            <i className="fas fa-moon pointer-events-none color-text"></i>
          )}
        </button>

        <div
          className={`${
            active ? "" : "hidden"
          } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <LinkItem href="/">Головна</LinkItem>
            <LinkItem href="/services">Сервіси</LinkItem>
            <LinkItem href="/doctors">Лікарі</LinkItem>
            <LinkItem href="/contact">Записатися</LinkItem>
            <button
              className={`${
                active ? "hidden" : ""
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
