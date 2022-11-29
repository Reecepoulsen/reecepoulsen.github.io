let player1Turn = true;

const playTurn = (id) => {
    const curCell = document.getElementById(id);
    
    if(player1Turn && curCell.textContent === ''){
        curCell.textContent = 'X';
        player1Turn = false;
    } else if(curCell.textContent === ''){
        curCell.textContent = 'O';
        player1Turn = true;
    }
}

const wipeBoard = () => {
    let cellList = document.getElementsByClassName("cell");

    for (let i = 0; i < cellList.length; i++) {
        const element = cellList[i];
        element.textContent = '';
    }
    player1Turn = true;
}





