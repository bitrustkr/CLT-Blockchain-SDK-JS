
const english = require('./words/english.json')
const korean = require('./words/korean.json')

const COUNT = 12

const generateMnemonic = language => {
  let words = [...english]
  let generatedMnemonic = []

  for (let i = 0 ; i < 12; ++i){
    let randomIndex = Math.floor(Math.random()*words.length)
    generatedMnemonic.push(words[randomIndex])
    
    let front = words.slice(0, randomIndex)
    let back = words.slice(randomIndex + 1, words.length)
    words = front.concat(back)
  }

  return generatedMnemonic.join(', ')
}

module.exports = {
  generateMnemonic
}