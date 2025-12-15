import { navLinks } from "../../constants";

const Header = () => {
  return (
    <header>
      <nav>
        <img src="./logo.svg" alt="Apple logo" />
        <ul>
          {navLinks.map(
            (item, index) => (
              <li key={index}>
                <a href={item}>{item}</a>
              </li>
            )
          )}
        </ul>
        <div className="flex-center gap-3">
          <button type="button">
            <img src="./search.svg" alt="Search"/>
          </button>
          <button type="button">
            <img src="./cart.svg" alt="Cart"/>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
