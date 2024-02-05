import Header from "./Header";
import NewsManager from "./NewsManager";
import UsernameContext from "./CONTEXTS/UsernameContext";
import { useState } from 'react';
import "./CSS/app.css";

function App() {
  const [currentUser, setCurrentUser] = useState({ username: 'jessjelly' });

  return (
    <>
      <UsernameContext.Provider value={{ currentUser, setCurrentUser }}>
        <div id="page-container">
          <Header />
          <NewsManager />
        </div>
      </UsernameContext.Provider>
    </>
  );
}

export default App;
