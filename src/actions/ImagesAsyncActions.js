import * as types from '../constants/ImagesActionTypes';

export function getInitialImages(){
     return function (dispatch, getState) {
            return fetch('http://localhost:8080/api/editMembers', {
                headers: {
                    'x-access-token': '212121',
                },
            })
                .then(response => response.json());
        };
}