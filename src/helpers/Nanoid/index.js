const { customAlphabet } = require('nanoid')
const faker = require('faker')

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const number = '123456789'

module.exports = class Nanoid {
  static get (length) {
    const nanoid = customAlphabet(alphabet, length)
    return nanoid()
  }

  static getNumber (length, includeZero = false) {
    const source = includeZero ? number + '0' : number
    const nanoid = customAlphabet(source, length)
    return nanoid()
  }

  static getAlphabet () {
    const num = faker.random.number({ min: 0, max: 51 })
    return chars[num]
  }
}
