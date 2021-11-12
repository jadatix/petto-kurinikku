import Link from "next/link";
import { useState } from "react";

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

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex items-center flex-wrap section p-3">
        <div className="hidden w-full lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <LinkItem href="/">Головна</LinkItem>
            <LinkItem href="/services">Сервіси</LinkItem>
            <LinkItem href="/doctors">Лікарі</LinkItem>
            <LinkItem href="/contact">Записатися</LinkItem>
          </div>
        </div>
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
