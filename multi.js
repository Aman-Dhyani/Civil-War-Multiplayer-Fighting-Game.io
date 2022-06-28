// ---------------------- Game Objects -------------------------------
let container = document.querySelector("#container");
let CaptainAmerica = document.querySelector(".CaptainAmerica");
let IronMan = document.querySelector(".IronMan");
let health1 = document.querySelector("#health1");
let health2 = document.querySelector("#health2");
let impact = document.querySelector(".impact");
let bar1 = document.querySelector("#bar1");
let bar2 = document.querySelector("#bar2");
let damage = 5;
let moreDamage = 10;

// ---------------------------- Music ----------------------------------
let music = new Audio("music/music.m4a");
let gameover = new Audio("music/gameover.m4a");
let capPunch = new Audio("music/cap-punch.m4a");
let ironmanPunch = new Audio("music/iron-punch.m4a");
let capThrowShield = new Audio("music/cap-throw%20shield.m4a");
let ironmanBeam = new Audio("music/iron-beam.m4a");
let ironmanTargetLocked = new Audio("music/iron-targetLocked.m4a");
let ironmanWarning = new Audio("music/iron-warning.m4a");
let capDialogue = new Audio("music/cap-dialogue.m4a");
let ironmanDialogue = new Audio("music/iron-win.m4a");

// --------------- Display function ---------------------
function display() {
    music.play();
    play.classList.add("hide");
    CaptainAmerica.classList.remove("hide");
    IronMan.classList.remove("hide");

    //--- calling main function--------------------
    window.requestAnimationFrame(mainGameFunction);
}

// ------------------- CaptainAmerica CONTROLS - (KEYBOARD) --------------------------------

document.addEventListener('keydown', (e) => {
    //-- CaptainAmerica RIGHT MOVE -----------------------------------
    if (e.key == "d") moveRight();

    //-- CaptainAmerica LEFT MOVE ------------------------------------
    if (e.key == "a") moveLeft();

    //-- CaptainAmerica JUMP -----------------------------------------
    if (e.key == "w") Jump();

    //-- CaptainAmerica PUNCH ----------------------------------------
    if (e.key == "s") p1punch();

    // ------- CaptainAmerica THROW SHIELD ---------------------------
    if (e.key == "f") throwShield();
})


// ------------------- CaptainAmerica CONTROLS Functions ------------------------

//----------------------- CaptainAmerica RIGHT MOVE ------------------
function moveRight() {

    let playerx = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
    let playerx2 = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
    CaptainAmerica.classList.add("walkAnime");

    if (playerx < playerx2 - 200) {
        CaptainAmerica.style.left = playerx + 60 + "px";
    }
    setTimeout(() => {
        CaptainAmerica.classList.remove("walkAnime");
    }, 100);
}

//-------------------- CaptainAmerica LEFT MOVE --------------------------
function moveLeft() {

    CaptainAmerica.classList.add("walkAnime");
    let playerx = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
    CaptainAmerica.style.left = playerx - 60 + "px";

    if (playerx < 30) {
        CaptainAmerica.style.left = playerx + "px";
    }
    setTimeout(() => {
        CaptainAmerica.classList.remove("walkAnime");
    }, 100);
}

//-------------------------------- CaptainAmerica JUMP ---------------------
function Jump() {

    CaptainAmerica.classList.add("jump1");

    setTimeout(() => {
        CaptainAmerica.classList.remove("jump1");
    }, 400);
}

//--------------------------- CaptainAmerica PUNCH ------------------------
function p1punch() {

    CaptainAmerica.classList.add("punchAnime");
    let playerx = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
    let playery = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("top"));
    let punch = document.createElement("div");
    container.appendChild(punch);

    punch.style.left = playerx + 50 + "px";
    punch.style.top = playery + 50 + "px";
    punch.classList.add("punch");

    setTimeout(() => {
        container.removeChild(punch);
        CaptainAmerica.classList.remove("punchAnime");
    }, 100);
}

//------------------------------- CaptainAmerica THROW SHIELD -------------------------
function throwShield() {

    if (bar1.value == 50) {
        capThrowShield.play();
        CaptainAmerica.classList.add("shoot1");
        let playerx = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
        let playery = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("top"));

        let shield = document.createElement("div");
        container.appendChild(shield);
        shield.classList.add("shield");
        shield.style.left = playerx + "px";
        shield.style.top = playery + 30 + "px";

        setInterval(() => {
            shield.style.left = playerx + 1000 + "px";
        }, 10);

        setInterval(() => {
            container.removeChild(shield);
        },2000);

        bar1.value = 0;
    }
}


