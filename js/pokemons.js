export async function getPokemonsNames(generation) {
  const pokemonsNames = await fetchPokemonsNames(generation)
  if (!pokemonsNames) return []
  return parsePokemonsNames(pokemonsNames)
}

export const fetchPokemonsNames = async (generation) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/generation/${generation}/`
  )
  if (response.status !== 200) return
  const data = await response.json()
  return data
}

const parsePokemonsNames = (data) => {
  return data.pokemon_species.map((pokemon) => {
    return pokemon.name
  })
}

export async function getPokemons(array) {
  const pokemonsList = await fetchPokemons(array)
  return parsePokemons(pokemonsList)
}

const fetchPokemons = async (names) => {
  const pokemons = names.map(async (name) => {
    if (!name) return
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (response.status !== 200) return
    const data = await response.json()
    return data
  })
  const result = await Promise.all(pokemons)
  return result
}

const parsePokemons = (pokemons) => {
  return pokemons.map((pokemon) => {
    if (!pokemon || !pokemon.stats || !pokemon.name || !pokemon.sprites) return
    return pokemon.stats.reduce(
      (acc, cur) => {
        if (!cur.stat) return acc
        switch (cur.stat.name) {
          case 'hp':
          case 'attack':
          case 'defense':
          case 'speed':
            acc.stats.push({ attribute: cur.stat.name, value: cur.base_stat })
            return { ...acc }

          default:
            return acc
        }
      },
      { name: pokemon.name, stats: [], sprites: pokemon.sprites }
    )
  })
}
