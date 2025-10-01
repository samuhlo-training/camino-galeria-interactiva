import { h } from 'preact';
import InteractiveMap from '../features/map/containers/InteractiveMap';

/**
 * App - Componente principal de la aplicación
 * Mapa Interactivo del Camino de Santiago
 * Sarria - Palas de Rei (64 puntos fotográficos)
 */
function App() {
  return (
    <div class="app-container">
      <InteractiveMap />
    </div>
  );
}

export default App;
