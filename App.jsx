import ToastProvider from "./toast/ToastProvider";
import { Home } from "./Home";
import "./App.css";

function App() {
    return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}

export default App;
