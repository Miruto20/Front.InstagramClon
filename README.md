\*..................................................................................[PROYECTO CLON de INTAGRAM ____CASIGRAM_____]...............................................................................................................
.
.
.

### Descripción del proyecto.

.
.
En este proyecto creamos una red social similar a instagram. En esta plataforma los usuarios puedenn compartir sus publicaciones y estas pudieran ser valoradas por otros usuarios en una escala de 1-5 y comentadas por todos los usuarios.
Creamos además de la pagina principal de Posts, una secundaria en la que se visualizaran sólo los Posts más valorados, pudiendo filtrar los resultados por una buscador que accepta busquedas en base a localización, username y keywords.
El objetivo de esto, es focalizar la red social en la que compartir contenido de calidad fotográfica y como fuente de búsquedas e inspiración. Este Frontend consiste en una aplicacion web desarrollada con React
.
.

### ******\_\_******Í N D I C E

### Páginas.

.
.
---Pagina de Registro: página en la que introducir los datos de alta de un usuario (Contraseña, Correo Electrónico y nombre de usuario)
.
.
--- Pagina de Validation: página en que validar los usuarios a través del link que reciben en su correo para activar su cuenta.

.
.
----Pagina de Login: pagina en la que logeearse con sus credenciales de usuario.
.
.
--- Página de inicio (Posts) con las publicaciones de los usuarios. El primero es la parte superior es el más reciente.
Podemos entrar en un post clickando sobre la foto, entrar en la pagina de posts del usuario que la posteo clickando su nombre.
Posibilidad de votar la publicacion de 1-5.
Esta página, además, tiene un buscador que permite filtrar lo mostrado.
(Las búsquedas pueden ser de usuarios, lugares o keywords (permite filtrar por igualdades parciales). y usuarios específicos)
.
.
--- Página de postsTop: similar a la posts, peros sólo aparecen los más valorados por otros usuarios, también puedes filtrar la búsqueda (que también mostrara los resultados mas valorados de la misma).
.
.
--- Página del Post: página que pinta un post, única que muestra los comentarios y desde la cual se pueden dejar. También se permite votar desde aquí, siempre y cuando no seas tu el que la público.
.
.
--- Página de editUser: con las opciones de cambiar contraseña, correo y avatar.
.
.
--- Página con todas tus públicaciones (la foto de tu avatar en el ul del Nav), tambén puedes acceder a la de otros usuarios clickando sobre su nombre en una publicacion o comentario o en el búscador.
.
.
--- Pagína de crear publicaciones, que incluyen imagenes, descripciones y lugar (sin usar geolocalizadores, "libertar de texting").
.
.
.
.

### Componentes:

.
.
.
--- AVATAR: Componente que pinta, si tiene, una img de la foto "avatar" del usuario.
.
.
--- COMMENTFORM: Componente que devuelve un UL con los comentarios de la foto y pinta el FORM para poder insertar comentarios.
.
.
--- DELETECOMENTPOST: Componente que Elimina de la base de datos el comentario del post si clickas sobre él botton (sólo para dueños del comentario).
.
.
--- DELETEPOST: Componente que Elimina de la base de datos el el post si clickas sobre él botton y confirmas (sólo para dueños del comentario).
.
.
--- EMAILBUTTON: Componente que devuelve un botton que hace un fetch para solicitar cambiar email (pendiente confirmación).
.
.
--- ERRORMESSAGE: Componente que retorna el mensaje del back de error en un P para que sea visible la info.
.
.
--- MODAL: Componente que abre un modal, se utiliza para mensajes de confirmación.
.
.
--- NAV: Componente que devuelve la barra de navegación, ul ,donde en cada li nos pinta las opciones de navegación.
.
.
--- NAVHEAD: Componente que devuelve el nav con un Ul con el logo y h1 del proyecto como la opcion de logout si estas loggeado.
.
.
--- PASSBUTTON: Componente que devuelve un botton para solicitar qie te envien un correo confirmando el cambio de contraseña
.
.
--- POST: Componente encargado de pintar en un Article todas las propiedasdes del post guardadas en la BBDD.
.
.
--- POSTLIST: Componente encargado de cargar el array de Posts y los devuelve en un Ul.
.
.
--- POSTPHOTO: Componente encargado de pintar la imagen del post.
.
.
---POSTVOTESSTARS: Componente encargado de registrar la puntuacion en la valoracion de 1-5
.
.
---SEARCHFORM: Componente que permite buscar en el array de POSTS que se esté pintando, en base a keywords.
.
.
---SPINNER: Componente que muestra un spinner mientras carga la página.
.
.
--STARICON: Componente que se encarga de pintar las Estrellas.
.
.
.

