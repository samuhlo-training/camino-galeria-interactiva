# 🗺️ Mapa Interactivo del Camino de Santiago

Un mapa interactivo que documenta mi experiencia en el Camino de Santiago desde Sarria hasta Palas de Rei, con 64 puntos fotográficos y reflexiones personales.

## 🎯 Características

- ✨ Mapa interactivo con Leaflet
- 📍 64 marcadores personalizados con fotos del camino
- 🛤️ Línea de ruta conectando todos los puntos
- 🖼️ Modal con detalles de cada foto (imagen, título, ubicación, reflexión, tags)
- 📱 Diseño responsive
- 🎨 Interfaz moderna con Tailwind CSS
- ⚡ Construido con Vite y Preact

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Screaming Architecture**, donde la estructura del código refleja claramente el propósito de la aplicación.

```
src/
├── app/                    # Aplicación principal
├── features/               # Características principales
│   ├── map/               # Feature: Mapa interactivo
│   └── photos/            # Feature: Galería de fotos
├── shared/                # Recursos compartidos
└── core/                  # Lógica de negocio central
```

Para más detalles sobre la arquitectura, consulta:
- 📖 [ESTRUCTURA.md](./ESTRUCTURA.md) - Estructura completa del proyecto
- 🏗️ [ARQUITECTURA_VISUAL.md](./ARQUITECTURA_VISUAL.md) - Diagramas y explicación visual
- 📝 [GUIA_IMPLEMENTACION.md](./GUIA_IMPLEMENTACION.md) - Guía de implementación paso a paso

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
# (Ver estructura en public/images/camino/README.md)

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

### Features

#### 🗺️ Map (Mapa)
Gestiona todo lo relacionado con el mapa interactivo:
- `components/` - Componentes visuales del mapa
- `containers/` - Componentes con lógica
- `config/` - Configuración de Leaflet
- `data/` - Datos de los 64 puntos fotográficos

#### 📸 Photos (Fotos)
Gestiona la visualización de fotos y detalles:
- `components/` - Modal y contenido de fotos
- `containers/` - Lógica de la galería

### Shared
Recursos reutilizables:
- `components/` - Componentes UI compartidos
- `hooks/` - Hooks personalizados (ej: useModal)
- `styles/` - Estilos globales

## 📋 Checklist de Implementación

Sigue el [CHECKLIST.md](./CHECKLIST.md) para implementar el proyecto paso a paso.

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

## 🎨 Estilos

El proyecto utiliza:
- **Tailwind CSS** para estilos de utilidad
- **CSS personalizado** para componentes específicos de Leaflet
- **Animaciones** suaves con transiciones CSS

## 📱 Responsive

El diseño se adapta a:
- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🔧 Configuración

### Tailwind
Configuración en `tailwind.config.js`

### PostCSS
Configuración en `postcss.config.js`

### Vite
Configuración en `vite.config.js`

## 📚 Documentación Adicional

- [ESTRUCTURA.md](./ESTRUCTURA.md) - Estructura detallada de carpetas
- [ARQUITECTURA_VISUAL.md](./ARQUITECTURA_VISUAL.md) - Diagramas de arquitectura
- [GUIA_IMPLEMENTACION.md](./GUIA_IMPLEMENTACION.md) - Guía de implementación
- [CHECKLIST.md](./CHECKLIST.md) - Checklist de tareas
- [ARCHIVOS_CREADOS.md](./ARCHIVOS_CREADOS.md) - Lista de archivos del proyecto

## 🤝 Contribuir

Este es un proyecto personal, pero si quieres usarlo como base para tu propio mapa del Camino:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

Tu nombre - [@tu_twitter](https://twitter.com/tu_twitter)

## 🙏 Agradecimientos

- A todos los peregrinos que comparten el Camino
- A la comunidad de Leaflet por la excelente librería
- A los creadores de Preact y Vite

---

**¡Buen Camino!** 🥾🗺️✨
