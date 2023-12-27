import MapaInteractivo from "./MapaInteractivo";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MapaInteractivo />} />
    </Routes>
  );
}

export default App;
