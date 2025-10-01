import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { tileLayerConfig } from '../config/mapConfig';

/**
 * MapContainer - Componente base del mapa de Leaflet
 * Inicializa el mapa y proporciona la instancia a los componentes hijos
 * 
 * @param {Object} props
 * @param {Array} props.bounds - Límites del mapa [[lat, lon], [lat, lon]]
 * @param {Array} props.fitBoundsPadding - Padding para fitBounds [x, y]
 * @param {Function} props.onMapReady - Callback cuando el mapa está listo
 * @param {Object} props.children - Componentes hijos (marcadores, polylines, etc)
 */
const MapContainer = ({ 
  bounds, 
  fitBoundsPadding = [50, 50],
  onMapReady,
  children 
}) => {
  // Ref para el contenedor DOM del mapa
  const mapContainerRef = useRef(null);
  
  // Ref para la instancia del mapa de Leaflet
  const mapInstanceRef = useRef(null);

  // Inicializar el mapa
  useEffect(() => {
    // Evitar reinicialización si el mapa ya existe
    if (mapInstanceRef.current) {
      return;
    }

    // Verificar que el contenedor DOM existe
    if (!mapContainerRef.current) {
      console.error('MapContainer: Contenedor DOM no encontrado');
      return;
    }

    try {
      // Crear instancia del mapa
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true,
        boxZoom: true,
        keyboard: true,
        tap: true,
      });

      // Agregar capa de tiles (OpenStreetMap)
      L.tileLayer(tileLayerConfig.url, {
        attribution: tileLayerConfig.attribution,
        maxZoom: tileLayerConfig.maxZoom,
        minZoom: tileLayerConfig.minZoom,
      }).addTo(map);

      // Ajustar vista a los bounds si se proporcionan
      if (bounds && bounds.length === 2) {
        map.fitBounds(bounds, {
          padding: fitBoundsPadding,
          maxZoom: 15, // Evitar zoom excesivo
        });
      } else {
        // Vista por defecto (Galicia)
        map.setView([42.88, -7.65], 12);
      }

      // Guardar instancia del mapa
      mapInstanceRef.current = map;

      // Notificar que el mapa está listo
      if (onMapReady && typeof onMapReady === 'function') {
        onMapReady(map);
      }

      console.log('MapContainer: Mapa inicializado correctamente');
    } catch (error) {
      console.error('MapContainer: Error al inicializar el mapa', error);
    }

    // Cleanup: destruir el mapa al desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        console.log('MapContainer: Mapa destruido');
      }
    };
  }, []); // Solo ejecutar una vez al montar

  // Actualizar bounds si cambian
  useEffect(() => {
    if (mapInstanceRef.current && bounds && bounds.length === 2) {
      mapInstanceRef.current.fitBounds(bounds, {
        padding: fitBoundsPadding,
        maxZoom: 15,
        animate: true,
        duration: 0.5,
      });
    }
  }, [bounds, fitBoundsPadding]);

  return (
    <div 
      id="map" 
      ref={mapContainerRef}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* Los componentes hijos recibirán la instancia del mapa via context o props */}
      {children && typeof children === 'function' 
        ? children(mapInstanceRef.current)
        : children
      }
    </div>
  );
};

export default MapContainer;
