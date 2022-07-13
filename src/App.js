import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DishList from "./page/DishList";
import Statistical from "./page/Statistical";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DishList />}/>
        <Route path="/statistical" element={<Statistical />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
