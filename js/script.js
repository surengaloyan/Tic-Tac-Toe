const sunMoon = document.querySelector('#sun_moon');
const main = document.querySelector('.main');
const bird = document.querySelector('#bird');
const playBtn = document.querySelector('#play_btn');
const body = document.querySelector('body');
const starContainer = document.querySelector('.star_container');

// --globals--
let isDark = false;
let shine = [];

let xo = "X";
let twoPlayerGame;

let winPoses = [
    ['n1', 'n2', 'n3'],
    ['n4', 'n5', 'n6'],
    ['n7', 'n8', 'n9'],
    ['n1', 'n4', 'n7'],
    ['n2', 'n5', 'n8'],
    ['n3', 'n6', 'n9'],
    ['n1', 'n5', 'n9'],
    ['n3', 'n5', 'n7']
];
let Xpose = [], Opose = [];
let Xwin = 0, Owin = 0;
let win = false, oIsAdded = true;
let Xscore = 0, Oscore = 0;

// --music--
const volume = document.querySelector('.volume');
const music = document.querySelector('#audio')

volume.addEventListener('click', () => {
    if (volume.classList.contains("fa-volume-up")) {
        music.pause();
        volume.classList.add("fa-volume-mute");
        volume.classList.remove("fa-volume-up");
    } else {
        music.play();
        volume.classList.remove("fa-volume-mute");
        volume.classList.add("fa-volume-up");
    }
})

//--go to home--
const home = document.querySelector('.home');

home.addEventListener('click', () => {
    playBtn.classList.remove('hide');
    playBtn.style.display = "flex";
    enterNames.style.display = "none";
    enterName.style.display = "none";
    checkCount.style.display = "none";
    checkCount.classList.add('hide');
    gamingArea.style.display = "none";
    winControl.style.display = "none";
    Xscore = 0;
    Oscore = 0;
    clearWinner();
})


// --change mode--
sunMoon.addEventListener('click', () => {
    sunMoon.classList.add('active');
    setTimeout(() => {
        sunMoon.classList.toggle('moon');
        if (isDark == false) {//---to dark----
            playBtn.classList.add('dark');
            body.classList.add('dark');
            sunMoon.src = "./img/moon.png";
            bird.style.display = "none";
            isDark = true;
            for (let i = 0; i < 400; i++) {
                let star = document.createElement('div');
                let size = Math.round(Math.random() * 3) + "px";
                star.style.width = size;
                star.style.height = size;
                star.style.position = "absolute";
                star.style.top = Math.round(Math.random() * 800) + "px";
                star.style.left = Math.round(Math.random() * 2100) + "px";
                star.style.backgroundColor = "white";
                star.style.borderRadius = "50%";
                star.style.zIndex = "1";
                star.style.fontSize = Math.round(Math.random() * 15) + "px";
                star.opacity = Math.round(Math.random());
                starContainer.appendChild(star);
            }

            shiningInterval = setInterval(starShine, 1000);
            noShiningInterval = setInterval(starNoShine, 2000);
        } else {//---------------to light--
            clearInterval(shiningInterval);
            clearInterval(noShiningInterval);
            playBtn.classList.remove('dark');
            body.classList.remove('dark');
            sunMoon.src = "./img/sun.png";
            bird.style.display = "inline";
            isDark = false;
            starContainer.innerHTML = "";
        }
        main.classList.toggle('active');
    }, 1000);
    setTimeout(() => { sunMoon.classList.remove('active') }, 2000);
})


// --star shining process--
function starShine() {
    for (let i = 0; i < 200; i++) {
        shine.push(starContainer.children[Math.round(Math.random() * 399)])
    }
    shine.forEach((el) => { el.style.filter = "drop-shadow(0 0 2px #fff)" });
}
function starNoShine() {
    shine.forEach((el) => { el.style.filter = "none" })
    shine = [];
}

const checkCount = document.querySelector('.check_count')
playBtn.addEventListener('click', () => {
    playBtn.classList.add('hide');
    checkCount.classList.remove('hide');
    setTimeout(() => {playBtn.style.display = "none"}, 700);
    setTimeout(() => {checkCount.style.display = "flex"}, 400);
})

const enterName = document.querySelector('.enter_name')
const p1b = document.querySelector('#p1b')
p1b.addEventListener('click', () => {
    enterName.classList.remove('hide');
    checkCount.classList.add('hide');
    setTimeout(() => {checkCount.style.display = "none";}, 700);
    setTimeout(() => {enterName.style.display = "flex"}, 400);
})

const enterNames = document.querySelector('.enter_names');
const p2b = document.querySelector('#p2b');
p2b.addEventListener('click', () => {
    enterNames.classList.remove('hide');
    checkCount.classList.add('hide');
    setTimeout(() => {checkCount.style.display = "none"}, 700);
    setTimeout(() => {enterNames.style.display = "flex"}, 400);
})

