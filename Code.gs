var url = "https://docs.google.com/spreadsheets/d/1kXdzncuuLUPT5lna4yrdiGhg5ARi7VDYWKNjEplBQic/edit#gid=0"; 
var Route = {};
Route.path = function(route, callback){
  Route[route] = callback;
}

function doGet(e) {  
  
  Route.path("form", loadForm);
  Route.path("table", loadTable);
  
  if(Route[e.parameters.v]) {  
    return Route[e.parameters.v]();
  }
  else {
    return render("home");
  }
}

function loadForm(){
  
  var ss = SpreadsheetApp.openByUrl(url); 
  var ws = ss.getSheetByName("Options"); 
  var list = ws.getRange(1, 1, ws.getRange("A1").getDataRegion().getLastRow(), 1).getValues(); 
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '</option>'; }).join('');
  
  return render("page", {list: htmlListArray});
  
}

function loadTable(){
  
  return render("table");
  
}



