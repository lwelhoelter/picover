import React, { useState } from 'react';
import Layout from './Layout';
import Main from './Main';
import ThemeContext from '../contexts/ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');
  const value = { theme, setTheme };

  return (
    <div className="App">
      <ThemeContext.Provider value={value}>
        <Layout>
          <Main />
        </Layout>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
