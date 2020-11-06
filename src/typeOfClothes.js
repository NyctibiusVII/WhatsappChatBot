const main = require("./mainBD")
const lSite = main.main_bd["linkSite"]

const typeOfClothes = { //- Tipos de roupas -> Banco de Dados interno
  1: {
    apparel: "Blusinhas",
    price: 9.99,
    linkSite : lSite+"search?q=blusinhas"
  },
  2: {
    apparel: "Vestidos",
    price: 20.00,
    linkSite : lSite+"search?q=vestidos"
  },
  3: {
    apparel: "Sutiãs",
    price: 5.99,
    linkSite : lSite+"search?q=sutiãs"
  }
}

exports.clothes = typeOfClothes