import { AuthLoader } from "./components/AuthLoader";
import { Header } from "./components/Header";
import { useDarkMode } from "./hooks/useDarkMode";
import { MainRouter } from "./router/MainRouter";

function App() {
  useDarkMode();
  return (
    <AuthLoader>
      <>
        <Header />
        <MainRouter />
      </>
    </AuthLoader>
  );
}

export default App;
