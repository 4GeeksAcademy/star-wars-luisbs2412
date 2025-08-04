export const initialStore = () => {
  return {
    favoritos: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'addFavorito': {
      const { name, uid, type } = action.payload;

      return {
        ...store,
        favoritos: [...store.favoritos, { name, uid, type }],
      };
    }

    case 'removeFavorito': {
      const { index } = action.payload;
      
      return {
        ...store,
        favoritos: store.favoritos.filter((_,i) => i !== index),
        
      };
    }

    case 'removeFavoritoByName': {
      const { name } = action.payload;

      return {
        ...store,
        favoritos: store.favoritos.filter(fav => fav.name !== name),
      };
    }
    default:
      throw Error('Unknown action.');
  }
}
