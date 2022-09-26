import Axios from "axios";

const url = `${process.env.BASE_API_URL}/properties`;

//esta funcion la actualizo para obtener la url + los queryparams despues de haber hecho el map y haberlos obtenido
export const getPropertyList = (queryParams) =>
    Axios.get(`${url}?${queryParams}`).then(response => {
        return response.data;
    });


//Métodos para recuperar los maestros de tipo de venta y de donde

const saleTypeListUrl = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypeList = () => Axios.get(saleTypeListUrl).then(response => {
    return response.data;
});


const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;

export const getProvinceList = () =>
    Axios.get(provinceListUrl).then(response => {
        return response.data;
    });