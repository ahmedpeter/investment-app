import React from "react";
import '../App.css'

export const ErrorToaster=(prop)=>{
    return(
        <div className="toaster err">
            { prop.message } 
        </div>
    );
};


export  const  SuccessToaster=(prop)=>{
    return(
        <div className="toaster success">
           { prop.message } 
        </div>
    );
};


// export default Toaster;
