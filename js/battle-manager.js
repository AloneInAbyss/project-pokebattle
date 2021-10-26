const battleFooter = document.querySelector('#pokebattle footer')
const resultsSection = document.querySelector('#results')

export const enableResults = (selectedPokemons) => {
  battleFooter.style.visibility = 'visible'
  resultsSection.style.display = 'flex'

  const formElement = document.querySelector('#form-pokebattle')
  const selectElement = formElement.querySelector('select')
  selectElement.addEventListener('change', (event) => {
    const attribute = selectElement.value
    const attributeList = {
      hp: 0,
      atk: 1,
      def: 2,
      spd: 3,
    }

    let maxValue = 0
    let winner = []
    for (let i = 0; i < selectedPokemons.length; i++) {
      const value = selectedPokemons[i].stats[attributeList[attribute]].value
      if (value > maxValue) {
        maxValue = value
        winner = [i]
      } else if (value == maxValue) {
        maxValue = value
        winner.push(i)
      }
    }

    const cards = document.querySelectorAll('.pokemon-battle-card')
    cards.forEach((card, key) => {
      if (winner.includes(key)) {
        card.classList.add('winner')
        card.classList.remove('loser')
        return
      }
      card.classList.remove('winner')
      card.classList.add('loser')
    })
  })
  selectElement.dispatchEvent(new Event('change'))
}

export const disableResults = () => {
  battleFooter.style.visibility = 'hidden'
  resultsSection.style.display = 'none'
}

export const changeBattleValues = (selectedPokemons) => {
  const cards = document.querySelectorAll('.pokemon-battle-card')
  cards.forEach((card, key) => {
    if (!selectedPokemons[key]) return

    const hp = card.querySelector('.hp-value')
    const atk = card.querySelector('.atk-value')
    const def = card.querySelector('.def-value')
    const spd = card.querySelector('.spd-value')
    const img = card.querySelector('img')
    const figure = card.querySelector('figure')
    const name = card.querySelector('.pokemon-name')

    hp.innerText = selectedPokemons[key].stats[0].value
    atk.innerText = selectedPokemons[key].stats[1].value
    def.innerText = selectedPokemons[key].stats[2].value
    spd.innerText = selectedPokemons[key].stats[3].value
    img.src = selectedPokemons[key].sprites.front_default
    figure.style.display = 'block'
    name.innerText =
      selectedPokemons[key].name.charAt(0).toUpperCase() +
      selectedPokemons[key].name.slice(1)
  })
}
