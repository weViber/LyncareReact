import axios from "axios";
import baseUrl from "./apiConfig";

export const postEmail = ({ company, call, email, name, phone, desc, recaptchaToken }) => {
    return axios.post(
        `${baseUrl}/email`,
        { company, call, email, name, phone, desc, recaptchaToken },
        { timeout: 30000 }
    );
};