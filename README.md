# PRÁCTICA 9 - APLICACIÓN DE PROCESAMIENTO DE NOTAS DE TEXTO
### *ASIGNATURA:* Desarrollo de Sistemas Informáticos
 > **NOMBRE COMPLETO:** DANIELE VITALE  
 > ID ALU: ALU0101329017  
 > E-MAIL: alu0101329017@ull.edu.es  
 > CURSO: 3ro Ingeniería Informática   

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale/actions/workflows/node.js.yml)
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale/actions/workflows/coveralls.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-DanyVitale)

## **ÍNDICE**   
1. [INTRODUCCIÓN](#id1)
2. [DESCRIPCIÓN](#id2)  
  a. [ADD](#id3)  
  b. [LIST](#id4)  
  c. [READ](#id5)  
  d. [DELETE](#id6)  
  e. [EDIT](#id7)
3. [CONCLUSIONES](#id8)

# INTRODUCCIÓN<a name="id1"></a>
La práctica consta de una aplicación que permite gestionar notas de texto en un sistema de archivos. En específico permite al usuario crear, leer, modificar y eliminar notas de texto.  

Antes de empezar hay que hacer una serie de tareas previas que comprenden lo siguiente:
- [x] Aceptar la [asignación de GitHub Classroom](https://classroom.github.com/a/8yO8h5vy) asociada a esta práctica.
- [x] Aprender a utilizar los paquetes [yargs](https://www.npmjs.com/package/yargs) y [chalk](https://www.npmjs.com/package/chalk)
- [x] Familiarizarse con el [API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros.](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#synchronous-api)

# DESCRIPCIÓN<a name="id2"></a>
Como mencionado anteriormente, la aplicación permite gestionar notas de texto en un sistema de archivos. En específico permite al usuario crear, leer, modificar y eliminar notas de texto.
Lo primero fue crear una clase que representa una nota de texto en un fichero independiente llamado `note.ts` que se encuentra en el directorio `./Notas`.

```typescript
export class Note {
  constructor(private readonly user: string, private title: string, private body: string, private color: string) {}

  // Code goes here...

```

La misma consta de los siguientes atributos:
- `user`: nombre de usuario del creador de la nota.
- `title`: título de la nota.
- `body`: cuerpo de la nota.
- `color`: color de la nota.

Los únicos métodos desarrollados son los correspondientes getters:
- `getUser()`: devuelve el nombre de usuario del creador de la nota.

```typescript
getUser(): string { return this.user; }
```
- `getTitle()`: devuelve el título de la nota.

```typescript
getTitle(): string { return this.title; }
```
- `getBody()`: devuelve el cuerpo de la nota.

```typescript
getBody(): string { return this.body; }
```
- `getColor()`: devuelve el color de la nota.

```typescript
getColor(): string { return this.color; }
```

A continuación, pasamos al fichero que podemos considerar como el principal ya que en él se desarrollaron todos los comandos de la aplicación.
Es fundamental destacar que se importaron varias librerias para el desarrollo de la aplicación:
- [yargs](https://www.npmjs.com/package/yargs)
- [chalk](https://www.npmjs.com/package/chalk)
- [fs](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#synchronous-api)

Pasando a los comandos desarrollados e implementados en la app son los siguientes:
- `add`: permite al usuario crear una nueva nota.
- `list`: permite al usuario listar todas las notas existentes.
- `read`: permite al usuario leer una nota existente.
- `delete`: permite al usuario eliminar una nota existente.
- `edit`: permite al usuario editar una nota existente.

En primer lugar se creó una función writeNote que permite escribir una nota en un fichero.

```typescript
export function writeNote(user: string, title: string, body: string, color: string): void {
  if (!fs.existsSync(`./src/Notas/${user}`)) {
    fs.mkdirSync(`./src/Notas/${user}`);
  }
  fs.writeFile(`./src/Notas/${user}/${title}.json`, JSON.stringify(new Note(user, title, body, color)), (err) => {
    if (err) {
      throw err;
    }
    console.log(chalk.green('Note created successfully'));
  });
}
```
Como se puede ver, lo primero que hace es comprobar si existe el directorio del usuario haciendo uso de la función `fs.existsSync`, en caso de que no exista se crea en la ruta `./src/Notas/` y haciendo uso de la función `fs.mkdirSync`.
Sucesivamente, se escribe la nota en el fichero con la función `fs.writeFile` y se muestra un mensaje de éxito en la consola. En caso de error se muestra un mensaje de error.
## ADD<a name="id3"></a>
Empezamos con los que son los comandos de la aplicación. El primero en el que se desarrolla es `add` que permite al usuario crear una nueva nota.

```typescript
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'The user of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'The body of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'The color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.color === 'string' && typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string') {
      writeNote(argv.user, argv.title, argv.body, argv.color);
    } else {
      console.log(chalk.red('Error: Invalid arguments'));
    }
  },
});
```

Lo primero que hace es obviamente, como en todos los comandos futuros, comprobar que los argumentos son correctos y en este caso se necesitarán todos los atributos de la clase Note.

Una vez en el handler, se comprueba si los argumentos tienen el formato correcto, en caso de que no se muestra un mensaje de error. En caso de que si se procede a escribir la nota en el fichero con la función `writeNote`, creada anteriormente.

# LIST<a name="id4"></a>

Pasamos al comando `list` que permite al usuario listar todas las notas existentes y que se desarrolla de la siguiente manera:

```typescript
yargs.command({
  command: 'list',
  describe: 'List all notes',
  builder: {
    user: {
      describe: 'The user of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.user === 'string') {
      if (!fs.existsSync(`./src/Notas/${argv.user}`)) {
        fs.mkdirSync(`./src/Notas/${argv.user}`);
      }
      fs.readdir(`./src/Notas/${argv.user}`, (err, files) => {
        if (err) {
          throw err;
        }
        console.log(chalk.blue('Listing notes for user: ' + argv.user));
        if (files.length === 0) {
          console.log(chalk.yellow('Empty list'));
        }
        files.forEach((file) => {
          fs.readFile(`./src/Notas/${argv.user}/${file}`, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            const color = JSON.parse(data).color;
            switch (color) {
              case 'red':
                console.log(chalk.red(JSON.parse(data).title));
                break;
              case 'green':
                console.log(chalk.green(JSON.parse(data).title));
                break;
              case 'blue':
                console.log(chalk.blue(JSON.parse(data).title));
                break;
              case 'yellow':
                console.log(chalk.yellow(JSON.parse(data).title));
                break;
              default:
                console.log(chalk.white(JSON.parse(data).title));
                break;
            }
          });
        });
      });
    } else {
      console.log(chalk.red('Error: Invalid arguments'));
    }
  },
});
```

Lo primero es comprobar los argumentos, en este caso solo se necesita el atributo `user`.  
En el handler, se comprueba si el usuario existe en el directorio de notas, en caso de que no se muestra un mensaje de error y, en caso de que si se procede a leer el directorio y mostrar todas las notas existentes.  
Cabe resaltar que en el método de impresión de las notas se utiliza un switch para cambiar el color de la nota dependiendo del atributo `color` de ella y para el desarrollo de este comando se utilizaron los comandos `fs.readdir` y `fs.readFile` para leer el directorio y leer el fichero de la nota.

## READ<a name="id5"></a>
El comando `read` permite al usuario leer una nota existente correspondiente a su carpeta de notas. Los parámetros que se necesitan son el usuario y el título de la nota y que, por lo tanto son los atributos a comprobar. Se desarrolla de la siguiente manera:

```typescript
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'The user of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      fs.readFile(`./src/Notas/${argv.user}/${argv.title}.json`, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        const color = JSON.parse(data).color;
        switch (color) {
          case 'red':
            console.log(chalk.red(JSON.parse(data).body));
            break;
          case 'green':
            console.log(chalk.green(JSON.parse(data).body));
            break;
          case 'blue':
            console.log(chalk.blue(JSON.parse(data).body));
            break;
          case 'yellow':
            console.log(chalk.yellow(JSON.parse(data).body));
            break;
          default:
            console.log(chalk.white(JSON.parse(data).body));
            break;
        }
      });
    } else {
      console.log(chalk.red('Error: Invalid arguments'));
    }
  },
});
```

Una vez comprobados los argumentos, se procede a leer la nota correspondiente al usuario y al título. A continuación, haciendo uso del comando `fs.readFile` se lee el fichero de la nota en la ruta correspondiente. Si la lectura tuvo éxito se muestra el contenido de la nota en el color correspondiente a la nota, en caso contrario se muestra un mensaje de error.

## DELETE<a name="id6"></a>

El comando `delete` permite al usuario, como se puede deducir, eliminar una nota existente correspondiente a su carpeta de notas.

```typescript
yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    user: {
      describe: 'The user of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      fs.unlink(`./src/Notas/${argv.user}/${argv.title}.json`, (err) => {
        if (err) {
          throw err;
        }
        console.log(chalk.green('Note deleted successfully'));
      });
    } else {
      console.log(chalk.red('Error: Invalid arguments'));
    }
  },
});
```

Una vez comprobados los argumentos, se procede a eliminar la nota correspondiente al usuario y al título. A continuación, haciendo uso del comando `fs.unlink` se elimina el fichero de la nota en la ruta correspondiente. Si la eliminación tuvo éxito se muestra un mensaje en verde, en caso contrario se muestra un mensaje de error.

## EDIT<a name="id7"></a>
El comando `edit` permite al usuario editar una nota existente correspondiente a su carpeta de notas. Los parámetros a necesitar son iguales a los atributos de la clase Note, por lo que se desarrolla de la siguiente manera:

```typescript
yargs.command({
  command: 'edit',
  describe: 'Edit a note',
  builder: {
    user: {
      describe: 'The user of the note',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'The body of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'The color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      fs.readFile(`./src/Notas/${argv.user}/${argv.title}.json`, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        const note = JSON.parse(data);
        note.body = argv.body;
        note.color = argv.color;
        fs.writeFile(`./src/Notas/${argv.user}/${argv.title}.json`, JSON.stringify(note), (err) => {
          if (err) {
            throw err;
          }
          console.log(chalk.green('Note edited successfully'));
        });
      });
    } else {
      console.log(chalk.red('Error: Invalid arguments'));
    }
  },
});
```

Comprobados los parámetros, se procede a leer la nota correspondiente al usuario y al título. A continuación, haciendo uso del comando `fs.readFile` se lee el fichero de la nota en la ruta correspondiente. Si la lectura tuvo éxito se procede a editar el contenido de la nota, en caso contrario se muestra un mensaje de error.
A la hora de editar la nota, se procede a guardar el nuevo contenido en el fichero correspondiente y haciendo uso del comando `fs.writeFile` se guarda el nuevo contenido en el fichero correspondiente. Si la escritura tuvo éxito se muestra un mensaje en verde, en caso contrario se muestra un mensaje de error.

# CONCLUSIONES<a name="id8"></a>
La práctica ha sido muy interesante para aprender a trabajar con el lenguaje asíncrono Node.js y haciendo uso de librerias que llegaron a manifestarse muy cómodas a la hora de desarrollar la aplicación como por ejemplo, yargs, fs, chalk, etc. Además, se pudo profundizar el tema del sistema de archivos y el manejo de errores.
Se intentó hacer una aplicación que permita al usuario crear, leer, listar, editar y eliminar notas, teniendo en cuenta que los usuarios no pueden conectarse simultáneamente a la aplicación.



