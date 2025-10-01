# 🗺️ PRE-MVP - Mapa Interactivo del Camino de Santiago

Un mapa interactivo que pretende documentar mi experiencia en el Camino de Santiago desde Sarria hasta Palas de Rei, con 64 puntos fotográficos y reflexiones personales.
Estos puntos fotograficos fueron sacados de los metadatos de las fotos que he tomado en el camino, y las reflexiones personales son generadas por IA.
La idea principal, es que subiendo las fotos, se pueda generar un mapa interactivo personalizabe automaticamente.

## 🎯 Características

- ✨ Mapa interactivo con Leaflet
- 📍 64 marcadores personalizados con fotos del camino
- 🛤️ Línea de ruta conectando todos los puntos
- 🖼️ Modal con detalles de cada foto (imagen, título, ubicación, reflexión, tags)
- 🔍 **Zoom en imágenes** - Click para ver a tamaño completo
- ⬅️➡️ **Navegación entre fotos** - Botones y teclado (← →)
- 📱 Diseño responsive
- 🎨 Interfaz moderna con Tailwind CSS
- ⚡ Construido con Vite y Preact

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>

# Instalar dependencias
npm install

# Copiar tus imágenes a public/images/camino/
# (Las imágenes ya están incluidas en este proyecto)

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Vista previa del build de producción
```

## 📂 Estructura del Proyecto

El proyecto sigue una estructura modular y organizada (Screaming Architecture) con las siguientes carpetas:

```
src/
├── app/                    # Aplicación principal
├── features/               # Características principales
│   ├── map/               # Feature: Mapa interactivo
│   └── photos/            # Feature: Galería de fotos
├── shared/                # Recursos compartidos
└── core/                  # Lógica de negocio central
```

## 🛠️ Tecnologías

- **Vite** - Build tool
- **Preact** - Framework UI ligero
- **Tailwind CSS** - Framework de estilos
- **Leaflet** - Librería de mapas
- **PostCSS** - Procesador de CSS

## 📸 Datos

Los datos de los 64 puntos fotográficos incluyen:

- Coordenadas GPS (lat, lon)
- Imagen del punto
- Título descriptivo
- Ubicación detallada
- Reflexión personal
- Tags temáticos

## 🎮 Controles

### Navegación

- **Click en marcador** → Abre modal con detalles
- **Botones ← →** → Cambiar entre fotos
- **Teclado ← →** → Navegación rápida
- **Esc** → Cerrar modal

### Imágenes

- **Click en imagen** → Zoom a pantalla completa
- **Click en zoom** → Volver al modal

## 📱 Responsive

El diseño se adapta a:

- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktop (> 1024px)

## 📝 Estado del Proyecto

**Este es un pre-MVP** - Versión básica funcional con las características principales implementadas para mostrar la idea:

- ✅ Mapa interactivo básico
- ✅ 64 puntos fotográficos
- ✅ Modal con detalles de fotos
- ✅ Navegación entre fotos
- ✅ Zoom en imágenes
- ✅ Diseño responsive básico

---

**¡Buen Camino!** 🥾🗺️✨
