import { enableResults } from './battle-manager.js'
import { disableResults } from './battle-manager.js'
import { changeBattleValues } from './battle-manager.js'

export const handleInput = (query, getPokemons) => {
  const formElement = document.querySelector(query)
  const selectElements = formElement.querySelectorAll('select')

  selectElements.forEach((selectElement) => {
    selectElement.addEventListener('change', (event) => {
      const values = []
      for (let element of selectElements.values()) {
        values.push(element.value)
      }
      submitForm(values, getPokemons)
    })
  })
}

const submitForm = async (values, getPokemons) => {
  const selectedPokemons = await getPokemons(values)
  changeDisplayValues(selectedPokemons)
  changeBattleValues(selectedPokemons)
}

const changeDisplayValues = (selectedPokemons) => {
  const cards = document.querySelectorAll('.pokemon-card')
  let areThreeSelected = true
  cards.forEach((card, key) => {
    const hp = card.querySelector('.hp-value')
    const atk = card.querySelector('.atk-value')
    const def = card.querySelector('.def-value')
    const spd = card.querySelector('.spd-value')
    const img = card.querySelector('img')
    const figure = card.querySelector('figure')

    if (!selectedPokemons[key]) {
      card.style.display = 'none'
      hp.innerText = ''
      atk.innerText = ''
      def.innerText = ''
      spd.innerText = ''
      img.src = ''
      figure.style.display = 'none'
      areThreeSelected = false
      return
    }

    card.style.display = 'flex'
    hp.innerText = selectedPokemons[key].stats[0].value
    atk.innerText = selectedPokemons[key].stats[1].value
    def.innerText = selectedPokemons[key].stats[2].value
    spd.innerText = selectedPokemons[key].stats[3].value
    img.src = selectedPokemons[key].sprites.front_default
    figure.style.display = 'block'
  })

  if (!areThreeSelected) return disableResults()
  enableResults(selectedPokemons)
}
