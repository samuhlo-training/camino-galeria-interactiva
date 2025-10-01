# ✅ Checklist de Implementación

## 📋 Preparación

- [ ] Leer `ESTRUCTURA.md`
- [ ] Leer `ARQUITECTURA_VISUAL.md`
- [ ] Leer `GUIA_IMPLEMENTACION.md`
- [ ] Copiar todas las imágenes a `public/images/camino/`

---

## 1️⃣ Datos y Configuración

### `src/features/map/data/photoPoints.js`
- [ ] Copiar el array de 64 puntos del HTML original
- [ ] Actualizar las rutas de `imageUrl` a `/images/camino/...`
- [ ] Exportar el array como default

### `src/features/map/config/mapConfig.js`
- [ ] Definir configuración de tiles de OpenStreetMap
- [ ] Definir estilos de la ruta (color: #F59E0B, weight: 4, opacity: 0.8)
- [ ] Exportar configuración

### `src/shared/styles/map.css`
- [ ] Importar estilos de Leaflet
- [ ] Definir `.custom-div-icon` (círculo amarillo con borde blanco)
- [ ] Definir hover effect (scale 1.2)
- [ ] Definir altura del mapa (100vh)
- [ ] Definir estilos del modal

---

## 2️⃣ Hooks

### `src/shared/hooks/useModal.js`
- [ ] Crear estado `isOpen` (boolean)
- [ ] Crear estado `selectedPoint` (object)
- [ ] Crear función `openModal(point)`
- [ ] Crear función `closeModal()`
- [ ] Retornar { isOpen, selectedPoint, openModal, closeModal }

---

## 3️⃣ Componentes del Mapa

### `src/features/map/components/MapContainer.jsx`
- [ ] Importar Leaflet y sus estilos
- [ ] Crear ref para el contenedor del mapa
- [ ] Crear ref para la instancia del mapa
- [ ] useEffect para inicializar el mapa
- [ ] Configurar tiles de OpenStreetMap
- [ ] fitBounds con los límites del camino
- [ ] Cleanup: destruir mapa al desmontar
- [ ] Retornar div con id="map"

### `src/features/map/components/PhotoMarker.jsx`
- [ ] Recibir props: point, onClick
- [ ] useEffect para crear el marcador
- [ ] Crear divIcon personalizado con el número
- [ ] Añadir evento click que llama a onClick(point)
- [ ] Cleanup: remover marcador al desmontar
- [ ] Retornar null (el marcador se añade al mapa directamente)

### `src/features/map/components/RoutePolyline.jsx`
- [ ] Recibir props: points, mapInstance
- [ ] useEffect para crear la polyline
- [ ] Crear array de coordenadas [lat, lon]
- [ ] Aplicar estilos (color, weight, opacity)
- [ ] Cleanup: remover polyline al desmontar
- [ ] Retornar null

### `src/features/map/containers/InteractiveMap.jsx`
- [x] Copiar datos de photoPoints
- [ ] Importar mapConfig
- [ ] Usar hook useModal
- [ ] Crear ref para la instancia del mapa
- [ ] Renderizar MapContainer
- [ ] Renderizar PhotoMarker para cada punto
{{ ... }}
- [ ] Renderizar PhotoModal
- [ ] Pasar callbacks y datos a los componentes

---

## 4️⃣ Componentes de Fotos

### `src/features/photos/components/PhotoModalContent.jsx`
- [ ] Recibir props: point
- [ ] Sección izquierda: imagen
- [ ] Sección derecha: título, ubicación, entrada, tags
- [ ] Aplicar clases de Tailwind para layout responsive
- [ ] Formatear la entrada (convertir \n a párrafos)

### `src/features/photos/components/PhotoModal.jsx`
- [ ] Recibir props: isOpen, onClose, point
- [ ] Si !isOpen, retornar null
- [ ] Overlay con fondo oscuro semitransparente
- [ ] Contenedor del modal centrado
- [ ] Renderizar PhotoModalContent
- [ ] Botón de cerrar (X)
- [ ] Click en overlay cierra el modal
- [ ] Animaciones de entrada/salida

---

## 5️⃣ Layout y App

### `src/shared/components/Layout.jsx`
- [ ] Recibir props: children
- [ ] Retornar estructura básica (puede ser solo {children})
- [ ] Opcional: añadir header, footer

### `src/app/App.jsx`
- [ ] Importar InteractiveMap
- [ ] Importar Layout (opcional)
- [ ] Renderizar InteractiveMap dentro de Layout
- [ ] Opcional: añadir título, descripción

### `src/main.jsx`
- [ ] Verificar que importa App desde './app/App.jsx'
- [ ] Verificar que importa './index.css'

---

## 6️⃣ Estilos Globales

### `src/index.css`
- [ ] Verificar que tiene @tailwind base, components, utilities
- [ ] Importar estilos de Leaflet si no están en otro lugar
- [ ] Estilos base del body

---

## 7️⃣ Testing

### Funcionalidad del Mapa
- [ ] El mapa se carga correctamente
- [ ] Se muestran los 64 marcadores
- [ ] Los marcadores tienen números del 1 al 64
- [ ] La línea de ruta conecta todos los puntos
- [ ] El mapa está centrado en la ruta
- [ ] Los marcadores tienen efecto hover

### Funcionalidad del Modal
- [ ] Click en marcador abre el modal
- [ ] El modal muestra la imagen correcta
- [ ] El modal muestra título, ubicación, entrada y tags
- [ ] Click en X cierra el modal
- [ ] Click fuera del modal lo cierra
- [ ] El modal tiene animaciones suaves

### Responsive
- [ ] El mapa se ve bien en desktop
- [ ] El mapa se ve bien en tablet
- [ ] El mapa se ve bien en móvil
- [ ] El modal se adapta a diferentes tamaños
- [ ] Las imágenes se cargan correctamente

### Performance
- [ ] El mapa carga rápido
- [ ] No hay errores en la consola
- [ ] Las animaciones son fluidas
- [ ] Las imágenes están optimizadas

---

## 8️⃣ Optimizaciones (Opcional)

- [ ] Lazy loading de imágenes
- [ ] Clustering de marcadores si hay muchos
- [ ] Preload de imágenes cercanas
- [ ] Optimizar tamaño de imágenes
- [ ] Añadir loading states
- [ ] Añadir error boundaries
- [ ] Añadir analytics
- [ ] Añadir SEO meta tags

---

## 9️⃣ Extras (Opcional)

- [ ] Añadir filtros por día
- [ ] Añadir búsqueda de fotos
- [ ] Añadir navegación entre fotos (anterior/siguiente)
- [ ] Añadir zoom en la imagen
- [ ] Añadir compartir en redes sociales
- [ ] Añadir descarga de fotos
- [ ] Añadir modo oscuro
- [ ] Añadir animación de la ruta
- [ ] Añadir estadísticas del camino

---

## 🚀 Deploy

- [ ] Build de producción: `npm run build`
- [ ] Probar build: `npm run preview`
- [ ] Deploy a hosting (Vercel, Netlify, etc.)
- [ ] Verificar que las imágenes se cargan en producción
- [ ] Verificar que el mapa funciona en producción

---

## 📝 Documentación Final

- [ ] Actualizar README.md con instrucciones
- [ ] Documentar componentes principales
- [ ] Añadir screenshots
- [ ] Añadir demo link

---

## ✨ ¡Proyecto Completado!

Cuando hayas marcado todos los checkboxes, tendrás un mapa interactivo completamente funcional del Camino de Santiago con tus fotos y reflexiones.

¡Buen Camino! 🥾🗺️
