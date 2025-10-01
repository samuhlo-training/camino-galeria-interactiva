import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

/**
 * PhotoModalContent - Contenido interno del modal de fotos
 * Muestra la imagen, título, ubicación, entrada del diario y tags
 * 
 * @param {Object} props
 * @param {Object} props.point - Datos del punto fotográfico
 * @param {Function} props.onPrevious - Callback para ir a la foto anterior
 * @param {Function} props.onNext - Callback para ir a la foto siguiente
 * @param {boolean} props.hasPrevious - Si hay foto anterior
 * @param {boolean} props.hasNext - Si hay foto siguiente
 * @param {Function} props.onImageClick - Callback cuando se hace click en la imagen
 */
const PhotoModalContent = ({ point, onPrevious, onNext, hasPrevious, hasNext, onImageClick }) => {
  // Estado para controlar si hay error en la imagen
  const [imageError, setImageError] = useState(false);

  // Resetear estados cuando cambia el punto
  useEffect(() => {
    setImageError(false);
  }, [point?.id]);

  // Si no hay punto, no renderizar nada
  if (!point) {
    return null;
  }

  // Formatear la entrada del diario (convertir \n a párrafos)
  const formatEntry = (entry) => {
    if (!entry) return '';
    
    // Dividir por saltos de línea y crear párrafos
    return entry.split('\n').filter(line => line.trim()).map((paragraph, index) => (
      <p key={index} class="mb-3 last:mb-0 text-gray-700">
        {paragraph}
      </p>
    ));
  };

  // Manejar click en imagen
  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!imageError && onImageClick) {
      onImageClick();
    }
  };

  // Manejar error de carga de imagen
  const handleImageError = () => {
    console.error('PhotoModalContent: Error al cargar imagen', point.imageUrl);
    setImageError(true);
  };

  return (
    <div class="flex flex-col md:flex-row overflow-hidden h-full bg-gradient-to-br from-amber-50 to-orange-50 relative">
      {/* Botones de Navegación */}
      <div class="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 md:px-4 z-10 pointer-events-none">
        {/* Botón Anterior */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            class="pointer-events-auto bg-amber-800 hover:bg-amber-900 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Foto anterior"
            title="Foto anterior (←)"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        
        {/* Espaciador si no hay botón anterior */}
        {!hasPrevious && <div></div>}

        {/* Botón Siguiente */}
        {hasNext && (
          <button
            onClick={onNext}
            class="pointer-events-auto bg-amber-800 hover:bg-amber-900 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Foto siguiente"
            title="Foto siguiente (→)"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>

      {/* Sección de Imagen (Izquierda) */}
      <div class="w-full md:w-1/2 h-80 md:h-auto bg-amber-100 flex-shrink-0 flex items-center justify-center p-6 md:p-8 relative group">
        {imageError ? (
          // Mostrar fallback si hay error
          <div class="flex flex-col items-center justify-center w-full h-full text-amber-900 p-8">
            <svg class="w-32 h-32 mb-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
            <p class="text-xl font-semibold mb-3">Imagen no disponible</p>
            <p class="text-sm text-center text-amber-700">{point.imageUrl}</p>
          </div>
        ) : (
          <>
            <img
              src={point.imageUrl}
              alt={point.title || `Foto ${point.id}`}
              class="w-full h-full object-contain rounded-lg shadow-2xl border-4 border-amber-800 cursor-zoom-in transition-transform duration-200 hover:scale-[1.02]"
              loading="lazy"
              onClick={handleImageClick}
              onError={handleImageError}
            />
            {/* Indicador de zoom */}
            <div class="absolute bottom-8 right-8 bg-amber-800 bg-opacity-80 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              🔍 Click para ampliar
            </div>
          </>
        )}
      </div>

      {/* Sección de Contenido (Derecha) */}
      <div class="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Contenido Principal */}
        <div class="flex-grow space-y-6">
          {/* Título */}
          <div class="space-y-2">
            <h2 class="text-2xl md:text-3xl font-bold text-amber-900 leading-tight" style="font-family: Georgia, serif;">
              📸 Foto #{point.id}
            </h2>
            <h3 class="text-xl md:text-2xl font-semibold text-amber-800 leading-tight" style="font-family: Georgia, serif;">
              {point.title}
            </h3>
          </div>

          {/* Ubicación */}
          <div class="flex items-start bg-amber-100 bg-opacity-60 p-4 rounded-lg border-l-4 border-amber-700 shadow-sm">
            <svg 
              class="w-6 h-6 mr-3 mt-0.5 flex-shrink-0 text-amber-700" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fill-rule="evenodd" 
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm md:text-base text-amber-900 font-medium leading-relaxed" style="font-family: Georgia, serif;">
              {point.location}
            </span>
          </div>

          {/* Entrada del Diario */}
          <div class="text-gray-800 leading-relaxed space-y-4" style="font-family: Georgia, serif; font-size: 16px; line-height: 1.8;">
            {formatEntry(point.entry)}
          </div>
        </div>

        {/* Footer con Tags */}
        <div class="flex-shrink-0 pt-6 mt-8 border-t-2 border-amber-300">
          <p class="text-xs text-amber-700 mb-3 font-semibold uppercase tracking-wider">Etiquetas:</p>
          <div class="text-sm md:text-base text-amber-800 font-medium leading-relaxed" style="font-family: Georgia, serif;">
            {point.tags}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModalContent;
