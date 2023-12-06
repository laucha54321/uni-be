import { Type, Static } from "@sinclair/typebox";

export const uriSchema = Type.Object({
  uri: Type.String(),
});

export type uriType = Static<typeof uriSchema>;

export const handler = (statusCode: Number, title: string, uri?: string) => {
  let url = "https://documenter.getpostman.com/view/21376738/2s9YeD9DWL#";

  switch (statusCode) {
    case 400:
      return {
        error: "Formato de Datos de " + title + " Incorrecto",
        code: statusCode,
        mensaje: "Para mas informacion: " + url + uri,
      };
    case 401:
      return {
        error: "Credenciales de " + title + " Incorectas",
        code: statusCode,
        mensaje: "Para mas informacion: " + url + uri,
      };
    case 403:
      return {
        error: "Error al autenticar en " + title + "",
        code: statusCode,
        mensaje: "Para mas informacion: " + url + uri,
      };
    case 404:
      return {
        error: "No existe " + title,
        code: statusCode,
        mensaje: "Para mas informacion: " + url + uri,
      };
    case 409:
      return {
        error: "Conflicto de atributo unico en " + title,
        code: statusCode,
        mensaje: "Para mas informacion: " + url + uri,
      };
    default:
      return {
        error: "Ocurrio un Error",
        code: statusCode,
        mensaje: "Para mas informacion: " + url + uri,
      };
  }
};
