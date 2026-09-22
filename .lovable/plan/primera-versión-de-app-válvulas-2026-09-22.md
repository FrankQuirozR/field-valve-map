# Primera versión de App Válvulas

## Objetivo
Construir una aplicación móvil local-first para consultar, localizar y levantar válvulas sin conexión, con datos de demostración listos para probar.

## Alcance de esta entrega
1. Crear una navegación móvil con Mapa, Buscar, Descargas, Resultados y Configuración, además de vistas de detalle, fotografías, captura GPS, almacenamiento e importación.
2. Implementar IndexedDB con modelos separados para válvulas, fotos, zonas, levantamientos, capas y configuración. Los datos originales y los levantamientos permanecerán separados.
3. Añadir 20 válvulas ficticias, fotografías locales de muestra y zonas demostrativas claramente identificadas como datos no reales.
4. Importar GeoJSON/JSON y paquetes ZIP con válvulas y fotografías, mostrando resumen, progreso y errores.
5. Integrar MapLibre para puntos, selección, ubicación GPS, controles y aviso cuando no exista cartografía offline. La cartografía de demostración no dependerá de teselas remotas.
6. Implementar GPS real, cálculo de precisión y distancia, validación configurable y guardado local de levantamientos.
7. Implementar búsqueda, “Cerca de mí”, detalle de válvula, galería local y ampliación de fotos.
8. Exportar levantamientos localmente como CSV, GeoJSON y KML, usando descarga o compartir cuando el dispositivo lo permita.
9. Añadir PWA instalable con funcionamiento offline y una estructura preparada para una futura envoltura Android con Capacitor.
10. Verificar la experiencia en tamaños de teléfono y escritorio, además de los flujos principales.

## Decisiones de experiencia
- Uso principal en teléfono Android, con controles grandes y navegación inferior fija.
- Estética GIS institucional: azul oscuro y azul claro, fondos blancos/grises, verde para estados válidos y rojo para alertas.
- El mapa será la pantalla principal; en escritorio se mostrará también un área de preparación de datos.
- Ninguna función local quedará bloqueada por falta de Internet.

## Detalles técnicos
- Persistencia: IndexedDB con actualización inicial idempotente de datos demo.
- ZIP: lectura en el navegador y asociación de fotos por carpeta/código.
- Mapa: MapLibre con fuentes GeoJSON locales; la arquitectura admitirá paquetes cartográficos por zona.
- PWA: manifiesto, iconos y service worker generado, deshabilitado en la vista previa y activo únicamente en publicación.
- Sin autenticación, servidor, Firebase, Supabase ni llamadas de consulta remotas.
- Las capacidades nativas futuras quedarán detrás de servicios de GPS, archivos, fotos y compartir.

## Criterios de validación
- Se puede navegar por todas las vistas y probar los datos demo inmediatamente.
- Las válvulas, fotos, zonas, preferencias y levantamientos sobreviven al recargar.
- La captura rechaza precisión superior al umbral configurado.
- La eliminación de zona exige confirmación y elimina solo la copia local.
- Los archivos CSV, GeoJSON y KML se generan sin Internet.
- La aplicación funciona instalada y recarga sin red después de una primera carga publicada.
