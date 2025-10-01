# 🗺️ Guía de Implementación - Mapa Interactivo

## Orden de Implementación Recomendado

### 1️⃣ Configuración Base

#### `src/features/map/data/photoPoints.js`
- Exportar el array de 64 puntos fotográficos
- Cada objeto debe tener: id, lat, lon, imageUrl, title, location, entry, tags

#### `src/features/map/config/mapConfig.js`
- Configuración de tiles de OpenStreetMap
- Bounds del mapa (calcular desde photoPoints)
- Estilos de la ruta (color, peso, opacidad)
- Configuración de zoom inicial

#### `src/shared/styles/map.css`
- Estilos para `.custom-div-icon` (marcadores circulares)
- Estilos para el contenedor del mapa
- Animaciones de hover para marcadores
- Estilos de la polyline

---

### 2️⃣ Hooks y Utilidades

#### `src/shared/hooks/useModal.js`
- Hook personalizado para gestionar estado del modal
- Funciones: `isOpen`, `openModal(data)`, `closeModal()`
- Gestionar datos del punto seleccionado

---

### 3️⃣ Componentes del Mapa

#### `src/features/map/components/MapContainer.jsx`
- Componente que inicializa el mapa de Leaflet
- Usar `useEffect` para crear la instancia del mapa
- Configurar tiles de OpenStreetMap
- Props: `children`, `bounds`, `mapConfig`

#### `src/features/map/components/PhotoMarker.jsx`
- Componente para cada marcador individual
- Crear divIcon personalizado con el número de foto
- Evento onClick para abrir el modal
- Props: `point`, `onMarkerClick`

#### `src/features/map/components/RoutePolyline.jsx`
- Componente que dibuja la línea de la ruta
- Usar L.polyline con las coordenadas
- Props: `points`, `color`, `weight`, `opacity`

#### `src/features/map/containers/InteractiveMap.jsx`
- Componente contenedor que orquesta todo
- Importa MapContainer, PhotoMarker, RoutePolyline
- Gestiona el estado del modal
- Pasa los datos a los componentes hijos

---

### 4️⃣ Componentes de Fotos

#### `src/features/photos/components/PhotoModalContent.jsx`
- Contenido interno del modal
- Sección de imagen (izquierda)
- Sección de contenido (derecha): título, ubicación, entrada, tags
- Props: `point`

#### `src/features/photos/components/PhotoModal.jsx`
- Modal overlay con animaciones
- Botón de cerrar
- Gestión de clics fuera del modal
- Props: `isOpen`, `onClose`, `point`

---

### 5️⃣ Layout y App

#### `src/shared/components/Layout.jsx`
- Layout base de la aplicación
- Puede incluir header, footer si es necesario
- Props: `children`

#### `src/app/App.jsx`
- Componente principal
- Renderiza InteractiveMap dentro de Layout
- Puede incluir título, descripción

#### `src/main.jsx`
- Ya está configurado, solo asegúrate de importar App.jsx correcto

---

## 📦 Dependencias Necesarias

Ya instaladas:
- ✅ `leaflet`
- ✅ `react-leaflet` (opcional, puedes usar Leaflet vanilla)
- ✅ `@types/leaflet`

---

## 🎨 Clases de Tailwind Útiles

### Modal
- `fixed inset-0` - Overlay a pantalla completa
- `bg-black bg-opacity-70` - Fondo oscuro semitransparente
- `flex items-center justify-center` - Centrar contenido
- `z-50` - Z-index alto

### Contenido del Modal
- `bg-white rounded-2xl shadow-2xl` - Fondo blanco con bordes redondeados
- `max-w-4xl max-h-[90vh]` - Tamaño máximo
- `flex flex-col md:flex-row` - Layout responsive
- `overflow-hidden` - Ocultar overflow

### Imagen
- `w-full md:w-1/2` - Ancho responsive
- `h-64 md:h-auto` - Alto responsive
- `object-cover` - Cubrir contenedor

### Botones
- `hover:opacity-75 transition` - Efecto hover
- `focus:outline-none` - Sin outline

### Marcadores
- `rounded-full` - Círculo perfecto
- `border-2 border-white` - Borde blanco
- `shadow-lg` - Sombra
- `hover:scale-110 transition` - Efecto hover

---

## 🔧 Integración con Leaflet

### Opción 1: Leaflet Vanilla (Recomendado para este proyecto)
```javascript
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// En useEffect
const map = L.map('map').fitBounds(bounds);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
```

### Opción 2: React-Leaflet
```javascript
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
```

---

## 📂 Estructura de Archivos de Imágenes

Recomendación:
```
public/
└── images/
    └── camino/
        ├── IMG_0495.jpg
        ├── IMG_0496.jpg
        └── ...
```

Actualizar rutas en `photoPoints.js`:
```javascript
imageUrl: '/images/camino/IMG_0495.jpg'
```

---

## ✅ Checklist de Implementación

- [ ] Copiar datos de photoPoints
- [ ] Configurar mapConfig
- [ ] Crear estilos en map.css
- [ ] Implementar useModal hook
- [ ] Crear MapContainer
- [ ] Crear PhotoMarker
- [ ] Crear RoutePolyline
- [ ] Crear InteractiveMap (container)
- [ ] Crear PhotoModalContent
- [ ] Crear PhotoModal
- [ ] Crear Layout
- [ ] Actualizar App.jsx
- [ ] Copiar imágenes a public/images/camino/
- [ ] Probar funcionalidad del mapa
- [ ] Probar modal
- [ ] Ajustar estilos y animaciones

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 💡 Tips

1. **Leaflet CSS**: Asegúrate de importar los estilos de Leaflet en el componente del mapa
2. **Refs**: Usa `useRef` para mantener la referencia del mapa
3. **Cleanup**: Limpia la instancia del mapa en el cleanup de useEffect
4. **Performance**: Considera usar `useMemo` para calcular bounds
5. **Animaciones**: Usa clases de Tailwind con `transition` para animaciones suaves
6. **Responsive**: Prueba en diferentes tamaños de pantalla
7. **Accesibilidad**: Añade atributos ARIA donde sea necesario

---

## 🎯 Resultado Esperado

Una aplicación de mapa interactivo donde:
- Se muestra un mapa con 64 marcadores numerados
- Una línea conecta todos los puntos en orden
- Al hacer clic en un marcador, se abre un modal con:
  - Imagen del punto
  - Título y ubicación
  - Entrada del diario
  - Tags
- El modal se puede cerrar con el botón X o haciendo clic fuera
- Todo con animaciones suaves y diseño responsive
