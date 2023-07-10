import { useState, useEffect } from "react";
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
import { useLocation } from 'react-router-dom'
import { getCenterOfCoords } from "../../utils";
import { Coords } from "../../types";

const OrderRoutePreviewMap = () => {
  const [isError, setIsError] = useState(false)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  
  useEffect(() => {
    const startLng = Number(params.get('startLng') || '!') 
    const startLat = Number(params.get('startLat') || '!') 
    const endLng = Number(params.get('endLng') || '!') 
    const endLat = Number(params.get('endLat') || '!') 

    if(!startLat || !startLng || !endLat || !endLng) {
      setIsError(true)
      return
    }
    const stops: Coords[] = [
      [startLng, startLat],
      [endLng, endLat],
    ]

    const API_KEY = process.env.REACT_APP_API_KEY;
    if (!API_KEY) return;

    TrimbleMaps.APIKey = API_KEY;
    const map = new TrimbleMaps.Map({
      container: "map",
      style: TrimbleMaps.Common.Style.TRANSPORTATION,
      center: new TrimbleMaps.LngLat(...getCenterOfCoords(stops)),
      zoom: 8,
    });
    const myRoute = new TrimbleMaps.Route({
      routeId: "myRoute",
      showStops: true,
      stops: stops.map(item => new TrimbleMaps.LngLat(item[0], item[1])),
    });
    map.on("load", function () {
      myRoute.addTo(map);
    });
  }, []);

  if(isError) return <div className="error">ERROR. PLEASE TRY AGAIN</div>
  return <div id="map"></div>;
};

export default OrderRoutePreviewMap;
