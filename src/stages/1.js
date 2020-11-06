const typeOfClothes = require("../typeOfClothes")
const banco = require("../banco")
const main = require("../mainBD")

function execute(user, msg) {
  if (msg === "*") {
    banco.db[user].stage = 0
    return [`Cancelado! \nVocê ainda pode dar uma olhada em nosso site a qualquer momento.\n\nAcesse: ${main.main_bd["linkSite"]}`]
  }

  if (msg === "#") {
    banco.db[user].stage = 2
    return ["Finalizando...\nOk?"]
  }

  if (!typeOfClothes.clothes[msg]) {
    return [
      "Código inválido!\nPor favor digite novamente.",
      "```Digite # para finalizar, * para cancelar ou continue digitando para adicionar os itens escolhidos```",
    ]
  }

  banco.db[user].itens.push(typeOfClothes.clothes[msg])

  return [
    `O tipo (${typeOfClothes.clothes[msg].apparel}) foi escolhido`,
    "```Digite # para finalizar, * para cancelar ou continue digitando para adicionar os itens escolhidos```",
  ]
}

exports.execute = execute