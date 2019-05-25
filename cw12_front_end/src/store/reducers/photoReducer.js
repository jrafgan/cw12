import {
    FETCH_PHOTO_SUCCESS,
    FETCH_PHOTOS_SUCCESS, FETCH_FAILURE} from "../actions/photoActions";

const initialState = {
    photos: null,
    photo: null,
    tracks: null,
    error: null
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_SUCCESS:
            return {...state, photos: action.photos};

        case FETCH_PHOTO_SUCCESS:
            return {...state, photo: action.photo};

        case FETCH_FAILURE:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default photoReducer;