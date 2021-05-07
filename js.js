function ID(nev) {
    return document.getElementById(nev);
}

function $(nev) {
    return document.querySelectorAll(nev);
}


//egy 5 elemű tömböt feltöltünk 0 és 24 közötti random egész számokkal
//ezek lesznek a kezdetben világító elemek - véletlenszerűen megjelölt - indexei
var index_kivalaszt = [5];

function kezdetivilagito() {
    for (var i = 0; i < 5; i++) {
        var r = Math.floor(Math.random() * 25);
        while ((index_kivalaszt.includes(r))) {            //addig generálja, amíg különböző nem lesz
            r = Math.floor(Math.random() * 25);
        }
        index_kivalaszt[i] = r;
    }
}


function vilagit(x) {
    $("article div")[x].style.backgroundColor = "yellow";
}

function nem_vilagit(x) {
    $("article div")[x].style.backgroundColor = "lightgreen";
}


function kiirasformazas() {
    ID("szoveg").classList.add("nyertel");
}

function kiirasformazas_le() {
    ID("szoveg").classList.remove("nyertel");
}

function headerformazas() {
    $("header")[0].classList.add("cimsor");
}


function mas_hatter(azon) { //a bemeneti paraméter az article div id-ja lesz (azon)

    if ($("article div")[azon].style.backgroundColor === "yellow") {        //ha eddig sárga volt, legyen zöld (kattintásra)

        $("article div")[azon].style.backgroundColor = "lightgreen";
        //növelje 1-el a zöldek számát

    } else if ($("article div")[azon].style.backgroundColor === "lightgreen" && !(zoldek() === 25)) { //ha eddig zöld volt, legyen sárga (kattintásra), amennyiben (még) nem zöld az összes div

        $("article div")[azon].style.backgroundColor = "yellow";


    }
}


function hattervaltas() {

    var azon = Number(this.id); //az eseményt kiváltó div id-ját beleteszem egy változóba

    mas_hatter(azon);

    /*a "sarokelemek"*/
    if (azon === 0) {
        mas_hatter(azon + 1);
        mas_hatter(azon + 5);
    }
    if (azon === 4) {
        mas_hatter(azon - 1);
        mas_hatter(azon + 5);
    }
    if (azon === 20) {
        mas_hatter(azon + 1);
        mas_hatter(azon - 5);
    }
    if (azon === 24) {
        mas_hatter(azon - 1);
        mas_hatter(azon - 5);
    }

    /*a 3x3 szélső elem*/

    if ([1, 2, 3].includes(azon)) {
        mas_hatter(azon - 1);
        mas_hatter(azon + 5);
        mas_hatter(azon + 1);
    }


    if ([21, 22, 23].includes(azon)) {
        mas_hatter(azon - 1);
        mas_hatter(azon - 5);
        mas_hatter(azon + 1);
    }

    if ([5, 10, 15].includes(azon)) {
        mas_hatter(azon + 5);
        mas_hatter(azon - 5);
        mas_hatter(azon + 1);
    }

    if ([9, 14, 19].includes(azon)) {
        mas_hatter(azon + 5);
        mas_hatter(azon - 5);
        mas_hatter(azon - 1);
    }

    if ([6, 7, 8, 11, 12, 13, 16, 17, 18].includes(azon)) {
        mas_hatter(azon + 1);
        mas_hatter(azon - 1);
        mas_hatter(azon + 5);
        mas_hatter(azon - 5);
    }

    if (zoldek() === 25) {    //ha a zöldek száma elérte a 25-öt, kihirdeti a győzelmet
        ID("szoveg").innerHTML = "Gratulálunk! Nyertél!";
        kiirasformazas();
    }


}


function zoldek() {  //megszámolja, hány zöld négyzet van
    var z = 0;
    for (var i = 0; i < 25; i++) {
        if ($("article div")[i].style.backgroundColor === "lightgreen")
            z += 1;
    }
    return z;
}


function feladom() {

    //ID("szoveg").innerHTML = "Feladtad! "+sz+" db zöld hátterű négyzet van." ;
    alert(zoldek() + " db zöld hátterű négyzet van.");
    init();
}



function init() {

    $("article")[0].innerHTML = "";  //"lenullázom" a pályát
    ID("szoveg").innerHTML = "@ Minden jog fenntartva!";
    kiirasformazas_le();
    headerformazas();
    $("main")[0].style.backgroundColor = "lightblue";
    $("body")[0].style.backgroundImage = "url('bg.jpg')";

    kezdetivilagito();

    //console.log(index_kivalaszt);

    var szamlalo = 0;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            $("article")[0].innerHTML += "<div></div>";
            $("article div")[szamlalo].id = szamlalo;   //minden elemnek adunk egy ID-t
            //console.log(szamlalo);
            if (index_kivalaszt.includes(szamlalo)) {   //ha az index szerepel a kezdetben kiválasztottak között, akkor világítson
                vilagit(szamlalo);
            } else {
                nem_vilagit(szamlalo);
            }
            szamlalo += 1;
        }
    }



    var j = 0;
    while (j < 25) {

        $("article div")[j].addEventListener("click", hattervaltas);
        j += 1;
    }


    /*Új játék*/
    ID("uj_jatek").addEventListener("click", init); //új játék: initet újra meghívom
    /*Feladom*/
    ID("feladom").addEventListener("click", feladom);

}


window.addEventListener("load", init);


