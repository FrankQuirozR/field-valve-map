# Field Valve Pro

APP MÓVIL GIS OFFLINE PARA GEOREFERENCIACIÓN Y CONSULTA DE VÁLVULAS

Quiero desarrollar una aplicación móvil orientada a trabajo de campo para localizar, consultar y georreferenciar válvulas de una red de agua potable.

La aplicación debe estar diseñada principalmente para teléfonos Android y debe funcionar 100 % offline durante el trabajo de campo.

IMPORTANTE: NO quiero depender de un servidor, Supabase, Firebase ni una API para realizar las consultas en campo. Toda la información necesaria para trabajar offline debe estar almacenada localmente en el dispositivo.

La aplicación debe tener una interfaz profesional, moderna, limpia y orientada a GIS/trabajo de campo.

1. OBJETIVO PRINCIPAL

La aplicación permitirá:

Descargar/preparar previamente información de una zona.

Almacenar localmente las válvulas, atributos, fotografías y cartografía necesaria.

Trabajar sin Internet.

Visualizar las válvulas en un mapa.

Utilizar el GPS del teléfono para conocer la posición actual.

Buscar una válvula por código.

Ver la información de una válvula.

Ver sus fotografías almacenadas localmente.

Comparar la posición registrada de la válvula con la posición actual del usuario.

Capturar la posición GPS actual cuando el usuario se encuentre físicamente junto a la válvula.

Guardar el resultado localmente.

Exportar posteriormente los resultados en formatos GIS.

La aplicación NO debe modificar automáticamente la información maestra original.

2. TECNOLOGÍAS

Utilizar:

React

TypeScript

Vite

Tailwind CSS

Lucide Icons

IndexedDB para almacenamiento local

MapLibre GL JS para mapas

Geolocation API para GPS

Service Worker / PWA para funcionamiento offline

Capacitor, si es necesario preparar posteriormente la aplicación para generar APK Android.

NO utilizar Supabase para la base de datos principal.

NO depender de un backend para el funcionamiento offline.

La arquitectura debe estar preparada para que posteriormente pueda convertirse en una aplicación Android instalable.

3. BASE DE DATOS LOCAL

Utilizar IndexedDB como base de datos local del dispositivo.

Crear una estructura equivalente a:

Tabla / colección VALVULAS

Campos:

id

codigo

tipo

diametro

material

estado

latitud

longitud

altitud

precision

sector

zona

observaciones

fecha_actualizacion

Tabla / colección FOTOS

Campos:

id

valvula_id

nombre

tipo_foto

ruta_local

blob

fecha

Las fotografías deben almacenarse localmente como Blob/File dentro de IndexedDB o mediante un sistema de archivos local compatible con PWA/Capacitor.

Tabla / colección LEVANTAMIENTOS

Campos:

id

valvula_id

latitud_campo

longitud_campo

precision_gps

altitud

fecha

hora

observaciones

estado

El levantamiento debe ser independiente de la coordenada original de la válvula.

Por ejemplo:

latitud_original / longitud_original

y

latitud_campo / longitud_campo

deben mantenerse como datos diferentes.

4. FOTOGRAFÍAS

Las fotografías NO deben depender de Internet durante el trabajo de campo.

Cada válvula puede tener varias fotografías.

Ejemplo:

VAL-018

foto_frente.jpg

foto_entorno.jpg

foto_tapa.jpg

La aplicación debe mostrar las fotografías inmediatamente cuando se consulta la válvula.

Las fotografías deben estar almacenadas localmente.

No guardar únicamente URLs remotas.

Si existe una fotografía remota en Google Drive o OneDrive, debe existir un proceso previo para descargarla y almacenarla localmente antes del trabajo de campo.

5. IMPORTACIÓN DE INFORMACIÓN

Crear una pantalla:

"Importar información"

Debe permitir importar un paquete previamente preparado.

Idealmente aceptar:

GeoJSON

JSON

ZIP

El paquete puede tener esta estructura:

/data/valvulas.geojson

/photos/VAL-001/foto01.jpg

/photos/VAL-001/foto02.jpg

/photos/VAL-002/foto01.jpg

/map/

La aplicación debe leer el archivo y almacenar la información en IndexedDB.

Mostrar durante la importación:

número de válvulas

número de fotografías

tamaño del paquete

progreso

errores

registros importados correctamente

6. CONCEPTO DE "ZONAS"

Crear un sistema de zonas de trabajo.

Ejemplo:

Zona Norte

1,250 válvulas

3,750 fotografías

2.8 GB

Zona Centro

980 válvulas