const start2pBtn = document.querySelector('#start2p');
const start1pBtn = document.querySelector('#start1p');
const gamingArea = document.querySelector('.gaming_area');
const p1NameArea = document.querySelector('#p1na');
const p2NameArea = document.querySelector('#p2na');
const p1Name = document.querySelector('#p1n');
const p2Name = document.querySelector('#p2n');
const pName = document.querySelector('#pn');
const OscoreArea = document.querySelector('.o_score');
const XscoreArea = document.querySelector('.x_score');

p1Name.addEventListener('click', () => {p1Name.value = ""})
p2Name.addEventListener('click', () => {p2Name.value = ""})
pName.addEventListener('click', () => {pName.value = ""})


// --start 1 player game--
start1pBtn.addEventListener('click', () => {
    if (pName.value == "") pName.value = "Player";
    p1NameArea.innerHTML = pName.value;
    enterName.classList.add('hide')
    p2NameArea.innerHTML = "computer";
    twoPlayerGame = false;
    XscoreArea.innerHTML = Xscore;
    OscoreArea.innerHTML = Oscore;
    setTimeout(() => {enterName.style.display = "none"}, 700);
    setTimeout(() => {gamingArea.style.display = "flex"}, 200);
})

// --start 2 player game--
start2pBtn.addEventListener('click', () => {
    if (p1Name.value == "") p1Name.value = "player 1";
    if (p2Name.value == "") p2Name.value = "player 2";
    enterNames.classList.add('hide')
    p1NameArea.innerHTML = p1Name.value;
    p2NameArea.innerHTML = p2Name.value;
    twoPlayerGame = true;
    XscoreArea.innerHTML = Xscore;
    OscoreArea.innerHTML = Oscore;
    setTimeout(() => {enterNames.style.display = "none"}, 700);
    setTimeout(() => {gamingArea.style.display = "flex"}, 200);
})


let boards = document.querySelectorAll('.board');
const x = document.querySelector('#x');
const o = document.querySelector('#o');

