function addEvent( obj, type, fn ) {
  if (obj.addEventListener) {
    obj.addEventListener( type, fn, false );
    EventCache.add(obj, type, fn);
  }
  else if (obj.attachEvent) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
    obj.attachEvent( "on"+type, obj[type+fn] );
    EventCache.add(obj, type, fn);
  }
  else {
    obj["on"+type] = obj["e"+type+fn];
  }
}

var EventCache = function(){
  var listEvents = [];
  return {
    listEvents : listEvents,
    add : function(node, sEventName, fHandler){
      listEvents.push(arguments);
    },
    flush : function(){
      var i, item;
      for(i = listEvents.length - 1; i >= 0; i = i - 1){
        item = listEvents[i];
        if(item[0].removeEventListener){
          item[0].removeEventListener(item[1], item[2], item[3]);
        };
        if(item[1].substring(0, 2) != "on"){
          item[1] = "on" + item[1];
        };
        if(item[0].detachEvent){
          item[0].detachEvent(item[1], item[2]);
        };
        item[0][item[1]] = null;
      };
    }
  };
}();

function $() {
  var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
      var element = arguments[i];
      if (typeof element == 'string')
        element = document.getElementById(element);
      if (arguments.length == 1)
        return element;
      elements.push(element);
    }
  return elements;
}

function toggle() {
  for (var i=0; i < arguments.length; i++ ) {
    $(arguments[i]).style.display = ($(arguments[i]).style.display != 'none' ? 'none' : '' );
  }
}

function toggleVisibility(id,val) {
 var o=document.getElementById(id);
 if (val==0)
  o.style.display = 'none';
 else
  o.style.display = 'inline';
}

function enableField(item,val) {
 item.disabled = !val;
 if ((val==0) && item.value)
  item.value = "";
}

function enableRadio(item,val,valDefault) {
 item.disabled = !val;
 if ((val==1) && item.type=="radio")
  item.value = valDefault;
}

function checkEmpty(item, name) {
 var msg="";
 if (!item.value) msg += "The " + name + " value is missing.\n";
 return msg;
}

function checkNumber(item,name) {
 var msg="";
 if (!item.value || isNaN(item.value))
   msg = "The " + name + " value is not a number.\n";
 return msg;
}

function checkNumberMinMax(item,name,mini,maxi) {
 var msg="";
 if (!item.value || isNaN(item.value))
   msg = "The " + name + " value is not a number.\n";
 else if (item.value < mini || item.value > maxi)
   msg = "The " + name + " value must be between " + mini + " and " + maxi + ".\n";
 return msg;
}

function checkTextFile(value, name) {
 var msg = "";
 if (value=="")
   msg += "The " + name + " name cannot be empty.\n";
 else {
   var extension = "";
   var extensionidx = value.search(/\.[A-Za-z]+$/);
   if (extensionidx!=-1) {
     extension = value.substr(extensionidx+1);
     if (extension!="txt" && extension!="phy" && extension!="aln" && extension!="fa" && extension!="fasta" && extension!="tre" && extension!="tree" && extension!="nwk") {
       if (!confirm("The " + name + " name has the \"" + extension + "\" extension \nand this program will only process files in text format.\n Is your file a text file ?"))
       msg += "The " + name + " file has to be a text file.\n";
     }
   }
 }
 return msg;
}

function checkPhylipFile(value, name) {
 var msg = "";
 if (value=="")
   msg += "The " + name + " name cannot be empty.\n";
 else {
   var extension = "";
   var extensionidx = value.search(/\.[A-Za-z]+$/);
   if (extensionidx!=-1) {
     extension = value.substr(extensionidx+1);
     if (extension!="phy") {
       if (!confirm("The " + name + " name has the \"" + extension + "\" extension \nand this program will only process files in PHYLIP format.\n Is your file in PHYLIP format ?"))
       msg += "The " + name + " file has to be in PHYLIP format.\n";
     }
   }
 }
 return msg;
}

function checkArchiveFile(value, name) {
 var msg = "";
 if (value=="")
   msg += "The " + name + " name cannot be empty.\n";
 else {
   var extension = "";
   var extensionidx = value.search(/\.[A-Za-z]+$/);
   if (extensionidx!=-1) {
     extension = value.substr(extensionidx+1);
     if (extension!="zip" && extension!="gz") {
       if (!confirm("The " + name + " name has the \"" + extension + "\" extension.\nIs your file an archive ?"))
       msg += "The " + name + " file has to be an archive.\n";
     }
   }
 }
 return msg;
}

