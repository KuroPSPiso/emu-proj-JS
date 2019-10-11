var CPU = function(bus){
    var _bus = bus;

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
        if(PC >= 0x100) { PC -= 0x100; this.PC_CARRY = 1; } //limit is set by max size in rom/ram
    }; //use whenever calling function (program counter, ups cycles), called twice per 16bit

    this.exec = function(){
        PC_CARRY = 0;
        var pc = getPC();
        scan(pc);
    }

    var scan = function(opcode){
        switch (opcode) {
            //0x1X
            case 0x00: 
                opName = 'NOP';
                break;
            case 0x01: 
                opName = 'LXI B';
                break;
            case 0x02: 
                opName = 'STAX B';
                break;
            case 0x03: 
                opName = 'INX B';
                break;
            case 0x04: 
                opName = 'INR B';
                break;
            case 0x05: 
                opName = 'DCR B';
                break;
            case 0x06: 
                opName = 'MVI B';
                break;
            case 0x07: 
                opName = 'RLC';
                break;
            case 0x09: 
                opName = 'DAD B';
                break;
            case 0x0A: 
                opName = 'LDAX B';
                break;
            case 0x0B: 
                opName = 'DCX B';
                break;
            case 0x0C: 
                opName = 'INR C';
                break;
            case 0x0D: 
                opName = 'DCR C';
                break;
            case 0x0E: 
                opName = 'MVI C';
                break;
            case 0x0F: 
                opName = 'RRC';
                break;
            //0x1X
            case 0x11: 
                opName = 'LXI D';
                break;
            case 0x12: 
                opName = 'STAX D';
                break;
            case 0x13: 
                opName = 'INX D';
                break;
            case 0x14: 
                opName = 'INR D';
                break;
            case 0x15: 
                opName = 'DCR D';
                break;
            case 0x16: 
                opName = 'MVI D';
                break;
            case 0x17: 
                opName = 'RAL';
                break;
            case 0x19: 
                opName = 'DAD B';
                break;
            case 0x1A: 
                opName = 'LDAX B';
                break;
            case 0x1B: 
                opName = 'DCX D';
                break;
            case 0x1C: 
                opName = 'INR E';
                break;
            case 0x1D: 
                opName = 'DCR E';
                break;
            case 0x1E: 
                opName = 'MVI E';
                break;
            case 0x1F: 
                opName = 'RAR';
                break;
            //0x2X
            case 0x21: 
                opName = 'LXI H';
                break;
            case 0x22: 
                opName = 'SHLD';
                break;
            case 0x23: 
                opName = 'INX H';
                break;
            case 0x24: 
                opName = 'INR H';
                break;
            case 0x25: 
                opName = 'DCR H';
                break;
            case 0x26: 
                opName = 'MVI H';
                break;
            case 0x27: 
                opName = 'DAA';
                break;
            case 0x29: 
                opName = 'DAD H';
                break;
            case 0x2A: 
                opName = 'LHLD';
                break;
            case 0x2B: 
                opName = 'DCX H';
                break;
            case 0x2C: 
                opName = 'INR L';
                break;
            case 0x2D: 
                opName = 'DCR L';
                break;
            case 0x2E: 
                opName = 'MVI L';
                break;
            case 0x2F: 
                opName = 'CMA';
                break;
            //0x3X
            case 0x31: 
                opName = 'LXI SP';
                break;
            case 0x32: 
                opName = 'STA';
                break;
            case 0x33: 
                opName = 'INX SP';
                break;
            case 0x34: 
                opName = 'INR M';
                break;
            case 0x35: 
                opName = 'DCR M';
                break;
            case 0x36: 
                opName = 'MVI M';
                break;
            case 0x37: 
                opName = 'STC';
                break;
            case 0x39: 
                opName = 'DAD SP';
                break;
            case 0x3A: 
                opName = 'LDA';
                break;
            case 0x3B: 
                opName = 'DCX SP';
                break;
            case 0x3C: 
                opName = 'INR A';
                break;
            case 0x3D: 
                opName = 'DCR A';
                break;
            case 0x3E: 
                opName = 'MVI A';
                break;
            case 0x3F: 
                opName = 'CMC';
                break;
            //0x4X
            case 0x40:
                opName = 'MOV B,B';
                break;
            case 0x41: 
                opName = 'MOV B,C';
                break;
            case 0x42: 
                opName = 'MOV B,D';
                break;
            case 0x43: 
                opName = 'MOV B,E';
                break;
            case 0x44: 
                opName = 'MOV B,H';
                break;
            case 0x45: 
                opName = 'MOV B,L';
                break;
            case 0x46: 
                opName = 'MOV B,M';
                break;
            case 0x47: 
                opName = 'MOV B,A';
                break;
            case 0x48: 
                opName = 'MOV C,B';
                break;
            case 0x49: 
                opName = 'MOV C,C';
                break;
            case 0x4A: 
                opName = 'MOV C,D';
                break;
            case 0x4B: 
                opName = 'MOV C,E';
                break;
            case 0x4C: 
                opName = 'MOV C,H';
                break;
            case 0x4D: 
                opName = 'MOV C,L';
                break;
            case 0x4E: 
                opName = 'MOV C,M';
                break;
            case 0x4F: 
                opName = 'MOV C,A';
                break;
            //0x5X
            case 0x50:
                opName = 'MOV D,B';
                break;
            case 0x51: 
                opName = 'MOV D,C';
                break;
            case 0x52: 
                opName = 'MOV D,D';
                break;
            case 0x53: 
                opName = 'MOV D,E';
                break;
            case 0x54: 
                opName = 'MOV D,H';
                break;
            case 0x55: 
                opName = 'MOV D,L';
                break;
            case 0x56: 
                opName = 'MOV D,M';
                break;
            case 0x57: 
                opName = 'MOV D,A';
                break;
            case 0x58: 
                opName = 'MOV E,B';
                break;
            case 0x59: 
                opName = 'MOV E,C';
                break;
            case 0x5A: 
                opName = 'MOV E,D';
                break;
            case 0x5B: 
                opName = 'MOV E,E';
                break;
            case 0x5C: 
                opName = 'MOV E,H';
                break;
            case 0x5D: 
                opName = 'MOV E,L';
                break;
            case 0x5E: 
                opName = 'MOV E,M';
                break;
            case 0x5F: 
                opName = 'MOV E,A';
                break;
            //0x6X
            case 0x60:
                opName = 'MOV H,B';
                break;
            case 0x61: 
                opName = 'MOV H,C';
                break;
            case 0x62: 
                opName = 'MOV H,D';
                break;
            case 0x63: 
                opName = 'MOV H,E';
                break;
            case 0x64: 
                opName = 'MOV H,H';
                break;
            case 0x65: 
                opName = 'MOV H,L';
                break;
            case 0x66: 
                opName = 'MOV H,M';
                break;
            case 0x67: 
                opName = 'MOV H,A';
                break;
            case 0x68: 
                opName = 'MOV L,B';
                break;
            case 0x69: 
                opName = 'MOV L,D';
                break;
            case 0x6A: 
                opName = 'MOV L,D';
                break;
            case 0x6B: 
                opName = 'MOV L,E';
                break;
            case 0x6C: 
                opName = 'MOV L,H';
                break;
            case 0x6D: 
                opName = 'MOV L,L';
                break;
            case 0x6E: 
                opName = 'MOV L,M';
                break;
            case 0x6F: 
                opName = 'MOV L,A';
                break;
            //0x7X
            case 0x70:
                opName = 'MOV M,B';
                break;
            case 0x71: 
                opName = 'MOV M,C';
                break;
            case 0x72: 
                opName = 'MOV M,D';
                break;
            case 0x73: 
                opName = 'MOV M,E';
                break;
            case 0x74: 
                opName = 'MOV M,H';
                break;
            case 0x75: 
                opName = 'MOV M,L';
                break;
            case 0x76: 
                opName = 'HLT';
                break;
            case 0x77: 
                opName = 'MOV M,A';
                break;
            case 0x78: 
                opName = 'MOV A,B';
                break;
            case 0x79: 
                opName = 'MOV A,C';
                break;
            case 0x7A: 
                opName = 'MOV A,D';
                break;
            case 0x7B: 
                opName = 'MOV A,E';
                break;
            case 0x7C: 
                opName = 'MOV A,H';
                break;
            case 0x7D: 
                opName = 'MOV A,L';
                break;
            case 0x7E: 
                opName = 'MOV A,M';
                break;
            case 0x7F: 
                opName = 'MOV A,A';
                break;
            //0x8X
            case 0x80:
                opName = 'ADD B';
                break;
            case 0x81: 
                opName = 'ADD C';
                break;
            case 0x82: 
                opName = 'ADD D';
                break;
            case 0x83: 
                opName = 'ADD E';
                break;
            case 0x84: 
                opName = 'ADD H';
                break;
            case 0x85: 
                opName = 'ADD L';
                break;
            case 0x86: 
                opName = 'ADD M';
                break;
            case 0x87: 
                opName = 'ADD A';
                break;
            case 0x88: 
                opName = 'ADC B';
                break;
            case 0x89: 
                opName = 'ADC C';
                break;
            case 0x8A: 
                opName = 'ADC D';
                break;
            case 0x8B: 
                opName = 'ADC E';
                break;
            case 0x8C: 
                opName = 'ADC H';
                break;
            case 0x8D: 
                opName = 'ADC L';
                break;
            case 0x8E: 
                opName = 'ADC M';
                break;
            case 0x8F: 
                opName = 'ADC A';
                break;
            //0x9X
            case 0x90:
                opName = 'SUB B';
                break;
            case 0x91: 
                opName = 'SUB C';
                break;
            case 0x92: 
                opName = 'SUB D';
                break;
            case 0x93: 
                opName = 'SUB E';
                break;
            case 0x94: 
                opName = 'SUB H';
                break;
            case 0x95: 
                opName = 'SUB L';
                break;
            case 0x96: 
                opName = 'SUB M';
                break;
            case 0x97: 
                opName = 'SUB A';
                break;
            case 0x98: 
                opName = 'SBB B';
                break;
            case 0x99: 
                opName = 'SBB C';
                break;
            case 0x9A: 
                opName = 'SBB D';
                break;
            case 0x9B: 
                opName = 'SBB E';
                break;
            case 0x9C: 
                opName = 'SBB H';
                break;
            case 0x9D: 
                opName = 'SBB L';
                break;
            case 0x9E: 
                opName = 'SBB M';
                break;
            case 0x9F: 
                opName = 'SBB A';
                break;
            //0xAX
            case 0xA0:
                opName = 'ANA B';
                break;
            case 0xA1: 
                opName = 'ANA C';
                break;
            case 0xA2: 
                opName = 'ANA D';
                break;
            case 0xA3: 
                opName = 'ANA E';
                break;
            case 0xA4: 
                opName = 'ANA H';
                break;
            case 0xA5: 
                opName = 'ANA L';
                break;
            case 0xA6: 
                opName = 'ANA M';
                break;
            case 0xA7: 
                opName = 'ANA A';
                break;
            case 0xA8: 
                opName = 'XRA B';
                break;
            case 0xA9: 
                opName = 'XRA C';
                break;
            case 0xAA: 
                opName = 'XRA D';
                break;
            case 0xAB: 
                opName = 'XRA E';
                break;
            case 0xAC: 
                opName = 'XRA H';
                break;
            case 0xAD: 
                opName = 'XRA L';
                break;
            case 0xAE: 
                opName = 'XRA M';
                break;
            case 0xAF: 
                opName = 'XRA A';
                break;
            //0xBX
            case 0xB0:
                opName = 'ORA B';
                break;
            case 0xB1: 
                opName = 'ORA C';
                break;
            case 0xB2: 
                opName = 'ORA D';
                break;
            case 0xB3: 
                opName = 'ORA E';
                break;
            case 0xB4: 
                opName = 'ORA H';
                break;
            case 0xB5: 
                opName = 'ORA L';
                break;
            case 0xB6: 
                opName = 'ORA M';
                break;
            case 0xB7: 
                opName = 'ORA A';
                break;
            case 0xB8: 
                opName = 'CMP B';
                break;
            case 0xB9: 
                opName = 'CMP C';
                break;
            case 0xBA: 
                opName = 'CMP D';
                break;
            case 0xBB: 
                opName = 'CMP E';
                break;
            case 0xBC: 
                opName = 'CMP H';
                break;
            case 0xBD: 
                opName = 'CMP L';
                break;
            case 0xBE: 
                opName = 'CMP M';
                break;
            case 0xBF: 
                opName = 'CMP A';
                break;
            //0xCX
            case 0xC0:
                opName = 'RNZ';
                break;
            case 0xC1: 
                opName = 'POP B';
                break;
            case 0xC2: 
                opName = 'JNZ';
                break;
            case 0xC3: 
            case 0xCB: 
                opName = 'JMP MM';
                break;
            case 0xC4: 
                opName = 'CNZ MM';
                break;
            case 0xC5: 
                opName = 'PUSH B';
                break;
            case 0xC6: 
                opName = 'ADI';
                break;
            case 0xC7: 
                opName = 'RST 0';
                break;
            case 0xC8: 
                opName = 'RZ';
                break;
            case 0xC9: 
            case 0xD9: 
                opName = 'RET';
                break;
            case 0xCA: 
                opName = 'JZ MM';
                break;
            case 0xCC: 
                opName = 'CZ MM';
                break;
            case 0xCD: 
            case 0xDD: 
            case 0xED: 
            case 0xFD: 
                opName = 'CALL MM';
                break;
            case 0xCE: 
                opName = 'ACI M';
                break;
            case 0xCF: 
                opName = 'RST 1';
                break;
            //0xDX
            case 0xD0:
                opName = 'RNC';
                break;
            case 0xD1: 
                opName = 'POP D';
                break;
            case 0xD2: 
                opName = 'JNC';
                break;
            case 0xD3: 
                opName = 'OUT M';
                break;
            case 0xD4: 
                opName = 'CNC MM';
                break;
            case 0xD5: 
                opName = 'PUSH D';
                break;
            case 0xD6: 
                opName = 'SUI M';
                break;
            case 0xD7: 
                opName = 'RST 2';
                break;
            case 0xD8: 
                opName = 'RC';
                break;
            case 0xDA: 
                opName = 'JC MM';
                break;
            case 0xDB: 
                opName = 'IN M';
                break;
            case 0xDC: 
                opName = 'CC MM';
                break;
            case 0xDE: 
                opName = 'SBI M';
                break;
            case 0xDF: 
                opName = 'REST 3';
                break;
            //0xEX
            case 0xE0:
                opName = 'RPO';
                break;
            case 0xE1: 
                opName = 'POP H';
                break;
            case 0xE2: 
                opName = 'JNP MM';
                break;
            case 0xE3: 
                opName = 'XTHL';
                break;
            case 0xE4: 
                opName = 'CPO MM';
                break;
            case 0xE5: 
                opName = 'PUSH H';
                break;
            case 0xE6: 
                opName = 'ANI M';
                break;
            case 0xE7: 
                opName = 'RST 4';
                break;
            case 0xE8: 
                opName = 'RPE';
                break;
            case 0xE9: 
                opName = 'PCHL';
                break;
            case 0xEA: 
                opName = 'JPE MM';
                break;
            case 0xEB: 
                opName = 'XCHG';
                break;
            case 0xEC: 
                opName = 'CPE MM';
                break;
            case 0xEE: 
                opName = 'XRI M';
                break;
            case 0xEF: 
                opName = 'RST 5';
                break;
            //0xFX
            case 0xF0:
                opName = 'RP';
                break;
            case 0xF1: 
                opName = 'POP PSW';
                break;
            case 0xF2: 
                opName = 'JP MM';
                break;
            case 0xF3: 
                opName = 'DI';
                break;
            case 0xF4: 
                opName = 'CP MM';
                break;
            case 0xF5: 
                opName = 'PUSH PSW';
                break;
            case 0xF6: 
                opName = 'ORI M';
                break;
            case 0xF7: 
                opName = 'RST 6';
                break;
            case 0xF8: 
                opName = 'RM';
                break;
            case 0xF9: 
                opName = 'SHPL';
                break;
            case 0xFA: 
                opName = 'JM MM';
                break;
            case 0xFB: 
                opName = 'EI';  //ENABLE INTERUPT
                break;
            case 0xFC: 
                opName = 'CM MM';
                break;
            case 0xFE: 
                opName = 'CPI M';
                break;
            case 0xFF: 
                opName = 'RST 7';
                break;
            default:
                opName = 'NOP';
                NOP();
        }
    };

    var NOP = function() {  };

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

var BUS = function(rom) {
    this.rom = rom; //loaded into ram
    this.memory = null; //used by cpu
    this.cpu = null; //used by ppu, spu
    this.ppu = null;
    this.spu = null;
}

var RAM = function (size) {
    this.data = []; //create array object for RAM (contains STACK)
    for(var dI = 0; dI < size; dI++){
        this.data.push(0); //clear default data
    }
}