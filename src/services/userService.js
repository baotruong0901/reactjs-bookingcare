import axios from '../axios';

const handleLoginApi = (email,password)=>{
    return axios.post('/api/login', {email,password})
}

const getAllUsers=(inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const CreateNewUserApi = (data)=>{
    return axios.post('/api/create-new-user', data)
}

const DeleteUserApi = (id)=>{
    return axios.delete('/api/delete-user', {data:{id}})
}

const updateUserApi=(data)=>{
    return axios.put('/api/edit-user', data)
}

const getAllCodeApi=(inputType)=>{
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeApi=(limit)=>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsApi=()=>{
    return axios.get(`/api/get-all-doctors`)
}

// const saveDoctorApi=()=>{
//     return axios.post(`/api/save-info-doctor`)
// }



export {
    handleLoginApi,
    getAllUsers,
    CreateNewUserApi,
    DeleteUserApi,
    updateUserApi,
    getAllCodeApi,
    getTopDoctorHomeApi,
    getAllDoctorsApi,
    // saveDoctorApi,
}