// Rules for the email regular expression:
// The start of the email must have at least one character before the @ sign
// There may be either a . or a -, but not together before the @ sign
// There must be an @ sign
// At least once character must follow the @ sign
// There may be either a . or a -, but not together in the address
// The address must end with a . followed by at least 2 characters
function checkEmail(item, name) {
 var msg="";
 var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
 if (!re.test(item.value))
   msg += "You must provide a valid email address" + name + ".\n";
 return msg;
}

function fillCountryMenu(menu) {
  var menuOptions = new Array(80);
  if (menu.type!="select-one") return;

  menuOptions[0]="Argentina";
  menuOptions[1]="Australia";
  menuOptions[2]="Austria";
  menuOptions[3]="Bahrain";
  menuOptions[4]="Belgium";
  menuOptions[5]="Belize";
  menuOptions[6]="Benin";
  menuOptions[7]="Brazil";
  menuOptions[8]="Bulgaria";
  menuOptions[9]="Burkina Faso";
  menuOptions[10]="Cameroon";
  menuOptions[11]="Canada";
  menuOptions[12]="Chile";
  menuOptions[13]="China";
  menuOptions[14]="Colombia";
  menuOptions[15]="Congo Republic";
  menuOptions[16]="Costa Rica";
  menuOptions[17]="Czech Republic";
  menuOptions[18]="Denmark";
  menuOptions[19]="El Salvador";
  menuOptions[20]="Egypt";
  menuOptions[21]="Finland";
  menuOptions[22]="France";
  menuOptions[23]="Gabon";
  menuOptions[24]="Germany";
  menuOptions[25]="Guatemala";
  menuOptions[26]="Greece";
  menuOptions[27]="Honduras";
  menuOptions[28]="Hong Kong";
  menuOptions[29]="Hungary";
  menuOptions[30]="India";
  menuOptions[31]="Indonesia";
  menuOptions[32]="Iran";
  menuOptions[33]="Ireland";
  menuOptions[34]="Israel";
  menuOptions[35]="Italy";
  menuOptions[36]="Ivory Coast";
  menuOptions[37]="Japan";
  menuOptions[38]="Jordan";
  menuOptions[39]="Koran Republic";
  menuOptions[40]="Kuwait";
  menuOptions[41]="Lebanon";
  menuOptions[42]="Luxembourg";
  menuOptions[43]="Malaysia";
  menuOptions[44]="Mexico";
  menuOptions[45]="Morocco";
  menuOptions[46]="Netherlands";
  menuOptions[47]="New-Zealand";
  menuOptions[48]="Nicaragua";
  menuOptions[49]="Norway";
  menuOptions[50]="Pakistan";
  menuOptions[51]="Panama";
  menuOptions[52]="Phillippines";
  menuOptions[53]="Poland";
  menuOptions[54]="Polynesia";
  menuOptions[55]="Portugal";
  menuOptions[56]="Qatar";
  menuOptions[57]="Romania";
  menuOptions[58]="Russia";
  menuOptions[59]="Saudi Arabia";
  menuOptions[60]="Senegal";
  menuOptions[61]="Singapore";
  menuOptions[62]="Slovakia";
  menuOptions[63]="South Africa";
  menuOptions[64]="Spain";
  menuOptions[65]="Sweden";
  menuOptions[66]="Switzerland";
  menuOptions[67]="Syria";
  menuOptions[68]="Taiwan";
  menuOptions[69]="Thailand";
  menuOptions[70]="Togo";
  menuOptions[71]="Tunisia";
  menuOptions[72]="Turkey";
  menuOptions[73]="Ukraine";
  menuOptions[74]="United Arab Emirated";
  menuOptions[75]="United Kingdom";
  menuOptions[76]="Uruguay";
  menuOptions[77]="USA";
  menuOptions[78]="Venezuela";
  menuOptions[79]="Vietnam";

  menu.length = menuOptions.length;
  for(i=0; i<menuOptions.length; i++)
    menu[i] = new Option(menuOptions[i], menuOptions[i]);
  menu.selectedIndex = -1;
}
