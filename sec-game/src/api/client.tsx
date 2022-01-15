import {apiInstance} from "./apiInstance";

export const submitClick = async (data) => {
    const url = '/clickReceive';
    return await apiInstance.post(url, data);
}