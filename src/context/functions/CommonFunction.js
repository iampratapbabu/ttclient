import axios from "axios";
import { BASE_URL } from "../../config";



export const loadAllFeatures = async () => {
    try {
        const axiosRes = await axios({
            method: "POST",
            url: `${BASE_URL}/api/v1/features`,
            data: null,
        });
        console.log("loadAllFeatures [SUCCESS]", axiosRes.data);
        return axiosRes?.data;
    } catch (err) {
        console.log("loadAllFeatures [ERROR]", err);
        return err;
    }
}


