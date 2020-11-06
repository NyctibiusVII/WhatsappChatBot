const typeOfClothes = require("../typeOfClothes")
const banco = require("../banco") 

function execute(user, msg, contato) {
  let clothes = "     Vestimentas \n\n" //" "x5

  Object.keys(typeOfClothes.clothes).forEach((value) => {
    let element = typeOfClothes.clothes[value]
    //clothes += `${value} - ${element.apparel}        A partir de R$ ${element.price} \n`
    clothes += `${value} - ${element.apparel}\n          A partir de R$ ${element.price}\n\n` //" "x10
  })

  banco.db[user].stage = 1 //Passando para o proximo estágio

  return [
    `Olá ${contato} sou uma assistente virtual, irei apresentar nossa coleção e tipos de vestimenta, basta enviar o código do tipo de vestimenta que você procura.\n EX: 2\n "2" = Vestidos\n\nQue te encaminharemos direto para o nosso site com a aba Vestidos.`,
    clothes
  ]
}

exports.execute = execute