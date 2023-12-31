module.exports = class Root {
  static async root (req, res) {
    res.serialize({ ok: true })
  }
}
