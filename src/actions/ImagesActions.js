import * as types from '../constants/ImagesActionTypes';

// export function addImage(uri, description, id) {

// console.log('addImage', arguments);

//   return {
//     type: types.ADD_IMAGE,
//     uri,
//     description
//   };
// }

export function addImage(name, uri) {

 return async function (dispatch, getState) {
      let response = await uploadImage(name, uri);
      console.log('uploadImage response', response);
      if(response.data){   
        dispatch({type: types.ADD_IMAGE, response});
      }
     };  
}

export function deleteImage(id) {
  return {
    type: types.DELETE_IMAGE,
    id
  };
}

export function editImage(id, src, description) {
  return {
    type: types.DELETE_IMAGE,
    id,
    src,
    description
  };
}

export function getInitialImages(){    

     return async function (dispatch, getState) {
      let response = await getServerImages();
      console.log('getInitialImages response', response);
      if(response.data){                
        dispatch({type: 'INIT_IMAGES', response});
      }else{
        console.log('getInitialImages server err');
      }
     };
    
}

//helpers

function getServerImages(){
    return fetch('http://im.dnw.ro/images',{
      method: 'get',
              headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +  localStorage.token
                }})
                .then(response => {
                  if(response.status != 500){
                    return response.json();                                    
                  }
                  else{
                    return response;
                }})                                            
          .catch(function(ex) {
                  console.log('getServerImages err', ex);                  
                })
}

function uploadImage(name, uri){  


  return  fetch('http://im.dnw.ro/uploads', {
                method: 'post',                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +  localStorage.token      
                },
                body: JSON.stringify({ initialFileName:name , uri:uri })})
                .then(response => {
                  if(response.status != 500){
                    return response.json();                                    
                  }
                  else{
                    return response;
                }})
                          

}