
var fileInput = document.getElementById("browseOpen");
var zoia = {};

fileInput.onchange = function () {
  var fr = new FileReader();
  fr.onloadend = function () {
    d3.select("body").select("button").remove();
    d3.select("#grid").selectAll("svg").remove();
    d3.select('#network-graph').selectAll("svg").remove();
    zoia = {};
    currPage = 0;
    document.getElementById('modules').textContent = "";
    var result = this.result;
    var hex = "";
    for (var i = 0; i < this.result.length; i++) {
      var byteStr = result.charCodeAt(i).toString(16);
      if (byteStr.length < 2) {
        byteStr = "0" + byteStr;
      }
      hex += " " + byteStr;
    }
    hex = hex.trim();
    document.getElementById('patch-name').textContent = getName(hex);
    getSize(hex);
    var numMods = getNumModules(hex);
    var modules = getModules(hex, numMods);
    var numConnections = getNumConnections(hex, modules.endPos);
    var connections = getConnections(hex, modules.endPos, numConnections);
    var numPages = getNumberPages(hex, connections.endPos);
    var pageNames = getPageNames(hex, connections.endPos, numPages);
    zoia.pages = [];
    new Set(modules.modules.map(p => p.page)).forEach(pageID => zoia.pages.push({id: pageID, name: pageNames.names ? pageNames.names[pageID] : "", modules: []}));
    modules.modules.map(m => zoia.pages.find(c => c.id === m.page).modules.push(m));
    zoia.connections = [];
    zoia.connections = connections.connections;
    if(pageNames && pageNames.names) {
      pageNames.names.map((n, i) => {if(zoia.pages[i]) { zoia.pages[i].name = n}});
    }
    document.getElementById('grid').classList.add("show");
    document.getElementById('loaded-message').classList.add("show");
    initd3();
  };
  fr.readAsBinaryString(this.files[0]);
};
var moduleLabels = [
  "SV Filter",
  "Audio Input",
  "Audio Out",
  "Aliaser",
  "Sequencer",
  "LFO",
  "ADSR",
  "VCA",
  "Audio Multiply",
  "Bit Crusher",
  "Sample and Hold",
  "OD & Distortion",
  "Env Follower",
  "Delay line",
  "Oscillator",
  "Pushbutton",
  "Keyboard",
  "CV Invert",
  "Steps",
  "Slew Limiter",
  "MIDI Notes in",
  "MIDI CC in",
  "Multiplier",
  "Compressor",
  "Multi-filter",
  "Plate Reverb",
  "Buffer delay",
  "All-pass filter",
  "Quantizer",
  "Phaser",
  "Looper",
  "In Switch",
  "Out Switch",
  "Audio In Switch",
  "Audio Out Switch",
  "Midi pressure",
  "Onset Detector",
  "Rythm",
  "Noise",
  "Random",
  "Gate",
  "Tremolo",
  "Tone Control",
  "Delay w/Mod",
  "Stompswitch",
  "Value",
  "CV Delay",
  "CV Loop",
  "CV Filter",
  "Clock Divider",
  "Comparator",
  "CV Rectify",
  "Trigger",
  "Stereo Spread",
  "Cport EXP/CV in",
  "Cport CV out",
  "UI Button",
  "Audio Panner",
  "Pitch Detector",
  "Pitch Shifter",
  "Midi Note out",
  "Midi CC out",
  "Midi PC out",
  "Bit Modulator",
  "Audio Balance",
  "Inverter",
  "Fuzz",
  "Ghostverb",
  "Cabinet Sim",
  "Flanger",
  "Chorus",
  "Vibrato",
  "Env Filter",
  "Ring Modulator",
  "Hall Reverb",
  "Ping Pong Delay",
  "Audio Mixer",
  "CV Flip Flop",
  "Diffuser",
  "Reverb Lite",
  "Room Reverb",
  "Pixel",
  "Midi Clock In",
  "Granular"
]
var colors = [
  "",
  "Blue",
  "Green",
  "Red",
  "Yellow",
  "Aqua",
  "Magenta",
  "White",
  "Orange",
  "Lime",
  "Surf",
  "Sky",
  "Purple",
  "Pink",
  "Peach",
  "Mango"
]
var showModule = (module) => {
  if(module.info){
    document.getElementById('modules').textContent = JSON.stringify(module.info);
    var moduleName = module.info.module.name;
    var blockName = module.info.block.name;
    console.log(moduleName + " - " + blockName);
  } else {
    document.getElementById('modules').textContent = JSON.stringify(module);
  }
}
var getSize = (patch) => {
  var data = patch
    .substr(0, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  var size = parseInt(data, 16);
  return size;
}
var getName = (patch) => {
  // get patch name hex
  var name = patch.substr(12, 47)
    .split(' ')
    .map((i) => parseInt(i, 16))
    .map(n => n === 0 ? 32 : n)
    .map(c => String.fromCharCode(c))
    .join('')
    .trim();

  return name;
}
var getNumConnections = (patch, endModules) => {
  var data = patch.substr(endModules, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('')
  return parseInt(data || 0, 16);
}
var getNumberPages = (patch, endConnections) => {
  var numberPages = patch.substr(endConnections, 11)
    .split(' ')
    .filter(c => c != "00")
    .join('');
  return parseInt(numberPages || 0, 16);
}
var getPageNames = (patch, endConnections, numPages) => {
  var pages = []
  if(numPages === 0){
    return pages;
  }
  var data = patch.substr(endConnections + 12, numPages * 16 * 3);
  var currEnd = endConnections + 12;
  var current = 0;
  var names = [];
  while(current < numPages){
    var tempName = data
      .substr(current * 16 * 3, 16 * 3 - 1)
      .split(' ')
      .filter(c => c!== "00")
      .map(c => String.fromCharCode(parseInt(c, 16)))
      .join('');
    names.push(tempName)
    current++;
    currEnd += 16*3;
  }
  return {'names': names, 'endPos': currEnd};
}
var getConnections = (patch, endModules, numConnections) => {
  var data = patch.substr(endModules + 12);
  var current = 0;
  var currentSize = 0;
  var totalSize = endModules + 12;
  var connections = [];
  while(current < numConnections) {
    var connection = data.substr(currentSize, 60);
    var currConnection = {
      'id': current,
      'origin': {
        'id': getConnectionSource(connection),
        'output': getConnectionSourceOutput(connection)
      },
      'source': getConnectionSource(connection),
      'destination': {
        'id': getConnectionDestination(connection),
        'input': getConnectionDestinationInput(connection)
      },
      'target':getConnectionDestination(connection),
      'strength': getConnectionStrength(connection)
    }
    connections.push(currConnection);
    currentSize += 60;
    totalSize += 60;
    current++;
  }
  return {'connections': connections, 'endPos': totalSize}
}
var getConnectionSource = (connection) => {
  var source = connection.substr(0, 11)
    .split(' ')
    .filter(c => c != "00")
    .join('');
  return parseInt(source || 0, 16);
}
var getConnectionSourceOutput = (connection) => {
  var source = connection.substr(12, 11)
    .split(' ')
    .filter(c => c != "00")
    .join('');
  return parseInt(source || 0, 16);
}
var getConnectionDestination = (connection) => {
  var source = connection.substr(24, 11)
    .split(' ')
    .filter(c => c != "00")
    .join('');
  return parseInt(source || 0, 16);
}
var getConnectionDestinationInput = (connection) => {
  var source = connection.substr(36, 11)
    .split(' ')
    .filter(c => c != "00")
    .join('');
  return parseInt(source || 0, 16);
}
var getConnectionStrength = (connection) => {
  var source = connection.substr(48, 11)
    .split(' ')
    .filter(c => c != "00")
    .join('');
  return parseInt(source || 0, 16);
}
var getNumModules = (patch) => {
  var data = patch.substr(60, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  var numModules = parseInt(data, 16);
  document.getElementById('num-modules').textContent = numModules + ' modules';
  return numModules;
}
var getModules = (patch, numModules) => {
  var data = patch.substr(72);
  var current = 0;
  var totalSize = 0;
  var container = document.getElementById('modules');
  var modules = [];
  while(current < numModules){
    var currModuleSize = getModuleSize(data.substr(totalSize, 11)) * 4 * 3;
    var moduleData = data.substr(totalSize, currModuleSize);
    var moduleType = getModuleType(moduleData);
    var position = getModuleGridPos(moduleData)
    var numOptions = getModuleNumberOptions(moduleData)
    var currModule = {
      'id': current,
      'type': moduleType,
      'typeName': moduleLabels[moduleType],
      'page': getModulePage(moduleData),
      'position': position,
      'coords': posToXY(position),
      'color': getModuleColor(moduleData),
      'userOptions': numOptions,
      'options': getModuleOptions(moduleData, numOptions),
      'minWidth': parseInt(zoiaTemplate.modules[moduleType].minBlocks)
    }
    modules.push(currModule);
    totalSize += currModuleSize;
    current++;
  }
  //debugger;
  return {'endPos': totalSize + 72, 'modules': modules};
}
var getModuleSize = (sizeBytes) => {
  var size = sizeBytes.substr(0, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(size, 16);
}
var getModuleType = (moduleData) => {
  var type = moduleData.substr(12, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(type || 0, 16);
}
var getModulePage = (moduleData) => {
  var page = moduleData.substr(36, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(page || 0, 16);
}
var getModuleColor = (moduleData) => {
  var page = moduleData.substr(48, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(page || 0, 16);
}
var getModuleGridPos = (moduleData) => {
  var page = moduleData.substr(60, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(page || 0, 16);
}
var posToXY = (pos) => {
  return {y: Math.floor(pos / 5) + 1 , x: (pos % 8) + 1}
}
var getModuleNumberOptions = (moduleData) => {
  var params = moduleData.substr(72, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(params || 0, 16) + 1;
}
var getModuleOptions = (moduleData, numOptions) => {
  var options = [];
  var currentEnd = 96;
  for(var i = 0; i < numOptions; i++){
    var tempOption = moduleData.substr(currentEnd, 3);
    options.push(parseInt(tempOption, 16));
    currentEnd += 3;
  }
  return options;
}
var getNumPages = (patch, optionStart) => {
  var numPages = patch.substr(optionStart, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  return parseInt(numPages, 16);
}
var getModuleLabel = (moduleData) => {
  var label = moduleData.substr(data.length - 48, 47)
    .split(' ')
    .map(n => n === 0 ? 32 : n)
    .map(c => String.fromCharCode(c))
    .join('')
    .trim();
  debugger;
  return label;
}
