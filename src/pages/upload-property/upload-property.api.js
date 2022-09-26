import Axios from 'axios';

const equipmentListUrl = `${process.env.BASE_API_URL}/equipments`;
const salesTypeUrl = `${process.env.BASE_API_URL}/saleTypes`;
const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;
const insertPropertyUrl = `${process.env.BASE_API_URL}/properties`;



export const getSalesTypeList = () =>
  Axios.get(salesTypeUrl).then((response) => {
    return response.data;
  });

export const getEquipmentList = () =>
  Axios.get(equipmentListUrl).then((response) => {
    return response.data;
  });

export const getProvinceList = () =>
  Axios.get(provinceListUrl).then((response) => {
    return response.data;
  });

export const insertProperty = (property) =>
  Axios.post(`${insertPropertyUrl}`, property).then(({ data }) => data);