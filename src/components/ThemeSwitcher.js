import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import ThemeContext from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="button-theme"
    >
      <FontAwesomeIcon
        icon={theme === 'dark' ? faSun : faMoon}
        className="theme-icon"
        alt="theme"
      />
    </Button>
  );
}

export default ThemeSwitcher;
