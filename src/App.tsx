import { Routes, Route } from "react-router-dom";
import OrderRouteMainMap from "./pages/OrderRouteMainMap";
import OrderRoutePreviewMap from "./pages/OrderRoutePreviewMap";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={OrderRoutePreviewMap} />
        <Route path="/orderMainMap" Component={OrderRouteMainMap} />
      </Routes>
    </div>
  );
}

export default App;
