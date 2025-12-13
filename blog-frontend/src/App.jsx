import ThemeToggle from "./components/ThemeToggle";
import List from "./components/List";

const App = () => {
  return (
    <>
      {/* Global Theme Toggle */}
      <div className="d-flex justify-content-end p-3">
        <ThemeToggle />
      </div>

      <List />
    </>
  );
};

export default App;
