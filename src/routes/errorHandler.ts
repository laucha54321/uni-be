const handler = (statusCode:Number, title: string) => {
    switch(statusCode){
        case 400:
            return {
                error:"Formato de Datos de " + title + " Incorrecto",
                code:statusCode
            };
        case 404:
            return {
                error:"No existe " + title,
                code:statusCode
            };
        default:
            return {
                error:"Ocurrio un Error",
                code:statusCode
            }
    }
}

export default handler;