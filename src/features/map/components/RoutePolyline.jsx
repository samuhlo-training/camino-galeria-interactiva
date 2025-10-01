import { useEffect, useRef } from 'preact/hooks';
import L from 'leaflet';
import { routeStyle } from '../config/mapConfig';

/**
 * RoutePolyline - Componente para dibujar la línea de ruta del Camino
 * Conecta todos los puntos fotográficos con una línea dorada
 * 
 * @param {Object} props
 * @param {Array} props.coordinates - Array de coordenadas [[lat, lon], [lat, lon], ...]
 * @param {Object} props.mapInstance - Instancia del mapa de Leaflet
 * @param {Object} props.style - Estilos personalizados para la línea (opcional)
 */
const RoutePolyline = ({ coordinates, mapInstance, style }) => {
  // Ref para mantener la referencia de la polyline
  const polylineRef = useRef(null);

  useEffect(() => {
    // Validar que tenemos mapa y coordenadas
    if (!mapInstance) {
      console.warn('RoutePolyline: Instancia del mapa no disponible');
      return;
    }

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
      console.warn('RoutePolyline: Coordenadas no válidas', coordinates);
      return;
    }

    // Validar que las coordenadas tienen el formato correcto
    const validCoordinates = coordinates.every(
      coord => Array.isArray(coord) && 
               coord.length === 2 && 
               typeof coord[0] === 'number' && 
               typeof coord[1] === 'number'
    );

    if (!validCoordinates) {
      console.error('RoutePolyline: Formato de coordenadas inválido', coordinates);
      return;
    }

    try {
      // Combinar estilos por defecto con estilos personalizados
      const polylineStyle = {
        ...routeStyle,
        ...style,
      };

      // Crear la polyline
      const polyline = L.polyline(coordinates, polylineStyle);

      // Agregar la polyline al mapa
      polyline.addTo(mapInstance);

      // Guardar referencia
      polylineRef.current = polyline;

      console.log(`RoutePolyline: Ruta creada con ${coordinates.length} puntos`);

      // Opcional: Agregar tooltip a la línea
      polyline.bindTooltip('Camino de Santiago: Sarria - Palas de Rei', {
        sticky: true, // El tooltip sigue al cursor
        className: 'route-tooltip',
        opacity: 0.9,
      });

      // Opcional: Evento click en la línea
      polyline.on('click', (e) => {
        console.log('RoutePolyline: Click en la ruta', e.latlng);
      });

    } catch (error) {
      console.error('RoutePolyline: Error al crear la ruta', error);
    }

    // Cleanup: remover la polyline al desmontar
    return () => {
      if (polylineRef.current && mapInstance) {
        try {
          mapInstance.removeLayer(polylineRef.current);
          polylineRef.current = null;
          console.log('RoutePolyline: Ruta removida');
        } catch (error) {
          console.error('RoutePolyline: Error al remover la ruta', error);
        }
      }
    };
  }, [mapInstance, coordinates, style]);

  // Este componente no renderiza nada en el DOM de React/Preact
  // La polyline se renderiza directamente en el mapa de Leaflet
  return null;
};

export default RoutePolyline;
