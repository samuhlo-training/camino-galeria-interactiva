/**
 * Configuración del mapa de Leaflet
 * Incluye tiles, estilos de ruta, y configuración inicial del mapa
 */

// Configuración de tiles de OpenStreetMap
export const tileLayerConfig = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
  minZoom: 3,
};

// Estilos de la ruta del Camino
export const routeStyle = {
  color: '#F59E0B', // Amber 500
  weight: 4,
  opacity: 0.8,
  smoothFactor: 1,
};

// Configuración del mapa inicial
export const mapConfig = {
  // Zoom inicial (se ajustará automáticamente con fitBounds)
  zoom: 12,
  
  // Opciones del mapa
  zoomControl: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  dragging: true,
  
  // Padding para fitBounds (espacio alrededor de la ruta)
  fitBoundsPadding: [50, 50],
};

// Configuración de los marcadores personalizados
export const markerConfig = {
  // Tamaño del icono
  iconSize: [24, 24],
  iconAnchor: [12, 12], // Centro del icono
  
  // Clases CSS (definidas en map.css)
  className: 'custom-div-icon',
  
  // Colores
  backgroundColor: '#FBBF24', // Amber 400
  hoverBackgroundColor: '#F59E0B', // Amber 500
  borderColor: '#ffffff',
  textColor: '#ffffff',
};

// Límites del Camino (bounds) - Se calculan dinámicamente desde photoPoints
// Coordenadas aproximadas del área del Camino de Santiago (Sarria - Palas de Rei)
export const defaultBounds = [
  [42.808, -7.912],  // Suroeste (punto más bajo y más al oeste)
  [43.0294, -7.4189] // Noreste (punto más alto y más al este)
];

// Función helper para calcular bounds desde los puntos
export const calculateBounds = (points) => {
  if (!points || points.length === 0) {
    return defaultBounds;
  }

  const lats = points.map(p => p.lat);
  const lons = points.map(p => p.lon);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  return [
    [minLat, minLon], // Suroeste
    [maxLat, maxLon]  // Noreste
  ];
};

// Función helper para crear coordenadas de polyline desde los puntos
export const createRouteCoordinates = (points) => {
  if (!points || points.length === 0) {
    return [];
  }

  // Excluir el último punto (hospital) de la ruta principal
  const routePoints = points.slice(0, -1);
  
  return routePoints.map(point => [point.lat, point.lon]);
};

// Configuración del modal (para referencia)
export const modalConfig = {
  animationDuration: 300, // ms
  overlayOpacity: 0.7,
};

export default {
  tileLayerConfig,
  routeStyle,
  mapConfig,
  markerConfig,
  defaultBounds,
  calculateBounds,
  createRouteCoordinates,
  modalConfig,
};
