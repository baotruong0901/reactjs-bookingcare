import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender:false,
    isLoadingPosition:false,
    isLoadingRole:false,
    genders:[],
    roles:[],
    positions:[],
    users:[],
    topDoctors:[],
    allDoctors:[],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender:true,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders:action.data,
                isLoadingGender:false,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            return {
                ...state,
                isLoadingGender:false,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            console.log('position', action);
            return {
                ...state,
                positions:action.data,
                isLoadingPosition:false
            }
        case actionTypes.FETCH_POSITION_FAILDED:
            return {
                ...state,
                isLoadingPosition:false,

            }  
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles:action.data,
                isLoadingPosition:false
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            return {
                ...state,
                isLoadingPosition:false,

            } 
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return{
                ...state,
                users:action.users
            }  
        case actionTypes.FETCH_ALL_USERS_FAILDED:
            return{
                ...state
            } 
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return{
                ...state,
                topDoctors:action.dataDoctors
            }  
        case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
            return{
                ...state
            }  
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return{
                ...state,
                allDoctors:action.allDoctors
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
            return{
                ...state,
        }
        default:
            return state;
    }
}

export default adminReducer;