### Contextos:

-----------------------TokenContext: se crea este contexto para tener acceso a la varibale token desde todas las paginas con facilidad y con un código más limpio
.
-----------------------PostContext: Este contexto, no siendo necesario se llevó a cabo como solución a un problema presentado con el hook destinado a este fin, siendo el resultado positivo y repitiéndolo.
.
-----------------------PostsTopContext:
.
.

### Utils:

----------------------getTimeAgo: función para devolver la diferencia de tiempo desde que un comentario o post fue creado.
.
.
.

### Objetivos Futuros (C/P).

.
Poder guardar Posts de otros usuarios con un boton de favorito y que cada usuario tenga en su pagina de posts la seccion de guardados y que sean visibles tanto por el propio usuario como por el resto de usuarios (de igualmanera que cuando acceden a su pagina ven sus posts verían sus guardados)
.
.
.

### Para instalar y configurar este proyecto, siga los siguientes pasos:

Clone este repositorio en su máquina local.

Abra una terminal en el directorio raíz del proyecto y ejecute el comando npm install para instalar todas las dependencias necesarias.

Cree un archivo .env en el directorio raíz del proyecto y proporcione los valores de configuración necesarios para el proyecto,
como credenciales de acceso a la base de datos y claves de API de servicios externos (si corresponde).

Ejecute el comando npm start en la terminal para iniciar la aplicación en modo de desarrollo.

############################################################################################### Estructura del proyecto ##########################################################################################################################

El proyecto sigue una estructura de directorios típica de una aplicación React. Los principales directorios y archivos del proyecto son:

src: este directorio contiene todos los archivos fuente del proyecto.

components: este directorio contiene todos los componentes React de la aplicación.

pages: este directorio contiene las páginas principales de la aplicación, como la página de inicio y el perfil del usuario.

styles: este directorio contiene los archivos de estilo CSS y otros recursos visuales utilizados en la aplicación.

App.js: el archivo principal que define la estructura de la aplicación y renderiza los componentes necesarios.

index.js: el archivo principal que inicia la aplicación y proporciona la configuración necesaria.

.
.
.
.

### Estado.

.
.
.
Completamente funcional
.
.
.

### Tecnologias.

.
.
.
Lenguaje de programación: JavaScript.
.
.
Biblitecas:
React y React Router
.
.
Lenguaje de Diseño:
CSS
.
.
.

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX........ C R E A D O R E S ..........XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
.
.

### ********\*\*\*\*********\*\*\*\*********\*\*\*\*********\_\_\_********\*\*\*\*********\*\*\*\*********\*\*\*\*********José Manuel Doldán Miras********\*\*\*\*********\*\*\*\*********\*\*\*\*********\_\_\_\_********\*\*\*\*********\*\*\*\*********\*\*\*\*********

.
.

### LINKEDIN: **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\*** https://www.linkedin.com/in/jos%C3%A9-manuel-dold%C3%A1n-miras-30118824b/

.

### GITHUB: \***\*\*\*\*\***\*\*\***\*\*\*\*\***\_\***\*\*\*\*\***\*\*\***\*\*\*\*\*** https://github.com/jdoldanmiras

.
.
.

### ********\*\*\*\*********\*\*\*\*********\*\*\*\*********\_\_\_********\*\*\*\*********\*\*\*\*********\*\*\*\********* MIGUEL RUIZ TOMÉ **********\*\***********\*\*\*\***********\*\***********\_\_\_**********\*\***********\*\*\*\***********\*\***********

### LINKEDIN: **\*\*\*\***\*\*\*\***\*\*\*\***\_\_\_**\*\*\*\***\*\*\*\***\*\*\*\*** https://www.linkedin.com/in/miguel-ruiz-tom%C3%A9-06922677/

### GITHUB: \***\*\*\*\*\***\*\*\***\*\*\*\*\***\_\***\*\*\*\*\***\*\*\***\*\*\*\*\*** https://github.com/Miruto20
