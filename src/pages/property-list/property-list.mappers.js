export const mapPropertyListFromApiToVm = (propertyList) => {
    return propertyList.map((property) => mapPropertyFromApiToVm(property));
}

const mapPropertyFromApiToVm = (property) => {
    return {
        id: property.id,
        title: property.title,
        rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
        squareMeter: `${property.squareMeter}m2`,
        notes: `${property.notes.substring(0, 240)}...`,
        price: `${property.price.toLocaleString()} €`,
        image: Array.isArray(property.images) ? property.images[0] : ''

    }
}

const getRoomWord = (rooms) => {
    return rooms > 1 ? "habitaciones" : "habitación";
}

//Funcion para mapear el filtro y obtener los query params de los select

export const mapFilterToQueryParams = filter => {
    let queryParams = "";
    if (filter.saleTypeId) {
        queryParams = `${queryParams}saleTypeIds_like=${filter.saleTypeId}&`;//se escribe el mismo nombre de propiedad y _like para que sea igual al del filtro, es decir, busca en el array el id que coincida con el que yo le he seleccionado
    }

    if (filter.provinceId) {
        queryParams = `${queryParams}provinceId=${filter.provinceId}&`;//en este caso no se busca en un array, simplemente se quiere que sea igual al que tengo en el filtro seleccionado
    }

    if (filter.minRooms) { //si la persona quiere filtrar por minrooms(si hay algo selccionado en ese select)
        queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`; //gte significa greatter than and equal y el & se pone para poder añadir mas filtros a ese
    }

    if (filter.minBathrooms) {
        queryParams = `${queryParams}bathrooms_gte=${filter.minBathrooms}&`;
    }

    if (filter.minPrice) {
        queryParams = `${queryParams}price_gte=${filter.minPrice}&`;//aqui gte mayor o igual al precio que pone en servidor
    }

    if (filter.maxPrice) {
        queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;//aqui lte menor o igual al precio que pone en servidor
    }
    return queryParams.slice(0, -1);//esto retorna el resultado y el slice es para eliminar el ultimo &
};