import { h } from 'preact';
import { useState, useMemo, useEffect } from 'preact/hooks';
import MapContainer from '../components/MapContainer';
import PhotoMarker from '../components/PhotoMarker';
import RoutePolyline from '../components/RoutePolyline';
import PhotoModal from '../../photos/components/PhotoModal';
import photoPoints from '../data/photoPoints';
import { calculateBounds, createRouteCoordinates } from '../config/mapConfig';
import useModal from '../../../shared/hooks/useModal';
import '../../../shared/styles/map.css';

/**
 * InteractiveMap - Componente contenedor principal del mapa interactivo
 * Orquesta todos los componentes del mapa y gestiona el estado del modal
 * 
 * Este es el componente principal que debes usar en tu App
 */
const InteractiveMap = () => {
  // Estado del mapa
  const [mapInstance, setMapInstance] = useState(null);

  // Hook para gestionar el modal
  const { isOpen, selectedPoint, openModal, closeModal, changePoint } = useModal();

  // Calcular bounds del mapa basado en los puntos (memoizado para performance)
  const mapBounds = useMemo(() => {
    return calculateBounds(photoPoints);
  }, []);

  // Crear coordenadas de la ruta (memoizado para performance)
  const routeCoordinates = useMemo(() => {
    return createRouteCoordinates(photoPoints);
  }, []);

  // Callback cuando el mapa está listo
  const handleMapReady = (map) => {
    setMapInstance(map);
    console.log('InteractiveMap: Mapa listo con', photoPoints.length, 'puntos');
  };

  // Callback cuando se hace click en un marcador
  const handleMarkerClick = (point) => {
    openModal(point);
    console.log('InteractiveMap: Abriendo modal para punto', point.id);
  };

  // Callback cuando se cambia de punto en el modal
  const handlePointChange = (point) => {
    changePoint(point);
    console.log('InteractiveMap: Cambiando a punto', point.id);
  };

  // Escuchar evento personalizado para abrir modal (usado en navegación)
  useEffect(() => {
    const handleOpenPhotoModal = (event) => {
      openModal(event.detail);
    };

    window.addEventListener('openPhotoModal', handleOpenPhotoModal);
    return () => window.removeEventListener('openPhotoModal', handleOpenPhotoModal);
  }, [openModal]);

  return (
    <>
      {/* Contenedor del Mapa */}
      <MapContainer
        bounds={mapBounds}
        fitBoundsPadding={[50, 50]}
        onMapReady={handleMapReady}
      >
        {/* Renderizar la línea de ruta solo cuando el mapa esté listo */}
        {mapInstance && (
          <RoutePolyline
            coordinates={routeCoordinates}
            mapInstance={mapInstance}
          />
        )}

        {/* Renderizar todos los marcadores solo cuando el mapa esté listo */}
        {mapInstance && photoPoints.map((point) => (
          <PhotoMarker
            key={point.id}
            point={point}
            mapInstance={mapInstance}
            onClick={handleMarkerClick}
          />
        ))}
      </MapContainer>

      {/* Modal de Fotos */}
      <PhotoModal
        isOpen={isOpen}
        point={selectedPoint}
        onClose={closeModal}
        onPointChange={handlePointChange}
      />
    </>
  );
};

export default InteractiveMap;
