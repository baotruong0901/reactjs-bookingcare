import actionTypes from './actionTypes';
import { getAllCodeApi ,CreateNewUserApi,getAllUsers,DeleteUserApi,updateUserApi,getTopDoctorHomeApi,getAllDoctorsApi,saveDoctorApi,getDetailInforDoctorApi} from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });
export const fetchGenderStart = () => {
    return async (dispatch,getState)=>{
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res=await getAllCodeApi('gender')
            if(res && res.errCode ===0){
               dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed())
            }
        }catch(err){
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error',err);
        }
    }
    
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
});

export const fetchPositionStart = () => {
    return async (dispatch,getState)=>{
        try{
            dispatch({type: actionTypes.FETCH_POSITION_START})
            let res=await getAllCodeApi('position')
            if(res && res.errCode ===0){
               dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        }catch(err){
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart error',err);
        }
    }
    
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data:positionData
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
});

export const fetchRoleStart = () => {
    return async (dispatch,getState)=>{
        try{
            dispatch({type: actionTypes.FETCH_ROLE_START})
            let res=await getAllCodeApi('role')
            if(res && res.errCode ===0){
               dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed())
            }
        }catch(err){
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart error',err);
        }
    }
    
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data:roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
});


export const createNewUser = (data) =>{
    return async (dispatch,getState)=>{
        try{
            let res=await CreateNewUserApi(data)
            toast.success('Create new user succeed!')
            if(res && res.errCode ===0){
               dispatch(saveUserSuccess())
               dispatch(fetchAllUsersStart())
            }else{
                dispatch(saveUserFailded())
            }
        }catch(err){
            dispatch(saveUserFailded())
            console.log('createNewUser error',err);
        }
    }
}

export const saveUserSuccess = ()=>({
    type:actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailded = ()=>({
    type:actionTypes.FETCH_ROLE_FAILDED
})


export const fetchAllUsersStart = () =>{
    return async (dispatch,getState)=>{
        try{
            let res=await getAllUsers('ALL')
            if(res && res.errCode ===0){
               dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                dispatch(fetchAllUsersFaild())
            }
        }catch(err){
            dispatch(saveUserFailded())
            console.log('fetchAllUsersStart error',err);
        }
    }
}

export const fetchAllUsersSuccess = (data)=>({
    type:actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFaild = ()=>({
    type:actionTypes.FETCH_ALL_USERS_FAILDED
})


export const deleteUser = (id) =>{
    return async (dispatch,getState)=>{
        try{
            let res=await DeleteUserApi(id)
            toast.success('Delete user succeed!')
            if(res && res.errCode ===0){
               dispatch(deleteUserSuccess())
               dispatch(fetchAllUsersStart())
            }else{
                toast.error('Fetch all users error!')
                dispatch(deleteUserFaild())
            }
        }catch(err){
            toast.error('Fetch all users error!')
            dispatch(deleteUserFaild())
            console.log('Delete user error',err);
        }
    }
}

export const deleteUserSuccess = ()=>({
    type:actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFaild = ()=>({
    type:actionTypes.DELETE_USER_FAILDED
})

export const updateUser = (data) =>{
    return async (dispatch,getState)=>{
        try{
            let res=await updateUserApi(data)
            toast.success('Update user succeed!')
            if(res && res.errCode ===0){
               dispatch(updateUserSuccess())
               dispatch(fetchAllUsersStart())
            }else{
                toast.error('Fetch all users error!')
                dispatch(updateUserFaild())
            }
        }catch(err){
            toast.error('Fetch all users error!')
            dispatch(updateUserFaild())
            console.log('updateUserFaild user error',err);
        }
    }
}

export const updateUserSuccess = ()=>({
    type:actionTypes.UPDATE_USER_SUCCESS,
})
export const updateUserFaild = ()=>({
    type:actionTypes.UPDATE_USER_FAILDED
})

export const fetchTopDoctor = () =>{
    return async (dispatch,getState)=>{
        try{
            let res=await getTopDoctorHomeApi('')
            if(res && res.errCode ===0){
               dispatch(fetchTopDoctorSuccess(res.data))
            }else{
                dispatch(fetchTopDoctorFaild())
            }
        }catch(err){
            dispatch(fetchTopDoctorFaild())
            console.log('fetchTopDoctorFaild error',err);
        }
    }
}
export const fetchTopDoctorSuccess = (data)=>({
    type:actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors:data
})
export const fetchTopDoctorFaild = ()=>({
    type:actionTypes.FETCH_TOP_DOCTORS_FAILDED
})



export const fetchAllDoctors = () =>{
    return async (dispatch,getState)=>{
        try{
            let res=await getAllDoctorsApi()
            if(res && res.errCode ===0){
               dispatch(fetchAllDoctorsSuccess(res.data))
            }else{
                dispatch(fetchAllDoctorsFaild())
            }
        }catch(err){
            dispatch(fetchAllDoctorsFaild())
            console.log('fetchAllDoctors error',err);
        }
    }
}

export const fetchAllDoctorsSuccess = (data)=>({
    type:actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    allDoctors:data
})
export const fetchAllDoctorsFaild = ()=>({
    type:actionTypes.FETCH_ALL_DOCTORS_FAILDED
})

export const saveDoctor = (data) =>{
    return async (dispatch,getState)=>{
        try{
            let res=await saveDoctorApi(data)
            if(res && res.errCode ===0){
                toast.success('Save information doctor succeed!')
               dispatch(fetchSaveDoctorSuccess())
            }else{
                toast.error('Save information doctor failed!!')
                dispatch(fetchSaveDoctorFaild())
            }
        }catch(err){
            dispatch(fetchSaveDoctorFaild())
            console.log('saveDoctor error',err);
        }
    }
}

export const fetchSaveDoctorSuccess = ()=>({
    type:actionTypes.SAVE_DOCTOR_SUCCESS,
})
export const fetchSaveDoctorFaild = ()=>({
    type:actionTypes.SAVE_DOCTOR_FAILDED
})

export const fetchDetailInfoDoctor = (id) =>{
    return async (dispatch,getState)=>{
        try{
            let res=await getDetailInforDoctorApi(id)
            if(res && res.errCode ===0){
               dispatch(fetchDetailInfoDoctorSuccess(res.data))
            }else{
                dispatch(fetchDetailInfoDoctorFaild())
            }
        }catch(err){
            dispatch(fetchDetailInfoDoctorFaild())
            console.log('fetchAllDoctors error',err);
        }
    }
}

export const fetchDetailInfoDoctorSuccess = (data)=>({
    type:actionTypes.FETCH_DETAIL_INFO_DOCTOR_SUCCESS,
    detailDoctor:data
})
export const fetchDetailInfoDoctorFaild = ()=>({
    type:actionTypes.FETCH_DETAIL_INFO_DOCTOR_FAILDED
})