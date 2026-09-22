# APK instalable de App Válvulas

## Resultado
Generar una APK Android de prueba, lista para descargar e instalar manualmente en un teléfono.

## Cambios
- Añadir la plataforma Android de Capacitor y los permisos de ubicación necesarios.
- Empaquetar la aplicación actual con identificador `pe.institucional.valvulasgis`.
- Mantener los datos, fotos y levantamientos en el dispositivo.
- Usar OpenStreetMap con Internet; sin Internet, conservar las funciones y datos locales, aunque el mapa base no descargado no aparecerá.
- Compilar una APK de depuración firmada automáticamente y entregarla como archivo.

## Validación
- Comprobar instalación/arranque del paquete Android.
- Confirmar navegación, almacenamiento local y solicitud de ubicación.
- Verificar que la APK final se haya generado correctamente.

## Nota técnica
La APK de prueba se puede instalar habilitando “instalar apps desconocidas”. Para distribución en Google Play se necesitaría después una versión release firmada con una clave privada del propietario.
