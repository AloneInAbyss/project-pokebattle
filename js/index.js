import { handleInput } from './display-handler.js'
import { getPokemons } from './pokemons.js'

handleInput('#form-search-pokemons', getPokemons)
