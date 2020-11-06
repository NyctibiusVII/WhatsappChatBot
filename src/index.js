// Supports ES6
// import { create, Whatsapp } from 'sulla'
const bot = require("venom-bot")
const banco = require("./banco")
const stages = require("./stages")

const main = require("./mainBD")
const __opening = main.main_bd["opening"]
const __closing = main.main_bd["closing"]
const openDay = __opening[2]
const closeDay = __closing[2]

const openHours = __opening[0]
const openMinutes = __opening[1]
const closeHours = __closing[0]
const closeMinutes = __closing[1]

const hourInitial = [openHours,openMinutes]   //das __opening
const hourFinal   = [closeHours,closeMinutes] //as  __closing

let date = new Date()
let day = date.getDay()
let hour = date.getHours()
let minutes = date.getMinutes()
let isWeekend = day == 0 || day == 6 ? true : false //- 0 domingo ou 6 sábado

function verifyHour(hourInitial, hourFinal){
  let hourNow = [hour,minutes]
  if (hourNow[0] === hourInitial[0]/*hour===hourI*/) {
    if (hourNow[1] >= hourInitial[1]/*minutes>=minutesI*/) {
     return true
    }else{return false}
  }else if (hourNow[0] > hourInitial[0]/*hour>hourI*/) {
    if (hourNow[0] === hourFinal[0]/*hour===hourI*/) {
      if (hourNow[1] <= hourFinal[1]/*minutes<=minutesI*/) {
       return true
      }else{return false}
    }else if (hourNow[0] < hourFinal[0]/*hour<hourI*/) {
      return true
    }else{return false}
  }else{return false}  
}

let insideRange = verifyHour(hourInitial, hourFinal)


//bot.create().then((client) => start(client))
function start(client) {
  client.onMessage((message) => {
    if (isWeekend) {/* FIM DE SEMANA? */
      return [`     Ops!\n`+ //" "x5
      `Nosso BOT vai para a revisão aos finais de semana.\n`+
      `Mas não se preocupe, você ainda pode dar uma olhada em nosso site a qualquer momento.\n\nAcesse: ${main.main_bd["linkSite"]}`]
    }else if (isWeekend === false) {
      if (insideRange) {/* DENTRO DO HORÁRIO? */
        //message.type !== "chat"? "Por favor digite sua mensagem." : null
        //message.type === "audio"? "\n Nossos robôs AINDA não escutam (⊙_⊙;)" : null
        if (message.type === "chat") {
          if (message.type === "audio") {
            return["Nossos robôs AINDA não escutam (⊙_⊙;)\nPor favor digite sua mensagem."]
          }else{
            let resp = stages.step[getStage(message.from)].obj.execute(
              message.from,
              message.body,
              message.sender.name
            )
            for (let index = 0; index < resp.length; index++) {
              const element = resp[index]
              client.sendText(message.from, element)
            }
          }
        }else{
          return["Por favor digite sua mensagem."]
        }
        //let resp = stages.step[getStage(message.from)].obj.execute(
        //  message.from,
        //  message.body,
        //  message.sender.name
        //)
        //for (let index = 0; index < resp.length; index++) {
        //  const element = resp[index]
        //  client.sendText(message.from, element)
        //}
      }else{
        return [`     Ops!\n`+ //" "x5
      `Nosso BOT está dormindo neste momento.\n\n`+
      `O nosso horário de funcionamento é:\n`+
      `De ${openDay} á ${closeDay}\n`+
      `Das ${openHours}:${openMinutes}h\n`+
      `As ${closeHours}:${closeMinutes}h\n\n`+
      `Hah, ia me esquecendo, você pode dar uma olhada em nosso site a qualquer momento.\n\nAcesse: ${main.main_bd["linkSite"]}`]
      }
    }
  })
}

function getStage(user) {
  if (banco.db[user]) {
    //Se existir esse numero no banco de dados
    return banco.db[user].stage
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0,
      itens: []
    }
    return banco.db[user].stage
  }
}