2,940 fotografías

2.1 GB

Zona Sur

1,450 válvulas

4,350 fotografías

3.4 GB

Cada zona debe poder:

descargar/importar

abrir

consultar

eliminar del dispositivo

ver tamaño utilizado

ver fecha de actualización

Al eliminar una zona, borrar solamente la copia local.

NO borrar la información original de Google Drive, OneDrive u otro repositorio externo.

7. PANTALLA DE INICIO

Diseñar una pantalla similar a una aplicación GIS profesional.

Encabezado:

"App Válvulas"

Subtítulo:

"Consulta y georreferenciación offline"

Mostrar tarjetas:

🗺️ Mapa

"Ver válvulas en el mapa"

🔎 Buscar válvula

"Buscar por código o atributos"

📥 Descargas

"Administrar información offline"

📍 Resultados

"Consultar y exportar levantamientos"

⚙️ Configuración

"Configuración de la aplicación"

Mostrar claramente un indicador:

🟢 ONLINE

o

🔴 OFFLINE

Cuando no exista Internet, la aplicación debe seguir funcionando normalmente.

8. PANTALLA DE DESCARGAS

Título:

"Zonas disponibles"

Cada zona debe aparecer como una tarjeta.

Ejemplo:

Zona Norte

1,250 válvulas

3,750 fotos

2.8 GB

[Descargar]

Después de descargar:

[Disponible offline]

[Eliminar]

Mostrar espacio utilizado en el dispositivo.

Ejemplo:

"Espacio disponible: 28.4 GB"

9. MAPA PRINCIPAL

Utilizar MapLibre.

El mapa debe mostrar:

posición actual del usuario

válvulas

tuberías, si están disponibles

sectores, si están disponibles

leyenda

controles de zoom

botón de ubicación actual

buscador

Simbología:

🔵 Válvula

📍 Usuario

🔴 Válvula seleccionada

Las válvulas deben poder seleccionarse tocando el punto.

Al seleccionar una válvula mostrar un pequeño panel inferior:

VAL-018

Compuerta

6"

Operativa

[Ver detalle]

10. GPS

Utilizar el GPS real del dispositivo.

No utilizar una ubicación simulada.

Mostrar:

latitud

longitud

precisión

altitud, si está disponible

fecha

hora

La precisión debe mostrarse claramente.

Ejemplo:

"Precisión GPS: 2.8 m"

Si la precisión es mala, mostrar una advertencia:

"Precisión GPS baja. Espere unos segundos antes de registrar."

No guardar automáticamente una posición si la precisión supera un umbral configurable.

Por defecto:

Precisión máxima aceptada: 10 metros.

Permitir modificar este valor en configuración.

11. DETALLE DE VÁLVULA

Crear una pantalla moderna:

VAL-018

Estado:

🟢 Operativa

Mostrar:

Tipo: Compuerta

Diámetro: 6"

Material: Hierro dúctil

Sector: Sector Norte

Latitud original: -11.987500

Longitud original: -77.065100

Botones:

[📷 Ver fotografías]

[🗺️ Ver en mapa]

[📍 Capturar ubicación]

12. GALERÍA DE FOTOGRAFÍAS

Crear una galería moderna.

Mostrar fotografías en tarjetas o cuadrícula.

Cada fotografía debe tener:

imagen

nombre

tipo

fecha

Tipos:

Frente

Entorno

Tapa

Placa

Otra

Permitir ampliar la fotografía.

Las imágenes deben cargarse desde el almacenamiento local, no desde Internet.

13. CAPTURAR UBICACIÓN

Crear una pantalla específica:

"Capturar ubicación"

Mostrar un icono grande de GPS.

Mostrar:

Posición actual

Latitud:

-11.987654

Longitud:

-77.065432

Precisión:

2.8 m

Altitud:

XXX m

Fecha:

21/09/2026

Hora:

15:42:17

Mostrar la distancia entre:

"Ubicación registrada"

y

"Ubicación actual"

Ejemplo:

Distancia a coordenada registrada:

4.7 m

Botón principal:

[Guardar levantamiento]

Botón secundario:

[Cancelar]

14. VALIDACIÓN DE CAPTURA

Antes de guardar:

Comprobar que:

existe señal GPS

la ubicación tiene coordenadas válidas

la precisión está dentro del límite configurado

existe una válvula seleccionada

Si la precisión es mayor a 10 metros:

Mostrar:

"Precisión insuficiente"

"Espere a obtener una mejor señal GPS."

Botón:

[Actualizar GPS]

15. RESULTADOS

Crear una pantalla:

