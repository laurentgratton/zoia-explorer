
var fileInput = document.getElementById("browseOpen");
var zoia = {};

let qtLaunchPatch = function(result) {
  d3.select("body").select("button").remove();
  d3.select("#grid").selectAll("svg").remove();
  d3.select('#network-graph').selectAll("svg").remove();
  zoia = {};
  currPage = 0;
  document.getElementById('modules').textContent = "";
  let hex = "";
  for (let i = 0; i < result.length; i++) {
    let byteStr = result.charCodeAt(i).toString(16);
    if (byteStr.length < 2) {
      byteStr = "0" + byteStr;
    }
    hex += " " + byteStr;
  }
  hex = hex.trim();
  document.getElementById('patch-name').textContent = getName(hex);
  getSize(hex);
  let numMods = getNumModules(hex);
  let modules = getModules(hex, numMods);
  let numConnections = getNumConnections(hex, modules.endPos);
  let connections = getConnections(hex, modules.endPos, numConnections);
  let numPages = getNumberPages(hex, connections.endPos);
  let pageNames = getPageNames(hex, connections.endPos, numPages);
  //let numStarredElements = getNumberStarred(hex, pageNames.endPos);
  //let starredElements = getStarredElement(hex, pageNames.endPos, numStarredElements);
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
}

