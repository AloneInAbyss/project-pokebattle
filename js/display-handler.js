import { enableResults } from './battle-manager.js'
import { disableResults } from './battle-manager.js'
import { changeBattleValues } from './battle-manager.js'

export const addSelectOptions = async (
  query,
  fetchPokemonsNames,
  generation
) => {
  const formElement = document.querySelector(query)
  const selectElements = formElement.querySelectorAll('select')
  const options = await fetchPokemonsNames(generation)

  selectElements.forEach((selectElement) => {
    options.forEach((pokemonName) => {
      const option = document.createElement('option')
      option.value = pokemonName
      option.innerText =
        pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
      selectElement.appendChild(option)
    })
  })
}

export const handleInput = (query, getPokemons) => {
  const formElement = document.querySelector(query)
  const selectElements = formElement.querySelectorAll('select')

  selectElements.forEach((selectElement) => {
    selectElement.addEventListener('change', (event) => {
      const values = []
      for (let element of selectElements.values()) {
        values.push(element.value)
      }
      submitForm(values, getPokemons, query)
    })
  })
}

const submitForm = async (values, getPokemons, query) => {
  const selectedPokemons = await getPokemons(values)
  changeDisplayValues(query, selectedPokemons)
  changeBattleValues(selectedPokemons)
}

const changeDisplayValues = (query, selectedPokemons) => {
  const cards = document.querySelectorAll(`${query} .card-body`)
  let areThreeSelected = true
  cards.forEach((card, key) => {
    if (!selectedPokemons[key]) {
      card.style.display = 'none'
      areThreeSelected = false
      return
    }

    const hp = card.querySelector('.hp-value')
    const atk = card.querySelector('.atk-value')
    const def = card.querySelector('.def-value')
    const spd = card.querySelector('.spd-value')
    const img = card.querySelector('img')

    card.style.display = 'flex'
    hp.innerText = selectedPokemons[key].stats[0].value
    atk.innerText = selectedPokemons[key].stats[1].value
    def.innerText = selectedPokemons[key].stats[2].value
    spd.innerText = selectedPokemons[key].stats[3].value
    img.src = selectedPokemons[key].sprites.front_default
  })

  if (!areThreeSelected) return disableResults()
  enableResults(selectedPokemons)
}
