import LinkItem from "./link-item"
import ThemeButton from "./theme-button.js"

const Nav = ({ isActive, handleClick, switchTheme, theme, desktop }) => {
  return (
    <>
      <LinkItem href="/" onClick={handleClick}>
        Головна
      </LinkItem>
      <LinkItem href="/services" onClick={handleClick}>
        Сервіси
      </LinkItem>
      <LinkItem href="/doctors" onClick={handleClick}>
        Лікарі
      </LinkItem>
      <LinkItem href="/contact" onClick={handleClick}>
        Записатися
      </LinkItem>
      {desktop
        ? <ThemeButton tailwindClasses={`${isActive ? "hidden" : ""} rounded color-text justify-center`} switchTheme={switchTheme} theme={theme} />
        : <></>
      }
    </>
  )
}

export default Nav