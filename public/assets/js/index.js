// fetch is th eclient side api, we can't use it in the node
async function getWeather(address) {
  const responce = await fetch(`/weather?address=${address}`)
  const data = await responce.json()

  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

// selectors
const form = document.querySelector('form')
const searchBox = document.getElementById('search')
const msg_1 = document.getElementById('message-1')
const msg_2 = document.getElementById('message-2')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const address = searchBox.value

  msg_1.style.fontWeight = 'bolder'
  msg_1.style.color = '#fff'
  msg_1.textContent = 'Loading...'
  msg_2.textContent = ''

  getWeather(address).then(({ error, place, weather }) => {
    if (error) {
      console.log(error)
      msg_1.style.color = 'red'
      msg_1.textContent = error
      msg_2.textContent = ''
    } else {
      msg_1.style.color = '#fff'
      msg_1.textContent = place
      msg_2.textContent = weather
    }
  })
})
