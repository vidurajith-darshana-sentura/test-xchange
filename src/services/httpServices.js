import { getConfigurations, handleDispatch, handleErrors } from "./httpConfig";
import axios from 'axios';

//http post request
export const httpPost = (requestConfig) => {

    const url = requestConfig.url;
    const actionTypes = requestConfig.actionTypes;
    const data = requestConfig.data;
    const isAuth = requestConfig.isAuth;
    const isFormData = requestConfig.isFormData;
    const timeout = requestConfig.timeout;

    return async(dispatch)=>{

        dispatch({ type: actionTypes.REQUEST_ACTION })

        const configurations = await getConfigurations('post',url,data,isAuth,isFormData,timeout);

        axios(configurations)
            .then((res)=>{
                const result = res.data;
                console.log(result)

                if (result && result.code) {
                    if (parseInt(result.code) >= 400) {
                        console.log("RESL :")
                        handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: result.result})
                    } else {
                        console.log("HEHEHEN :")
                        handleDispatch(dispatch,actionTypes.SUCCESS_ACTION,{code: parseInt(result.code), result: result.result})
                    }
                } else {
                    console.log("RESL :",result)
                    handleDispatch(dispatch,actionTypes.SUCCESS_ACTION,null)
                }
            })
            .catch((error)=>{
                console.log(error.response)
                const result = error.response.data;
                if (error.response.status === 400 && result && result.code) {
                    handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: result.result})
                } else {
                    handleErrors(error,dispatch,actionTypes,{forceRequest: ()=>httpPost(requestConfig)});
                }
            })
    }
}


//http get request
export const httpGet = (requestConfig) => {

    const url = requestConfig.url;
    const actionTypes = requestConfig.actionTypes;
    const isAuth = requestConfig.isAuth;
    const isFormData = requestConfig.isFormData;
    const timeout = requestConfig.timeout;

    console.log("URL: ", actionTypes);


    return async(dispatch)=>{

        dispatch({ type: actionTypes.REQUEST_ACTION })

        const configurations = await getConfigurations('get',url,null,isAuth,isFormData,timeout);
        axios(configurations)
            .then((res)=>{
                const result = res.data;
                console.log("RES: ",result)
                if (parseInt(result.code) >= 400) {
                    handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: result?.result})
                } else {
                    handleDispatch(dispatch,actionTypes.SUCCESS_ACTION,{code: parseInt(result.code), result: result.result})
                }
            })
            .catch((error)=>{
                console.log(error.response)
                console.log("RES: ",error)
                const result = error.response.data;
                if (error.response.status === 400 && result && result.code) {
                    handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: result.result})
                } else {
                    handleErrors(error,dispatch,actionTypes,{forceRequest: ()=>httpPost(requestConfig)});
                }
            })
    }
}
