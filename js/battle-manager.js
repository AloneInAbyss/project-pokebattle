const battleFooter = document.querySelector('#pokebattle footer')
const resultsSection = document.querySelector('#results')

export const enableResults = () => {
  battleFooter.style.visibility = 'visible'
  resultsSection.style.display = 'flex'
}

export const disableResults = () => {
  battleFooter.style.visibility = 'hidden'
  resultsSection.style.display = 'none'
}

export const changeBattleValues = (selectedPokemons) => {
  const cards = document.querySelectorAll('.pokemon-battle-card')
  cards.forEach((card, key) => {
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
