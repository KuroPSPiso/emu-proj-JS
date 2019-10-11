var CPU = function(bus){
    var _bus = bus;

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
    this.PC_CARRY = 0; //manual reset on first fetch (?check if usable)

    //operations (un)related to opcodes, correct cycle counting
    var setPC = function(value)    { PC = value; }
    var getPC = function()         { return PC; };
    var incPC = function()         { 
        tick++;
        cycles++;
        PC++;
        if(PC >= 0x100) { PC -= 0x100; this.PC_CARRY = 1; } //limit is set by max size in rom/ram
    }; //use whenever calling function (program counter, ups cycles), called twice per 16bit

    this.scanFunction = function(opcode){
        switch (opcode) {
            //0x1X
            case 0x00: 
                this.opName = 'NOP';
                break;
            case 0x01: 
                this.opName = 'LXI B';
                break;
            case 0x02: 
                this.opName = 'STAX B';
                break;
            case 0x03: 
                this.opName = 'INX B';
                break;
            case 0x04: 
                this.opName = 'INR B';
                break;
            case 0x05: 
                this.opName = 'DCR B';
                break;
            case 0x06: 
                this.opName = 'MVI B';
                break;
            case 0x07: 
                this.opName = 'RLC';
                break;
            case 0x09: 
                this.opName = 'DAD B';
                break;
            case 0x0A: 
                this.opName = 'LDAX B';
                break;
            case 0x0B: 
                this.opName = 'DCX B';
                break;
            case 0x0C: 
                this.opName = 'INR C';
                break;
            case 0x0D: 
                this.opName = 'DCR C';
                break;
            case 0x0E: 
                this.opName = 'MVI C';
                break;
            case 0x0F: 
                this.opName = 'RRC';
                break;
            //0x1X
            case 0x11: 
                this.opName = 'LXI D';
                break;
            case 0x12: 
                this.opName = 'STAX D';
                break;
            case 0x13: 
                this.opName = 'INX D';
                break;
            case 0x14: 
                this.opName = 'INR D';
                break;
            case 0x15: 
                this.opName = 'DCR D';
                break;
            case 0x16: 
                this.opName = 'MVI D';
                break;
            case 0x17: 
                this.opName = 'RAL';
                break;
            case 0x19: 
                this.opName = 'DAD B';
                break;
            case 0x1A: 
                this.opName = 'LDAX B';
                break;
            case 0x1B: 
                this.opName = 'DCX D';
                break;
            case 0x1C: 
                this.opName = 'INR E';
                break;
            case 0x1D: 
                this.opName = 'DCR E';
                break;
            case 0x1E: 
                this.opName = 'MVI E';
                break;
            case 0x1F: 
                this.opName = 'RAR';
                break;
            //0x2X
            case 0x21: 
                this.opName = 'LXI H';
                break;
            case 0x22: 
                this.opName = 'SHLD';
                break;
            case 0x23: 
                this.opName = 'INX H';
                break;
            case 0x24: 
                this.opName = 'INR H';
                break;
            case 0x25: 
                this.opName = 'DCR H';
                break;
            case 0x26: 
                this.opName = 'MVI H';
                break;
            case 0x27: 
                this.opName = 'DAA';
                break;
            case 0x29: 
                this.opName = 'DAD H';
                break;
            case 0x2A: 
                this.opName = 'LHLD';
                break;
            case 0x2B: 
                this.opName = 'DCX H';
                break;
            case 0x2C: 
                this.opName = 'INR L';
                break;
            case 0x2D: 
                this.opName = 'DCR L';
                break;
            case 0x2E: 
                this.opName = 'MVI L';
                break;
            case 0x2F: 
                this.opName = 'CMA';
                break;
            //0x3X
            case 0x31: 
                this.opName = 'LXI SP';
                break;
            case 0x32: 
                this.opName = 'STA';
                break;
            case 0x33: 
                this.opName = 'INX SP';
                break;
            case 0x34: 
                this.opName = 'INR M';
                break;
            case 0x35: 
                this.opName = 'DCR M';
                break;
            case 0x36: 
                this.opName = 'MVI M';
                break;
            case 0x37: 
                this.opName = 'STC';
                break;
            case 0x39: 
                this.opName = 'DAD SP';
                break;
            case 0x3A: 
                this.opName = 'LDA';
                break;
            case 0x3B: 
                this.opName = 'DCX SP';
                break;
            case 0x3C: 
                this.opName = 'INR A';
                break;
            case 0x3D: 
                this.opName = 'DCR A';
                break;
            case 0x3E: 
                this.opName = 'MVI A';
                break;
            case 0x3F: 
                this.opName = 'CMC';
                break;
            //0x4X
            case 0x40:
                this.opName = 'MOV B,B';
                break;
            case 0x41: 
                this.opName = 'MOV B,C';
                break;
            case 0x42: 
                this.opName = 'MOV B,D';
                break;
            case 0x43: 
                this.opName = 'MOV B,E';
                break;
            case 0x44: 
                this.opName = 'MOV B,H';
                break;
            case 0x45: 
                this.opName = 'MOV B,L';
                break;
            case 0x46: 
                this.opName = 'MOV B,M';
                break;
            case 0x47: 
                this.opName = 'MOV B,A';
                break;
            case 0x48: 
                this.opName = 'MOV C,B';
                break;
            case 0x49: 
                this.opName = 'MOV C,C';
                break;
            case 0x4A: 
                this.opName = 'MOV C,D';
                break;
            case 0x4B: 
                this.opName = 'MOV C,E';
                break;
            case 0x4C: 
                this.opName = 'MOV C,H';
                break;
            case 0x4D: 
                this.opName = 'MOV C,L';
                break;
            case 0x4E: 
                this.opName = 'MOV C,M';
                break;
            case 0x4F: 
                this.opName = 'MOV C,A';
                break;
            //0x5X
            case 0x50:
                this.opName = 'MOV D,B';
                break;
            case 0x51: 
                this.opName = 'MOV D,C';
                break;
            case 0x52: 
                this.opName = 'MOV D,D';
                break;
            case 0x53: 
                this.opName = 'MOV D,E';
                break;
            case 0x54: 
                this.opName = 'MOV D,H';
                break;
            case 0x55: 
                this.opName = 'MOV D,L';
                break;
            case 0x56: 
                this.opName = 'MOV D,M';
                break;
            case 0x57: 
                this.opName = 'MOV D,A';
                break;
            case 0x58: 
                this.opName = 'MOV E,B';
                break;
            case 0x59: 
                this.opName = 'MOV E,C';
                break;
            case 0x5A: 
                this.opName = 'MOV E,D';
                break;
            case 0x5B: 
                this.opName = 'MOV E,E';
                break;
            case 0x5C: 
                this.opName = 'MOV E,H';
                break;
            case 0x5D: 
                this.opName = 'MOV E,L';
                break;
            case 0x5E: 
                this.opName = 'MOV E,M';
                break;
            case 0x5F: 
                this.opName = 'MOV E,A';
                break;
            //0x6X
            case 0x60:
                this.opName = 'MOV H,B';
                break;
            case 0x61: 
                this.opName = 'MOV H,C';
                break;
            case 0x62: 
                this.opName = 'MOV H,D';
                break;
            case 0x63: 
                this.opName = 'MOV H,E';
                break;
            case 0x64: 
                this.opName = 'MOV H,H';
                break;
            case 0x65: 
                this.opName = 'MOV H,L';
                break;
            case 0x66: 
                this.opName = 'MOV H,M';
                break;
            case 0x67: 
                this.opName = 'MOV H,A';
                break;
            case 0x68: 
                this.opName = 'MOV L,B';
                break;
            case 0x69: 
                this.opName = 'MOV L,D';
                break;
            case 0x6A: 
                this.opName = 'MOV L,D';
                break;
            case 0x6B: 
                this.opName = 'MOV L,E';
                break;
            case 0x6C: 
                this.opName = 'MOV L,H';
                break;
            case 0x6D: 
                this.opName = 'MOV L,L';
                break;
            case 0x6E: 
                this.opName = 'MOV L,M';
                break;
            case 0x6F: 
                this.opName = 'MOV L,A';
                break;
            //0x7X
            case 0x70:
                this.opName = 'MOV M,B';
                break;
            case 0x71: 
                this.opName = 'MOV M,C';
                break;
            case 0x72: 
                this.opName = 'MOV M,D';
                break;
            case 0x73: 
                this.opName = 'MOV M,E';
                break;
            case 0x74: 
                this.opName = 'MOV M,H';
                break;
            case 0x75: 
                this.opName = 'MOV M,L';
                break;
            case 0x76: 
                this.opName = 'HLT';
                break;
            case 0x77: 
                this.opName = 'MOV M,A';
                break;
            case 0x78: 
                this.opName = 'MOV A,B';
                break;
            case 0x79: 
                this.opName = 'MOV A,C';
                break;
            case 0x7A: 
                this.opName = 'MOV A,D';
                break;
            case 0x7B: 
                this.opName = 'MOV A,E';
                break;
            case 0x7C: 
                this.opName = 'MOV A,H';
                break;
            case 0x7D: 
                this.opName = 'MOV A,L';
                break;
            case 0x7E: 
                this.opName = 'MOV A,M';
                break;
            case 0x7F: 
                this.opName = 'MOV A,A';
                break;
            //0x8X
            case 0x80:
                this.opName = 'ADD B';
                break;
            case 0x81: 
                this.opName = 'ADD C';
                break;
            case 0x82: 
                this.opName = 'ADD D';
                break;
            case 0x83: 
                this.opName = 'ADD E';
                break;
            case 0x84: 
                this.opName = 'ADD H';
                break;
            case 0x85: 
                this.opName = 'ADD L';
                break;
            case 0x86: 
                this.opName = 'ADD M';
                break;
            case 0x87: 
                this.opName = 'ADD A';
                break;
            case 0x88: 
                this.opName = 'ADC B';
                break;
            case 0x89: 
                this.opName = 'ADC C';
                break;
            case 0x8A: 
                this.opName = 'ADC D';
                break;
            case 0x8B: 
                this.opName = 'ADC E';
                break;
            case 0x8C: 
                this.opName = 'ADC H';
                break;
            case 0x8D: 
                this.opName = 'ADC L';
                break;
            case 0x8E: 
                this.opName = 'ADC M';
                break;
            case 0x8F: 
                this.opName = 'ADC A';
                break;
            //0x9X
            case 0x90:
                this.opName = 'SUB B';
                break;
            case 0x91: 
                this.opName = 'SUB C';
                break;
            case 0x92: 
                this.opName = 'SUB D';
                break;
            case 0x93: 
                this.opName = 'SUB E';
                break;
            case 0x94: 
                this.opName = 'SUB H';
                break;
            case 0x95: 
                this.opName = 'SUB L';
                break;
            case 0x96: 
                this.opName = 'SUB M';
                break;
            case 0x97: 
                this.opName = 'SUB A';
                break;
            case 0x98: 
                this.opName = 'SBB B';
                break;
            case 0x99: 
                this.opName = 'SBB C';
                break;
            case 0x9A: 
                this.opName = 'SBB D';
                break;
            case 0x9B: 
                this.opName = 'SBB E';
                break;
            case 0x9C: 
                this.opName = 'SBB H';
                break;
            case 0x9D: 
                this.opName = 'SBB L';
                break;
            case 0x9E: 
                this.opName = 'SBB M';
                break;
            case 0x9F: 
                this.opName = 'SBB A';
                break;
            //0xAX
            case 0xA0:
                this.opName = 'ANA B';
                break;
            case 0xA1: 
                this.opName = 'ANA C';
                break;
            case 0xA2: 
                this.opName = 'ANA D';
                break;
            case 0xA3: 
                this.opName = 'ANA E';
                break;
            case 0xA4: 
                this.opName = 'ANA H';
                break;
            case 0xA5: 
                this.opName = 'ANA L';
                break;
            case 0xA6: 
                this.opName = 'ANA M';
                break;
            case 0xA7: 
                this.opName = 'ANA A';
                break;
            case 0xA8: 
                this.opName = 'XRA B';
                break;
            case 0xA9: 
                this.opName = 'XRA C';
                break;
            case 0xAA: 
                this.opName = 'XRA D';
                break;
            case 0xAB: 
                this.opName = 'XRA E';
                break;
            case 0xAC: 
                this.opName = 'XRA H';
                break;
            case 0xAD: 
                this.opName = 'XRA L';
                break;
            case 0xAE: 
                this.opName = 'XRA M';
                break;
            case 0xAF: 
                this.opName = 'XRA A';
                break;
            //0xBX
            case 0xB0:
                this.opName = 'ORA B';
                break;
            case 0xB1: 
                this.opName = 'ORA C';
                break;
            case 0xB2: 
                this.opName = 'ORA D';
                break;
            case 0xB3: 
                this.opName = 'ORA E';
                break;
            case 0xB4: 
                this.opName = 'ORA H';
                break;
            case 0xB5: 
                this.opName = 'ORA L';
                break;
            case 0xB6: 
                this.opName = 'ORA M';
                break;
            case 0xB7: 
                this.opName = 'ORA A';
                break;
            case 0xB8: 
                this.opName = 'CMP B';
                break;
            case 0xB9: 
                this.opName = 'CMP C';
                break;
            case 0xBA: 
                this.opName = 'CMP D';
                break;
            case 0xBB: 
                this.opName = 'CMP E';
                break;
            case 0xBC: 
                this.opName = 'CMP H';
                break;
            case 0xBD: 
                this.opName = 'CMP L';
                break;
            case 0xBE: 
                this.opName = 'CMP M';
                break;
            case 0xBF: 
                this.opName = 'CMP A';
                break;
            //0xCX
            case 0xC0:
                this.opName = 'RNZ';
                break;
            case 0xC1: 
                this.opName = 'POP B';
                break;
            case 0xC2: 
                this.opName = 'JNZ';
                break;
            case 0xC3: 
            case 0xCB: 
                this.opName = 'JMP MM';
                break;
            case 0xC4: 
                this.opName = 'CNZ MM';
                break;
            case 0xC5: 
                this.opName = 'PUSH B';
                break;
            case 0xC6: 
                this.opName = 'ADI';
                break;
            case 0xC7: 
                this.opName = 'RST 0';
                break;
            case 0xC8: 
                this.opName = 'RZ';
                break;
            case 0xC9: 
            case 0xD9: 
                this.opName = 'RET';
                break;
            case 0xCA: 
                this.opName = 'JZ MM';
                break;
            case 0xCC: 
                this.opName = 'CZ MM';
                break;
            case 0xCD: 
            case 0xDD: 
            case 0xED: 
            case 0xFD: 
                this.opName = 'CALL MM';
                break;
            case 0xCE: 
                this.opName = 'ACI M';
                break;
            case 0xCF: 
                this.opName = 'RST 1';
                break;
            //0xDX
            case 0xD0:
                this.opName = 'RNC';
                break;
            case 0xD1: 
                this.opName = 'POP D';
                break;
            case 0xD2: 
                this.opName = 'JNC';
                break;
            case 0xD3: 
                this.opName = 'OUT M';
                break;
            case 0xD4: 
                this.opName = 'CNC MM';
                break;
            case 0xD5: 
                this.opName = 'PUSH D';
                break;
            case 0xD6: 
                this.opName = 'SUI M';
                break;
            case 0xD7: 
                this.opName = 'RST 2';
                break;
            case 0xD8: 
                this.opName = 'RC';
                break;
            case 0xDA: 
                this.opName = 'JC MM';
                break;
            case 0xDB: 
                this.opName = 'IN M';
                break;
            case 0xDC: 
                this.opName = 'CC MM';
                break;
            case 0xDE: 
                this.opName = 'SBI M';
                break;
            case 0xDF: 
                this.opName = 'REST 3';
                break;
            //0xEX
            case 0xE0:
                this.opName = 'RPO';
                break;
            case 0xE1: 
                this.opName = 'POP H';
                break;
            case 0xE2: 
                this.opName = 'JNP MM';
                break;
            case 0xE3: 
                this.opName = 'XTHL';
                break;
            case 0xE4: 
                this.opName = 'CPO MM';
                break;
            case 0xE5: 
                this.opName = 'PUSH H';
                break;
            case 0xE6: 
                this.opName = 'ANI M';
                break;
            case 0xE7: 
                this.opName = 'RST 4';
                break;
            case 0xE8: 
                this.opName = 'RPE';
                break;
            case 0xE9: 
                this.opName = 'PCHL';
                break;
            case 0xEA: 
                this.opName = 'JPE MM';
                break;
            case 0xEB: 
                this.opName = 'XCHG';
                break;
            case 0xEC: 
                this.opName = 'CPE MM';
                break;
            case 0xEE: 
                this.opName = 'XRI M';
                break;
            case 0xEF: 
                this.opName = 'RST 5';
                break;
            //0xFX
            case 0xF0:
                this.opName = 'RP';
                break;
            case 0xF1: 
                this.opName = 'POP PSW';
                break;
            case 0xF2: 
                this.opName = 'JP MM';
                break;
            case 0xF3: 
                this.opName = 'DI';
                break;
            case 0xF4: 
                this.opName = 'CP MM';
                break;
            case 0xF5: 
                this.opName = 'PUSH PSW';
                break;
            case 0xF6: 
                this.opName = 'ORI M';
                break;
            case 0xF7: 
                this.opName = 'RST 6';
                break;
            case 0xF8: 
                this.opName = 'RM';
                break;
            case 0xF9: 
                this.opName = 'SHPL';
                break;
            case 0xFA: 
                this.opName = 'JM MM';
                break;
            case 0xFB: 
                this.opName = 'EI';  //ENABLE INTERUPT
                break;
            case 0xFC: 
                this.opName = 'CM MM';
                break;
            case 0xFE: 
                this.opName = 'CPI M';
                break;
            case 0xFF: 
                this.opName = 'RST 7';
                break;
            default:
                this.opName = 'NOP';
                NOP();
        }
    };

    this.NOP = function() {  };

    var movA = function(value) { this.AF = (value << 4) + (this.AF & 0x0F); };
    var getA = function()      { return this.AF >> 4; };
    var addA = function(value) {  };
    var subA = function(value) {  };
    var inxA = function()      {  };
    var inrA = function()      {  };
    var dcxA = function()      {  };

    var movF = function(value) { this.AF = value + (this.AF & 0xF0); };
    var getF = function()      { return this.AF & 0x0F; };
    var addF = function(value) {  };
    var subF = function(value) {  };
    var incF = function()      {  };
    var decF = function()      {  };
};