// ----------------------------- THE MAIN FUNCTION -----------------------------
function mainGameFunction() {

    // ----------------------- IronMan(IRONMAN) AUTOMATIC CONTROLS -------------------------------
    let intrvl = setInterval(() => {

        let a = Math.ceil(6 * Math.random());
        // console.log(a);

        //----------------- IronMan RIGHT MOVE --------------------
        if (a == 1) p2MoveRight();

        function p2MoveRight() {

            let playerx = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
            IronMan.style.left = playerx + 80 + "px";

            if (playerx > 900 + "px") {
                IronMan.style.left = playerx + "px";
            }
        }

        //----------------- IronMan LEFT MOVE ----------------
        // ------------- To make more chances of ironman comes towards player ----------------
        if (a == 2 || a == 3) p2MoveLeft();

        function p2MoveLeft() {

            let playerx = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
            let playerx1 = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
            IronMan.classList.add("ironAnime");

            if (playerx > playerx1 + 170) {
                IronMan.style.left = playerx - 60 + "px";
            }
        }

        // --------------- IronMan PUNCH ---------------------------------
        if (a == 4) p2Punch();

        function p2Punch() {

            IronMan.classList.add("ironPunch");
            let playerx = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
            let playery = parseInt(window.getComputedStyle(IronMan).getPropertyValue("top"));

            let punch2 = document.createElement("div");
            container.appendChild(punch2);
            IronMan.style.left = playerx - 20 + "px";
            punch2.style.left = playerx - 60 + "px";
            punch2.style.top = playery + 40 + "px";
            punch2.classList.add("punch2");

            setInterval(() => {
                container.removeChild(punch2);
            }, 100);
            
            setTimeout(() => {
                IronMan.classList.remove("ironPunch");
            }, 200);
        }

        //--- IronMan shootBeam ----------------------------------------------
        if (bar2.value == 50) {
            ironmanTargetLocked.play();

            if (a == 5) p2beam();

            function p2beam() {
                ironmanBeam.play();
                IronMan.classList.add("shoot2");
                let playerx = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
                let playery = parseInt(window.getComputedStyle(IronMan).getPropertyValue("top"));
                let ironmanLaser = document.createElement("div");
                container.appendChild(ironmanLaser);
                ironmanLaser.classList.add("ironmanLaser");

                ironmanLaser.style.left = playerx + "px";
                ironmanLaser.style.top = playery + 30 + "px";

                setInterval(() => {
                    ironmanLaser.style.left = playerx - 1050 + "px";
                }, 10);
                setInterval(() => {
                    container.removeChild(ironmanLaser);
                }, 2000);
                bar2.value = 0
            }
        }

        //---- IronMan JUMP ----------------------------------------
        if (a == 6) p2Jump();

        function p2Jump() {
            IronMan.classList.add("jump2");
            setTimeout(() => {
                IronMan.classList.remove("jump2");
            }, 800);
        }
    }, 100);


    // ---------------------------- PUNcH COLLLISON ---------------------------------
    //----------------------- WHEN IronMan GET PUNCHED ----------------------------------------
    setInterval(() => {
        let punch = document.querySelector(".punch");

        p2x = parseInt(window.getComputedStyle(IronMan, null).getPropertyValue('left'));
        p2y = parseInt(window.getComputedStyle(IronMan, null).getPropertyValue('top'));
        o1x = parseInt(window.getComputedStyle(punch, null).getPropertyValue('left'));
        o1y = parseInt(window.getComputedStyle(punch, null).getPropertyValue('top'));

        offsetX2 = Math.abs(p2x - o1x);
        offsetY2 = Math.abs(p2y - o1y);

        if (offsetX2 < 150 && offsetX2 > 50 && offsetY2 < 100) IronManGetPunched();

        function IronManGetPunched() {
            capPunch.play()
            impact.classList.remove("hide");
            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);

            IronMan.style.left = p2x + 20 + "px";
            health2.value -= damage;
            punch.play()
        }
    }, 100);


    // -------------------------------- WHEN CaptainAmerica GET PUNCHED ----------------------------------------
    setInterval(() => {

        let punch2 = document.querySelector(".punch2");

        p1x = parseInt(window.getComputedStyle(CaptainAmerica, null).getPropertyValue('left'));
        p1y = parseInt(window.getComputedStyle(CaptainAmerica, null).getPropertyValue('top'));
        o2x = parseInt(window.getComputedStyle(punch2, null).getPropertyValue('left'));
        o2y = parseInt(window.getComputedStyle(punch2, null).getPropertyValue('top'));

        offsetX = Math.abs(p1x - o2x);
        offsetY = Math.abs(p1y - o2y);

        // console.log(offsetX, offsetY)
        if (offsetX < 100 && offsetY < 100) CaptainAmericaGetPunched();

        function CaptainAmericaGetPunched() {
            if (health1.value <= 30 && health1.value >= 25) {
                ironmanWarning.play();

                setTimeout(() => {
                    ironmanWarning.pause();
                }, 2000);
            }

            ironmanPunch.play();
            impact.classList.remove("hide");
            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);

            CaptainAmerica.style.left = p1x - 20 + "px";
            health1.value -= damage;
            punch.play();
        }
    }, 100);


    /// ---------------------------------- SHIELD COLLISON ------------------------------------------------
    setInterval(() => {
        let shield = document.querySelector(".shield");

        let sx = parseInt(window.getComputedStyle(shield).getPropertyValue("left"));
        let sy = parseInt(window.getComputedStyle(shield).getPropertyValue("top"));
        let p2x = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
        let p2y = parseInt(window.getComputedStyle(IronMan).getPropertyValue("top"));

        offseta = Math.abs(sx - p2x);
        offsetb = Math.abs(sy - p2y);

        if (offseta < 50 && offsetb < 100) IronManHitByShield();

        function IronManHitByShield() {
            ironmanPunch.play();
            setTimeout(() => {
                health2.value -= moreDamage;
            }, 10);

            shield.classList.add("hide");
            impact.classList.remove("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);
        }
    }, 10);


    /// ----------------------------------------- IRONMAN LASER COLLISON ------------------------------------------------
    setInterval(() => {
        let ironmanLaser = document.querySelector(".ironmanLaser");

        let ix = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("left"));
        let iy = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("top"));
        let p1x = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
        let p1y = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("top"));

        offseta = Math.abs(ix - p1x);
        offsetb = Math.abs(iy - p1y);

        if (offseta < 50 && offsetb < 100) IronManHitByBeam();

        function IronManHitByBeam() {
            capPunch.play();
            setTimeout(() => {
                health1.value -= moreDamage;
            }, 10);

            ironmanLaser.classList.add("hide");
            impact.classList.remove("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);
        }
    }, 10);

    /// ----------------------------------- PROJECTILES COLLISONS(SHIELD & LASER) ------------------------------------------------
    setInterval(() => {
        let shield = document.querySelector(".shield");
        let ironmanLaser = document.querySelector(".ironmanLaser");

        let sx = parseInt(window.getComputedStyle(shield).getPropertyValue("left"));
        let sy = parseInt(window.getComputedStyle(shield).getPropertyValue("top"));
        let bx = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("left"));
        let by = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("top"));

        offseta = Math.abs(sx - bx);
        offsetb = Math.abs(sy - by);

        if (offseta < 100 && offsetb < 100) ShieldLaserCollison();

        function ShieldLaserCollison() {
            capThrowShield.play();
            ironmanPunch.play();
            impact.classList.remove("hide");
            shield.classList.add("hide");
            ironmanLaser.classList.add("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);
        }
    }, 10);


    //-------------------------------------------- WIN & LOSE ---------------------------------
    setInterval(() => {

        //---------- CaptainAmerica WIN (CAPTAIN AMERICA)--------------------------
        if (health2.value == 0) PlayerOneWins();

        function PlayerOneWins() {
            IronMan.classList.add("hide");
            music.pause();
            gameover.play();
            capDialogue.play();
            clearInterval(intrvl);
            win = "cap"
        }

        //---------- IronMan WIN (IRON-MAN)--------------------------
        if (health1.value == 0) PlayerTwoWins();

        function PlayerTwoWins() {
            CaptainAmerica.classList.add("hide");
            gameover.play();
            music.pause();
            ironmanDialogue.play();
            clearInterval(intrvl);

            setTimeout(() => {
                gameover.pause();
            }, 1200);

            win = "ironman"
        }
    }, 100);


    // --------------------------------- TIMEOUTS -----------------------------------------------------
    setInterval(() => {
        CaptainAmerica.classList.remove("shoot1");
        IronMan.classList.remove("shoot2");
    }, 1000);

    // ----- TIMEOUTS ---------------------------------------
    setInterval(() => {
        CaptainAmerica.classList.remove("jump");
        IronMan.classList.remove("jump");
    }, 1000);

    // ----- full weapon bar ---------------------------------
    setInterval(() => {
        bar1.value += 5;
        bar2.value += 5;
    }, 700);


    //---------------------------------- Window Reload ------------------------------------------------
    setInterval(() => {
        if (win == "cap") {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        if (win == "ironman") {
            setTimeout(() => {
                window.location.reload();
            }, 3300);
        }
    }, 100);

}
//--- Main Function Ends ----------------------------

