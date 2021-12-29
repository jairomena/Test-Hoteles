
export const SET_HOTELES = (state, hoteles) => {
  state.hoteles = hoteles
  state.hotelesaux = hoteles
}

export const SET_HOTEL = (state, hotel) => {
  state.hotel = hotel
}

export const filter = (state, param) => {
  state.hoteles = state.hotelesaux.filter(x => x.attributes.rarity === param)
}
