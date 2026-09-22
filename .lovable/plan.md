# Optimización de rendimiento Android

## Resultado
Reducir los tirones constantes del mapa en emuladores y teléfonos Android sin retirar OpenStreetMap ni las funciones GIS.

## Cambios
- Limitar la resolución interna del mapa para reducir trabajo de la GPU.
- Reducir la caché de mosaicos y desactivar efectos de transición innecesarios.
- Evitar desenfoques transparentes superpuestos al mapa.
- Asegurar aceleración gráfica en Android.

## Validación
- Compilar la aplicación web y Android sin errores.
- Verificar navegación y movimiento del mapa.
