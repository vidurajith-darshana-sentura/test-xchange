import {httpGet, httpPost} from "../../services/httpServices";
import {resetActionTypes} from "../actionTypes/resetActionTypes";
import {completeProfileUrl, profileDetailsUrl, syncFCMUrl} from "../../configurations/urlConfigurations";
import {completeProfileActionTypes, fcmActionTypes, profileDetailsActionTypes} from "../actionTypes/profileActionTypes";

//network requests here

export const syncFCMAction = (data) => {
    return httpPost({
        isAuth: true,
        url: syncFCMUrl,
        actionTypes: fcmActionTypes,
        data
    })
}

export const getProfileDetails = (email) => {
    return httpGet({
        isAuth: true,
        url: `${profileDetailsUrl}/${email}`,
        actionTypes: profileDetailsActionTypes,
    })
}

export const completeProfileAction = (data) => {

    const formdata = new FormData();

    formdata.append('profileImage',data.profilePic);
    formdata.append('email',data.email);
    formdata.append('firstName',data.firstName);
    formdata.append('lastName',data.lastName);
    formdata.append('address',data.address);
    formdata.append('postalCode',data.postalCode);
    formdata.append('mobileNumber',data.mobileNumber);
    formdata.append('country',data.country);
    formdata.append('countryCode',data.countryCode);

    return httpPost({
        isAuth: true,
        isFormData: true,
        url: completeProfileUrl,
        actionTypes: completeProfileActionTypes,
        data: formdata
    })
}

// static requests here

export const resetProfileState = () => ({
    type: resetActionTypes.RESET_PROFILE_ACTION
})
