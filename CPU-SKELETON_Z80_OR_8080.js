var CPU = function(bus){
    var _bus = bus; //hardware comms link between cpu,mmu,ppu(?)

    var AF = BC = DE = HL = 0x00;   //registers (8-bit registers)
    var PC = SP = 0x0000;           //pointers (16-bit registers)
    //not part of actual cpu (helpers)
    var opName = 'NOP';
    var tick = cycles = PC_CARRY = 0; //manual reset on first fetch (?check if usable)
    this.getTick =      function(){ return tick; };
    this.getCycles =    function(){ return cycles; };
    this.getOpName =    function(){ return opName; };
    this.getPC_CARRY =  function(){ return PC_CARRY; };

    //unneccesary boiler code
    this.A  = function() { return getA(); };
    this.F  = function() { return getF(); };
    this.AF = function() { return (getA() << 8) + getF(); };
    this.B  = function() { return getA(); };
    this.C  = function() { return getA(); };
    this.BC = function() { return getA(); };
    this.D  = function() { return getA(); };
    this.E  = function() { return getA(); };
    this.DE = function() { return getA(); };
    this.H  = function() { return getA(); };
    this.L  = function() { return getA(); };
    this.HL = function() { return getA(); };
    this.debug = function() { return `AF(${this.AF().toString(16)}),BC(${this.BC().toString(16)}),DE(${this.DE().toString(16)}),HL(${this.HL().toString(16)}),PC(${PC.toString(16)}),TICK(${this.getTick()}),OPNAME(${this.getOpName()}),PC_CARRY(${this.getPC_CARRY()})`}

    //operations (un)related to opcodes, correct cycle counting
    var setPC = function(value)    { PC = value; }
    var getPC = function()         { incPC(); return PC; };
    var incPC = function()         { 
        tick++;
        cycles++;
        PC++;
        if(PC >= 0x100) { PC -= 0x100; this.PC_CARRY = 1; } //limit is set by max size in rom/ram, currently limited to 255 opcodes
    }; //use whenever calling function (program counter, ups cycles), called twice per 16bit

    this.exec = function(){
        PC_CARRY = 0;
        var pc = getPC();
        scan(pc);
    }

    var scanFunction = function(opcode){
        switch (opcode) {
            //0x1X
            case 0x00: 
                opName = 'NOP';
                break;
            case 0x01: 
                opName = 'NOP';
                break;
            case 0x02: 
                opName = 'NOP';
                break;
            case 0x03: 
                opName = 'NOP';
                break;
            case 0x04: 
                opName = 'NOP';
                break;
            case 0x05: 
                opName = 'NOP';
                break;
            case 0x06: 
                opName = 'NOP';
                break;
            case 0x07: 
                opName = 'NOP';
                break;
            case 0x08: 
                opName = 'NOP';
                break;
            case 0x09: 
                opName = 'NOP';
                break;
            case 0x0A: 
                opName = 'NOP';
                break;
            case 0x0B: 
                opName = 'NOP';
                break;
            case 0x0C: 
                opName = 'NOP';
                break;
            case 0x0D: 
                opName = 'NOP';
                break;
            case 0x0E: 
                opName = 'NOP';
                break;
            case 0x0F: 
                opName = 'NOP';
                break;
            //0x1X
            case 0x10:
                opName = 'NOP';
                break;
            case 0x11: 
                opName = 'NOP';
                break;
            case 0x12: 
                opName = 'NOP';
                break;
            case 0x13: 
                opName = 'NOP';
                break;
            case 0x14: 
                opName = 'NOP';
                break;
            case 0x15: 
                opName = 'NOP';
                break;
            case 0x16: 
                opName = 'NOP';
                break;
            case 0x17: 
                opName = 'NOP';
                break;
            case 0x18: 
                opName = 'NOP';
                break;
            case 0x19: 
                opName = 'NOP';
                break;
            case 0x1A: 
                opName = 'NOP';
                break;
            case 0x1B: 
                opName = 'NOP';
                break;
            case 0x1C: 
                opName = 'NOP';
                break;
            case 0x1D: 
                opName = 'NOP';
                break;
            case 0x1E: 
                opName = 'NOP';
                break;
            case 0x1F: 
                opName = 'NOP';
                break;
            //0x2X
            case 0x20:
                opName = 'NOP';
                break;
            case 0x21: 
                opName = 'NOP';
                break;
            case 0x22: 
                opName = 'NOP';
                break;
            case 0x23: 
                opName = 'NOP';
                break;
            case 0x24: 
                opName = 'NOP';
                break;
            case 0x25: 
                opName = 'NOP';
                break;
            case 0x26: 
                opName = 'NOP';
                break;
            case 0x27: 
                opName = 'NOP';
                break;
            case 0x28: 
                opName = 'NOP';
                break;
            case 0x29: 
                opName = 'NOP';
                break;
            case 0x2A: 
                opName = 'NOP';
                break;
            case 0x2B: 
                opName = 'NOP';
                break;
            case 0x2C: 
                opName = 'NOP';
                break;
            case 0x2D: 
                opName = 'NOP';
                break;
            case 0x2E: 
                opName = 'NOP';
                break;
            case 0x2F: 
                opName = 'NOP';
                break;
            //0x3X
            case 0x30:
                opName = 'NOP';
                break;
            case 0x31: 
                opName = 'NOP';
                break;
            case 0x32: 
                opName = 'NOP';
                break;
            case 0x33: 
                opName = 'NOP';
                break;
            case 0x34: 
                opName = 'NOP';
                break;
            case 0x35: 
                opName = 'NOP';
                break;
            case 0x36: 
                opName = 'NOP';
                break;
            case 0x37: 
                opName = 'NOP';
                break;
            case 0x38: 
                opName = 'NOP';
                break;
            case 0x39: 
                opName = 'NOP';
                break;
            case 0x3A: 
                opName = 'NOP';
                break;
            case 0x3B: 
                opName = 'NOP';
                break;
            case 0x3C: 
                opName = 'NOP';
                break;
            case 0x3D: 
                opName = 'NOP';
                break;
            case 0x3E: 
                opName = 'NOP';
                break;
            case 0x3F: 
                opName = 'NOP';
                break;
            //0x4X
            case 0x40:
                opName = 'NOP';
                break;
            case 0x41: 
                opName = 'NOP';
                break;
            case 0x42: 
                opName = 'NOP';
                break;
            case 0x43: 
                opName = 'NOP';
                break;
            case 0x44: 
                opName = 'NOP';
                break;
            case 0x45: 
                opName = 'NOP';
                break;
            case 0x46: 
                opName = 'NOP';
                break;
            case 0x47: 
                opName = 'NOP';
                break;
            case 0x48: 
                opName = 'NOP';
                break;
            case 0x49: 
                opName = 'NOP';
                break;
            case 0x4A: 
                opName = 'NOP';
                break;
            case 0x4B: 
                opName = 'NOP';
                break;
            case 0x4C: 
                opName = 'NOP';
                break;
            case 0x4D: 
                opName = 'NOP';
                break;
            case 0x4E: 
                opName = 'NOP';
                break;
            case 0x4F: 
                opName = 'NOP';
                break;
            //0x5X
            case 0x50:
                opName = 'NOP';
                break;
            case 0x51: 
                opName = 'NOP';
                break;
            case 0x52: 
                opName = 'NOP';
                break;
            case 0x53: 
                opName = 'NOP';
                break;
            case 0x54: 
                opName = 'NOP';
                break;
            case 0x55: 
                opName = 'NOP';
                break;
            case 0x56: 
                opName = 'NOP';
                break;
            case 0x57: 
                opName = 'NOP';
                break;
            case 0x58: 
                opName = 'NOP';
                break;
            case 0x59: 
                opName = 'NOP';
                break;
            case 0x5A: 
                opName = 'NOP';
                break;
            case 0x5B: 
                opName = 'NOP';
                break;
            case 0x5C: 
                opName = 'NOP';
                break;
            case 0x5D: 
                opName = 'NOP';
                break;
            case 0x5E: 
                opName = 'NOP';
                break;
            case 0x5F: 
                opName = 'NOP';
                break;
            //0x6X
            case 0x60:
                opName = 'NOP';
                break;
            case 0x61: 
                opName = 'NOP';
                break;
            case 0x62: 
                opName = 'NOP';
                break;
            case 0x63: 
                opName = 'NOP';
                break;
            case 0x64: 
                opName = 'NOP';
                break;
            case 0x65: 
                opName = 'NOP';
                break;
            case 0x66: 
                opName = 'NOP';
                break;
            case 0x67: 
                opName = 'NOP';
                break;
            case 0x68: 
                opName = 'NOP';
                break;
            case 0x69: 
                opName = 'NOP';
                break;
            case 0x6A: 
                opName = 'NOP';
                break;
            case 0x6B: 
                opName = 'NOP';
                break;
            case 0x6C: 
                opName = 'NOP';
                break;
            case 0x6D: 
                opName = 'NOP';
                break;
            case 0x6E: 
                opName = 'NOP';
                break;
            case 0x6F: 
                opName = 'NOP';
                break;
            //0x7X
            case 0x70:
                opName = 'NOP';
                break;
            case 0x71: 
                opName = 'NOP';
                break;
            case 0x72: 
                opName = 'NOP';
                break;
            case 0x73: 
                opName = 'NOP';
                break;
            case 0x74: 
                opName = 'NOP';
                break;
            case 0x75: 
                opName = 'NOP';
                break;
            case 0x76: 
                opName = 'NOP';
                break;
            case 0x77: 
                opName = 'NOP';
                break;
            case 0x78: 
                opName = 'NOP';
                break;
            case 0x79: 
                opName = 'NOP';
                break;
            case 0x7A: 
                opName = 'NOP';
                break;
            case 0x7B: 
                opName = 'NOP';
                break;
            case 0x7C: 
                opName = 'NOP';
                break;
            case 0x7D: 
                opName = 'NOP';
                break;
            case 0x7E: 
                opName = 'NOP';
                break;
            case 0x7F: 
                opName = 'NOP';
                break;
            //0x8X
            case 0x80:
                opName = 'NOP';
                break;
            case 0x81: 
                opName = 'NOP';
                break;
            case 0x82: 
                opName = 'NOP';
                break;
            case 0x83: 
                opName = 'NOP';
                break;
            case 0x84: 
                opName = 'NOP';
                break;
            case 0x85: 
                opName = 'NOP';
                break;
            case 0x86: 
                opName = 'NOP';
                break;
            case 0x87: 
                opName = 'NOP';
                break;
            case 0x88: 
                opName = 'NOP';
                break;
            case 0x89: 
                opName = 'NOP';
                break;
            case 0x8A: 
                opName = 'NOP';
                break;
            case 0x8B: 
                opName = 'NOP';
                break;
            case 0x8C: 
                opName = 'NOP';
                break;
            case 0x8D: 
                opName = 'NOP';
                break;
            case 0x8E: 
                opName = 'NOP';
                break;
            case 0x8F: 
                opName = 'NOP';
                break;
            //0x9X
            case 0x90:
                opName = 'NOP';
                break;
            case 0x91: 
                opName = 'NOP';
                break;
            case 0x92: 
                opName = 'NOP';
                break;
            case 0x93: 
                opName = 'NOP';
                break;
            case 0x94: 
                opName = 'NOP';
                break;
            case 0x95: 
                opName = 'NOP';
                break;
            case 0x96: 
                opName = 'NOP';
                break;
            case 0x97: 
                opName = 'NOP';
                break;
            case 0x98: 
                opName = 'NOP';
                break;
            case 0x99: 
                opName = 'NOP';
                break;
            case 0x9A: 
                opName = 'NOP';
                break;
            case 0x9B: 
                opName = 'NOP';
                break;
            case 0x9C: 
                opName = 'NOP';
                break;
            case 0x9D: 
                opName = 'NOP';
                break;
            case 0x9E: 
                opName = 'NOP';
                break;
            case 0x9F: 
                opName = 'NOP';
                break;
            //0xAX
            case 0xA0:
                opName = 'NOP';
                break;
            case 0xA1: 
                opName = 'NOP';
                break;
            case 0xA2: 
                opName = 'NOP';
                break;
            case 0xA3: 
                opName = 'NOP';
                break;
            case 0xA4: 
                opName = 'NOP';
                break;
            case 0xA5: 
                opName = 'NOP';
                break;
            case 0xA6: 
                opName = 'NOP';
                break;
            case 0xA7: 
                opName = 'NOP';
                break;
            case 0xA8: 
                opName = 'NOP';
                break;
            case 0xA9: 
                opName = 'NOP';
                break;
            case 0xAA: 
                opName = 'NOP';
                break;
            case 0xAB: 
                opName = 'NOP';
                break;
            case 0xAC: 
                opName = 'NOP';
                break;
            case 0xAD: 
                opName = 'NOP';
                break;
            case 0xAE: 
                opName = 'NOP';
                break;
            case 0xAF: 
                opName = 'NOP';
                break;
            //0xBX
            case 0xB0:
                opName = 'NOP';
                break;
            case 0xB1: 
                opName = 'NOP';
                break;
            case 0xB2: 
                opName = 'NOP';
                break;
            case 0xB3: 
                opName = 'NOP';
                break;
            case 0xB4: 
                opName = 'NOP';
                break;
            case 0xB5: 
                opName = 'NOP';
                break;
            case 0xB6: 
                opName = 'NOP';
                break;
            case 0xB7: 
                opName = 'NOP';
                break;
            case 0xB8: 
                opName = 'NOP';
                break;
            case 0xB9: 
                opName = 'NOP';
                break;
            case 0xBA: 
                opName = 'NOP';
                break;
            case 0xBB: 
                opName = 'NOP';
                break;
            case 0xBC: 
                opName = 'NOP';
                break;
            case 0xBD: 
                opName = 'NOP';
                break;
            case 0xBE: 
                opName = 'NOP';
                break;
            case 0xBF: 
                opName = 'NOP';
                break;
            //0xCX
            case 0xC0:
                opName = 'NOP';
                break;
            case 0xC1: 
                opName = 'NOP';
                break;
            case 0xC2: 
                opName = 'NOP';
                break;
            case 0xC3: 
                opName = 'NOP';
                break;
            case 0xC4: 
                opName = 'NOP';
                break;
            case 0xC5: 
                opName = 'NOP';
                break;
            case 0xC6: 
                opName = 'NOP';
                break;
            case 0xC7: 
                opName = 'NOP';
                break;
            case 0xC8: 
                opName = 'NOP';
                break;
            case 0xC9: 
                opName = 'NOP';
                break;
            case 0xCA: 
                opName = 'NOP';
                break;
            case 0xCB: 
                opName = 'NOP';
                break;
            case 0xCC: 
                opName = 'NOP';
                break;
            case 0xCD: 
                opName = 'NOP';
                break;
            case 0xCE: 
                opName = 'NOP';
                break;
            case 0xCF: 
                opName = 'NOP';
                break;
            //0xDX
            case 0xD0:
                opName = 'NOP';
                break;
            case 0xD1: 
                opName = 'NOP';
                break;
            case 0xD2: 
                opName = 'NOP';
                break;
            case 0xD3: 
                opName = 'NOP';
                break;
            case 0xD4: 
                opName = 'NOP';
                break;
            case 0xD5: 
                opName = 'NOP';
                break;
            case 0xD7: 
                opName = 'NOP';
                break;
            case 0xD6: 
                opName = 'NOP';
                break;
            case 0xD8: 
                opName = 'NOP';
                break;
            case 0xD9: 
                opName = 'NOP';
                break;
            case 0xDA: 
                opName = 'NOP';
                break;
            case 0xDB: 
                opName = 'NOP';
                break;
            case 0xDC: 
                opName = 'NOP';
                break;
            case 0xDD: 
                opName = 'NOP';
                break;
            case 0xDE: 
                opName = 'NOP';
                break;
            case 0xDF: 
                opName = 'NOP';
                break;
            //0xEX
            case 0xE0:
                opName = 'NOP';
                break;
            case 0xE1: 
                opName = 'NOP';
                break;
            case 0xE2: 
                opName = 'NOP';
                break;
            case 0xE3: 
                opName = 'NOP';
                break;
            case 0xE4: 
                opName = 'NOP';
                break;
            case 0xE5: 
                opName = 'NOP';
                break;
            case 0xE6: 
                opName = 'NOP';
                break;
            case 0xE7: 
                opName = 'NOP';
                break;
            case 0xE8: 
                opName = 'NOP';
                break;
            case 0xE9: 
                opName = 'NOP';
                break;
            case 0xEA: 
                opName = 'NOP';
                break;
            case 0xEB: 
                opName = 'NOP';
                break;
            case 0xEC: 
                opName = 'NOP';
                break;
            case 0xED: 
                opName = 'NOP';
                break;
            case 0xEE: 
                opName = 'NOP';
                break;
            case 0xEF: 
                opName = 'NOP';
                break;
            //0xFX
            case 0xF0:
                opName = 'NOP';
                break;
            case 0xF1: 
                opName = 'NOP';
                break;
            case 0xF2: 
                opName = 'NOP';
                break;
            case 0xF3: 
                opName = 'NOP';
                break;
            case 0xF4: 
                opName = 'NOP';
                break;
            case 0xF5: 
                opName = 'NOP';
                break;
            case 0xF6: 
                opName = 'NOP';
                break;
            case 0xF7: 
                opName = 'NOP';
                break;
            case 0xF8: 
                opName = 'NOP';
                break;
            case 0xF9: 
                opName = 'NOP';
                break;
            case 0xFA: 
                opName = 'NOP';
                break;
            case 0xFB: 
                opName = 'NOP';
                break;
            case 0xFC: 
                opName = 'NOP';
                break;
            case 0xFD: 
                opName = 'NOP';
                break;
            case 0xFE: 
                opName = 'NOP';
                break;
            case 0xFF: 
                opName = 'NOP';
                break;
            default:
                opName = 'NOP';
                NOP();
        }
    };

    this.NOP = function() {  };
};