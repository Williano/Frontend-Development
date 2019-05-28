export default {
  addPet: (context, payload) => {
    context.commit('appendPet', payload)
  }
}