fileInput.onchange = function () {
  let fr = new FileReader();
  fr.onloadend = function () {
    qtLaunchPatch(this.result);
  };
  fr.readAsBinaryString(this.files[0]);
};
let moduleLabels = [
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
  "Granular",
  "Midi Clock Out",
  "Tap to CV",
  "Midi Pitch Bend In",
  "Euro CV Out 4",
  "Euro CV In 1",
  "Euro CV In 2",
  "Euro CV In 3",
  "Euro CV In 4",
  "Euro Headphone Amp",
  "Euro Audio Input 1",
  "Euro Audio Input 2",
  "Euro Audio Output 1",
  "Euro Audio Output 2",
  "Euro Pushbutton 1",
  "Euro Pushbutton 2",
  "Euro CV Out 1",
  "Euro CV Out 2",
  "Euro CV Out 3",
  "Sampler",
  "Device Control",
  "CV Mixer"
]
let colors = [
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
let showModule = (module) => {
  console.log(module);
  if(module.info){
    let moduleName = module.moduleName;
    let blockName = module.info.block.name;
    console.log(module);
    document.getElementById('modules').textContent = `${moduleName} - ${blockName}`;
  } else {
    document.getElementById('modules').textContent = `${module.moduleName || getModuleInfo(module)}
    ${module.options}`;
  }
}

let getModuleInfo = (module) => {
  return `${module.typeName || module}`;
}

let getSize = (patch) => {
  let data = patch
    .substr(0, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(data, 16);
}
let getName = (patch) => {
  // get patch name hex
  return patch.substr(12, 47)
      .split(' ')
      .map((i) => parseInt(i, 16))
      .map(n => n === 0 ? 32 : n)
      .map(c => String.fromCharCode(c))
      .join('')
      .trim();
}
let getNumConnections = (patch, endModules) => {
  let data = patch.substr(endModules, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('')
  return parseInt(data || 0, 16);
}
let getNumberPages = (patch, endConnections) => {
  let numberPages = patch.substr(endConnections, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(numberPages || 0, 16);
}
let getPageNames = (patch, endConnections, numPages) => {
  let pages = []
  if(numPages === 0){
    return pages;
  }
  let data = patch.substr(endConnections + 12, numPages * 16 * 3);
  let currEnd = endConnections + 12;
  let current = 0;
  let names = [];
  while(current < numPages){
    let tempName = data
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
let getConnections = (patch, endModules, numConnections) => {
  let data = patch.substr(endModules + 12);
  let current = 0;
  let currentSize = 0;
  let totalSize = endModules + 12;
  let connections = [];
  while(current < numConnections) {
    let connection = data.substr(currentSize, 60);
    let currConnection = {
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
let getConnectionSource = (connection) => {
  let source = connection.substr(0, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(source || 0, 16);
}
let getConnectionSourceOutput = (connection) => {
  let source = connection.substr(12, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(source || 0, 16);
}
let getConnectionDestination = (connection) => {
  let source = connection.substr(24, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(source || 0, 16);
}
let getConnectionDestinationInput = (connection) => {
  let source = connection.substr(36, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(source || 0, 16);
}
let getConnectionStrength = (connection) => {
  let source = connection.substr(48, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(source || 0, 16);
}
let getNumModules = (patch) => {
  let data = patch.substr(60, 11)
    .split(' ')
    .filter(c => c !== "00")
    .join('');
  let numModules = parseInt(data, 16);
  document.getElementById('num-modules').textContent = numModules + ' modules';
  return numModules;
}
let getModules = (patch, numModules) => {
  let data = patch.substr(72);
  let current = 0;
  let totalSize = 0;
  let modules = [];
  while(current < numModules){
    let currModuleSize = getModuleSize(data.substr(totalSize, 11)) * 4 * 3;
    let moduleData = data.substr(totalSize, currModuleSize);
    let moduleType = getModuleType(moduleData);
    let position = getModuleGridPos(moduleData);
    let numOptions = getModuleNumberOptions(moduleData);
    //let additionalOptions = getModuleAdditionalOptions(moduleData, currModuleSize);
    let moduleName = getModuleName(moduleData, currModuleSize);
    let currModule = {
      'id': current,
      'type': moduleType,
      'typeName': moduleLabels[moduleType],
      'page': getModulePage(moduleData),
      'moduleName': moduleName,
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
  return {'endPos': totalSize + 72, 'modules': modules};
}
let getModuleSize = (sizeBytes) => {
  let size = sizeBytes.substr(0, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(size, 16);
}
let getModuleType = (moduleData) => {
  let type = moduleData.substr(12, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(type || 0, 16);
}
let getModulePage = (moduleData) => {
  let page = moduleData.substr(36, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(page || 0, 16);
}
let getModuleColor = (moduleData) => {
  let page = moduleData.substr(48, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(page || 0, 16);
}
let getModuleGridPos = (moduleData) => {
  let page = moduleData.substr(60, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(page || 0, 16);
}
let posToXY = (pos) => {
  return {y: Math.floor(pos / 5) + 1 , x: (pos % 8) + 1}
}
let getModuleNumberOptions = (moduleData) => {
  let params = moduleData.substr(72, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(params || 0, 16) + 1;
}
let getModuleAdditionalOptions = (moduleData, moduleSize, hasName) => {
  let data = moduleData.substr(120, moduleSize - (hasName ? 168 : 120));
  //let numOptions = data.length / 12;
  let results = data.match(/.{1,12}/g).map(item =>
      item.split(' ')
          .reverse()
          .filter(c => c !== "00")
          .join('')
  )
  return results;
}

let getModuleName = (moduleData, moduleSize) => {
  return moduleData.substr(moduleSize - 48, 47)
      .split(' ')
      .reverse()
      .filter(c => c !== "00")
      .map(c => String.fromCharCode(parseInt(c, 16)))
      .reverse()
      .join('')
}

let getModuleOptions = (moduleData, numOptions) => {
  let options = [];
  let currentEnd = 96;
  for(let i = 0; i < numOptions; i++){
    let tempOption = moduleData.substr(currentEnd, 3);
    options.push(parseInt(tempOption, 16));
    currentEnd += 3;
  }
  return options;
}
let getNumPages = (patch, optionStart) => {
  let numPages = patch.substr(optionStart, 11)
    .split(' ')
    .reverse()
    .filter(c => c !== "00")
    .join('');
  return parseInt(numPages, 16);
}
let getModuleLabel = (moduleData) => {
  let label = moduleData.substr(data.length - 48, 47)
    .split(' ')
    .map(n => n === 0 ? 32 : n)
    .map(c => String.fromCharCode(c))
    .join('')
    .trim();
  debugger;
  return label;
}

let getNumberStarred = (patch, endPages) => {
  let numberStarred = patch.substr(endPages, 11)
      .split(' ')
      .reverse()
      .filter(c => c !== "00")
      .join('');
  return parseInt(numberStarred || 0, 16);
}