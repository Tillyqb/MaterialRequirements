const prompt = require('prompt');

prompt.start();

var envelopeObj = {};

prompt.get(['count', 'repeat', 'height', 'flap', 'throat'], function (input)
{
  envelopeObj.count = input.count;
  envelopeObj.inchRepeat = input.repeat;
  envelopeObj.height = input.height;
  envelopeObj.flap = input.flap;
  envelopeObj.throat = input.throat;
});

if ((envelopeObj.height + envelopeObj.flap) <= 8.25)
{
  prompt.get(['numberAcross'], function (i)
  {
    envelopeObj.numberAcross = i.numberAcross;
  });
}
else
{
  envelopeObj.numberAcross = 1;
}
/*
var envelopeObj = 
{
    count       : parseFloat(readline.question("Count? ")), 
    inchRepeat  : parseFloat(readline.question("Repeat? ")),
    height      : parseFloat(readline.question("Height? ")),
    flap        : parseFloat(readline.question("Flap? ")),
    throat      : parseFloat(readline.question("Throat? "))};
if (envelopeObj.flap + envelopeObj.height < 8.25)
{
    envelopeObj.numberAcross =  parseFloat(readline.question("How many across?"))
}
else
{
    envelopeObj.numberAcross = 1
};*/

function materialRequirement(funcObj) 
{
  var footRepeat = funcObj.inchRepeat / 12;
  if (funcObj.numberAcross == 1)
  {
    var twoAcross = false;
  } 
  else if (funcObj.numberAcross == 2)
  {
    var twoAcross = true;
  }
  else 
  {
      console.log("Please rerun the program using a proper parameter for number across.");
      return 0;
  }
      
  if (twoAcross) {
    var envelopesPerFoot =  (2 / (footRepeat));
    var feetNeeded = funcObj.count / envelopesPerFoot * 1.1;
    var topWebWidth = (funcObj.height - funcObj.throat) * 2;
    var bottomWebWidth = (funcObj.height + funcObj.flap) * 2;
    var funcifiedObj = {topWeb: topWebWidth, bottomWeb: bottomWebWidth, feet : feetNeeded};
    } else if (!twoAcross){
    var envelopesPerFoot = 1 / footRepeat;
    var feetNeeded = funcObj.count / envelopesPerFoot * 1.1;
    var topWebWidth = funcObj.height - funcObj.throat + 0.5;
    var bottomWebWidth = funcObj.height + funcObj.flap + 0.5;
    var funcifiedObj = {topWeb: topWebWidth, bottomWeb: bottomWebWidth, feet : feetNeeded};
    }
    return funcifiedObj;
}
var materialObj = materialRequirement(envelopeObj);

console.log("Top Web: ", materialObj.topWeb);
console.log("Bottom Web: ", materialObj.bottomWeb);
console.log("Length of each web in feet: ", materialObj.feet);