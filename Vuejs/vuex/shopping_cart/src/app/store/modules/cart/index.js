import axios from 'axios';

const state = {
	cartItems: []
};

const mutations = {
	UPDATE_CART_ITEMS(state, payload) {
		state.cartItems = payload;
	}
};

const actions = {
	getCartItems(context) {
		axios.get('/api/cart').then((response) => {
			context.commit('UPDATE_CART_ITEMS', response.data)
		});
	},

	addCartItem(context, cartItem) {
		axios.post('/api/cart', cartItem).then((response) => {
			context.commit('UPDATE_CART_ITEMS', response.data)
		});
	},

    removeCartItem(context, cartItem) {
    axios.post('/api/cart/delete', cartItem).then((response) => {
    context.commit('UPDATE_CART_ITEMS', response.data)
    });
    },

    removeAllCartItems(context) {
     axios.post('/api/cart/delete/all').then((response) => {
     context.commit('UPDATE_CART_ITEMS', response.data)
  });
    }
};

const getters = {
	cartItems: state => state.cartItems,

	cartTotal: state => {
		return state.cartItems.reduce((acc, cartItem) => {
			return(cartItem.quantity * cartItem.price) + acc;
		}, 0).toFixed(2);
	},

	cartQuantity: state => {
		return state.cartItems.reduce((acc, cartItem) => {
			return cartItem.quantity + acc;
		}, 0);
	}
};

const cartModule = {
	state,
	mutations,
	actions,
	getters
}


export default cartModule;