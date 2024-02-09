import { PINATA_KEY, PINATA_URL } from "../constants/config";
import axios from 'axios';

/**
 * 
 * @param {*} data data to upload file to IPFS
 * @param {*} progress callback to display progress (progress: number) => {}
 * @returns Promise
 */
export const uploadToPinata = (data, progress) => new Promise(async(resolve, reject) => {

    const formData = new FormData();
    formData.append('file', data)
    formData.append('pinataMetadata', JSON.stringify({ name: 'mint.bidify.cloud' }));
    formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

    // const formData = new FormData();
    // formData.append('file', fileStream.data, {
    //     filename: 'your_file_name'
    // });
    
    
    const res = await axios.post(PINATA_URL, formData, {
        maxBodyLength: "Infinity",
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization' : `Bearer ${PINATA_KEY}`,
        },
        onUploadProgress: progress
    }).catch(err => {
        reject("IPFS upload failed");
    });

    resolve(res.data);
});