boards.forEach(board => {
    board.addEventListener('click', () => {
        if (twoPlayerGame == true) { //two player game
            if (board.innerHTML == "") {
                board.innerHTML = xo;
                if (xo == "X") {
                    Xpose.push(board.id);
                    o.classList.add('bigger');
                    x.classList.remove('bigger');
                    xo = "O";
                } else {
                    Opose.push(board.id);
                    x.classList.add('bigger');
                    o.classList.remove('bigger');
                    xo = "X";
                }
                checkWin();
            }
        } else { // one player game
            if (board.innerHTML == "" && !win && oIsAdded) {
                board.innerHTML = "X";
                Xpose.push(board.id);
                o.classList.add('bigger');
                x.classList.remove('bigger');
                checkWin();
                oIsAdded = false;
                setTimeout(() => {
                    if (!win) {
                        x.classList.add('bigger');
                        o.classList.remove('bigger');
                        let added = false;
                        // add to win
                        for (let i = 0; i < winPoses.length; i++) {
                            Owin = 0;
                            for (let j = 0; j < winPoses[i].length; j++) {
                                Opose.forEach(id => {
                                    if (id == winPoses[i][j]) {
                                        Owin++;
                                        if (Owin == 2) {
                                            let id = checkClosed(i, false);
                                            if (id != "empty" && !added) {
                                                document.getElementById(id).innerHTML = "O";
                                                Opose.push(id);
                                                added = true;
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        //find and get the dangerous position
                        if (!added) {
                            for (let i = 0; i < winPoses.length; i++) {
                                Xwin = 0;
                                for (let j = 0; j < winPoses[i].length; j++) {
                                    Xpose.forEach(id => {
                                        if (id == winPoses[i][j]) {
                                            Xwin++;
                                            if (Xwin == 2) {
                                                let id = checkClosed(i, true);
                                                if (id != "empty") {
                                                    if (!added) {
                                                        document.getElementById(id).innerHTML = "O";
                                                        Opose.push(id);
                                                        added = true;
                                                    }
                                                }
                                            }
                                            if (!added && document.getElementById('n5').innerHTML == "" && (board.id == "n1" || board.id == "n3" || board.id == "n7" || board.id == "n9")) {
                                                document.getElementById('n5').innerHTML = "O";
                                                Opose.push("n5");
                                                added = true;
                                            }
                                        }
                                    })
                                }
                            }
                        }
                        if (!added) addRandom();
                        checkWin()
                        oIsAdded = true;
                    }
                }, 1000);
            }
        }
    })
})

function checkClosed(i, x) {
    let array = [];
    winPoses[i].forEach(el => { array.push(el) });
    let poseArr;
    if (x) poseArr = Xpose;
    else poseArr = Opose;
    for (let i = 0; i < array.length; i++) {
        poseArr.forEach(el => {
            if (array[i] == el) {
                array.splice(i, 1);
                i = -1;
            }
        })
    }
    if (document.getElementById(array[0]).innerHTML == "") return array[0];
    else return "empty";
}

function addRandom() {
    let freePose = "n1";
    do {
        freePose = "n" + (Math.round(Math.random() * 7) + 2);
    } while (document.getElementById(freePose).innerHTML != "")
    document.getElementById(freePose).innerHTML = "O";
    Opose.push(freePose);
}


function checkWin() {
    for (let i = 0; i < winPoses.length; i++) {
        Xwin = 0;
        Owin = 0;
        for (let j = 0; j < winPoses[0].length; j++) {
            Xpose.forEach(el => {
                if (el == winPoses[i][j]) {
                    Xwin++;
                    if (Xwin == 3) {
                        win = true;
                        return winner('X', i)
                    }
                }
            })
            Opose.forEach(el => {
                if (el == winPoses[i][j]) {
                    Owin++;
                    if (Owin == 3) {
                        win = true;
                        return winner('O', i)
                    }
                }
            })
        }
    }
    if (Xpose.length == 5 && Opose.length == 4 && !win) {
        win = true;
        winner('')
    }
}

// ---show win pose-----
const winControl = document.querySelector('.win_control');
const winnerNameArea = document.querySelector('.winner_name');
const winnerText = document.querySelector('.winner');
function winner(winner, i) {
    let name1, name2;
    if (!twoPlayerGame) {
        name1 = pName.value;
        name2 = 'Computer'
    } else {
        name1 = p1Name.value;
        name2 = p2Name.value;
    }
    if (winner == 'X') {
        Xscore++;
        winnerNameArea.innerHTML = name1;
        winPoses[i].forEach(id => { document.getElementById(id).classList.add('win') })
    } else if (winner == 'O') {
        Oscore++;
        winnerNameArea.innerHTML = name2;
        winPoses[i].forEach(id => { document.getElementById(id).classList.add('win') })
    } else {
        winnerText.innerHTML = "nobody's";
        winnerNameArea.innerHTML = "";
    }
    winControl.style.display = "flex";
    gamingArea.style.filter = "blur(.1rem)"
    XscoreArea.innerHTML = Xscore;
    OscoreArea.innerHTML = Oscore;
}


// -----restarting process---------
function clearWinner() {
    Xpose.forEach(id => { document.getElementById(id).classList.remove('win') })
    Opose.forEach(id => { document.getElementById(id).classList.remove('win') })
    boards.forEach(board => { board.innerHTML = "" });
    Xwin = 0;
    Owin = 0;
    Xpose = [];
    Opose = [];
    xo = "X";
    win = false;
    oIsAdded = true;
    x.classList.add('bigger');
    o.classList.remove('bigger');
    winControl.style.display = "none";
    gamingArea.style.filter = "none";
    winnerText.innerHTML = "winner:";
}

// ---restart the game----
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', () => { clearWinner() })
/* 

 //----- X turn------
 board.innerHTML = 'X';
 Xpose.push(board.id);
 o.classList.add('bigger');
 x.classList.remove('bigger');
 checkWin();

 //----- O turn------
 setTimeout(() => {
     let play = false;
     for (let i = 0; i < winPoses.length; i++) {
         Xwin = 0;
         Owin = 0;
         if (checkUsed(i, usedIndexes)) {
             for (let j = 0; j < winPoses[i].length; j++) {
                 Xpose.forEach(el => {
                     if (!play) {
                         if (el == winPoses[i][j]) {
                             Xwin++;
                             if (Xwin == 2) {
                                 if (checkEmpty(winPoses[i])) {
                                     twoPoses = winPoses[i];
                                     console.log('get dangerous poses');
                                 } else {
                                     console.log('hi');
                                     twoPoses = []
                                     getRandom();
                                 }
                                 usedIndexes += String(i);
                                 Xwin = 0;
                                 play = true;
                             }
                         }
                     } else { return };
                 })
             }
         }
     }

     let free;
     if (twoPoses.length != 0) {
         for (let i = 0; i < twoPoses.length; i++) {
             console.log(twoPoses[i]);
             if (document.getElementById(twoPoses[i]).innerHTML == "") {
                 free = twoPoses[i];
             }
         }
     }

     if (free) {
         document.getElementById(free).innerHTML = 'O';
         Opose.push(free);
     } else if (board.id == 'n1' || board.id == 'n3' || board.id == 'n7' || board.id == 'n9') {
         if (center.innerHTML == '') {
             center.innerHTML = 'O';
             Opose.push('n5');
             console.log('center');
         }
     } else {
         getRandom();
     }
     x.classList.add('bigger');
     o.classList.remove('bigger');
     checkWin();
 }, 1000);
 */

/* 
function checkUsed(i, str) {
    for (let j = 0; j < str.length; j++) {
        if (str[j] == i) {
            return false;
        }
    }
    return true;
}
function checkEmpty(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (document.getElementById(arr[i]).innerHTML == '') {
            return true;
        }
    }
    return false;
}
function getRandom() {
    let ind = 'n1';
    for (let i = 0; i < 8; i++) {
        ind = 'n' + (Math.round(Math.random() * 8) + 1);
        if (document.getElementById(ind).innerHTML == '') {
            break;
        }
    }
    document.getElementById(ind).innerHTML = 'O'
    Opose.push(ind);
}
 */