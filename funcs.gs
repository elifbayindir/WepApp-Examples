function userClicked(userInfo){
  var ss = SpreadsheetApp.openByUrl(url); // ss: spreadsheet
  var ws = ss.getSheetByName("Data"); // ws: worksheet
  ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, userInfo.zip, userInfo.est, new Date(), userInfo.chip.join(), userInfo.email]);
  var subject = "Thanks for your submission";
  var body = "We'll get back to you shortly"; 
  var htmlTemplate = HtmlService.createTemplateFromFile("email");
  htmlTemplate.fname = userInfo.firstName;
  htmlTemplate.lname = userInfo.lastName;
  var htmlBody = htmlTemplate.evaluate().getContent();
  GmailApp.sendEmail(userInfo.email, subject, body, { htmlBody: htmlBody});
  //Logger.log(name + " Clicked the Button");
}

function getCost(zipCode){
  var ss = SpreadsheetApp.openByUrl(url); 
  var ws = ss.getSheetByName("Estimate"); 
  var data = ws.getRange(1, 1, ws.getLastRow(), 2).getValues();
  
  var zipCodesList = data.map(function(r){ return r[0]; });
  var costList = data.map(function(r){ return r[1]; });
  
  var position = zipCodesList.indexOf(zipCode);
  if(position > -1){
    return "$" + costList[position].toFixed(2);
  } else {
      return "Unavialable";
  }

}

function getCalendarBusyDays(){
  
  var startDate = new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
  var calendar = CalendarApp.getCalendarsByName("elif.bayindir1@gmail.com")[0];
  var events = calendar.getEvents(startDate, endDate);
  
  var days = events.map(function(e){ return e.getStartTime().setHours(0, 0, 0, 0); });
  var uniqueDays = [];
  
  days.forEach(function(d){
    if(uniqueDays.indexOf(d) === -1){
      uniqueDays.push(d);
    }               
  });
  
  var uniqueDisabledDays = uniqueDays.map(function(x) { return x + 82800000; }); // Türkiye +3 zaman farkı problemini gidermek için yaptım
  return uniqueDisabledDays;
}

function getWords(){
  
  var ss = SpreadsheetApp.openByUrl(url); 
  var ws = ss.getSheetByName("Options"); 
  var data = ws.getRange(1, 3).getDataRegion().getValues();
  var options = {};
  data.forEach(function(v){
    options[v[0]] = null;
  });
  
  return options;
}

function getTableData(){
  var ss = SpreadsheetApp.openByUrl(url); 
  var ws = ss.getSheetByName("table"); 
  var data = ws.getRange(2, 1, ws.getLastRow()-1, 3).getValues();
  //Logger.log(data);
  return data;
}