"Levantamientos"

Mostrar una tabla/lista:

Código | Latitud | Longitud | Precisión | Fecha

VAL-018

-11.987654

-77.065432

2.8 m

21/09/2026

Cada registro debe poder abrirse.

Mostrar diferencia entre coordenada original y coordenada levantada.

Calcular distancia entre ambas coordenadas.

Ejemplo:

Desplazamiento:

4.7 metros

16. EXPORTACIÓN

Permitir exportar levantamientos en:

CSV

GeoJSON

KML

El GeoJSON debe utilizar geometría Point.

Ejemplo conceptual:

Feature:

geometry:

Point

coordinates:

[longitud, latitud]

properties:

codigo

tipo

diametro

precision_gps

fecha

hora

distancia_original

observaciones

La exportación debe funcionar sin Internet.

El usuario debe poder compartir el archivo generado mediante las opciones disponibles en Android.

17. MODO COMPLETAMENTE OFFLINE

La aplicación debe continuar funcionando si:

no existe Wi-Fi

no existe señal móvil

está activado el modo avión

Siempre que los datos, fotografías y mapas hayan sido previamente descargados.

No realizar llamadas de red para:

consultar válvulas

consultar fotografías

realizar búsquedas

mostrar atributos

visualizar datos locales

capturar GPS

guardar levantamientos

El indicador de conexión debe mostrar claramente:

🔴 MODO OFFLINE

pero NO debe bloquear ninguna función offline.

18. MAPAS OFFLINE

La aplicación debe estar preparada para utilizar mapas offline.

No depender exclusivamente de Google Maps online.

Utilizar MapLibre.

Crear una arquitectura donde los mapas puedan ser precargados para una zona.

La aplicación debe mostrar un mensaje si una zona no tiene mapa offline disponible.

19. DISEÑO VISUAL

Quiero exactamente una interfaz similar a un sistema GIS profesional de campo.

Estilo:

moderno

limpio

tecnológico

institucional

profesional

fácil de utilizar bajo condiciones de campo

Paleta principal:

Azul oscuro / azul institucional

Azul claro

Blanco

Gris claro

Verde para estados correctos

Rojo para advertencias

Usar tarjetas con bordes redondeados.

Usar sombras suaves.

Usar iconos claros.

La interfaz debe ser cómoda para utilizar en una pantalla de teléfono.

No saturar las pantallas.

Los botones principales deben ser grandes y fáciles de pulsar.

20. NAVEGACIÓN

Crear navegación inferior con:

🗺️ Mapa

🔎 Buscar

📥 Descargas

📍 Resultados

⚙️ Configuración

El botón "Mapa" debe ser la pantalla principal.

21. BUSCADOR

Permitir buscar:

código de válvula

tipo

diámetro

sector

zona

estado

Ejemplo:

Buscar:

VAL-018

Resultado:

VAL-018

Compuerta

6"

Operativa

Distancia actual:

38 m

22. FUNCIÓN "CERCA DE MÍ"

Agregar una función:

"Válvulas cercanas"

Ordenar las válvulas por distancia respecto al GPS actual.

Ejemplo:

VAL-018 — 38 m

VAL-021 — 72 m

VAL-025 — 115 m

Al seleccionar una válvula mostrar su dirección/distancia respecto al usuario.

23. CONFIGURACIÓN

Crear una pantalla de configuración con:

Precisión GPS máxima:

10 m

Unidad de distancia:

metros

Mostrar coordenadas:

Decimal

Formato de coordenadas:

Latitud / Longitud

Tema:

Claro / Oscuro

Administrar almacenamiento:

Mostrar espacio usado

Eliminar datos offline

Exportar base local

24. ALMACENAMIENTO

Crear una pantalla:

"Almacenamiento"

Mostrar:

Datos:

125 MB

Fotografías:

2.4 GB

Mapas:

800 MB

Total:

3.3 GB

Espacio disponible:

28.4 GB

Botón:

[Gestionar almacenamiento]

Permitir eliminar una zona completa.

Mostrar confirmación antes de eliminar.

25. SEGURIDAD DE LOS DATOS

No eliminar datos automáticamente.

Nunca borrar una zona sin confirmación del usuario.

Antes de eliminar:

"¿Desea eliminar esta zona del dispositivo?"

"Las fotografías originales del repositorio externo no serán eliminadas."

[Cancelar]

[Eliminar del dispositivo]

26. ARQUITECTURA DEL PROYECTO

Organizar el código de forma modular:

src/

components/

pages/

services/

database/

maps/

gps/

storage/

models/

utils/

