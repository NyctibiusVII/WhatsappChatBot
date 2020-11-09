const logoUser    = require("../assets/logos/logoUser")
const logoProject = require("../assets/logos/logoProject")
console.log(`${logoUser.logoU}\n\n${logoProject.logoP}`)//- Print logos
// Supports ES6
// import { create, Whatsapp } from 'sulla'
const venom    = require("venom-bot")
const banco  = require("./banco")
const stages = require("./stages")

const main      = require("./mainBD")
const __opening = main.main_bd["opening"]
const __closing = main.main_bd["closing"]
const openDay   = __opening[2]
const closeDay  = __closing[2]

const openHours    = __opening[0]
const openMinutes  = __opening[1]
const closeHours   = __closing[0]
const closeMinutes = __closing[1]

//const hourInitial = [openHours,openMinutes]   //das __opening
//const hourFinal   = [closeHours,closeMinutes] //as  __closing

const hourInitial = [00,00] //PARA TESTE
const hourFinal   = [23,59] //PARA TESTE

let date      = new Date()
let day       = date.getDay()
let hour      = date.getHours()
let minutes   = date.getMinutes()
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

const whatImg = 'D:/server/www/projetos_web/WhatsappChatBot/assets/what-img.jpg'
const pfvD = 'Por favor digite sua mensagem.'
const spamDetectedMessage = `     Ops!\n`+ //" "x5
`Detectei um *SPAM* 🤔.\n`+
`Se isso foi um mau entendido por favor nos contate para falar a respeito.\n`+
`Cel: ${main.email} ou Cel: ${main.email_dev}`
const isWeekendMessage    = `     Ops!\n`+ //" "x5
`Nosso BOT vai para a revisão aos finais de semana.\n`+
`Mas não se preocupe, você ainda pode dar uma olhada em nosso site a qualquer momento.\n\nAcesse: ${main.main_bd["linkSite"]}`
const insideRangeMessage  = `     Ops!\n`+ //" "x5
`Nosso BOT está dormindo neste momento.\n\n`+
`O nosso horário de funcionamento é:\n`+
`De ${openDay} á ${closeDay}\n`+
`Das ${openHours}:${openMinutes}h\n`+
`As ${closeHours}:${closeMinutes}h\n\n`+
`Ah, ia me esquecendo, você pode dar uma olhada em nosso site a qualquer momento.\n\nAcesse: ${main.main_bd["linkSite"]}`
const typeAudio = 'Desculpa mas eu AINDA não escuto (⊙_⊙;)\n' + pfvD
const typeCall  = 'Ainda não consigo atender chamadas (╬▔皿▔)╯'
const typeMedia = 'Eu não entendo imagens, desculpa! ╚(•⌂•)╝\n' + pfvD

/* ------------------------------------------------------------------------------------------------------------------------ */
venom.create().then((client) => start(client)).catch((erro) => {
    console.log(erro)
  })

function start(client) {
/* Set client profile */
  //client.setProfilePic(`${whatImg}`)//- Set client profile photo
  client.setProfileName('NOME DA EMPRESA')//- Set client profile name
  client.setProfileStatus('ChatBot created by @NyctibiusVII🦊')//- Set client status

  client.onMessage(async (message) => {//console.log(message)
    if (message.chat['notSpam']) {/* NÃO É SPAM? */
      if (isWeekend) {/* É FIM DE SEMANA? */
        console.log('Result: É final de semana')
        client.sendText(message.from, isWeekendMessage).catch((erro) => {
            console.error('Erro ao enviar: ',isWeekendMessage,'\nErro: ', erro)//return object error
          })
      }else if (isWeekend === false) {
        if (insideRange) {/* ESTÁ DENTRO DO HORÁRIO? */
          if (message.type === 'chat') {
            console.log('Result: Usuário enviou uma mensagem de texto')
            try {
              let resp = stages.step[getStage(message.from)].obj.execute(
                message.from,
                message.body,
                message.sender.name
              )
              for (let index = 0; index < resp.length; index++) {
                const element = resp[index]
                client.sendText(message.from, element).catch((erro) => {
                    console.error('Erro ao enviar: ',message.from, element,'\nErro: ', erro)//return object error
                  })
              }
            }catch (error) {
              console.error('Erro!: ', error)//return object error
              client.close()
            }
          }else if(message.type === 'ptt' /*|| message.isMMS === true*/){
            console.log('Result: Usuário enviou uma mensagem de AUDIO - (não suportado)')
            client.sendText(message.from, typeAudio).catch((erro) => {
                console.error('Erro ao enviar: ',typeAudio,'\nErro: ', erro)//return object error
              })
          }else if (message.isMedia === true) {
            console.log('Result: Usuário enviou uma imagem - (não suportado)')
            client.sendText(message.from, typeMedia).catch((erro) => {
                console.error('Erro ao enviar: ',typeMedia,'\nErro: ', erro)//return object error
              })
            await client.sendImage(
              `${message.from}`,
              `${whatImg}`,
              `isSad`,
              `🤔😵🥴?`).catch((erro) => {
              console.error('Erro ao enviar: ', erro)//return object error
            })
            /*
            const buffer = await client.decryptFile(message)
            // Neste ponto, você pode fazer o que quiser com o buffer
            // Provavelmente você deseja gravá-lo em um arquivo
            const fileName = `some-file-name.${mime.extension(message.mimetype)}`
            await fs.writeFile(fileName, buffer, (err) => {})
            */
          }else{
            //- Function to detect incoming call
            client.onIncomingCall(async (call) => {
              console.log('Result: Ligação ', call)
              client.sendText(message.from, typeCall).catch((erro) => {
                  console.error('Erro ao enviar: ',typeCall,'\nErro: ', erro)//return object error
                })
            })
            console.log('Result: Usuário enviou ... Type diferente de texto e audio - (não suportado)')
            client.sendText(message.from, pfvD).catch((erro) => {
              console.error('Erro ao enviar: ',pfvD,'\nErro: ', erro)//return object error
            })
          }
        }else{
          console.log('Result: Fora do horário de funcionamento')
          client.sendText(message.from, insideRangeMessage).catch((erro) => {
            console.error('Erro ao enviar: ',insideRangeMessage,'\nErro: ', erro)//return object error
          })
        }
      }
    } else {
      console.error('Spam! detected: ')
      client.sendText(message.from, spamDetectedMessage).catch((erro) => {
        console.error('Erro ao enviar: ',spamDetectedMessage,'\nErro: ', erro)//return object error
      })
      client.close()
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