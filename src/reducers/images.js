import { ADD_IMAGE, DELETE_IMAGE, EDIT_IMAGE, INIT_IMAGES} from '../constants/ImagesActionTypes';

const initialState = [];

export default function images(state = initialState, action) {

  console.log('reducer got action', action, state);  

  switch (action.type) {
    case ADD_IMAGE:
      var result = [action.response, ...state];
      console.log('new state', result);
      return result;

    case DELETE_IMAGE:
      return state.filter(img =>
        img.id !== id
      );

    case EDIT_IMAGE:
      return state.map(img =>
        (img.id === img.id ? {...img, description: description, uri:uri} : img)
      );

    case INIT_IMAGES:
      console.log('INIT_IMAGES reducer',action);
      return createImgArray(action.response.data);

    default:
      return state;
  }
}

function createImgArray(images){
  console.log('createImgArray',images);  
  return images;
}
