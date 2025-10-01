import { useState, useCallback, useEffect } from 'preact/hooks';

/**
 * Hook personalizado para gestionar el estado del modal de fotos
 * Maneja apertura, cierre y datos del punto seleccionado
 */
export const useModal = () => {
  // Estado para controlar si el modal está abierto
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado para almacenar los datos del punto seleccionado
  const [selectedPoint, setSelectedPoint] = useState(null);

  /**
   * Abre el modal con los datos de un punto específico
   * @param {Object} point - Datos del punto fotográfico
   */
  const openModal = useCallback((point) => {
    if (!point) {
      console.warn('useModal: Intentando abrir modal sin datos de punto');
      return;
    }
    
    setSelectedPoint(point);
    setIsOpen(true);
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }, []);

  /**
   * Cierra el modal y limpia los datos
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
    
    // Pequeño delay antes de limpiar los datos para permitir animación de salida
    setTimeout(() => {
      setSelectedPoint(null);
    }, 300); // Coincide con la duración de la animación en CSS
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }, []);

  /**
   * Cambia el punto seleccionado sin cerrar el modal
   * @param {Object} point - Nuevo punto a mostrar
   */
  const changePoint = useCallback((point) => {
    if (!point) {
      console.warn('useModal: Intentando cambiar a un punto sin datos');
      return;
    }
    
    setSelectedPoint(point);
    console.log('useModal: Punto cambiado a', point.id);
  }, []);

  /**
   * Maneja el cierre con la tecla Escape
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    // Agregar listener solo si el modal está abierto
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    // Cleanup: remover listener y restaurar scroll
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, closeModal]);

  /**
   * Toggle del modal (útil para casos especiales)
   */
  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else if (selectedPoint) {
      openModal(selectedPoint);
    }
  }, [isOpen, selectedPoint, openModal, closeModal]);

  return {
    // Estado
    isOpen,
    selectedPoint,
    
    // Acciones
    openModal,
    closeModal,
    toggleModal,
    changePoint,
  };
};

export default useModal;
