import axios from 'axios';




export const makeApiCall = async (method = null, payload = null, apiUrl = null) => {
    try {
        let token = localStorage.getItem('token');
        const axiosRes = await axios({
            method: method,
            headers: { "Authorization": `Bearer ${token}` },
            url:apiUrl,
            data: payload,
        });
        console.log("API called [SUCCESS]", axiosRes.data);
        return axiosRes?.data;
    } catch (err) {
        console.log("API called [ERROR]", err);
        return err;
    }
}