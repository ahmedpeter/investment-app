import { toast } from "react-toastify";
import axios from "axios";
import {saveAs} from 'file-saver';


export const FileUploader = (url, title, val, msg, func ) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();
        formData.append(title, val)
        if(!val){
        toast.error("Select a file to Upload");
        return
        }
        axios
        .put(url, formData, config)
        .then((res) => {
            toast.success(`${msg} Uploaded successfully!`);
            // cause a re-render of state
            func();
            
        })
        .catch((err) => toast.error("Error Uploading File. Try Again"));
  };


  export const DownloadFile = (url) => {
      saveAs(url);
    }