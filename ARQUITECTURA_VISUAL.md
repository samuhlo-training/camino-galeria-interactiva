# 🏗️ Arquitectura Visual del Proyecto

## 🎯 Screaming Architecture

La estructura del proyecto "grita" su propósito: **Mapa Interactivo con Fotos del Camino**

```
┌─────────────────────────────────────────────────────────────┐
│                         APLICACIÓN                           │
│                    (Mapa Interactivo)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │           src/app/App.jsx                │
        │      (Componente Principal)              │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │    src/features/map/containers/         │
        │      InteractiveMap.jsx                 │
        │   (Orquestador del Mapa)                │
        └─────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
        ┌───────────┐  ┌───────────┐  ┌──────────┐
        │MapContainer│  │PhotoMarker│  │RoutePolyline│
        │   .jsx    │  │   .jsx    │  │   .jsx   │
        └───────────┘  └───────────┘  └──────────┘
                              │
                              │ (onClick)
                              ▼
        ┌─────────────────────────────────────────┐
        │    src/features/photos/components/      │
        │          PhotoModal.jsx                 │
        │      (Modal con Foto y Detalles)        │
        └─────────────────────────────────────────┘
```

---

## 📦 Separación de Responsabilidades

### 🗺️ Feature: MAP (Mapa)
**Responsabilidad**: Gestionar todo lo relacionado con el mapa interactivo

```
features/map/
│
├── components/          ← Componentes visuales puros
│   ├── MapContainer     → Renderiza el mapa base
│   ├── PhotoMarker      → Renderiza marcadores
│   └── RoutePolyline    → Dibuja la ruta
│
├── containers/          ← Componentes con lógica
│   └── InteractiveMap   → Orquesta todo el mapa
│
├── config/              ← Configuración
│   └── mapConfig        → Tiles, bounds, estilos
│
├── data/                ← Datos
│   └── photoPoints      → 64 puntos del camino
│
├── hooks/               ← Hooks específicos del mapa
├── services/            ← Servicios (ej: geocoding)
├── types/               ← Tipos TypeScript/JSDoc
└── utils/               ← Utilidades (ej: calcular distancia)
```

### 📸 Feature: PHOTOS (Fotos)
**Responsabilidad**: Gestionar la visualización de fotos y detalles

```
features/photos/
│
├── components/          ← Componentes visuales
│   ├── PhotoModal       → Modal overlay
│   └── PhotoModalContent → Contenido del modal
│
├── containers/          ← Componentes con lógica
├── hooks/               ← Hooks específicos de fotos
├── services/            ← Servicios (ej: cargar imágenes)
├── types/               ← Tipos
└── utils/               ← Utilidades (ej: formatear fecha)
```

### 🔧 Shared (Compartido)
**Responsabilidad**: Recursos reutilizables en toda la app

```
shared/
│
├── components/          ← Componentes UI reutilizables
│   └── Layout           → Layout base
│
├── hooks/               ← Hooks compartidos
│   └── useModal         → Gestión de modales
│
├── styles/              ← Estilos globales
│   └── map.css          → Estilos específicos de Leaflet
│
├── assets/              ← Recursos estáticos
├── constants/           ← Constantes globales
├── contexts/            ← Contextos de React
├── services/            ← Servicios compartidos
├── types/               ← Tipos compartidos
└── utils/               ← Utilidades compartidas
```

---

## 🔄 Flujo de Datos

```
┌──────────────────────────────────────────────────────────┐
│ 1. Usuario carga la aplicación                           │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 2. App.jsx renderiza InteractiveMap                      │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 3. InteractiveMap carga photoPoints desde data/          │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 4. MapContainer inicializa el mapa de Leaflet            │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 5. PhotoMarker renderiza 64 marcadores                   │
│    RoutePolyline dibuja la línea de ruta                 │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 6. Usuario hace clic en un marcador                      │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 7. useModal actualiza el estado (isOpen: true)           │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 8. PhotoModal se renderiza con los datos del punto       │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 9. Usuario cierra el modal (X o clic fuera)              │
└──────────────────────────────────────────────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 10. useModal actualiza el estado (isOpen: false)         │
└──────────────────────────────────────────────────────────┘
```

---

## 🎨 Capas de la Aplicación

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTACIÓN                          │
│  (Componentes visuales puros - components/)              │
│  - MapContainer, PhotoMarker, PhotoModal, etc.           │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │ props
                         │
┌─────────────────────────────────────────────────────────┐
│                    CONTENEDORES                          │
│  (Componentes con lógica - containers/)                  │
│  - InteractiveMap (gestiona estado y eventos)            │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │ hooks
                         │
┌─────────────────────────────────────────────────────────┐
│                    LÓGICA DE NEGOCIO                     │
│  (Hooks, servicios, utilidades)                          │
│  - useModal, mapConfig, photoPoints                      │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────┐
│                    DATOS                                 │
│  (Datos estáticos, configuración)                        │
│  - photoPoints.js, mapConfig.js                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Principios Aplicados

### 1. **Screaming Architecture**
- La estructura grita "Mapa Interactivo con Fotos"
- No grita "React" o "Vite"
- Las carpetas principales son `map/` y `photos/`

### 2. **Separación de Responsabilidades**
- Cada feature tiene su propia carpeta
- Componentes visuales separados de la lógica
- Datos separados de la presentación

### 3. **Reutilización**
- Componentes compartidos en `shared/`
- Hooks reutilizables
- Estilos globales

### 4. **Escalabilidad**
- Fácil añadir nuevas features (ej: `features/timeline/`)
- Fácil añadir nuevos componentes dentro de cada feature
- Estructura clara y predecible

### 5. **Mantenibilidad**
- Cada archivo tiene una responsabilidad clara
- Fácil encontrar dónde está cada cosa
- Fácil hacer cambios sin afectar otras partes

---

## 📝 Convenciones de Nombres

### Archivos
- **Componentes**: PascalCase + `.jsx` (ej: `PhotoModal.jsx`)
- **Hooks**: camelCase + `use` prefix (ej: `useModal.js`)
- **Utilidades**: camelCase + `.js` (ej: `mapConfig.js`)
- **Datos**: camelCase + `.js` (ej: `photoPoints.js`)

### Carpetas
- **Features**: singular (ej: `map/`, `photo/`)
- **Tipos de archivos**: plural (ej: `components/`, `hooks/`)

### Componentes
- **Presentacionales**: Nombres descriptivos (ej: `PhotoMarker`)
- **Contenedores**: Nombres con contexto (ej: `InteractiveMap`)

---

## 🚀 Ventajas de esta Arquitectura

✅ **Clara intención**: Cualquiera puede entender qué hace la app
✅ **Fácil navegación**: Estructura predecible
✅ **Escalable**: Fácil añadir features
✅ **Mantenible**: Cambios localizados
✅ **Testeable**: Componentes aislados
✅ **Reutilizable**: Componentes compartidos
✅ **Colaborativa**: Varios desarrolladores pueden trabajar sin conflictos
