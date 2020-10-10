var zoiaTemplate = {
  "modules":[
    {
      "name": "SV Filter",
      "options":[
        {
          "name":"low pass output",
          "values":[
            "on",
            "off"
          ]
        },
        {
          "name":"hipass output",
          "values":[
            "off",
            "on"
          ]
        },
        {
          "name":"bandpass output",
          "values":[
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"6",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"frequency",
          "type": 1
        },
        {
          "name":"resonance",
          "type": 1
        },
        {
          "name":"lowpass output",
          "type": 0
        },
        {
          "name":"hipass output",
          "type": 0
        },
        {
          "name":"bandpass output",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0],d.blocks[1],d.blocks[2]];
        if(d.options[0] === 0){
          blocks.push(d.blocks[3])
        }
        if (d.options[1] === 1) {
          blocks.push(d.blocks[4])
        }
        if(d.options[2] === 1){
          blocks.push(d.blocks[5])
        }

        return blocks;
      }
    },
    {
      "name": "Audio Input",
      "options":[
        {
          "name": "channels",
          "values": [
            "left input",
            "right input",
            "both"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "pedal input L",
          "type": 0
        },
        {
          "name": "pedal input R",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        switch(d.options[0]){
          case 0:
            return [d.blocks[0]]
            break;
          case 1:
            return [d.blocks[1]]
            break;
          case 2:
            return d.blocks
            break;
        }
      }

    },
    {
      "name": "Audio Output",
      "options":[
        {
          "name": "gain control",
          "values": [
            "true",
            "false"
          ],
        },
        {
          "name": "channels",
          "values": [
            "left output",
            "right output",
            "both"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"3",
      "blocks":[
        {
          "name": "pedal output L",
          "type":0
        },
        {
          "name": "pedal output R",
          "type":0
        },
        {
          "name": "gain",
          "type":1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = []
        switch(d.options[1]){
          case 0:
            blocks.push(d.blocks[0]);
            break;
          case 1:
            blocks.push(d.blocks[1]);
            break;
          case 2:
            blocks.push(d.blocks[0]);
            blocks.push(d.blocks[1]);
            break;
          default:
            blocks.push(d.blocks[0]);
            break;
        }
        if(d.options[0] === 1){
          blocks.push[d.blocks[2]]
        }
        return blocks;
      }
    },
    {
      "name": "Aliaser",
      "options":[],
      "minBlocks": "1",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"audio in",
          "type":0
        },
        {
          "name":"alias amount",
          "type":1
        },
        {
          "name":"audio out",
          "type":0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Sequencer",
      "options":[
        {
          "name": "number of steps",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32
          ]
        },
        {
          "name": "num of tracks",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        },
        {
          "name": "restart jack",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "behaviour",
          "values": [
            "loop",
            "one-shot"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"42",
      "blocks":[
        {
          "name":"step ",
          "type": 1
        },
        {
          "name":"gate in",
          "type": 1
        },
        {
          "name":"queue start",
          "type": 1
        },
        {
          "name":"out type 1: CV",
          "type": 1
        },
        {
          "name":"out type 2: gate",
          "type": 1
        },
        {
          "name":"out type 3: ratchet",
          "type": 1
        },
      ],
      "calcBlocks": (d) => {
        var blocks = [];
        for(var i = 0; i < d.options[0]; i++){
          var tempBlock = Object.assign({}, d.blocks[0]);
          tempBlock.name += (i + 1);
          blocks.push(tempBlock);
        }
        blocks.push(d.blocks[1]);
        if(d.options[2] === 1){
          blocks.push(d.blocks[2]);
        }
        for(var j = 0; j < d.options[1]; j++){
          blocks.push(d.blocks[3]);
        }

        return blocks;
      }
    },
    {
      "name": "LFO",
      "options":[
        {
          "name": "waveform",
          "values": [
            "square",
            "sine",
            "triangle",
            "ramp",
            "sawtooth",
            "random"
          ]
        },
        {
          "name": "swing control",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "output",
          "values": [
            "0 to 1",
            "-1 to 1"
          ]
        },
        {
          "name": "input",
          "values": [
            "cv control",
            "tap"
          ]
        },
        {
          "name": "phase input",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "phase reset",
          "values": [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"frequency/trigger in",
          "type": 1
        },
        {
          "name":"swing amount",
          "type": 1
        },
        {
          "name":"phase input",
          "type": 1
        },
        {
          "name":"phase reset",
          "type": 1
        },
        {
          "name":"output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[1] === 1){
          blocks.push(d.blocks[1]);
        }
        if(d.options[4] === 1) {
          blocks.push(d.blocks[2]);
        }
        if(d.options[5] === 1){
          blocks.push(d.blocks[3]);
        }
        blocks.push(d.blocks[4]);

        return blocks;
      }
    },
    {
      "name": "ADSR",
      "options":[
        {
          "name": "retrigger input",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "initial delay",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "hold attack/decay",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "str",
          "values": [
            "on",
            "off"
          ]
        },
        {
          "name": "immediate release",
          "values": [
            "on",
            "off"
          ]
        },
        {
          "name": "hold sustain/release",
          "values": [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "5",
      "maxBlocks":"10",
      "blocks":[
        {
          "name": "cv input",
          "type": 1
        },
        {
          "name": "retrigger",
          "type": 1
        },
        {
          "name": "delay",
          "type": 1
        },
        {
          "name": "attack",
          "type": 1
        },
        {
          "name": "hold attack decay",
          "type": 1
        },
        {
          "name": "decay",
          "type": 1
        },
        {
          "name": "sustain",
          "type": 1
        },
        {
          "name": "hold sustain release",
          "type": 1
        },
        {
          "name": "release",
          "type": 1
        },
        {
          "name": "cv output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1) {
          blocks.push(d.blocks[1]);
        }
        if(d.options[1] === 1) {
          blocks.push(d.blocks[2]);
        }
        blocks.push(d.blocks[3]);
        if(d.options[2] === 1) {
          blocks.push(d.blocks[4]);
        }
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        if(d.options[4] === 1){
          blocks.push(d.blocks[7]);
        }
        blocks.push(d.blocks[8]);
        blocks.push(d.blocks[9]);

        return blocks;
      }
    },
    {
      "name": "VCA",
      "options":[
        {
          "name":"channels",
          "values":[
            1,
            2
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"5",
      "blocks":[
        {
          "name":"audio in 1",
          "type": 0
        },
        {
          "name":"audio in 2",
          "type": 0
        },
        {
          "name":"level control",
          "type": 1
        },
        {
          "name":"audio out 1",
          "type": 0
        },
        {
          "name":"audio out 2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        if(d.options[0] === 1){
          blocks.push(d.blocks[4])
        }

        return blocks;
      }
    },
    {
      "name": "Audio Multiply",
      "options":[],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"audio in 1",
          "type": 0
        },
        {
          "name":"audio in 2",
          "type": 0
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Bit Crusher",
      "options":[
        {
          "name":"fractions",
          "values": [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"crushed bits",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => { return d.blocks}
    },
    {
      "name": "Sample and Hold",
      "options":[],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "trigger",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "OD & Distortion",
      "options":[
        {
          "name": "model",
          "values" :[
            "plexi",
            "germ",
            "classic",
            "pushed",
            "edgy"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"input gain",
          "type": 1
        },
        {
          "name":"output gain",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Env Follower",
      "options":[
        {
          "name":"rise/fall time",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"output scale",
          "values": [
            "log",
            "linear"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"rise time",
          "type": 1
        },
        {
          "name":"fall time",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
          blocks.push(d.blocks[2]);
        }
        blocks.push(d.blocks[3]);

        return blocks;
      }
    },
    {
      "name": "Delay line",
      "options":[
        {
          "name":"max time",
          "values":[
            "100ms",
            "16s"
          ]
        },
        {
          "name":"tap tempo in",
          "values":[
            "off",
            "in"
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"delay time",
          "type": 1
        },
        {
          "name":"modulation in",
          "type": 1
        },
        {
          "name":"tap tempo in",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[1] === 1){
          blocks.push(d.blocks[2])
          blocks.push(d.blocks[3])
        } else {
          blocks.push(d.blocks[1])
        }

        blocks.push(d.blocks[4])

        return blocks;
      }
    },
    {
      "name": "Oscillator",
      "options":[
        {
          "name":"waveform",
          "values":[
            "square",
            "triangle",
            "sawtooth",
            "sine"
          ]
        },
        {
          "name":"fm in",
          "values":[
            "off",
            "on"
          ]
        },
        {
          "name":"duty cycle",
          "values":[
            "off",
            "on"
          ]
        },
        {
          "name":"upsampling",
          "values":[
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"frequency",
          "type": 1
        },
        {
          "name":"FM input",
          "type": 0
        },
        {
          "name":"duty cycle",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[1] === 1) {
          blocks.push(d.blocks[1])
        }
        if(d.options[2] === 1) {
          blocks.push(d.blocks[2])
        }
        blocks.push(d.blocks[3])


        return blocks;
      }
    },
    {
      "name": "Pushbutton",
      "options":[
        {
          "name": "action",
          "values":[
            "momentary",
            "latching"
          ]
        },
        {
          "name":"normally",
          "values":[
            "zero",
            "one"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name":"switch",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Keyboard",
      "options":[
        {
          "name": "# of notes",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"26",
      "blocks":[
        {
          "name":"note #",
          "type":1
        },
        {
          "name":"note out",
          "type":1
        },
        {
          "name":"gate out",
          "type":1
        },
        {
          "name":"trigger out",
          "type":1
        }
      ],
      "calcBlocks": (d) => {
        var numNotes = d.options[0];
        var blocks = [];
        for(i = 1; i <= numNotes; i++){
          tempNode = d.blocks[0];
          tempNode.name += i;
          blocks.push(tempNode)
        }
        blocks.push(d.blocks[1]);
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);

        return blocks;
      }
    },
    {
      "name": "CV Invert",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Steps",
      "options":[],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"CV input",
          "type": 1
        },
        {
          "name":"quant steps",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Slew Limiter",
      "options":[
        {
          "name": "control",
          "values" : [
            "combined",
            "separate"
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"CV input",
          "type": 1
        },
        {
          "name":"slew rate",
          "type": 1
        },
        {
          "name":"rising lag",
          "type": 1
        },
        {
          "name":"falling lag",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if( d.options[0] === 0) {
          blocks.push(d.blocks[1]);
        } else {
          blocks.push(d.blocks[2]);
          blocks.push(d.blocks[3]);
        }
        blocks.push(d.blocks[4]);

        return blocks;
      }
    },
    {
      "name": "MIDI Notes in",
      "options":[
        {
          "name": "midi channel",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        },
        {
          "name": "# of outputs",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        },
        {
          "name": "priority",
          "values": [
            "newest",
            "oldest",
            "highest",
            "lowest"
          ]
        },
        {
          "name": "greedy",
          "values": [
            "no",
            "yes"
          ]
        },
        {
          "name": "velocity output",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "low note",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
          ]
        },
        {
          "name": "high note",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
          ]
        },
        {
          "name": "trigger pulse",
          "values": [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"32",
      "blocks":[
        {
          "name": "note out",
          "type": 1
        },
        {
          "name": "gate out",
          "type": 1
        },
        {
          "name": "velocity out",
          "type": 1
        },
        {
          "name": "trigger out",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [];
        var vel = d.options[4] === 1;
        var trig = d.options[7] === 1;
        for(var i = 0; i < d.options[1]; i++){
          blocks.push(d.blocks[0]);
          blocks.push(d.blocks[1]);
          if (vel) {
            blocks.push(d.blocks[2]);
          }
          if(trig) {
            blocks.push(d.blocks[3]);
          }
        }
        return blocks;
      }
    },
    {
      "name": "MIDI CC in",
      "options":[
        {
          "name": "midi channel",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        },
        {
          "name" : "controller",
          "values" :[0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
          ]
        },
        {
          "name": "output",
          "values" : [
            "0 to 1",
            "-1 to 1"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name" : "cc value",
          "type" : 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Multiplier",
      "options":[
        {
          "name": "num inputs",
          "values" :[
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"9",
      "blocks":[
        {
          "name":"CV input",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[0]];
        for(var i = 0; i < d.options[0]; i++){
          blocks.push(d.blocks[0]);
        }
        blocks.push(d.blocks[1]);

        return blocks;
      }
    },
    {
      "name": "Compressor",
      "options":[
        {
          "name":"attack ctrl",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"release ctrl",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"ratio ctrl",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"channels",
          "values": [
            "1in->1out",
            "stereo"
          ]
        },
        {
          "name":"sidechain",
          "values": [
            "internal",
            "external"
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"audio inR",
          "type": 0
        },
        {
          "name":"threshold",
          "type": 1
        },
        {
          "name":"attack",
          "type": 1
        },
        {
          "name":"release",
          "type": 1
        },
        {
          "name":"ratio",
          "type": 1
        },
        {
          "name":"sidechain in",
          "type": 0
        },
        {
          "name":"audio out",
          "type": 0
        },
        {
          "name":"audio outR",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[3] === 1){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        if(d.options[0] === 1) {
          blocks.push(d.blocks[3]);
        }
        if(d.options[1] === 1){
          blocks.push(d.blocks[4]);
        }
        if(d.options[2] === 1){
          blocks.push(d.blocks[5]);
        }
        if(d.options[4] === 1){
          blocks.push(d.blocks[6]);
        }
        blocks.push(d.blocks[7]);
        if(d.options[3] === 1){
          blocks.push(d.blocks[8]);
        }

        return blocks;
      }
    },
    {
      "name": "Multi-filter",
      "options":[
        {
          "name":"filter shape",
          "values":[
            "high pass",
            "low pass",
            "band pass",
            "bell",
            "hi shelf",
            "low shelf"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"5",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"gain",
          "type": 1
        },
        {
          "name":"frequency",
          "type": 1
        },
        {
          "name":"q",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] > 2 ) {
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);

        return blocks;
      }
    },
    {
      "name": "Plate Reverb",
      "options":[],
      "minBlocks": "8",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"input L",
          "type" : 0
        },
        {
          "name":"input R",
          "type" : 0
        },
        {
          "name":"decay time",
          "type" : 1
        },
        {
          "name":"low eq",
          "type" : 1
        },
        {
          "name":"high eq",
          "type" : 1
        },
        {
          "name":"mix",
          "type" : 1
        },
        {
          "name":"output L",
          "type" : 0
        },
        {
          "name":"output R",
          "type" : 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Buffer delay",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "All-pass filter",
      "options":[
        {
          "name":"# of poles",
          "values":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"audio in",
          "type":0
        },
        {
          "name":"filter gain",
          "type":1
        },
        {
          "name":"audio out",
          "type":0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Quantizer",
      "options":[
        {
          "name":"key/scale jacks",
          "values" : [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"CV input",
          "type": 1
        },
        {
          "name":"key",
          "type": 1
        },
        {
          "name":"scale",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
          blocks.push(d.blocks[2]);
        }
        blocks.push(d.blocks[3]);

        return blocks;
      }
    },
    {
      "name": "Phaser",
      "options":[
        {
          "name":"channels",
          "values": [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name":"control",
          "values": [
            "rate",
            "tap tempo",
            "cv direct"
          ]
        },
        {
          "name":"number of stages",
          "values": [
            4,
            2,
            3,
            1,
            6,
            8
          ]
        }
      ],
      "minBlocks": "6",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"input left",
          "type": 1
        },
        {
          "name":"input right",
          "type": 1
        },
        {
          "name":"control in",
          "type": 1
        },
        {
          "name":"resonance",
          "type": 1
        },
        {
          "name":"width",
          "type": 1
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"output left",
          "type": 1
        },
        {
          "name":"output right",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[7]);
        }
        return blocks;
      }
    },
    {
      "name": "Looper",
      "options":[
        {
          "name":"max rec time",
          "values": [
            "1s",
            "2s",
            "4s",
            "8s",
            "16s"
          ]
        },
        {
          "name":"length edit",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"playback",
          "values": [
            "once",
            "loop"
          ]
        },
        {
          "name":"length",
          "values": [
            "fixed",
            "pre-speed"
          ]
        },
        {
          "name":"hear while rec",
          "values": [
            "no",
            "yes"
          ]
        },
        {
          "name":"play reverse",
          "values": [
            "no",
            "yes"
          ]
        },
        {
          "name":"overdub",
          "values": [
            "no",
            "yes"
          ]
        },
        {
          "name":"stop/play but",
          "values": [
            "no",
            "yes"
          ]
        }
      ],
      "minBlocks": "5",
      "maxBlocks":"9",
      "blocks":[
        {
          "name": "audio in",
          "type": 0
        },
        {
          "name": "record",
          "type": 1
        },
        {
          "name": "restart playback",
          "type": 1
        },
        {
          "name": "stop/play",
          "type": 1
        },
        {
          "name": "speed/pitch",
          "type": 1
        },
        {
          "name": "start position",
          "type": 1
        },
        {
          "name": "loop length",
          "type": 1
        },
        {
          "name": "reverse playback",
          "type": 1
        },
        {
          "name": "audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[1], d.blocks[2]];

        if(d.options[2] === 1) {
          blocks.push(d.blocks[3]);
        }
        blocks.push(d.blocks[4]);
        if(d.options[1]===1){
          blocks.push(d.blocks[5]);
          blocks.push(d.blocks[6]);
        }
        if(d.options[5]===1){
          blocks.push(d.blocks[7]);
        }
        blocks.push(d.blocks[8]);

        return blocks;
      }
    },
    {
      "name": "In Switch",
      "options":[
        {
          "name":"num inputs",
          "values" : [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"18",
      "blocks":[
        {
          "name":"CV input ",
          "type": 1
        },
        {
          "name":"in select",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [];
        for(var i = 0; i < d.options[0] + 2; i++){
          var tempBlock = Object.assign({}, d.blocks[0]);
          tempBlock.name += (i+1);
          blocks.push(tempBlock);
        }
        blocks.push(d.blocks[1]);
        blocks.push(d.blocks[2]);

        return blocks;
      }
    },
    {
      "name": "Out Switch",
      "options":[
        {
          "name": "# of outputs",
          "values": [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"18",
      "blocks":[
        {
          "name":"CV Input",
          "type":1
        },
        {
          "name":"out select",
          "type":1
        },
        {
          "name":"CV output ",
          "type":1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[1]];
        for(var i = 0; i < d.options[0] + 2; i++){
          var tempBlock = Object.assign({}, d.blocks[2]);
          tempBlock.name += (i+1);
          blocks.push(tempBlock);
        }


        return blocks;
      }
    },
    {
      "name": "Audio In Switch",
      "options":[
        {
          "name":"# of inputs",
          "values":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"18",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"in select",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        for(i = 0; i < d.options[0]; i++){
          var tempBlock = Object.assign({}, d.blocks[0]);
          tempBlock.name += i;
          blocks.push(tempBlock);
        }
        blocks.push(d.blocks[1]);
        blocks.push(d.blocks[2]);

        return blocks;
      }
    },
    {
      "name": "Audio Out Switch",
      "options":[
        {
          "name":"# of inputs",
          "values":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"18",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"out select",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[1]];

        for(i = 0; i < d.options[0]; i++){
          var tempBlock = Object.assign({}, d.blocks[2]);
          tempBlock.name += (i + 1);
          blocks.push(tempBlock);
        }
        return blocks;

      }
    },
    {
      "name": "Midi pressure",
      "options":[
        {
          "name":"midi channel",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name": "channel pressure",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Onset Detector",
      "options":[
        {
          "name":"sensitivity",
          "values" : [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"sensitivity",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);

        return blocks;
      }
    },
    {
      "name": "Rythm",
      "options":[],
      "minBlocks": "",
      "maxBlocks":"",
      "blocks":[],
      "calcBlocks": (d) => {}
    },
    {
      "name": "Noise",
      "options":[],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Random",
      "options":[
        {
          "name":"output",
          "values" : [
            "0 to 1",
            "-1 to 1"
          ]
        },
        {
          "name":"new val on trig",
          "values" : [
            "on",
            "off"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "trigger in",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [];
        if(d.options[1] === 0){
          blocks = d.blocks;
        } else {
          blocks = [d.blocks[1]];
        }
        return blocks;
      }
    },
    {
      "name": "Gate",
      "options":[
        {
          "name":"attack ctrl",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"release ctrl",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name":"channels",
          "values": [
            "1in->1out",
            "stereo"
          ]
        },
        {
          "name":"sidechain",
          "values": [
            "internal",
            "external"
          ]
        }
      ],
      "minBlocks": "5",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"audio inL",
          "type": 0
        },
        {
          "name":"audio inR",
          "type": 0
        },
        {
          "name":"threshold",
          "type": 1
        },
        {
          "name":"attack",
          "type": 1
        },
        {
          "name":"release",
          "type": 1
        },
        {
          "name":"sidechain in",
          "type": 1
        },
        {
          "name":"audio outL",
          "type": 0
        },
        {
          "name":"audio outR",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[2] === 1){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        if(d.options[0] === 1){
          blocks.push(d.blocks[3]);
        }
        if(d.options[1] === 1){
          blocks.push(d.blocks[4]);
        }
        if(d.options[3] === 1) {
          blocks.push(d.blocks[5]);
        }
        blocks.push(d.blocks[6]);
        if(d.options[2] === 1){
          blocks.push(d.blocks[7]);
        }
        return blocks;
      }
    },
    {
      "name": "Tremolo",
      "options":[
        {
          "name": "channels",
          "values": [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name": "control",
          "values": [
            "rate",
            "tap tempo",
            "cv direct"
          ]
        },
        {
          "name": "waveform",
          "values": [
            "fender'ish",
            "vox'ish",
            "triangle",
            "sine",
            "square"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"6",
      "blocks":[
        {
          "name": "audio inL",
          "type": 0
        },
        {
          "name": "audio inR",
          "type": 0
        },
        {
          "name": "control in",
          "type": 1
        },
        {
          "name": "depth",
          "type": 1
        },
        {
          "name": "audio outL",
          "type": 0
        },
        {
          "name": "audio outR",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[5]);
        }
        return blocks;
      }
    },
    {
      "name": "Tone Control",
      "options":[
        {
          "name":"channels",
          "values": [
            "1in->1out",
            "stereo"
          ]
        },
        {
          "name":"num mid bands",
          "values": [
            1,
            2
          ]
        }
      ],
      "minBlocks": "6",
      "maxBlocks":"10",
      "blocks":[
        {
          "name":"aud in L",
          "type": 0
        },
        {
          "name":"aud in R",
          "type": 0
        },
        {
          "name":"low shelf",
          "type": 1
        },
        {
          "name":"mid gain 1",
          "type": 1
        },
        {
          "name":"mid frequency 1",
          "type": 1
        },
        {
          "name":"mid gain 2",
          "type": 1
        },
        {
          "name":"mid frequency 2",
          "type": 1
        },
        {
          "name":"high shelf",
          "type": 1
        },
        {
          "name":"output L",
          "type": 0
        },
        {
          "name":"output R",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        if(d.options[1] === 1){
          blocks.push(d.blocks[5]);
          blocks.push(d.blocks[6]);
        }
        blocks.push(d.blocks[7]);
        blocks.push(d.blocks[8]);
        if(d.options[0] === 1){
          blocks.push(d.blocks[9]);
        }
        return blocks;
      }
    },
    {
      "name": "Delay w/Mod",
      "options":[
        {
          "name": "channels",
          "values" :[
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name": "control",
          "values" :[
            "rate",
            "tap tempo"
          ]
        },
        {
          "name": "type",
          "values" :[
            "clean",
            "tape",
            "old tape",
            "bbd"
          ]
        },
        {
          "name": "tap ratio",
          "values" :[
            "1:1",
            "2:3",
            "1:2",
            "1:3",
            "3:8",
            "1:4",
            "3:16",
            "1:8",
            "1:16",
            "1:32"
          ]
        }
      ],
      "minBlocks": "7",
      "maxBlocks":"9",
      "blocks":[
        {
          "name":"audio in 1",
          "type": 0
        },
        {
          "name":"audio in 2",
          "type": 0
        },
        {
          "name":"delay time",
          "type": 1
        },
        {
          "name":"feedback",
          "type": 1
        },
        {
          "name":"mod rate",
          "type": 1
        },
        {
          "name":"mod depth",
          "type": 1
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"audio out1",
          "type": 0
        },
        {
          "name":"audio out2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        blocks.push(d.blocks[7]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[8]);
        }

        return blocks;
      }
    },
    {
      "name": "Stompswitch",
      "options":[
        {
          "name":"stompswitch",
          "values":[
            "left",
            "middle",
            "right",
            "ext"
          ]
        },
        {
          "name":"action",
          "values":[
            "momentary",
            "latching"
          ]
        },
        {
          "name":"normally",
          "values":[
            "zero",
            "one"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name":"cv output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Value",
      "options":[
        {
          "name": "",
          "values": [
            "0 to 1",
            "-1 to 1"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "value",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "CV Delay",
      "options":[],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "delay time",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "CV Loop",
      "options":[
        {
          "name": "max rec time",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        },
        {
          "name": "length edit",
          "values": [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "6",
      "maxBlocks":"8",
      "blocks":[
        {
          "name": "CV Input",
          "type": 1
        },
        {
          "name": "record",
          "type": 1
        },
        {
          "name": "play",
          "type": 1
        },
        {
          "name": "playback speed",
          "type": 1
        },
        {
          "name": "start position",
          "type": 1
        },
        {
          "name": "stop position",
          "type": 1
        },
        {
          "name": "restart loop",
          "type": 1
        },
        {
          "name": "cv output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0],d.blocks[1], d.blocks[2], d.blocks[3]];
        if(d.options[1] === 1){
          blocks.push(d.blocks[4]);
          blocks.push(d.blocks[5]);
          blocks.push(d.blocks[6]);
        }
        blocks.push(d.blocks[7]);
        blocks.push(d.blocks[8]);

        return blocks;
      }
    },
    {
      "name": "CV Filter",
      "options":[],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"CV input",
          "type": 1
        },
        {
          "name":"time constant",
          "type": 1
        },
        {
          "name":"CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Clock Divider",
      "options":[],
      "minBlocks": "4",
      "maxBlocks":"4",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "reset switch",
          "type": 1
        },
        {
          "name": "clock ratio",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Comparator",
      "options":[
        {
          "name":"output",
          "values" : [
            "0 to 1",
            "-1 to 1"
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"CV positive input",
          "type":1
        },
        {
          "name":"CV negative input",
          "type":1
        },
        {
          "name":"CV output",
          "type":1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "CV Rectify",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Trigger",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Stereo Spread",
      "options":[
        {
          "name":"method",
          "values":[
            "Mid-Side",
            "Haas"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"5",
      "blocks":[
        {
          "name": "audio in",
          "type": 0
        },
        {
          "name": "audio in 1",
          "type": 0
        },
        {
          "name": "audio in 2",
          "type": 0
        },
        {
          "name": "delay time",
          "type": 0
        },
        {
          "name": "side gain",
          "type": 0
        },
        {
          "name": "audio out 1",
          "type": 0
        },
        {
          "name": "audio out 2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [];
        if(d.options[0] === 0) {
          blocks = [d.blocks[0], d.blocks[3], d.blocks[5], d.blocks[6]]
        } else {
          blocks = [d.blocks[1], d.blocks[2], d.blocks[4], d.blocks[5], d.blocks[6]];
        }

        return blocks;
      }
    },
    {
      "name": "Cport EXP/CV in",
      "options":[
        {
          "name":"output range",
          "values": [
            "0 to 1",
            "-1 to 1"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name": "cv output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Cport CV out",
      "options":[
        {
          "name":"output range",
          "values": [
            "0 to 1",
            "-1 to 1"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name": "cv input",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks;}
    },
    {
      "name": "UI Button",
      "options":[
        {
          "name": "cv output",
          "values":[
            "disabled",
            "enabled"
          ]
        },
        {
          "name":"range",
          "values":[
            "extended",
            "basic"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"2",
      "blocks":[
        {
          "name":"in",
          "type": 1
        },
        {
          "name":"CV Output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push[d.blocks[1]]
        }

        return blocks;
      }
    },
    {
      "name": "Audio Panner",
      "options":[
        {
          "name":"channels",
          "values":[
            "1in->2out",
            "stereo"
          ]
        },
        {
          "name":"pan type",
          "values":[
            "equal pwr",
            "linear",
            "-4.5db"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"5",
      "blocks":[
        {
          "name":"audio in 1",
          "type": 0
        },
        {
          "name":"audio in 2",
          "type": 0
        },
        {
          "name":"pan",
          "type": 1
        },
        {
          "name":"audio out 1",
          "type": 0
        },
        {
          "name":"audio out 2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);

        return blocks;
      }
    },
    {
      "name": "Pitch Detector",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"pitch out",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Pitch Shifter",
      "options":[],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"pitch shift",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks;}
    },
    {
      "name": "Midi Note out",
      "options":[
        {
          "name":"midi channel",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        },
        {
          "name" : "velocity output",
          "values" : [
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"3",
      "blocks":[
        {
          "name":"note in",
          "type":1
        },
        {
          "name":"gate in",
          "type":1
        },
        {
          "name":"velocity",
          "type":1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[1]];
        if(d.options[1] === 1){
          blocks.push(d.blocks[2]);
        }
        return blocks;
      }
    },
    {
      "name": "Midi CC out",
      "options":[
        {
          "name":"midi channel",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        },
        {
          "name": "controller",
          "values" : [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63,
            64,
            65,
            66,
            67,
            68,
            69,
            70,
            71,
            72,
            73,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            82,
            83,
            84,
            85,
            86,
            87,
            88,
            89,
            90,
            91,
            92,
            93,
            94,
            95,
            96,
            97,
            98,
            99,
            100,
            101,
            102,
            103,
            104,
            105,
            106,
            107,
            108,
            109,
            110,
            111,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            124,
            125,
            126,
            127,
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name" : "cc out",
          "type" : 1
        }
      ],
      "calcBlocks": (d) => { return d.blocks }
    },
    {
      "name": "Midi PC out",
      "options":[
        {
          "name" : "midi channel",
          "values" : [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "pc out",
          "type" : 1
        },
        {
          "name" : "trigger in",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Bit Modulator",
      "options":[
        {
          "name":"type",
          "values": [
            "xor",
            "and",
            "or",
            ""
          ]
        }
      ],
      "minBlocks": "3",
      "maxBlocks":"3",
      "blocks":[
        {
          "name": "audio in 1",
          "type": 0
        },
        {
          "name": "audio in 2",
          "type": 0
        },
        {
          "name": "audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Audio Balance",
      "options":[
        {
          "name":"output",
          "values":[
            "mono",
            "stereo"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"7",
      "blocks":[
        {
          "name":"audio in1",
          "type": 0
        },
        {
          "name":"audio in2",
          "type": 0
        },
        {
          "name":"audio in1 L",
          "type": 0
        },
        {
          "name":"audio in1 R",
          "type": 0
        },
        {
          "name":"audio in2 L",
          "type": 0
        },
        {
          "name":"audio in2 R",
          "type": 0
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"audio out1",
          "type": 0
        },
        {
          "name":"audio outL",
          "type": 0
        },
        {
          "name":"audio outR",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [];
        if(d.options[0] === 0){
          blocks = [d.blocks[0], d.blocks[1], d.blocks[6], d.blocks[7]]
        } else {
          blocks = [d.blocks[2],d.blocks[3],d.blocks[4],d.blocks[5],d.blocks[6],d.blocks[8],d.blocks[9]]
        }
        return blocks;
      }
    },
    {
      "name": "Inverter",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks;}
    },
    {
      "name": "Fuzz",
      "options":[
        {
          "name": "mode",
          "values": [
            "efuzzy",
            "burly",
            "scoopy",
            "ugly"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"audio in",
          "type": 0
        },
        {
          "name":"input gain",
          "type": 1
        },
        {
          "name":"output gain",
          "type": 1
        },
        {
          "name":"audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Ghostverb",
      "options":[
        {
          "name": "channels",
          "values" : [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        }
      ],
      "minBlocks": "6",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"audio in1",
          "type": 0
        },
        {
          "name":"audio in2",
          "type": 0
        },
        {
          "name":"decay/feedback",
          "type": 1
        },
        {
          "name":"rate",
          "type": 1
        },
        {
          "name":"resonance",
          "type": 1
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"audio out1",
          "type": 0
        },
        {
          "name":"audio out2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[7]);
        }
        return blocks;
      }
    },
    {
      "name": "Cabinet Sim",
      "options":[
        {
          "name": "",
          "values": [
            "mono",
            "stereo",
            "stereo_out"
          ]
        },
        {
          "name": "",
          "values": [
            "4x12 full",
            "2x12 dark",
            "2x12 modern",
            "1x12",
            "1x8 lofi",
            "1x12 vint",
            "4x12 hifi"
          ]
        }
      ],
      "minBlocks": "2",
      "maxBlocks":"4",
      "blocks":[
        {
          "name": "audio in1",
          "type": 0
        },
        {
          "name": "audio in2",
          "type": 0
        },
        {
          "name": "audio out1",
          "type": 0
        },
        {
          "name": "audio out2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 1) {
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[3]);
        }
        return blocks;
      }
    },
    {
      "name": "Flanger",
      "options":[
        {
          "name": "channels",
          "values": [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name": "control",
          "values": [
            "rate",
            "tap tempo",
            "cv dirct"
          ]
        },
        {
          "name": "type",
          "values": [
            "1960s",
            "1970s",
            "thru-0"
          ]
        }
      ],
      "minBlocks": "7",
      "maxBlocks":"9",
      "blocks":[
        {
          "name": "input left",
          "type": 0
        },
        {
          "name": "input right",
          "type": 0
        },
        {
          "name": "control in",
          "type": 1
        },
        {
          "name": "regeneration",
          "type": 1
        },
        {
          "name": "width",
          "type": 1
        },
        {
          "name": "tone tilt eq",
          "type": 1
        },
        {
          "name": "mix",
          "type": 1
        },
        {
          "name": "output left",
          "type": 0
        },
        {
          "name": "output right",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        blocks.push(d.blocks[7]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[8]);
        }
        return blocks;
      }
    },
    {
      "name": "Chorus",
      "options":[
        {
          "name": "channels",
          "values": [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name": "control",
          "values": [
            "rate",
            "tap tempo",
            "cv dirct"
          ]
        },
        {
          "name": "type",
          "values": [
            "classic"
          ]
        }
      ],
      "minBlocks": "6",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"input left",
          "type": 0
        },
        {
          "name":"input right",
          "type": 0
        },
        {
          "name":"control in",
          "type": 1
        },
        {
          "name":"width",
          "type": 1
        },
        {
          "name":"tone tilt eq",
          "type": 1
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"output left",
          "type": 0
        },
        {
          "name":"output right",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[7]);
        }

        return blocks;
      }
    },
    {
      "name": "Vibrato",
      "options":[
        {
          "name":"channels",
          "values":[
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name":"control",
          "values":[
            "rate",
            "tap tempo",
            "cv direct"
          ]
        },
        {
          "name":"waveform",
          "values":[
            "sine",
            "triangle",
            "swung sine",
            "swung"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"6",
      "blocks":[
        {
          "name":"input left",
          "type": 0
        },
        {
          "name":"input right",
          "type": 0
        },
        {
          "name":"control in",
          "type": 1
        },
        {
          "name":"width",
          "type": 1
        },
        {
          "name":"output left",
          "type": 0
        },
        {
          "name":"output right",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[5]);
        }

        return blocks
      }
    },
    {
      "name": "Env Filter",
      "options":[
        {
          "name": "channels",
          "values": [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name": "filter type",
          "values": [
            "bpf",
            "hpf",
            "lpf"
          ]
        },
        {
          "name": "direction",
          "values": [
            "up",
            "down"
          ]
        }
      ],
      "minBlocks": "6",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"audio in1",
          "type": 0
        },
        {
          "name":"audio in2",
          "type": 0
        },
        {
          "name":"sensitivity",
          "type": 1
        },
        {
          "name":"min freq",
          "type": 1
        },
        {
          "name":"max freq",
          "type": 1
        },
        {
          "name":"filter Q",
          "type": 1
        },
        {
          "name":"audio out1",
          "type": 0
        },
        {
          "name":"audio out2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2) {
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        if(d.options[0] > 0) {
          blocks.push(d.blocks[7]);
        }
        return blocks;
      }
    },
    {
      "name": "Ring Modulator",
      "options":[
        {
          "name": "waveform",
          "values": [
            "sine",
            "square",
            "triangle",
            "sawtooth"
          ]
        },
        {
          "name": "ext audio in",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "duty cycle",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "upsampling",
          "values": [
            "none",
            "2X"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"5",
      "blocks":[
        {
          "name": "audio in",
          "type": 0
        },
        {
          "name": "frequency or ext in",
          "type": 1
        },
        {
          "name": "duty cycle",
          "type": 1
        },
        {
          "name": "mix",
          "type": 1
        },
        {
          "name": "audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[1]];
        if(d.options[2] === 1){
          blocks.push(d.blocks[2]);
        }
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);

        return blocks;
      }
    },
    {
      "name": "Hall Reverb",
      "options":[],
      "minBlocks": "8",
      "maxBlocks":"8",
      "blocks":[
        {
          "name":"input L",
          "value": 0
        },
        {
          "name":"input R",
          "value": 0
        },
        {
          "name":"decay time",
          "value": 1
        },
        {
          "name":"low eq",
          "value": 1
        },
        {
          "name":"high eq (lpf freq)",
          "value": 1
        },
        {
          "name":"mix",
          "value": 1
        },
        {
          "name":"output L",
          "value": 0
        },
        {
          "name":"output R",
          "value": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Ping Pong Delay",
      "options":[
        {
          "name":"channels",
          "values":[
            "1in->2out",
            "2in->2out"
          ]
        },
        {
          "name":"control",
          "values":[
            "rate",
            "tap tempo"
          ]
        },
        {
          "name":"type",
          "values":[
            "clean",
            "tape",
            "old tape",
            "bbd"
          ]
        },
        {
          "name":"tap ratio",
          "values":[
            "1:1",
            "2:3",
            "1:2",
            "1:3",
            "3:8",
            "1:4",
            "3:16",
            "1:8",
            "1:16",
            "1:32"
          ]
        }
      ],
      "minBlocks": "8",
      "maxBlocks":"9",
      "blocks":[
        {
          "name":"audio in1",
          "type": 0
        },
        {
          "name":"audio in2",
          "type": 0
        },
        {
          "name":"delay time",
          "type": 1
        },
        {
          "name":"feedback",
          "type": 1
        },
        {
          "name":"mod rate",
          "type": 1
        },
        {
          "name":"mod depth",
          "type": 1
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"audio out1",
          "type": 0
        },
        {
          "name":"audio out2",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = d.blocks;
        if(d.options[0] === 0){
          blocks = blocks.filter((item, index) => index !== 1)
        }
        return blocks;
      }
    },
    {
      "name": "Audio Mixer",
      "options":[
        {
          "name":"num channels",
          "values":[
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        },
        {
          "name":"inputs",
          "values":[
            "mono",
            "stereo"
          ]
        },
        {
          "name":"panning",
          "values":[
            "off",
            "on"
          ]
        }
      ],
      "minBlocks": "5",
      "maxBlocks":"34",
      "blocks":[
        {
          "name":"inL 1",
          "type": 0
        },
        {
          "name":"inR 1",
          "type": 0
        },
        {
          "name":"inL 2",
          "type": 0
        },
        {
          "name":"inR 2",
          "type": 0
        },
        {
          "name":"gain 1",
          "type": 1
        },
        {
          "name":"gain 2",
          "type": 1
        },
        {
          "name":"pan 1",
          "type": 1
        },
        {
          "name":"pan 2",
          "type": 1
        },
        {
          "name":"out L",
          "type": 0
        },
        {
          "name":"out R",
          "type": 0
        },
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "CV Flip Flop",
      "options":[],
      "minBlocks": "2",
      "maxBlocks":"2",
      "blocks":[
        {
          "name": "CV input",
          "type": 1
        },
        {
          "name": "CV output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Diffuser",
      "options":[],
      "minBlocks": "6",
      "maxBlocks":"6",
      "blocks":[
        {
          "name": "audio in",
          "type": 0
        },
        {
          "name": "gain",
          "type": 1
        },
        {
          "name": "size",
          "type": 1
        },
        {
          "name": "mod width",
          "type": 1
        },
        {
          "name": "mod rate",
          "type": 1
        },
        {
          "name": "audio out",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Reverb Lite",
      "options":[
        {
          "name": "channels",
          "values": [
            "1in->1out",
            "1in->2out",
            "2in->2out"
          ]
        }
      ],
      "minBlocks": "4",
      "maxBlocks":"6",
      "blocks":[
        {
          "name":"input L",
          "type": 0
        },
        {
          "name":"input R",
          "type": 0
        },
        {
          "name":"decay time",
          "type": 1
        },
        {
          "name":"mix",
          "type": 1
        },
        {
          "name":"output L",
          "type": 0
        },
        {
          "name":"output R",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[0] === 2){
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        if(d.options[0] > 0){
          blocks.push(d.blocks[5]);
        }
        return blocks;
      }
    },
    {
      "name": "Room Reverb",
      "options":[],
      "minBlocks": "8",
      "maxBlocks":"8",
      "blocks":[
        {
          "name": "input L",
          "type": 0
        },
        {
          "name": "input R",
          "type": 0
        },
        {
          "name": "decay time",
          "type": 1
        },
        {
          "name": "low eq",
          "type": 1
        },
        {
          "name": "high eq (lpf freq)",
          "type": 1
        },
        {
          "name": "mix",
          "type": 1
        },
        {
          "name": "output L",
          "type": 0
        },
        {
          "name": "output R",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks;}
    },
    {
      "name": "Pixel",
      "options":[
        {
          "name":"control",
          "values": [
            "cv",
            "audio"
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name":"cv in/audio in",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Midi Clock In",
      "options":[
        {
          "name":"midi channel",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks": "1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name": "cc value",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks}
    },
    {
      "name": "Granular",
      "options":[
        {
          "name":"num grains",
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        },
        {
          "name":"channels",
          "values": [
            "mono",
            "stereo"
          ]
        },
        {
          "name":"pos control",
          "values": [
            "cv",
            "tap"
          ]
        },
        {
          "name":"size control",
          "values": [
            "cv",
            "tap"
          ]
        }
      ],
      "minBlocks": "8",
      "maxBlocks":"10",
      "blocks":[
        {
          "name": "audio in",
          "type": 0
        },
        {
          "name": "audio inR",
          "type": 0
        },
        {
          "name": "grain size",
          "type": 1
        },
        {
          "name": "grain position",
          "type": 1
        },
        {
          "name": "density",
          "type": 1
        },
        {
          "name": "texture",
          "type": 1
        },
        {
          "name": "speed/pitch",
          "type": 1
        },
        {
          "name": "freeze",
          "type": 1
        },
        {
          "name": "audio out",
          "type": 0
        },
        {
          "name": "audio outR",
          "type": 0
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];
        if(d.options[1]) {
          blocks.push(d.blocks[1]);
        }
        blocks.push(d.blocks[2]);
        blocks.push(d.blocks[3]);
        blocks.push(d.blocks[4]);
        blocks.push(d.blocks[5]);
        blocks.push(d.blocks[6]);
        blocks.push(d.blocks[7]);
        blocks.push(d.blocks[8]);
        if(d.options[1]) {
          blocks.push(d.blocks[9]);
        }

        return blocks;
      }
    },
    {
      "name": "Midi Clock Out",
      "options": [
        {
          "name": "input",
          "values": [
            "tap",
            "cv_control"
          ]
        },
        {
          "name": "run_in",
          "values": [
            "enabled",
            "disabled"
          ]
        },
        {
          "name": "reset_in",
          "values": [
            "enabled",
            "disabled"
          ]
        }{
          "name": "position",
          "values": [
            "disabled",
            "enabled"
          ]
        }
      ],
      "minBlocks":"3",
      "maxBlocks":"5",
      "blocks":[
        {
          "name":"tap/cv control",
          "type": 1
        },
        {
          "name":"sent",
          "type": 1
        },
        {
          "name":"reset",
          "type": 1
        },
        {
          "name":"send position",
          "type": 1
        },
        {
          "name":"song position",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0], d.blocks[1]];

        if(d.options[1] === 1){
          blocks.push(d.blocks[2]);
        }
        if(d.options[2] === 1){
          blocks.push(d.blocks[3]);
        }
        if(d.options[3] === 1){
          blocks.push(d.blocks[4]);
        }

        return blocks;
      }
    },
    {
      "name": "Tap to CV",
      "options": [
        {
          "name": "range",
          "values": [
            "off",
            "on"
          ]
        },
        {
          "name": "output",
          "values": [
            "linear",
            "exponential"
          ]
        }
      ],
      "minBlocks":"2",
      "maxBlocks":"4",
      "blocks":[
        {
          "name":"tap input",
          "type": 1
        },
        {
          "name":"min time",
          "type" : 1
        },
        {
          "name": "max time",
          "type": 1
        },
        {
          "name": "output",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {
        var blocks = [d.blocks[0]];

        if(d.options[0] === 1){
          blocks.push(d.blocks[1]);
          blocks.push(d.blocks[2]);
        }

        blocks.push(d.blocks[3]);

        return blocks
      }
    },
    {
      "name": "Midi Pitch Bend In",
      "options": [
        {
          "name": "midi channel",
          "values": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16
          ]
        }
      ],
      "minBlocks":"1",
      "maxBlocks":"1",
      "blocks":[
        {
          "name": "pitch bend",
          "type": 1
        }
      ],
      "calcBlocks": (d) => {return d.blocks;}
    }
  ],
  "colors":[
    {
      "name": "",
      "hexColor": "#fff"
    },
    {
      "name" : "Blue",
      "hexColor": "#0000FF"
    },
    {
      "name" : "Green",
      "hexColor": "#008000"
    },
    {
      "name" : "Red",
      "hexColor": "#FF0000"
    },
    {
      "name" : "Yellow",
      "hexColor": "#FFFF00"
    },
    {
      "name" : "Aqua",
      "hexColor": "#00FFFF"
    },
    {
      "name" : "Magenta",
      "hexColor": "#FF00FF"
    },
    {
      "name" : "White",
      "hexColor": "#c1c1c1"
    },
    {
      "name" : "Orange",
      "hexColor": "#FFA500"
    },
    {
      "name" : "Lime",
      "hexColor": "#00FF00"
    },
    {
      "name" : "Surf",
      "hexColor": "#6B8E23"
    },
    {
      "name" : "Sky",
      "hexColor": "#87CEEB"
    },
    {
      "name" : "Purple",
      "hexColor": "#9370DB"
    },
    {
      "name" : "Pink",
      "hexColor": "#FFC0CB"
    },
    {
      "name" : "Peach",
      "hexColor": "#FFDAB9"
    },
    {
      "name" : "Mango",
      "hexColor": "#FF8C00"
    }
  ]

}
