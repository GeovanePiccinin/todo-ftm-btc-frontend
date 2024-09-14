import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
