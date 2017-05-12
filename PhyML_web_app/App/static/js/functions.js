function modelChanged() {
 var K, Koption;
 var o = document.options;
 //
 switch(o.ModelName.value) {
  //
  case "JC69": case "F81": case "GTR":
   K=0; Koption=0;
   o.Kappa.value = 1;
   o.KappaOption[0].checked = true;
  break;
  //
  case "TN93":
   K=0; Koption=0;
   o.Kappa.value = 1;
   o.KappaOption[1].checked = true;
  break;
  //
  case "K80": case "F84": case "HKY85":
   K=0; Koption=1;
   o.Kappa.value = 4;
   o.KappaOption[1].checked = true;
  break;
  //
  default:
   K=0; Koption=0;
   o.KappaOption[1].checked = true;
  break;
 }
 enableField(o.Kappa,K);
 enableRadio(o.KappaOption[0],Koption,"");
 enableRadio(o.KappaOption[1],Koption,"e");
}

function sequenceTypeChanged() {
 var o = document.options;
 var menuOptions, sel, i;
 var b = o.SequenceTypeOption[1].checked;
 //
 var FqOptionLabelLeft = document.getElementById("Fq_left");
 var FqOptionLabelRight = document.getElementById("Fq_right");
 //
 if (!b) {
//  toggleVisibility('ModelNote',0);
  menuOptions = new Array(7);
  menuOptions[0]="JC69";
  menuOptions[1]="K80";
  menuOptions[2]="F81";
  menuOptions[3]="F84";
  menuOptions[4]="HKY85"; sel = 4;
  menuOptions[5]="TN93";
  menuOptions[6]="GTR";
  //
//  enableRadio(o.FqOption[0],0,"e");
//  enableRadio(o.FqOption[1],0,"m");
  FqOptionLabelLeft.innerHTML="optimized";
  FqOptionLabelRight.innerHTML="empirical";
  o.FqOption[1].checked = true;
  //
 }
 else {
//  toggleVisibility('ModelNote',1);
  menuOptions = new Array(15);
  menuOptions[0]="Blosum62";
  menuOptions[1]="CpREV";
  menuOptions[2]="Dayhoff";
  menuOptions[3]="DCMut";
  menuOptions[4]="FLU";
  menuOptions[5]="HIVb";
  menuOptions[6]="HIVw";
  menuOptions[7]="JTT";
  menuOptions[8]="LG"; sel = 8;
  menuOptions[9]="MtArt";
  menuOptions[10]="MtMam";
  menuOptions[11]="MtREV";
  menuOptions[12]="RtREV";
  menuOptions[13]="VT";
  menuOptions[14]="WAG";
  //
//  enableRadio(o.FqOption[0],1,"e");
//  enableRadio(o.FqOption[1],1,"m");
  FqOptionLabelRight.innerHTML="empirical";
  FqOptionLabelLeft.innerHTML="model";
  o.FqOption[0].checked = true;
  //
 }
 //
 o.ModelName.length = menuOptions.length;
 for(i=0; i<menuOptions.length; i++)
  o.ModelName[i] = new Option(menuOptions[i], menuOptions[i]);
 //
 o.ModelName.selectedIndex = sel;
 //
 modelChanged();
}

function fillMovementMenu(menu) {
  var i;
  var menuOptions = new Array(3);
  if (menu.type!="select-one") return;

  menuOptions[0]="NNI";
  menuOptions[1]="SPR";
  menuOptions[2]="SPR & NNI";
  menu.length = menuOptions.length;
  for(i=0; i<menuOptions.length; i++)
    menu[i] = new Option(menuOptions[i], menuOptions[i]);
  menu.selectedIndex = 0;
}

function movementNameChanged() {
  var o = document.options;
 //
 if (o.MovementName.value!="SPR & NNI" & o.MovementName.value!="SPR")
   o.OptRandomOption[1].checked=1;
 //
 randomOptionChanged();
}

function fillRandomMenu(menu) {
  var i;
  var menuOptions = new Array(10);
  if (menu.type!="select-one") return;

  menuOptions[0]="1";
  menuOptions[1]="2";
  menuOptions[2]="3";
  menuOptions[3]="4";
  menuOptions[4]="5";
  menuOptions[5]="6";
  menuOptions[6]="7";
  menuOptions[7]="8";
  menuOptions[8]="9";
  menuOptions[9]="10";
  menu.length = menuOptions.length;
  for(i=0; i<menuOptions.length; i++)
    menu[i] = new Option(menuOptions[i], menuOptions[i]);
  menu.selectedIndex = 4;
}

function randomOptionChanged() {
 var o = document.options;
 //
 if ((o.MovementName.disabled) || (o.MovementName.value!="SPR & NNI" && o.MovementName.value!="SPR"))
   enableRadio(o.OptRandomOption[0], false, "n");
 else
   enableRadio(o.OptRandomOption[0], true, "y");
 //
 enableField(o.RandomNum, o.OptRandomOption[0].checked);
}

function fillTestMenu(menu) {
  if (menu.type!="select-one") return;
  menu.length = 3;
  menu[0] = new Option("aLRT SH-like", "-4");
  menu[1] = new Option("aLRT Chi2-based", "-2");
  menu[2] = new Option("aBayes", "-5");
  menu.selectedIndex = 0;
}

function aLRTOptionChanged() {
 var o = document.options;
 //
 if (o.OptaLRTOption[0].checked)
   o.OptBootOption[1].checked=1;
 bootOptionChanged();
 //
 enableField(o.TestValue, o.OptaLRTOption[0].checked);
}

