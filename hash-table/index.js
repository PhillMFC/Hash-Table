const fs = require('fs')
const { performance } = require('perf_hooks');

wordHashMap = []
var palavraDeBusca

//Cria array de tamanho 151 
for (let i = 0; i < 151; i++) {
  wordHashMap.push([])
}

const data = fs.readFileSync('./wordTable', 'utf8');
const wordList = data.split('\n')
//Quantidade de palavras utilizadas
words = wordList.slice(0, 10000)

words.forEach((res) => {
  const hash = convert(res)

  if (inserted(res, hash) === false) {
    insert(res, hash)
  }
})

function convert(res) {
  var hash = 0
  const x = res || 0;
  for (var i = 0; i < x.length; i++) {
    hash += res[i].charCodeAt(0);
  }
  //Calculo do hash
  return Math.trunc((hash)%151)
}

function insert(res, hash) {
  wordHashMap[hash].push(res)
}

function inserted(res, hash) {
  if (wordHashMap[hash] !== undefined && wordHashMap[hash].includes(res)) {
    return true
  }
  return false
}


function search() {
  //Pesquisa automaticamente as primeiras 100 palavras do arquivo wordTable e calcula o tempo em milisegundos
  for (let i = 0; i < 100; i++) {
    //Seleção aleatória de palavras de acordo com a quantidade de palavras utilizadas
    index = Math.floor(Math.random() * (10000))
    palavraDeBusca = words[index]

    const startTime = performance.now()
    const position = convert(palavraDeBusca)
    const position2 = wordHashMap[position].indexOf(palavraDeBusca)
    if (wordHashMap[position].includes(palavraDeBusca)) {
      const executionTime = performance.now() - startTime
      console.log(executionTime)
      console.log(wordHashMap[position][position2])
      fs.writeFile('./time.txt', `${`${executionTime}`.replace(".",",")}\n`, { flag: 'a+' }, err => {});
    }
    else {
      console.log("Not Found!");
    }
    
  }

}

function colisoes() {
  //Adequa a contagem de colisoes com o tamanho do wordHashMap
  var col = 0;

  for (let i = 0; i < 151; i++) {
    if (wordHashMap[i].length > 1)
      col += (wordHashMap[i].length-1);
  }
  console.log(col);
}

console.log('==========TEMPO DE EXECUÇÃO (mS)==========')
search()
console.log('==============COLISÕES===============')
colisoes()