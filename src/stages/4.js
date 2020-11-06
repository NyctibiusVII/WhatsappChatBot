const banco = require("../banco")
const main = require("../mainBD")

function execute(user, msg) {
  banco.db[user].stage = 0
  return [
    `Obrigado pela preferencia.`,
    `Para mais informações ligue para ${main.main_bd["tell"]}`,
  ]
}

exports.execute = execute