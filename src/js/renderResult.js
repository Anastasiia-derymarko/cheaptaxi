let take = 25,
    costKm = 6,
    // coefficient = 2,
    km = 10,
    minCost = 40; 
    // timeTake = 
    findTaxiBtn = document.getElementById('findTaxi'),
    mapBlock = document.getElementById('map'),
    resultBlock = document.querySelector('.result') 
    price = document.querySelectorAll('.price span');

let formula = take + (costKm * km);

price[0].innerHTML = formula;


findTaxiBtn.addEventListener('click', function (argument) {
  mapBlock.style.display = "none";
  resultBlock.style.display = "flex";
  // console.log(.display('none'))
})

function fare(){
let date = new Date;
console.log(date);

let taxify = [25, 6, 40],
    uber = [25, 4.5, 60],
    Uklon = [45, 7, 45],
    Ugo = [43, 6.5, 55],
    fiveSevenEight = [48, 5.5, 52],
    onTaxi = [29, 8, 29],
    eightNineEight = [30, 5, 47],
    eightThreeEight = [35, 6, 35];
  }

fare();