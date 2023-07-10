import { useState, useEffect } from "react";
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import { useLocation } from "react-router-dom";
import { Coords } from "../../types";

const OrderRouteMainMap = () => {
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  let map: TrimbleMaps.Map;
  let route: TrimbleMaps.Route;
  const startLng = Number(params.get("startLng") || "!");
  const startLat = Number(params.get("startLat") || "!");
  const endLng = Number(params.get("endLng") || "!");
  const endLat = Number(params.get("endLat") || "!");

  const initMap = (): [TrimbleMaps.Map, TrimbleMaps.Route] | undefined => {

    if (!startLat || !startLng || !endLat || !endLng) {
      setIsError(true);
      return;
    }
    const stops: {start: Coords, end: Coords} = {
      start: [startLng, startLat],
      end: [endLng, endLat],
    };

    const API_KEY = process.env.REACT_APP_API_KEY;
    if (!API_KEY) return;

    TrimbleMaps.APIKey = API_KEY;
    const map = new TrimbleMaps.Map({
      container: "map",
      style: TrimbleMaps.Common.Style.TRANSPORTATION,
      center: new TrimbleMaps.LngLat(...stops.start),
      zoom: 20,
    });
    const myRoute = new TrimbleMaps.Route({
      routeId: "myRoute",
      showStops: true,
      stops: [
        new TrimbleMaps.LngLat(...stops.start),
        new TrimbleMaps.LngLat(...stops.end),
      ],
      showArrows: true,
    });
    map.on("load", function () {
      myRoute.addTo(map);
    });
    return [map, myRoute];
  };

  useEffect(() => {
    const res = initMap();
    if (res) {
      map = res[0];
      route = res[1];
    }
  }, []);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if(route && message.data) {
        const data = JSON.parse(message.data)
        if(data.longitude && data.latitude) {
          route.update({
            stops: [
              [data.longitude, data.latitude],
              [endLng, endLat]
            ]
          })
        }
      }
      // alert(message.data);
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (isError) return <div className="error">ERROR. PLEASE TRY AGAIN</div>;
  return <div id="map"></div>;
};

export default OrderRouteMainMap;
