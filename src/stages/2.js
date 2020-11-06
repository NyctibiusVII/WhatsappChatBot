const banco = require("../banco")
const main = require("../mainBD")

function execute(user, msg) {
  if (msg === "*") {
    banco.db[user].stage = 0
    return [`Cancelado! \nVocê ainda pode dar uma olhada em nosso site a qualquer momento.\n\nAcesse: ${main.main_bd["linkSite"]}`]
  }

  if (msg === "#") {
    banco.db[user].stage = 3
  }

  let resumo = "     INTERESSE EM:\n" //" "x5
  banco.db[user].itens.forEach((value) => {
    console.log(value)//- Teste
    resumo += `-> ${value.apparel}\n`
  })

  return [resumo, "Para confirmar digite # ou para cancelar digite * "]
}

exports.execute = execute