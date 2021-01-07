var shot = function(coord){
    var box = document.getElementById(coord);
    if(hit(coord, "1")){
        box.style.backgroundColor = "#d62828";
        alert(coord + ": Congrates It's a Hit!");
    }else{
        box.style.backgroundColor = "white";
        alert(coord + ": It's a Miss!");
    }
}

var hit = function(coord, player){
    return 1;
}
