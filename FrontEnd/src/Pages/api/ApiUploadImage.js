import axios from './Axios';

export const sendImageToCloud = async (file) => {
    return await axios.post("/v1/cloud/upload-file", file).then((e) => {
        return e;
    }).catch((e) => {
        console.log('file err');
        return '';
    })

}