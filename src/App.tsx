import { useEffect } from "react";
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import MapMenus from "@trimblemaps/trimblemaps-mapmenus";

function App() {
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TRIMBLE_MAPS;
    if (!API_KEY) return;

    TrimbleMaps.APIKey = API_KEY;
    const map = new TrimbleMaps.Map({
      container: "map",
      style: TrimbleMaps.Common.Style.TRANSPORTATION,
      center: new TrimbleMaps.LngLat(-74.566234, 40.49944),
      zoom: 8,
    });
    const myRoute = new TrimbleMaps.Route({
      routeId: "myRoute1s",
      showStops: true,
      stops: [
        new TrimbleMaps.LngLat(-74.629749, 40.26118),
        new TrimbleMaps.LngLat(-72.566234, 40.89944),
        new TrimbleMaps.LngLat(-74.566234, 40.49944),
        new TrimbleMaps.LngLat(-74.566234, 40.33944),
      ],
    });
    map.on("load", function () {
      myRoute.addTo(map);
    });
  }, []);
  return (
    <div className="App">
      <div id="map"></div>
    </div>
  );
}

export default App;
