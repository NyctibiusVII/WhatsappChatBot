var stages = {
  0: {
    description: "Boas vindas e apresentar os tipos de roupas",
    obj: require("./stages/0"),
  },
  1: {
    description: "Escolha",
    obj: require("./stages/1"),
  },
  2: {
    description: "Resumo",
    obj: require("./stages/2"),
  },
  3: {
    description: "Resposta",
    obj: require("./stages/3"),
  },
  4: {
    description: "Enceramento",
    obj: require("./stages/4"),
  }
}

exports.step = stages