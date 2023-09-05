// Crea un archivo llamado "media-recorder-js.d.ts" en tu proyecto.

declare module 'media-recorder-js' {
    export class MediaRecorderWrapper {
      constructor(stream: MediaStream);
  
      // Definir los métodos y propiedades que necesitas aquí.
      start(): void;
      stop(): void;
      // ...
    }
  
    // Agregar otros tipos necesarios si los hay.
  }
  