function bootOptionChanged() {
 var o = document.options;
 //
 if (o.OptBootOption[0].checked) {
   o.OptaLRTOption[1].checked=1;
   o.NbBtsDataSets.value=100;
 }
 //
 enableField(o.NbBtsDataSets, o.OptBootOption[0].checked);
 enableField(o.TestValue, o.OptaLRTOption[0].checked);
}

function startingTreeChanged() {
 var o = document.options;
 //
 enableField(o.StartingTree, o.StartingTreeOption[0].checked);
}

function kappaOptionChanged() {
 var o = document.options;
 //
 enableField(o.Kappa, o.KappaOption[0].disabled==0 && o.KappaOption[0].checked);
 //
}

function nbCatgChanged() {
 var o = document.options;
 var b = (o.NbCatg.value > 1);
 //
 enableRadio(o.GammaOption[0], b, "");
 enableRadio(o.GammaOption[1], b, "e");
 enableField(o.Gamma, b && o.GammaOption[0].checked);
}

function gammaOptionChanged() {
 var o = document.options;
 //
 enableField(o.Gamma, o.GammaOption[0].disabled==0 && o.GammaOption[0].checked);
}

// it is forbidden to check "y" for topology AND "n" for branch lengths
function optimiseTopoOptionChanged() {
 var o = document.options;
 //
 enableRadio(o.OptBranchesOption[1], (!o.OptTopoOption[0].checked), "n");
 enableField(o.MovementName, o.OptTopoOption[0].checked);
 //
 if (o.OptTopoOption[1].checked)
   o.OptRandomOption[1].checked=o.OptTopoOption[1].checked;
 //
 enableRadio(o.OptRandomOption[0], o.OptTopoOption[0].checked, "y");
 enableField(o.RandomNum, o.OptTopoOption[0].checked);
 //
 movementNameChanged();
}

// it is forbidden to check "y" for topology AND "n" for branch lengths
function optimiseBranchesOptionChanged() {
 var o = document.options;
 //
 enableRadio(o.OptTopoOption[0], (!o.OptBranchesOption[1].checked), "y");
}

// a : do not re-initialize the form with default settings if the Example file is selected
function inputFileChanged(a) {
 var o = document.options;
 if (o) {
  var b = o.DataOption[0].checked; // user file selected
  //
  enableField(o.userfile, b);
  //
  enableRadio(o.SequenceTypeOption[0], b, "nt");
  enableRadio(o.SequenceTypeOption[1], b, "aa");
  //
  enableRadio(o.SequenceFormatOption[0], b, " ");
  enableRadio(o.SequenceFormatOption[1], b, " -q");
  //
  if (!a && !b) { // re-initialize the form with default settings
   o.SequenceTypeOption[0].checked=1; sequenceTypeChanged();
   o.SequenceFormatOption[0].checked=1;
   o.NbDataSets.value=1;
   //
   // ModelName set in sequenceTypeChanged
   o.KappaOption[1].checked=1; // Kappa set in modelChanged called by sequenceTypeChanged
   o.InvarOption[1].checked=1;
   //
   o.NbCatg.value=4; nbCatgChanged();
   // GammaOption set in nbCatgChanged
   //
   o.StartingTreeOption[1].checked=1;
   startingTreeChanged();
   movementNameChanged();
   randomOptionChanged();
   optimiseTopoOptionChanged();
   optimiseBranchesOptionChanged();
   //
   bootOptionChanged();
   aLRTOptionChanged();
  }
 }
}

function validate() {
 var o = document.options;
 var msg="";
 //
 if (o.DataOption[0].checked)
   msg += checkPhylipFile(o.userfile.value, "sequence file");
 //
 msg += checkNumberMinMax(o.NbDataSets, "number of data sets", 1, 100);
 //
 if (!o.NbBtsDataSets.disabled)
   //msg += checkNumberMinMax(o.NbBtsDataSets, "number of bootstrapped data sets", 1, 1000);
   msg += checkNumber(o.NbBtsDataSets, "number of bootstrapped data sets");
 //
 if (o.StartingTreeOption[0].checked)
   msg += checkTextFile(o.StartingTree.value, "starting tree file");
 //
 if (o.SequenceTypeOption[0].checked && !o.Kappa.disabled)
   msg += checkNumber(o.Kappa, "transition/transversion ratio");
 //
 if (!o.Invar.disabled)
   msg += checkNumberMinMax(o.Invar, "proportion of invariable sites", 0, 1);
 //
 msg += checkNumber(o.NbCatg, "number of substitution rates categories");
 //
 if (!o.Gamma.disabled)
   msg += checkNumber(o.Gamma, "gamma");
 //
 //msg += checkEmpty(o.Name, "name");
 //
 msg += checkEmail(o.Email, " to get the results");
 //
// if (!o.DataOSOption[0].checked && !o.DataOSOption[1].checked && !o.DataOSOption[2].checked)
//   msg += "You have to choose the file format used by your computer.";
 //
 if (msg) {
  msg += "\n\nPlease make your corrections and re-submit the form.";
  alert (msg);
  return false;
 }
 else
  return true;
}


function DoLoad() {
  var o = document.options;
  //
  if (o) {
    fillMovementMenu(o.MovementName);
  //
    fillRandomMenu(o.RandomNum);
  //
    fillTestMenu(o.TestValue);
  }
  //
  inputFileChanged(1);
  //
  sequenceTypeChanged();
  //
  kappaOptionChanged();
  //
  nbCatgChanged();
  //
  gammaOptionChanged();
  //
  startingTreeChanged();
  //
  movementNameChanged();
  //
  randomOptionChanged();
  //
  optimiseTopoOptionChanged();
  //
  optimiseBranchesOptionChanged();
  //
  aLRTOptionChanged();
  //
  bootOptionChanged();
  //
}
