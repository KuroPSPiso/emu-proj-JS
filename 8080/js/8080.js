var CPU = function(bus){
    var _bus = bus;

    var AF = BC = DE = HL = 0x0000;     //registers (8-bit registers)
    var PC = SP = 0x0000;               //pointers (16-bit registers)

    AF = 0x0002;
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
    this.B  = function() { return getB(); };
    this.C  = function() { return getC(); };
    this.BC = function() { return (getB() << 8) + getC(); };
    this.D  = function() { return getD(); };
    this.E  = function() { return getE(); };
    this.DE = function() { return (getD() << 8) + getE(); };
    this.H  = function() { return getH(); };
    this.L  = function() { return getL(); };
    this.HL = function() { return (getH() << 8) + getL(); };
    this.debug = function() { return `AF(${this.AF().toString(16).padLeft(4, '0').toUpperCase()}),BC(${this.BC().toString(16).padLeft(4, '0').toUpperCase()}),DE(${this.DE().toString(16).padLeft(4, '0').toUpperCase()}),HL(${this.HL().toString(16).padLeft(4, '0').toUpperCase()}),PC(${PC.toString(16).padLeft(4, '0').toUpperCase()}),TICK(${this.getTick().toString().padLeft(10, '0').toUpperCase()}),OPNAME(${this.getOpName().toString().padLeft(9, '_')}),PC_CARRY(${this.getPC_CARRY()})`}

    this.exec = function(debugOpcode){
        PC_CARRY = 0;
        var pc = getPC();
        if(typeof debugOpcode != 'undefined' && debugOpcode != null) pc = debugOpcode;
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
                stAXB();
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
                ldAXB();
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
                stAXD();
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
                opName = 'LDAX D';
                ldAXD();
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
                daA();
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
                cmA();
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
                inrA();
                break;
            case 0x3D: 
                opName = 'DCR A';
                dcrA();
                break;
            case 0x3E: 
                opName = 'MVI A';
                break;
            case 0x3F: 
                opName = 'CMC';
                cmc();
                break;
            //0x4X
            case 0x40:
                opName = 'MOV B,B';
                movB(getB());
                break;
            case 0x41: 
                opName = 'MOV B,C';
                movB(getC());
                break;
            case 0x42: 
                opName = 'MOV B,D';
                movB(getD());
                break;
            case 0x43: 
                opName = 'MOV B,E';
                movB(getE());
                break;
            case 0x44: 
                opName = 'MOV B,H';
                movB(getH());
                break;
            case 0x45: 
                opName = 'MOV B,L';
                movB(getL());
                break;
            case 0x46: 
                opName = 'MOV B,M';
                movB(_bus.memory.data[HL]);
                break;
            case 0x47: 
                opName = 'MOV B,A';
                movB(getA());
                break;
            case 0x48: 
                opName = 'MOV C,B';
                movC(getB());
                break;
            case 0x49: 
                opName = 'MOV C,C';
                movC(getC());
                break;
            case 0x4A: 
                opName = 'MOV C,D';
                movC(getD());
                break;
            case 0x4B: 
                opName = 'MOV C,E';
                movC(getE());
                break;
            case 0x4C: 
                opName = 'MOV C,H';
                movC(getH());
                break;
            case 0x4D: 
                opName = 'MOV C,L';
                movC(getL());
                break;
            case 0x4E: 
                opName = 'MOV C,M';
                movC(_bus.memory.data[HL]);
                break;
            case 0x4F: 
                opName = 'MOV C,A';
                movC(getA());
                break;
            //0x5X
            case 0x50:
                opName = 'MOV D,B';
                movD(getB());
                break;
            case 0x51: 
                opName = 'MOV D,C';
                movD(getC());
                break;
            case 0x52: 
                opName = 'MOV D,D';
                movD(getD());
                break;
            case 0x53: 
                opName = 'MOV D,E';
                movD(getE());
                break;
            case 0x54: 
                opName = 'MOV D,H';
                movD(getH());
                break;
            case 0x55: 
                opName = 'MOV D,L';
                movD(getL());
                break;
            case 0x56: 
                opName = 'MOV D,M';
                movD(_bus.memory.data[HL]);
                break;
            case 0x57: 
                opName = 'MOV D,A';
                movD(getA());
                break;
            case 0x58: 
                opName = 'MOV E,B';
                movE(getB());
                break;
            case 0x59: 
                opName = 'MOV E,C';
                movE(getC());
                break;
            case 0x5A: 
                opName = 'MOV E,D';
                movE(getD());
                break;
            case 0x5B: 
                opName = 'MOV E,E';
                movE(getE());
                break;
            case 0x5C: 
                opName = 'MOV E,H';
                movE(getH());
                break;
            case 0x5D: 
                opName = 'MOV E,L';
                movE(getL());
                break;
            case 0x5E: 
                opName = 'MOV E,M';
                movE(_bus.memory.data[HL]);
                break;
            case 0x5F: 
                opName = 'MOV E,A';
                movE(getA());
                break;
            //0x6X
            case 0x60:
                opName = 'MOV H,B';
                movH(getB());
                break;
            case 0x61: 
                opName = 'MOV H,C';
                movH(getC());
                break;
            case 0x62: 
                opName = 'MOV H,D';
                movH(getD());
                break;
            case 0x63: 
                opName = 'MOV H,E';
                movH(getE());
                break;
            case 0x64: 
                opName = 'MOV H,H';
                movH(getH());
                break;
            case 0x65: 
                opName = 'MOV H,L';
                movH(getL());
                break;
            case 0x66: 
                opName = 'MOV H,M';
                movH(_bus.memory.data[HL]);
                break;
            case 0x67: 
                opName = 'MOV H,A';
                movH(getA());
                break;
            case 0x68: 
                opName = 'MOV L,B';
                movL(getB());
                break;
            case 0x69: 
                opName = 'MOV L,C';
                movL(getC());
                break;
            case 0x6A: 
                opName = 'MOV L,D';
                movL(getD());
                break;
            case 0x6B: 
                opName = 'MOV L,E';
                movL(getE());
                break;
            case 0x6C: 
                opName = 'MOV L,H';
                movL(getH());
                break;
            case 0x6D: 
                opName = 'MOV L,L';
                movL(getL());
                break;
            case 0x6E: 
                opName = 'MOV L,M';
                movL(_bus.memory.data[HL]);
                break;
            case 0x6F: 
                opName = 'MOV L,A';
                movL(getA());
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
                movA(getB());
                break;
            case 0x79: 
                opName = 'MOV A,C';
                movA(getC());
                break;
            case 0x7A: 
                opName = 'MOV A,D';
                movA(getD());
                break;
            case 0x7B: 
                opName = 'MOV A,E';
                movA(getE());
                break;
            case 0x7C: 
                opName = 'MOV A,H';
                movA(getH());
                break;
            case 0x7D: 
                opName = 'MOV A,L';
                movA(getL());
                break;
            case 0x7E: 
                opName = 'MOV A,M';
                movA(_bus.memory.data[HL]);
                break;
            case 0x7F: 
                opName = 'MOV A,A';
                movA(getA());
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

    //operations (un)related to opcodes, correct cycle counting
    var setPC = function(value)    { PC = value; }
    var getPC = function()         { incPC(); return PC; };
    var incPC = function()         { 
        tick++;
        cycles++;
        PC++;
        if(PC >= 0x100) { PC -= 0x100; this.PC_CARRY = 1; } //limit is set by max size in rom/ram
    }; //use whenever calling function (program counter, ups cycles), called twice per 16bit
    var checkBit = function(byte, bitPos){
        return ((byte & (1<<bitPos)) != 0);
    }
    var setBit = function (byte, bitPos){
        return (byte |= (1 << bitPos));
    };
    var clearBit = function(byte, bitPos){
        return (byte &= ~(1 << bitPos));
    };
    var toggleBit = function(byte, bitPos, state){
        if(state === true){
            setBit();
        } else {
            clearBit();
        }
    }
    //FLAG
    /* 
    SZ?(AC)?P?C
    S   - sign, result is negative
    Z   - zero, result is zero
    AC  - Auxiliary/Half Carry, used for binary-coded decimal arithmetic (BCD). 
    P   - parity, set if number of 1 bits in the results is even
    C   - carry, set if the last addition operation resulted in a carry or if the last subtraction operation required a borrow
    */
    var defaultS = function(value) {
        if(checkBit(value, 7)) { stS(); }
        else { clearS(); }
    }
    var stS = function() { 
        movF(setBit(getF(), 7));
    };
    var clearS = function() {
        movF(clearBit(getF(), 7));
    }
    var defaultZ = function(value) { 
        if(value === 0x0) { stZ(); }
        else if(clearBit(value, 7) === 0x0) { stZ(); } //BCD mode (assumed), negative values
        else { clearZ(); }
    };
    var stZ = function() { 
        movF(setBit(getF(), 6));
    };
    var clearZ = function() {
        movF(clearBit(getF(), 6));
    }
    var defaultP = function(value) {
        var counter = 0;
        for(var pI = 0; pI <= 7; pI++) {
            if(checkBit(value, pI)) { counter++ };
        }
        if(counter === 0 || (counter % 2) === 0) { stP(); }
        else { clearP(); }
    }
    var stP = function() { 
        movF(setBit(getF(), 2));
    };
    var clearP = function() {
        movF(clearBit(getF(), 2));
    }
    //AC handled in DAA
    var stAC = function() { 
        movF(setBit(getF(), 4));
    };
    var clearAC = function() {
        movF(clearBit(getF(), 4));
    }
    //C handled in arth.
    var stC = function() { 
        movF(setBit(getF(), 7));
    };
    var clearC = function() {
        movF(clearBit(getF(), 7));
    }

    //standard opcodes
    var NOP = function() {  };

    var movA = function(value)  { AF = ((value & 0xFF) << 8) + (AF & 0x00FF); };
    var getA = function()       { return (AF & 0xFF00) >> 8; };
    var addA = function(value)  {
        
    };
    var subA = function(value)  {

    };
    var inxA = function()       {

    };
    var inrA = function()       {
        if(getA()===0xFF) {
            movA(0x00);
            stAC();
        } else {
            movA(getA() + 0x01);
            clearAC(); 
        }
        defaultZ(getA());
        defaultS(getA());
        defaultP(getA());
    };
    var dcxA = function()       {
        
    };
    var dcrA = function()       {
        if(getA() === 0x00) {
            movA(0xFF);
            stAC();
        } else {
            movA(getA() - 0x01);
            clearAC(); 
        }
        defaultZ(getA());
        defaultS(getA());
        defaultP(getA());
    };
    var cmA = function()        {
        movA(0xFF - getA());
    };
    var daA = function()        {
        if((getA() & 0x0F) > 0x09){
            movA(getA() + 0x06);
            stAC();
        }
        if((getA() >> 4) > 0x09){
            movA(getA() + (0x06 << 4));
            stC();
        }
        defaultS(getA());
        defaultZ(getA());
        defaultP(getA());
    };
    var stAX = function(value)      {
        _bus.memory.data[value] = getA();
    };
    var stAXB = function()          {
        stAX(this.BC);
    };
    var stAXD = function()          {
        stAX(this.DE);
    };
    var ldAX = function(value)      {
        movA(_bus.memory.data[value]);
    }
    var ldAXB = function()          {
        ldAX(this.BC);
    }
    var ldAXD = function()          {
        ldAX(this.DE);
    }

    var movF = function(value)  { AF = (AF & 0xFF00) + (value & 0xFF); };
    var getF = function()       { return AF & 0x00FF; };
    
    var movB = function(value)  { BC = ((value & 0xFF) << 8) + (BC & 0x00FF); };
    var getB = function()       { return (BC & 0xFF00) >> 8; };
    
    var movC = function(value)  { BC = (BC & 0xFF00) + (value & 0xFF); };
    var getC = function()       { return BC & 0x00FF; };
    
    var movD = function(value)  { DE = ((value & 0xFF) << 8) + (DE & 0x00FF); };
    var getD = function()       { return (DE & 0xFF00) >> 8; };
    
    var movE = function(value)  { DE = (DE & 0xFF00) + (value & 0xFF); };
    var getE = function()       { return DE & 0x00FF; };
    
    var movH = function(value)  { HL = ((value & 0xFF) << 8) + (HL & 0x00FF); };
    var getH = function()       { return (HL & 0xFF00) >> 8; };
    
    var movL = function(value)  { HL = (HL & 0xFF00) + (value & 0xFF); };
    var getL = function()       { return HL & 0x00FF; };

    var cmc = function()        { if(checkBit(getF(), 7)){ clearC(); } else { stC(); } }
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