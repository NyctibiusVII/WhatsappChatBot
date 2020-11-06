const banco = require("../banco")

function execute(user, msg) {
  let siteSearchComplete = "     AQUI ESTA:\n" //" "x5
  banco.db[user].itens.forEach((value) => {
    console.log(value)//- Teste
    //siteSearchComplete += `-> ${value.linkSite}\n`
    siteSearchComplete += `-> ${value.apparel}\n     ${value.linkSite}\n\n`//" "x5
  })

  return [siteSearchComplete, banco.db[user].stage = 4]
}

exports.execute = execute