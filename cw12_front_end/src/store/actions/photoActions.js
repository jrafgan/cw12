import axios from '../../axios-api';
import {push} from "connected-react-router";

export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchPhotosSuccess = photos => ({type: FETCH_PHOTOS_SUCCESS, photos});
export const fetchPhotoSuccess = photo => ({type: FETCH_PHOTO_SUCCESS, photo});
export const fetchFailure = error => ({type: FETCH_FAILURE, error});

export const getPhotos = id => {
    return dispatch => {
        let path = '/photos';

        if (id) {
            path += '?user=' + id;
        }
        return axios.get(path).then(
            response => {
                dispatch(fetchPhotosSuccess(response.data));
                console.log('thi is het Photos API res', response.data)
            });
    }
};

export const getPhoto = id => {
    return dispatch => {
        return axios.get('/photos/' + id).then(
            response => {
                dispatch(fetchPhotoSuccess(response.data));
                console.log(response.data);
            });
    };
};

export const addPhoto = cocktailData => {
    return dispatch => {
        return axios.post('/photos', cocktailData).then(
            response => {
                dispatch(push('/'));
                console.log(response.data);
            },
            error => {
                if (error.response) {
                    dispatch(fetchFailure(error.response.data));
                } else {
                    dispatch(fetchFailure({global: "No network connection "}))
                }
            });
    };
};

export const deletePhoto = id => {
    return dispatch => {
        return axios.delete('/photos?id=' + id).then(
            response => {
                dispatch(fetchPhotosSuccess(response.data));
            });
    };
};


