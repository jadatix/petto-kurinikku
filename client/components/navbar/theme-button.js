const ThemeButton = ({ tailwindClasses, switchTheme, theme }) => {
  return (
    <>
      <button className={tailwindClasses} onClick={switchTheme}>
        {theme === "dark" ? (
          <i className="fas fa-sun pointer-events-none color-text"></i>
        ) : (
          <i className="fas fa-moon pointer-events-none color-text"></i>
        )}
      </button>
    </>
  )
}

export default ThemeButton