import { Coords } from "./types";

export const getCenterOfCoords = (coords: Coords[]): Coords => {
  const temp: Coords = [0, 0]
  for (let i = 0; i < coords.length; i++) {
    temp[0] += coords[i][0]
    temp[1] += coords[i][1]
  }

  temp[0] /= coords.length
  temp[1] /= coords.length

  return temp
}