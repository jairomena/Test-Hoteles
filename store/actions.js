import axios from 'axios'

export const getHoteles = ({ commit }) => {
  axios.get('https://my-json-server.typicode.com/yickson/serverjson/hotels')
    .then((response) => {
      commit('SET_HOTELES', response.data)
    })
}

export const getHotel = ({ commit }, Hotelid) => {
  axios.get(`https://my-json-server.typicode.com/yickson/serverjson/hotels/${Hotelid}`)
    .then((response) => {
      commit('SET_HOTEL', response.data)
    })
}
