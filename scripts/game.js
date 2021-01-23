let vw = window.innerWidth;
let vh = window.innerHeight;

const rows = Math.floor(vh / 25);
const cols = Math.floor(vw / 20);

let started = false;
let timer;
let evolutionSpeed = 200;

let currGen =[rows];
let nextGen =[rows];

function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
      
    }
}
function initGenArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}
function createWorld() {
    let world = document.querySelector('#game');
    
    let tbl = document.createElement('table');
    tbl.setAttribute('id','worldgrid');
for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click',cellClick);            
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}
function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);

    if (this.className==='alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    }else{
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}
function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
           
            let neighbors = getNeighborCount(row, col);
         
            if (currGen[row][col] == 1) {
              
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] == 0) {
            
                if (neighbors == 3) {
                    nextGen[row][col] = 1;
                }
            }
        }
    }
    
}
function getNeighborCount(row, col) {
    let count = 0;
    let nrow=Number(row);
    let ncol=Number(col);
    
    if (nrow - 1 >= 0) {
        if (currGen[nrow - 1][ncol] == 1) 
            count++;
    }
    if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        if (currGen[nrow - 1][ncol - 1] == 1) 
            count++;
    }
    if (nrow - 1 >= 0 && ncol + 1 < cols) {
        if (currGen[nrow - 1][ncol + 1] == 1) 
            count++;
    }
    if (ncol - 1 >= 0) {
        if (currGen[nrow][ncol - 1] == 1) 
            count++;
    }
    if (ncol + 1 < cols) {
        if (currGen[nrow][ncol + 1] == 1) 
            count++;
    }
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        if (currGen[nrow + 1][ncol - 1] == 1) 
            count++;
    }
    if (nrow + 1 < rows && ncol + 1 < cols) {
        if (currGen[nrow + 1][ncol + 1] == 1) 
            count++;
    }
    
    if (nrow + 1 < rows) {
        if (currGen[nrow + 1][ncol] == 1) 
            count++;
    }
    
    
    return count;
}
    
    function updateCurrGen() {
       
        for (row in currGen) {
            for (col in currGen[row]) {
                currGen[row][col] = nextGen[row][col];
                nextGen[row][col] = 0;
            }
        }
     
    }
function updateWorld() {
        let cell='';
        for (row in currGen) {
            for (col in currGen[row]) {
                cell = document.getElementById(row + '_' + col);
                if (currGen[row][col] == 0) {
                    cell.setAttribute('class', 'dead');
                } else {
                    cell.setAttribute('class', 'alive');
                }
            }
        }
    }
function evolve(){
      
        createNextGen();
        updateCurrGen();
        updateWorld();
        if (started) {
            timer = setTimeout(evolve, evolutionSpeed);
        }
}
function startStopGol(){
        let startstop=document.querySelector('#btnstartstop');
        var tds = document.getElementsByTagName("td");
        if (!started) {
           started = true;
           for(var i =0, il = tds.length;i<il;i++){
              tds[i].style.border = "None";
           }
           startstop.innerHTML = 'Stop Simulation';
           evolve();
         
         } else {
            started = false;
            startstop.innerHTML = 'Start Simulation';
            clearTimeout(timer);
            for(var i =0, il = tds.length;i<il;i++){
               tds[i].style.border = "1px solid rgb(83, 81, 81)";
            }
        }
    }
 
  
    function resetWorld() {
        location.reload();
  
    }
window.onload=()=>{
    createWorld();
    createGenArrays();
    initGenArrays();
}