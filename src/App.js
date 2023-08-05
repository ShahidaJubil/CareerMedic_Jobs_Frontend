import "./App.css";
import Navigate from "./Navigation/Navigate";
import { AuthProvider } from "./Context/AuthProvide";
import { SearchProvider } from "./Context/SearchContext";
import { ProfileSearchProvider } from "./Context/profileSearchContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SearchProvider>
        <ProfileSearchProvider>
          <Navigate />
          </ProfileSearchProvider>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
