const { serialize } = require('#helpers/Serializer')

module.exports = async (req, res, next) => {
  res.serialize = (object) => {
    const retVal = serialize(object)
    res.status(200).json(retVal)
  }

  res.serializePost = (object) => {
    const retVal = serialize(object)
    res.status(201).json(retVal)
  }

  next()
}
