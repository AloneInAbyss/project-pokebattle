import { addSelectOptions, handleInput } from './display-handler.js'
import { getPokemons, getPokemonsNames } from './pokemons.js'

const generation = '1'
addSelectOptions('#form-search-pokemons', getPokemonsNames, generation)
handleInput('#form-search-pokemons', getPokemons)
