import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import PhotoModalContent from './PhotoModalContent';
import photoPoints from '../../map/data/photoPoints';

/**
 * PhotoModal - Modal overlay para mostrar fotos y detalles
 * Incluye animaciones, botón de cerrar, navegación y cierre al hacer click fuera
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Object} props.point - Datos del punto fotográfico
 * @param {Function} props.onClose - Callback para cerrar el modal
 * @param {Function} props.onPointChange - Callback para cambiar el punto
 */
const PhotoModal = ({ isOpen, point, onClose, onPointChange }) => {
  // Ref para el contenido del modal
  const modalContentRef = useRef(null);
  
  // Estado para controlar si la imagen está en zoom
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Encontrar el índice actual del punto
  const currentIndex = point ? photoPoints.findIndex(p => p.id === point.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < photoPoints.length - 1;

  // Resetear zoom cuando cambia el punto
  useEffect(() => {
    setIsImageZoomed(false);
  }, [point?.id]);

  // Funciones de navegación
  const goToPrevious = () => {
    if (hasPrevious && onPointChange) {
      const previousPoint = photoPoints[currentIndex - 1];
      onPointChange(previousPoint);
    }
  };

  const goToNext = () => {
    if (hasNext && onPointChange) {
      const nextPoint = photoPoints[currentIndex + 1];
      onPointChange(nextPoint);
    }
  };

  // Toggle del zoom
  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  // Manejar animaciones de entrada/salida
  useEffect(() => {
    if (!isOpen) return;

    // Pequeño delay para activar animaciones
    const timer = setTimeout(() => {
      if (modalContentRef.current) {
        modalContentRef.current.classList.remove('scale-95', 'opacity-0');
        modalContentRef.current.classList.add('scale-100', 'opacity-100');
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Manejar teclas de navegación
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && hasPrevious) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrevious, hasNext, currentIndex]);

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) {
    return null;
  }

  // Manejar click en el overlay (fuera del modal)
  const handleOverlayClick = (e) => {
    // Solo cerrar si el click fue en el overlay, no en el contenido
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Manejar click en el botón de cerrar
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div
      class="modal-overlay fixed inset-0 w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Vista de Zoom de Imagen */}
      {isImageZoomed && point && (
        <div 
          class="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-[60] cursor-zoom-out"
          onClick={toggleImageZoom}
        >
          <img
            src={point.imageUrl}
            alt={point.title || `Foto ${point.id}`}
            class="max-w-full max-h-full object-contain"
            style="cursor: zoom-out;"
          />
          <div class="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            Click para cerrar
          </div>
        </div>
      )}

      {/* Contenedor del Modal */}
      <div
        ref={modalContentRef}
        class="modal-content w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl transform scale-95 opacity-0 transition-all duration-300 relative overflow-hidden"
      >
        {/* Botón de Cerrar */}
        <button
          id="modal-close"
          onClick={handleCloseClick}
          class="absolute top-4 right-4 z-20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label="Cerrar modal"
          title="Cerrar (Esc)"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenido del Modal */}
        <PhotoModalContent 
          point={point}
          onPrevious={goToPrevious}
          onNext={goToNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onImageClick={toggleImageZoom}
        />
      </div>
    </div>
  );
};

export default PhotoModal;
