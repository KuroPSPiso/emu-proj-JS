var CPU = function(bus){
    var _bus = bus; //hardware comms link between cpu,mmu,ppu(?)

    var AF = BC = DE = HL = 0x00;   //registers (8-bit registers)
    var PC = SP = 0x0000;           //pointers (16-bit registers)
    //not part of actual cpu (helpers)
    this.tick = 0;
    this.cycles = 0;
    this.opName = 'NOP';

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

    //operations (un)related to opcodes, correct cycle counting
    var setPC = function(value)    { PC = value; }
    var getPC = function()         { return PC; };
    var incPC = function()         { tick++; cycles++; PC++; }; //use whenever calling function (program counter, ups cycles), called twice per 16bit

    this.scanFunction = function(opcode){
        switch (opcode) {
            //0x1X
            case 0x00: 
                this.opName = 'NOP';
                break;
            case 0x01: 
                this.opName = 'NOP';
                break;
            case 0x02: 
                this.opName = 'NOP';
                break;
            case 0x03: 
                this.opName = 'NOP';
                break;
            case 0x04: 
                this.opName = 'NOP';
                break;
            case 0x05: 
                this.opName = 'NOP';
                break;
            case 0x07: 
                this.opName = 'NOP';
                break;
            case 0x08: 
                this.opName = 'NOP';
                break;
            case 0x09: 
                this.opName = 'NOP';
                break;
            case 0x0A: 
                this.opName = 'NOP';
                break;
            case 0x0B: 
                this.opName = 'NOP';
                break;
            case 0x0C: 
                this.opName = 'NOP';
                break;
            case 0x0D: 
                this.opName = 'NOP';
                break;
            case 0x0E: 
                this.opName = 'NOP';
                break;
            case 0x0F: 
                this.opName = 'NOP';
                break;
            //0x1X
            case 0x10:
                this.opName = 'NOP';
                break;
            case 0x11: 
                this.opName = 'NOP';
                break;
            case 0x12: 
                this.opName = 'NOP';
                break;
            case 0x13: 
                this.opName = 'NOP';
                break;
            case 0x14: 
                this.opName = 'NOP';
                break;
            case 0x15: 
                this.opName = 'NOP';
                break;
            case 0x17: 
                this.opName = 'NOP';
                break;
            case 0x18: 
                this.opName = 'NOP';
                break;
            case 0x19: 
                this.opName = 'NOP';
                break;
            case 0x1A: 
                this.opName = 'NOP';
                break;
            case 0x1B: 
                this.opName = 'NOP';
                break;
            case 0x1C: 
                this.opName = 'NOP';
                break;
            case 0x1D: 
                this.opName = 'NOP';
                break;
            case 0x1E: 
                this.opName = 'NOP';
                break;
            case 0x1F: 
                this.opName = 'NOP';
                break;
            //0x2X
            case 0x20:
                this.opName = 'NOP';
                break;
            case 0x21: 
                this.opName = 'NOP';
                break;
            case 0x22: 
                this.opName = 'NOP';
                break;
            case 0x23: 
                this.opName = 'NOP';
                break;
            case 0x24: 
                this.opName = 'NOP';
                break;
            case 0x25: 
                this.opName = 'NOP';
                break;
            case 0x27: 
                this.opName = 'NOP';
                break;
            case 0x28: 
                this.opName = 'NOP';
                break;
            case 0x29: 
                this.opName = 'NOP';
                break;
            case 0x2A: 
                this.opName = 'NOP';
                break;
            case 0x2B: 
                this.opName = 'NOP';
                break;
            case 0x2C: 
                this.opName = 'NOP';
                break;
            case 0x2D: 
                this.opName = 'NOP';
                break;
            case 0x2E: 
                this.opName = 'NOP';
                break;
            case 0x2F: 
                this.opName = 'NOP';
                break;
            //0x3X
            case 0x30:
                this.opName = 'NOP';
                break;
            case 0x31: 
                this.opName = 'NOP';
                break;
            case 0x32: 
                this.opName = 'NOP';
                break;
            case 0x33: 
                this.opName = 'NOP';
                break;
            case 0x34: 
                this.opName = 'NOP';
                break;
            case 0x35: 
                this.opName = 'NOP';
                break;
            case 0x37: 
                this.opName = 'NOP';
                break;
            case 0x38: 
                this.opName = 'NOP';
                break;
            case 0x39: 
                this.opName = 'NOP';
                break;
            case 0x3A: 
                this.opName = 'NOP';
                break;
            case 0x3B: 
                this.opName = 'NOP';
                break;
            case 0x3C: 
                this.opName = 'NOP';
                break;
            case 0x3D: 
                this.opName = 'NOP';
                break;
            case 0x3E: 
                this.opName = 'NOP';
                break;
            case 0x3F: 
                this.opName = 'NOP';
                break;
            //0x4X
            case 0x40:
                this.opName = 'NOP';
                break;
            case 0x41: 
                this.opName = 'NOP';
                break;
            case 0x42: 
                this.opName = 'NOP';
                break;
            case 0x43: 
                this.opName = 'NOP';
                break;
            case 0x44: 
                this.opName = 'NOP';
                break;
            case 0x45: 
                this.opName = 'NOP';
                break;
            case 0x47: 
                this.opName = 'NOP';
                break;
            case 0x48: 
                this.opName = 'NOP';
                break;
            case 0x49: 
                this.opName = 'NOP';
                break;
            case 0x4A: 
                this.opName = 'NOP';
                break;
            case 0x4B: 
                this.opName = 'NOP';
                break;
            case 0x4C: 
                this.opName = 'NOP';
                break;
            case 0x4D: 
                this.opName = 'NOP';
                break;
            case 0x4E: 
                this.opName = 'NOP';
                break;
            case 0x4F: 
                this.opName = 'NOP';
                break;
            //0x5X
            case 0x50:
                this.opName = 'NOP';
                break;
            case 0x51: 
                this.opName = 'NOP';
                break;
            case 0x52: 
                this.opName = 'NOP';
                break;
            case 0x53: 
                this.opName = 'NOP';
                break;
            case 0x54: 
                this.opName = 'NOP';
                break;
            case 0x55: 
                this.opName = 'NOP';
                break;
            case 0x57: 
                this.opName = 'NOP';
                break;
            case 0x58: 
                this.opName = 'NOP';
                break;
            case 0x59: 
                this.opName = 'NOP';
                break;
            case 0x5A: 
                this.opName = 'NOP';
                break;
            case 0x5B: 
                this.opName = 'NOP';
                break;
            case 0x5C: 
                this.opName = 'NOP';
                break;
            case 0x5D: 
                this.opName = 'NOP';
                break;
            case 0x5E: 
                this.opName = 'NOP';
                break;
            case 0x5F: 
                this.opName = 'NOP';
                break;
            //0x6X
            case 0x60:
                this.opName = 'NOP';
                break;
            case 0x61: 
                this.opName = 'NOP';
                break;
            case 0x62: 
                this.opName = 'NOP';
                break;
            case 0x63: 
                this.opName = 'NOP';
                break;
            case 0x64: 
                this.opName = 'NOP';
                break;
            case 0x65: 
                this.opName = 'NOP';
                break;
            case 0x67: 
                this.opName = 'NOP';
                break;
            case 0x68: 
                this.opName = 'NOP';
                break;
            case 0x69: 
                this.opName = 'NOP';
                break;
            case 0x6A: 
                this.opName = 'NOP';
                break;
            case 0x6B: 
                this.opName = 'NOP';
                break;
            case 0x6C: 
                this.opName = 'NOP';
                break;
            case 0x6D: 
                this.opName = 'NOP';
                break;
            case 0x6E: 
                this.opName = 'NOP';
                break;
            case 0x6F: 
                this.opName = 'NOP';
                break;
            //0x7X
            case 0x70:
                this.opName = 'NOP';
                break;
            case 0x71: 
                this.opName = 'NOP';
                break;
            case 0x72: 
                this.opName = 'NOP';
                break;
            case 0x73: 
                this.opName = 'NOP';
                break;
            case 0x74: 
                this.opName = 'NOP';
                break;
            case 0x75: 
                this.opName = 'NOP';
                break;
            case 0x77: 
                this.opName = 'NOP';
                break;
            case 0x78: 
                this.opName = 'NOP';
                break;
            case 0x79: 
                this.opName = 'NOP';
                break;
            case 0x7A: 
                this.opName = 'NOP';
                break;
            case 0x7B: 
                this.opName = 'NOP';
                break;
            case 0x7C: 
                this.opName = 'NOP';
                break;
            case 0x7D: 
                this.opName = 'NOP';
                break;
            case 0x7E: 
                this.opName = 'NOP';
                break;
            case 0x7F: 
                this.opName = 'NOP';
                break;
            //0x8X
            case 0x80:
                this.opName = 'NOP';
                break;
            case 0x81: 
                this.opName = 'NOP';
                break;
            case 0x82: 
                this.opName = 'NOP';
                break;
            case 0x83: 
                this.opName = 'NOP';
                break;
            case 0x84: 
                this.opName = 'NOP';
                break;
            case 0x85: 
                this.opName = 'NOP';
                break;
            case 0x87: 
                this.opName = 'NOP';
                break;
            case 0x88: 
                this.opName = 'NOP';
                break;
            case 0x89: 
                this.opName = 'NOP';
                break;
            case 0x8A: 
                this.opName = 'NOP';
                break;
            case 0x8B: 
                this.opName = 'NOP';
                break;
            case 0x8C: 
                this.opName = 'NOP';
                break;
            case 0x8D: 
                this.opName = 'NOP';
                break;
            case 0x8E: 
                this.opName = 'NOP';
                break;
            case 0x8F: 
                this.opName = 'NOP';
                break;
            //0x9X
            case 0x90:
                this.opName = 'NOP';
                break;
            case 0x91: 
                this.opName = 'NOP';
                break;
            case 0x92: 
                this.opName = 'NOP';
                break;
            case 0x93: 
                this.opName = 'NOP';
                break;
            case 0x94: 
                this.opName = 'NOP';
                break;
            case 0x95: 
                this.opName = 'NOP';
                break;
            case 0x97: 
                this.opName = 'NOP';
                break;
            case 0x98: 
                this.opName = 'NOP';
                break;
            case 0x99: 
                this.opName = 'NOP';
                break;
            case 0x9A: 
                this.opName = 'NOP';
                break;
            case 0x9B: 
                this.opName = 'NOP';
                break;
            case 0x9C: 
                this.opName = 'NOP';
                break;
            case 0x9D: 
                this.opName = 'NOP';
                break;
            case 0x9E: 
                this.opName = 'NOP';
                break;
            case 0x9F: 
                this.opName = 'NOP';
                break;
            //0xAX
            case 0xA0:
                this.opName = 'NOP';
                break;
            case 0xA1: 
                this.opName = 'NOP';
                break;
            case 0xA2: 
                this.opName = 'NOP';
                break;
            case 0xA3: 
                this.opName = 'NOP';
                break;
            case 0xA4: 
                this.opName = 'NOP';
                break;
            case 0xA5: 
                this.opName = 'NOP';
                break;
            case 0xA7: 
                this.opName = 'NOP';
                break;
            case 0xA8: 
                this.opName = 'NOP';
                break;
            case 0xA9: 
                this.opName = 'NOP';
                break;
            case 0xAA: 
                this.opName = 'NOP';
                break;
            case 0xAB: 
                this.opName = 'NOP';
                break;
            case 0xAC: 
                this.opName = 'NOP';
                break;
            case 0xAD: 
                this.opName = 'NOP';
                break;
            case 0xAE: 
                this.opName = 'NOP';
                break;
            case 0xAF: 
                this.opName = 'NOP';
                break;
            //0xBX
            case 0xB0:
                this.opName = 'NOP';
                break;
            case 0xB1: 
                this.opName = 'NOP';
                break;
            case 0xB2: 
                this.opName = 'NOP';
                break;
            case 0xB3: 
                this.opName = 'NOP';
                break;
            case 0xB4: 
                this.opName = 'NOP';
                break;
            case 0xB5: 
                this.opName = 'NOP';
                break;
            case 0xB7: 
                this.opName = 'NOP';
                break;
            case 0xB8: 
                this.opName = 'NOP';
                break;
            case 0xB9: 
                this.opName = 'NOP';
                break;
            case 0xBA: 
                this.opName = 'NOP';
                break;
            case 0xBB: 
                this.opName = 'NOP';
                break;
            case 0xBC: 
                this.opName = 'NOP';
                break;
            case 0xBD: 
                this.opName = 'NOP';
                break;
            case 0xBE: 
                this.opName = 'NOP';
                break;
            case 0xBF: 
                this.opName = 'NOP';
                break;
            //0xCX
            case 0xC0:
                this.opName = 'NOP';
                break;
            case 0xC1: 
                this.opName = 'NOP';
                break;
            case 0xC2: 
                this.opName = 'NOP';
                break;
            case 0xC3: 
                this.opName = 'NOP';
                break;
            case 0xC4: 
                this.opName = 'NOP';
                break;
            case 0xC5: 
                this.opName = 'NOP';
                break;
            case 0xC7: 
                this.opName = 'NOP';
                break;
            case 0xC8: 
                this.opName = 'NOP';
                break;
            case 0xC9: 
                this.opName = 'NOP';
                break;
            case 0xCA: 
                this.opName = 'NOP';
                break;
            case 0xCB: 
                this.opName = 'NOP';
                break;
            case 0xCC: 
                this.opName = 'NOP';
                break;
            case 0xCD: 
                this.opName = 'NOP';
                break;
            case 0xCE: 
                this.opName = 'NOP';
                break;
            case 0xCF: 
                this.opName = 'NOP';
                break;
            //0xDX
            case 0xD0:
                this.opName = 'NOP';
                break;
            case 0xD1: 
                this.opName = 'NOP';
                break;
            case 0xD2: 
                this.opName = 'NOP';
                break;
            case 0xD3: 
                this.opName = 'NOP';
                break;
            case 0xD4: 
                this.opName = 'NOP';
                break;
            case 0xD5: 
                this.opName = 'NOP';
                break;
            case 0xD7: 
                this.opName = 'NOP';
                break;
            case 0xD8: 
                this.opName = 'NOP';
                break;
            case 0xD9: 
                this.opName = 'NOP';
                break;
            case 0xDA: 
                this.opName = 'NOP';
                break;
            case 0xDB: 
                this.opName = 'NOP';
                break;
            case 0xDC: 
                this.opName = 'NOP';
                break;
            case 0xDD: 
                this.opName = 'NOP';
                break;
            case 0xDE: 
                this.opName = 'NOP';
                break;
            case 0xDF: 
                this.opName = 'NOP';
                break;
            //0xEX
            case 0xE0:
                this.opName = 'NOP';
                break;
            case 0xE1: 
                this.opName = 'NOP';
                break;
            case 0xE2: 
                this.opName = 'NOP';
                break;
            case 0xE3: 
                this.opName = 'NOP';
                break;
            case 0xE4: 
                this.opName = 'NOP';
                break;
            case 0xE5: 
                this.opName = 'NOP';
                break;
            case 0xE7: 
                this.opName = 'NOP';
                break;
            case 0xE8: 
                this.opName = 'NOP';
                break;
            case 0xE9: 
                this.opName = 'NOP';
                break;
            case 0xEA: 
                this.opName = 'NOP';
                break;
            case 0xEB: 
                this.opName = 'NOP';
                break;
            case 0xEC: 
                this.opName = 'NOP';
                break;
            case 0xED: 
                this.opName = 'NOP';
                break;
            case 0xEE: 
                this.opName = 'NOP';
                break;
            case 0xEF: 
                this.opName = 'NOP';
                break;
            //0xFX
            case 0xF0:
                this.opName = 'NOP';
                break;
            case 0xF1: 
                this.opName = 'NOP';
                break;
            case 0xF2: 
                this.opName = 'NOP';
                break;
            case 0xF3: 
                this.opName = 'NOP';
                break;
            case 0xF4: 
                this.opName = 'NOP';
                break;
            case 0xF5: 
                this.opName = 'NOP';
                break;
            case 0xF7: 
                this.opName = 'NOP';
                break;
            case 0xF8: 
                this.opName = 'NOP';
                break;
            case 0xF9: 
                this.opName = 'NOP';
                break;
            case 0xFA: 
                this.opName = 'NOP';
                break;
            case 0xFB: 
                this.opName = 'NOP';
                break;
            case 0xFC: 
                this.opName = 'NOP';
                break;
            case 0xFD: 
                this.opName = 'NOP';
                break;
            case 0xFE: 
                this.opName = 'NOP';
                break;
            case 0xFF: 
                this.opName = 'NOP';
                break;
            default:
                this.opName = 'NOP';
                NOP();
        }
    };

    this.NOP = function() {  };
};