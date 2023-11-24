const handler = (statusCode:Number, title: string) => {
    switch(statusCode){
        case 400:
            return {error:"Formato de Datos de " + title + " Incorrecto"};
        case 404:
            return {error:"No existe " + title};
        default:
            return {error:"Ocurrio un Error"}
    }
}

export default handler;