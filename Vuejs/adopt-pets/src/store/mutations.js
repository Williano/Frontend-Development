export default {
  appendPet: (state, payload) => {
    state[payload.species].push(payload.pet)
  }
}
