import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { exampleData } from "./utils";

export default function MapaInteractivo() {
  const [dataColectivos, setDataColectivos] = useState([]);
  const [lineaColectivo, setLineaColectivo] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [filtros, setFiltros] = useState({
    lineas: null,
    latitud: null,
    longitud: null,
  });
  const posicion = [-34.61, -58.45]; // Coordenadas de la ciudad de Buenos Aires
  const requestURL = `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timerId = setTimeout(() => controller.abort(), 10000);

    fetch(requestURL, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta");
        }
        return response.json();
      })
      .then((data) => setDataColectivos(data))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.error("La operación fetch ha sido abortada:", error);
        } else {
          console.error("Ha habido un problema con tu operación fetch:", error);
          setDataColectivos(exampleData); // Hay un problema con el CORS de la API por lo que decido usar datos de ejemplo
        }
      })
      .finally(() => clearTimeout(timerId));
  }, []);

  return (
    <div className="h-screen">
      <main className="h-full flex flex-col">
        <div className="flex flex-col fixed top-6 left-16 z-10 gap-4">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={lineaColectivo}
              onChange={(e) => setLineaColectivo(e.target.value)}
              placeholder="Ingrese la línea de colectivo"
              className="p-1 rounded-md outline-none border border-gray-400 w-[205px]"
            />
            <input
              type="text"
              placeholder="Latitud"
              value={latitud}
              onChange={(e) => setLatitud(e.target.value)}
              className="outline-none p-1 w-24 rounded-md border border-gray-400"
            />
            <input
              type="text"
              placeholder="Longitud"
              value={longitud}
              onChange={(e) => setLongitud(e.target.value)}
              className="outline-none p-1 w-24 rounded-md border border-gray-400"
            />
            <button
              onClick={() => {
                setFiltros({
                  lineas: lineaColectivo,
                  latitud: Number(latitud),
                  longitud: Number(longitud),
                });
                setLineaColectivo("");
                setLatitud("");
                setLongitud("");
              }}
              className="px-2 py-1.5 rounded-lg transition-transform bg-yellow-400 active:scale-95"
            >
              Filtrar
            </button>
            <button
              onClick={() => {
                setLineaColectivo("");
                setLatitud("");
                setLongitud("");
                setFiltros({ linea: null, latitud: null, longitud: null });
              }}
              className="px-2 py-1.5 rounded-lg bg-sky-400 transition-transform active:scale-95"
            >
              Reestablecer filtros
            </button>
          </div>
          <div className="flex gap-5 items-center">
            <AnimatePresence>
              {filtros.lineas && (
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-2 items-center bg-blue-500 p-1.5 font-medium text-sm rounded-lg text-white"
                >
                  Linea: {filtros.lineas}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setFiltros((prevFiltros) => ({
                        ...prevFiltros,
                        lineas: null,
                      }))
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {filtros.latitud && (
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-2 items-center bg-blue-500 p-1.5 font-medium text-sm rounded-lg text-white"
                >
                  Latitud: {filtros.latitud}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setFiltros((prevFiltros) => ({
                        ...prevFiltros,
                        latitud: null,
                      }))
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {filtros.longitud && (
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-2 items-center bg-blue-500 p-1.5 font-medium text-sm rounded-lg text-white"
                >
                  Longitud: {filtros.longitud}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setFiltros((prevFiltros) => ({
                        ...prevFiltros,
                        longitud: null,
                      }))
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <MapContainer center={posicion} zoom={12} className="h-full w-full z-0">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {dataColectivos
            .filter((colectivo) => {
              const coincideLinea =
                !filtros.lineas ||
                colectivo.route_short_name.startsWith(filtros.lineas);

              const dentroDistancia =
                !filtros.latitud ||
                !filtros.longitud ||
                calcularDistanciaEntreCoordenadas(
                  [colectivo.latitude, colectivo.longitude],
                  [filtros.latitud, filtros.longitud]
                ) <= 1; // Devuelve true si la distancia entre la coordenada ingresada y la del colectivo es menor o igual a 1 km.

              return coincideLinea && dentroDistancia;
            })
            .map((colectivo) => (
              <Marker
                key={colectivo.id}
                position={[colectivo.latitude, colectivo.longitude]}
                icon={colectivoIcon}
              >
                <Popup>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm">
                      Linea: {colectivo.route_short_name}
                    </span>
                    <span>
                      {Math.floor(
                        (Date.now() - colectivo.timestamp * 1000) / 60000
                      )}{" "}
                      minutos atrás
                    </span>
                    <span>{colectivo.trip_headsign}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          {filtros.latitud &&
            filtros.longitud &&
            filtros.latitud !== 0 &&
            filtros.longitud !== 0 && (
              <Circle
                center={[filtros.latitud, filtros.longitud]}
                radius={1000}
              /> // Dibujar un círculo de 1 km de radio alrededor de la coordenada ingresada
            )}
        </MapContainer>
      </main>
    </div>
  );
}

function calcularDistanciaEntreCoordenadas(coord1, coord2) {
  const R = 6371; // Radio de la Tierra
  const dLat = deg2rad(coord2[0] - coord1[0]);
  const dLon = deg2rad(coord2[1] - coord1[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1[0])) *
      Math.cos(deg2rad(coord2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en KM
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const colectivoIcon = new Icon({
  iconUrl: process.env.PUBLIC_URL + "/colectivo.png",
  iconSize: [41, 41],
  iconAnchor: [20, 35],
});
