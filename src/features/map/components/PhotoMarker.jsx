import { useEffect, useRef } from 'preact/hooks';
import L from 'leaflet';
import { markerConfig } from '../config/mapConfig';

/**
 * PhotoMarker - Componente para renderizar un marcador individual en el mapa
 * Crea un marcador personalizado con número y evento click
 * 
 * @param {Object} props
 * @param {Object} props.point - Datos del punto fotográfico (id, lat, lon, etc.)
 * @param {Object} props.mapInstance - Instancia del mapa de Leaflet
 * @param {Function} props.onClick - Callback cuando se hace click en el marcador
 */
const PhotoMarker = ({ point, mapInstance, onClick }) => {
  // Ref para mantener la referencia del marcador
  const markerRef = useRef(null);

  useEffect(() => {
    // Validar que tenemos mapa y punto
    if (!mapInstance || !point) {
      console.warn('PhotoMarker: Mapa o punto no disponible', { point });
      return;
    }

    // Validar coordenadas
    if (typeof point.lat !== 'number' || typeof point.lon !== 'number') {
      console.error('PhotoMarker: Coordenadas inválidas', point);
      return;
    }

    try {
      // Crear el HTML del icono personalizado con el número
      const iconHtml = `<span>${point.id}</span>`;

      // Crear el divIcon personalizado
      const customIcon = L.divIcon({
        html: iconHtml,
        className: markerConfig.className,
        iconSize: markerConfig.iconSize,
        iconAnchor: markerConfig.iconAnchor,
      });

      // Crear el marcador
      const marker = L.marker([point.lat, point.lon], {
        icon: customIcon,
        title: point.title || `Punto ${point.id}`,
        alt: point.title || `Foto ${point.id}`,
        riseOnHover: true, // Eleva el marcador al hacer hover
      });

      // Agregar evento click
      if (onClick && typeof onClick === 'function') {
        marker.on('click', () => {
          onClick(point);
          console.log('PhotoMarker: Click en punto', point.id);
        });
      }

      // Agregar tooltip opcional (se muestra al hacer hover)
      if (point.title) {
        marker.bindTooltip(point.title, {
          direction: 'top',
          offset: [0, -10],
          opacity: 0.9,
          className: 'custom-tooltip',
        });
      }

      // Agregar el marcador al mapa
      marker.addTo(mapInstance);

      // Guardar referencia del marcador
      markerRef.current = marker;

      console.log(`PhotoMarker: Marcador ${point.id} creado en [${point.lat}, ${point.lon}]`);
    } catch (error) {
      console.error('PhotoMarker: Error al crear marcador', error, point);
    }

    // Cleanup: remover el marcador al desmontar
    return () => {
      if (markerRef.current && mapInstance) {
        try {
          mapInstance.removeLayer(markerRef.current);
          markerRef.current = null;
          console.log(`PhotoMarker: Marcador ${point.id} removido`);
        } catch (error) {
          console.error('PhotoMarker: Error al remover marcador', error);
        }
      }
    };
  }, [mapInstance, point, onClick]);

  // Este componente no renderiza nada en el DOM de React/Preact
  // El marcador se renderiza directamente en el mapa de Leaflet
  return null;
};

export default PhotoMarker;
