// let take = 25,
//     costKm = 6,
//     minCost = 40; 
let findTaxiBtn = document.getElementById('findTaxi'),
    mapBlock = document.getElementById('map'),
    resultBlock = document.querySelector('.result');

findTaxiBtn.addEventListener('click', function (argument) {
  mapBlock.style.display = "none";
  resultBlock.style.display = "flex";
})

function fare(km){
  let date = new Date,
  count = 0,
  fareFormula,
  price = document.querySelectorAll('.price span');

  let allTaxi = {
    'taxify' : [25, 6, 40],
    'uber' : [25, 4.5, 60],
    'Uklon' : [45, 7, 45],
    'Ugo' : [43, 6.5, 55],
    'fiveSevenEight' : [48, 5.5, 52],
    'onTaxi' : [29, 8, 29],
    'eightNineEight' : [30, 5, 47,{
      '9':1.5,
      '11':0.9,
      '13':0.9,
      '15':1,
      '17':1.5,
      '19':1.5,
      '21':0.9,
      '23':1.15,
      '1':1.7,
      '3':1.2,
      //Не применяется к минималке coficient for 3:00 a.m
    }],
    'eightThreeEight' : [35, 6, 35,
      {
        '9':1.4,
        '11':1.2,
        '13':1.05,
        '15':1,
        '17':1.2,
        '19':1.4,
        '21':1.15,
        '23':1.15,
        '1':1.42,
        '3':1.05,
      }]
  }

  for (let taxiFare in allTaxi){
    fareFormula = allTaxi[taxiFare][0] + (allTaxi[taxiFare][1]*km);
    if (allTaxi[taxiFare][3]){
      for (let coefficientTaxi in allTaxi[taxiFare][3]) {
        if(Number(coefficientTaxi) === date.getHours()){
          fareFormula = fareFormula * allTaxi[taxiFare][3][coefficientTaxi];
          break;
        }
      }
    }
    if(fareFormula < allTaxi[taxiFare][2]){
     fareFormula =  allTaxi[taxiFare][2]
    }
    price[count].innerHTML = round(fareFormula,2);
    count ++;
  }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
