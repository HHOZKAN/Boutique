export const localStorageMiddleware = store => next => action => {
    let result = next(action);
  
    if (['cart/addToCart', 'cart/removeFromCart'].includes(action.type)) {
      const cart = store.getState().cart;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    return result;
  };