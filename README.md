# Proyecto de Desarrolló de Software - BackEnd
Desarrollo de una API con Node.js, Fastify y MariaDB: Gestión de Notas para Alumnos y Profesores.

## Formato - Base de Datos
```mermaid
classDiagram
  direction LR
personas  "*" -- "*" cursoPersona
personas  "1" -- "*" notas
notas  "*" -- "1" curso
curso  "1" -- "*" cursoPersona
class notas{
  String id PK
  String id_persona FK
  String id_curso FK
  Number calificacion
  String Descripcion
}
class curso{
  String id PK
  String Nombre
  String Descripcion
}
class cursoPersona{
  String id PK
  String id_curso FK
  String id_persona FK
  String categoria
}
class personas{
  String id PK
  String nombres
  String dni
  String hash
  String email
}
```
