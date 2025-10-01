# Estructura del Proyecto - Mapa Interactivo del Camino de Santiago

Este proyecto sigue los principios de **Screaming Architecture**, donde la estructura de carpetas refleja claramente el propósito de la aplicación.

## 📁 Estructura de Carpetas

```
src/
├── app/                                    # Punto de entrada de la aplicación
│   └── App.jsx                            # Componente principal de la app
│
├── features/                               # Características principales (SCREAMING)
│   ├── map/                               # Feature: Mapa Interactivo
│   │   ├── components/                    # Componentes visuales del mapa
│   │   │   ├── MapContainer.jsx          # Contenedor del mapa Leaflet
│   │   │   ├── PhotoMarker.jsx           # Marcador individual de foto
│   │   │   └── RoutePolyline.jsx         # Línea de ruta del camino
│   │   ├── containers/                    # Componentes contenedores
│   │   │   └── InteractiveMap.jsx        # Orquesta todos los componentes del mapa
│   │   ├── config/                        # Configuración del mapa
│   │   │   └── mapConfig.js              # Configuración de Leaflet (tiles, bounds, etc)
│   │   ├── data/                          # Datos del mapa
│   │   │   └── photoPoints.js            # Array con los 64 puntos de fotos
│   │   ├── hooks/                         # Hooks específicos del mapa
│   │   ├── services/                      # Servicios (ej: cálculo de rutas)
│   │   ├── types/                         # Tipos/interfaces
│   │   │   └── PhotoPoint.js             # Definición del tipo PhotoPoint
│   │   └── utils/                         # Utilidades del mapa
│   │
│   └── photos/                            # Feature: Galería de Fotos
│       ├── components/                    # Componentes de fotos
│       │   ├── PhotoModal.jsx            # Modal principal
│       │   └── PhotoModalContent.jsx     # Contenido del modal
│       ├── containers/                    # Contenedores de fotos
│       ├── hooks/                         # Hooks específicos de fotos
│       ├── services/                      # Servicios de fotos
│       ├── types/                         # Tipos de fotos
│       └── utils/                         # Utilidades de fotos
│
├── shared/                                # Recursos compartidos
│   ├── components/                        # Componentes reutilizables
│   │   └── Layout.jsx                    # Layout principal
│   ├── hooks/                             # Hooks compartidos
│   │   └── useModal.js                   # Hook para gestionar modales
│   ├── styles/                            # Estilos globales
│   │   └── map.css                       # Estilos específicos del mapa
│   ├── assets/                            # Imágenes, iconos, etc
│   ├── constants/                         # Constantes globales
│   ├── contexts/                          # Contextos de React
│   ├── services/                          # Servicios compartidos
│   ├── types/                             # Tipos compartidos
│   └── utils/                             # Utilidades compartidas
│
├── core/                                  # Lógica de negocio central
│
├── index.css                              # Estilos globales + Tailwind
└── main.jsx                               # Punto de entrada de React

```

## 🗺️ Flujo de Datos

1. **main.jsx** → Inicializa la aplicación
2. **App.jsx** → Componente raíz
3. **InteractiveMap.jsx** (Container) → Orquesta el mapa
   - **MapContainer.jsx** → Renderiza el mapa base de Leaflet
   - **PhotoMarker.jsx** → Renderiza cada marcador
   - **RoutePolyline.jsx** → Dibuja la ruta
4. **PhotoModal.jsx** → Muestra el modal con la foto seleccionada

## 📦 Componentes Principales

### Features: Map
- **MapContainer**: Inicializa y configura el mapa de Leaflet
- **PhotoMarker**: Marcador personalizado con número de foto
- **RoutePolyline**: Línea que conecta todos los puntos
- **InteractiveMap**: Componente contenedor que une todo

### Features: Photos
- **PhotoModal**: Modal overlay con animaciones
- **PhotoModalContent**: Contenido del modal (imagen, título, descripción)

### Shared
- **useModal**: Hook para abrir/cerrar modales
- **Layout**: Layout base de la aplicación

## 🎨 Estilos

- **Tailwind CSS**: Para estilos de utilidad
- **map.css**: Estilos específicos de Leaflet y marcadores personalizados
- **index.css**: Estilos globales y directivas de Tailwind

## 📝 Datos

Los datos de los 64 puntos fotográficos están en:
- `src/features/map/data/photoPoints.js`

Cada punto contiene:
- `id`: Número de foto
- `lat`, `lon`: Coordenadas GPS
- `imageUrl`: Ruta de la imagen
- `title`: Título de la foto
- `location`: Ubicación descriptiva
- `entry`: Entrada del diario
- `tags`: Etiquetas

## 🚀 Próximos Pasos

1. Implementar el código en cada componente
2. Configurar las rutas de las imágenes
3. Añadir animaciones y transiciones
4. Optimizar el rendimiento del mapa
5. Añadir funcionalidades adicionales (filtros, búsqueda, etc)