hooks/

assets/

Crear servicios separados para:

databaseService

gpsService

photoService

mapService

importService

exportService

storageService

No colocar toda la lógica en un único componente.

27. MODELOS

Crear interfaces TypeScript:

Valve

Photo

FieldSurvey

Zone

MapLayer

AppSettings

StorageInfo

28. DATOS DE DEMOSTRACIÓN

Crear inicialmente datos ficticios para demostrar la aplicación.

Crear aproximadamente 20 válvulas.

Ejemplo:

VAL-001

VAL-002

VAL-003

...

VAL-020

Utilizar coordenadas de ejemplo únicamente para demostración.

No presentar estos datos como información real.

Crear algunas fotografías placeholder para probar la galería.

29. FLUJO PRINCIPAL

El flujo debe ser:

Abrir aplicación.

Ver pantalla de inicio.

Ir a "Descargas".

Seleccionar una zona.

Descargar/importar la información.

Mostrar progreso.

Confirmar:

"Zona disponible offline."

Ir a "Mapa".

Ver válvulas.

Activar GPS.

Ver posición actual.

Seleccionar una válvula.

Abrir detalle.

Consultar fotografías.

Ver coordenadas originales.

Caminar hasta la válvula.

Pulsar "Capturar ubicación".

Esperar precisión adecuada.

Guardar levantamiento.

Continuar con la siguiente válvula.

Al terminar, ir a "Resultados".

Revisar levantamientos.

Exportar GeoJSON/CSV/KML.

30. MUY IMPORTANTE: NO CREAR UN BACKEND INNECESARIO

Esta primera versión debe ser local-first.

No crear:

autenticación obligatoria

servidor propio

Supabase

Firebase

API REST

backend

La aplicación debe funcionar como una herramienta GIS local.

Posteriormente se podría añadir sincronización con OneDrive, Google Drive o un servidor institucional, pero NO es necesario para la primera versión.

31. PREPARACIÓN PARA APK

Aunque el desarrollo inicial sea una PWA/web app, organizar el proyecto de forma compatible con Capacitor.

La meta posterior será:

Web/PWA

↓

Capacitor

↓

Android

↓

APK

La aplicación debe poder acceder posteriormente a:

GPS nativo

almacenamiento

cámara

sistema de archivos

Evitar funcionalidades que solamente funcionen en escritorio.

Diseñar primero pensando en pantalla móvil.

32. RESPONSIVE DESIGN

La prioridad absoluta es:

📱 teléfono Android

Después:

💻 escritorio

La aplicación debe verse como una aplicación móvil, no como una página web adaptada.

En escritorio puede mostrarse una interfaz más amplia para administración/importación.

33. PANTALLA DE ESCRITORIO

Si se abre en PC, crear un panel de preparación:

"Preparación de datos"

Permitir:

importar GeoJSON

importar fotografías

crear zonas

revisar cantidad de válvulas

revisar fotografías

generar paquete offline

Pero la experiencia principal debe seguir siendo móvil.

34. RESULTADO ESPERADO

Quiero que Lovable construya una primera versión funcional, no solamente un prototipo visual.

Debe existir:

navegación funcional

base de datos IndexedDB funcional

importación de datos

almacenamiento local

fotografías locales

búsqueda

mapa

GPS

captura de coordenadas

levantamientos

exportación

modo offline

gestión de zonas

gestión de almacenamiento

interfaz profesional

Crear datos de demostración para que pueda probar toda la aplicación inmediatamente.

No dejar botones principales sin funcionalidad.

Cuando una función no pueda implementarse completamente en el entorno web, crear una abstracción/servicio preparado para implementarla posteriormente mediante Capacitor en Android.

35. PRIORIDAD DE DESARROLLO

Desarrollar en este orden:

FASE 1:
Interfaz y navegación.

FASE 2:
IndexedDB y modelos.

FASE 3:
Importación de GeoJSON y fotografías.

FASE 4:
Mapa offline y visualización de válvulas.

FASE 5:
GPS.

FASE 6:
Captura de levantamientos.

FASE 7:
Exportación GIS.

FASE 8:
PWA/offline completo.

FASE 9:
Preparación para Capacitor/Android.

No sacrificar la funcionalidad offline por funciones online.

La prioridad es que un técnico pueda salir al campo con el teléfono, sin Internet, consultar una válvula, visualizar sus fotografías, conocer su ubicación registrada, utilizar su GPS y guardar una nueva coordenada de levantamiento.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://field-valve-map.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/16e8edb3-4e97-4e4d-9977-70c53fbd4d87).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
