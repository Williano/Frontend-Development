import axios from 'axios';


const state = {
	productItems: []
};

const mutations = {
	UPDATE_PRODUCT_ITEMS(state, payload) {
		state.productItems = payload;
	}
};

const actions = {
	getProductItems(context) {
   axios.get('/api/products/')
		.then((response) => {
			context.commit('UPDATE_PRODUCT_ITEMS', response.data)
		});
	}
};

const getters = {
	productItems: state => state.productItems
};

const ProductModule = {
	state,
	mutations,
	actions,
	getters
}


export default ProductModule;