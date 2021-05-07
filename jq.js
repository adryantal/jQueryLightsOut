


//egy 5 elemű tömböt feltöltünk 0 és 24 közötti random egész számokkal
//ezek lesznek a kezdetben világító elemek - véletlenszerűen megjelölt - indexei
var index_kivalaszt = [];
//a tömb feltöltése
function kezdetiVilagitoIndexek() {
    for (var i = 0; i < 5; i++) {
        var r = Math.floor(Math.random() * 25);
        while ((index_kivalaszt.includes(r))) {     //addig generálja, amíg különböző nem lesz
            r = Math.floor(Math.random() * 25);
        }
        index_kivalaszt[i] = r;
    }
}


function vilagit(index) {
    $("article div").eq(index).css("background", "yellow");
}

function nem_vilagit(index) {
    $("article div").eq(index).css("background", "lightgreen");
}


function kiirasFormazas() {
    $("#szoveg").addClass("nyertel");
}

function kiirasFormazasLe() {
    $("#szoveg").removeClass("nyertel");
}

function headerFormazas() {
    $("header").addClass("cimsor");
}



function mas_hatter(azon) { //a bemeneti paraméter az article div id-ja lesz (azon)

    if ($("article div").eq(azon).css("background-color") === "rgb(255, 255, 0)") {        //ha eddig sárga volt, legyen zöld (kattintásra)        
        $("article div").eq(azon).css("background-color", "rgb(144, 238, 144)");
    } else if ($("article div").eq(azon).css("background-color") === "rgb(144, 238, 144)") { //ha eddig zöld volt, legyen sárga (kattintásra), amennyiben (még) nem zöld az összes div
        $("article div").eq(azon).css("background", "rgb(255, 255, 0)");
    }
}


function hattervaltas() {



    var azon = Number($(this).attr("id")); //az eseményt kiváltó div id-ját beleteszem egy változóba



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
        $("#szoveg").html("Gratulálunk! Nyertél!");
        kiirasFormazas();
        $("article div").off("click"); //"letiltom" a kattintás lehetőségét a div-ekre  
    }
}


function zoldek() {  //megszámolja, hány zöld négyzet van
    var z = 0;
    for (var i = 0; i < 25; i++) {
        if ($("article div").eq(i).css("background-color") === "rgb(144, 238, 144)")
            z += 1;
    }
    return z;
}


function feladom() {

//    alert(zoldek() + " db zöld hátterű négyzet van.");
    $("#szoveg").html("Összesen " + zoldek().toString() + " db zöld hátterű négyzetet hagytál.");
    kiirasFormazas();
    $("article div").off("click"); //"letiltom" a kattintás lehetőségét a div-ekre    
}




function init() {

    $("article").html(""); //"lenullázom" a pályát
    $("#szoveg").html("@ Minden jog fenntartva!");
    kiirasFormazasLe();
    headerFormazas();
    $("main").css("background", "lightblue");
    $("body").css("background-image", "url('bg.jpg')");
    kezdetiVilagitoIndexek();
    for (var i = 0; i < 25; i++) {
        $("article").append("<div id=" + i + "></div>"); //az article alá beszúrok egy újabb div tag-et            
        if (index_kivalaszt.includes(i)) {   //ha az index szerepel a kezdetben kiválasztottak között, akkor világítson
            vilagit(i);
        } else {
            nem_vilagit(i);
        }
    }



    $("article div").click(hattervaltas);
    /*Új játék*/
    $("#uj_jatek").click(init); //új játék: initet újra meghívom
    /*Feladom*/
    $("#feladom").click(feladom);
}






$(function () {

    init();


});