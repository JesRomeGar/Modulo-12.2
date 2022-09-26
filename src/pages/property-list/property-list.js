/*
mapper necesario para pintar la lista de casas:

Property {
    id: string;
    title: string;
    rooms: string; //3 habitaciones
    sqareMeter: string; //136m2
    notes: string; // truncar a 240chars + ...
    price: string; // 120000€
    image: string; // 1a imagen en base64

}
*/

import { getPropertyList, getSaleTypeList, getProvinceList } from "./property-list.api";
import { mapPropertyListFromApiToVm, mapFilterToQueryParams } from "./property-list.mappers";
import { addPropertyRows, setOptions/*Le paso la lista y el id de donde quiero pintarla y un valor por defecto y muestra los datos*/, clearPropertyRows/*esta funcion borra los elementos anteriores para que al pulsar el submit me pinte solo lo que he seleccionado */ } from "./property-list.helpers";
import { roomOptions, bathroomOptions, minPriceOptions, maxPriceOptions } from "./property-list.constants"
import { onUpdateField, onSubmitForm } from "../../common/helpers";


//CARGADO DE MAESTROS DE SERVIDOR: array de promesas que queremos tener resueltas para poder ejecutar lo siguiente
Promise.all([
    getPropertyList(),
    getSaleTypeList(),
    getProvinceList(),
]).then(resultList => {
    const propertyList = resultList[0];
    const saleTypeList = resultList[1];
    const provinceList = resultList[2];
    loadPropertyList(propertyList);
    setOptions(saleTypeList, "select-sale-type", "¿Qué venta?");
    setOptions(provinceList, "select-province", "¿Dónde?");
    setOptions(roomOptions, "select-room", "¿Habitaciones?");
    setOptions(bathroomOptions, "select-bathroom", "¿Cuartos de baño?");
    setOptions(minPriceOptions, "select-min-price", "Min (€)");
    setOptions(maxPriceOptions, "select-max-price", "Max (€)");
});
/*
Esto tambien puede expresarse así:

Promise.all([
getPropertyList(),
getSaleTypeList(),
getProvinceList(),
]).then(resultList => {
--destructuring--
const [propertyList, saleTypeList, provinceList] = resultList;
});
o así: 

Promise.all([
getPropertyList(),
getSaleTypeList(),
getProvinceList(),
]).then(([propertyList, saleTypeList, provinceList]) => {

});
*/

const loadPropertyList = propertyList => {
    const vMPropertyList = mapPropertyListFromApiToVm(propertyList);
    addPropertyRows(vMPropertyList);
};



//RECOGER LA INFORMACION DEL FORMULARIO
let filter = {
    saleTypeId: "",
    provinceId: "",
    minRooms: "",
    minBathrooms: "",
    minPrice: "",
    maxPrice: "",
};

onUpdateField("select-sale-type", event => {
    const value = event.target.value;
    filter = {
        ...filter,
        saleTypeId: value,
    };
});

onUpdateField("select-province", event => {
    const value = event.target.value;
    filter = {
        ...filter,
        provinceId: value,
    };
});

onUpdateField("select-room", event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minRooms: value,
    };
});

onUpdateField("select-bathroom", event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minBathrooms: value,
    };
});

onUpdateField("select-min-price", event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minPrice: value,
    };
});

onUpdateField("select-max-price", event => {
    const value = event.target.value;
    filter = {
        ...filter,
        maxPrice: value,
    };
});

onSubmitForm("search-button", () => {
    // Url que estamos usando ahora mismo: http://localhost:3000/api/properties
    // Por ejemplo para filtrar por num de habitaciones seriá asi: `http://localhost:3000/api/properties?rooms_gte=${filter.minRooms}`
    // Hay que utilizar un mapper para que nos pinte lo que seleccionamos en los select

    const queryParams = mapFilterToQueryParams(filter);
    clearPropertyRows();
    getPropertyList(queryParams).then(propertyList => {
        loadPropertyList(propertyList)
    });
    //Uso el mapper de los queryparams para obtener las propiedades filtradas, usarlos en la funcion de getpropertylist y cuando nos lleguen los datos cargarla mediante loadpropertylist
});