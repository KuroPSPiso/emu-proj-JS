var CPU = function(bus){
    var _bus = bus;

    var AF = BC = DE = HL = 0x0000;     //registers (8-bit registers)
    var PC = SP = 0x0000;               //pointers (16-bit registers)
    var OPCODE = 0x00;
    var I_FLIPFLOP = false;             //interrupt flipflop
    var halted = false;

    AF = 0x0002;
    SP = 0xFFFF;
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
    this.PC = function() { return PC; };
    this.SP = function() { return SP; };
    this.OPCODE = function() { return OPCODE; };
    this.debug = function() { return `AF(${this.AF().toString(16).padLeft(4, '0').toUpperCase()}),BC(${this.BC().toString(16).padLeft(4, '0').toUpperCase()}),DE(${this.DE().toString(16).padLeft(4, '0').toUpperCase()}),HL(${this.HL().toString(16).padLeft(4, '0').toUpperCase()}),PC(${PC.toString(16).padLeft(4, '0').toUpperCase()}),SP(${SP.toString(16).padLeft(4, '0').toUpperCase()}),TICK(${this.getTick().toString().padLeft(10, '0').toUpperCase()}),AF(${this.OPCODE().toString(16).padLeft(4, '0').toUpperCase()}),OPNAME(${this.getOpName().toString().padLeft(9, '_')}),PC_CARRY(${this.getPC_CARRY()})`}

    this.exec = function(debugOpcode){
        if(halted) return;
        // if(I_FLIPFLOP) return;
        PC_CARRY = 0;
        var pc = getPC();
        if(typeof debugOpcode != 'undefined' && debugOpcode != null){
            pc = debugOpcode;
            console.log(pc);
        } 
        scan(OPCODE = fetch8(pc));
    }

    var fetch8 = function(pc){
        return r8(pc);
    }

    var fetch16 = function(pc){
        cycles++;
        return r16(pc, getPC());
    }

    var scan = function(opcode){
        switch (opcode) {
            //0x1X
            case 0x00: 
                opName = 'NOP';
                break;
            case 0x01: 
                opName = 'LXI B';
                lxiBC();
                break;
            case 0x02: 
                opName = 'STAX B';
                stAXB();
                break;
            case 0x03: 
                opName = 'INX B';
                inxBC();
                break;
            case 0x04: 
                opName = 'INR B';
                inrB();
                break;
            case 0x05: 
                opName = 'DCR B';
                dcrB();
                break;
            case 0x06: 
                opName = 'MVI B';
                mviB();
                break;
            case 0x07: 
                opName = 'RLC';
                rlc();
                break;
            case 0x09: 
                opName = 'DAD B';
                dad(BC);
                break;
            case 0x0A: 
                opName = 'LDAX B';
                ldAXB();
                break;
            case 0x0B: 
                opName = 'DCX B';
                dcxBC();
                break;
            case 0x0C: 
                opName = 'INR C';
                inrC();
                break;
            case 0x0D: 
                opName = 'DCR C';
                dcrC();
                break;
            case 0x0E: 
                opName = 'MVI C';
                mviC();
                break;
            case 0x0F: 
                opName = 'RRC';
                rrc();
                break;
            //0x1X
            case 0x11: 
                opName = 'LXI D';
                lxiDE();
                break;
            case 0x12: 
                opName = 'STAX D';
                stAXD();
                break;
            case 0x13: 
                opName = 'INX D';
                inxDE();
                break;
            case 0x14: 
                opName = 'INR D';
                inrD();
                break;
            case 0x15: 
                opName = 'DCR D';
                inrD();
                break;
            case 0x16: 
                opName = 'MVI D';
                mviD();
                break;
            case 0x17: 
                opName = 'RAL';
                ral();
                break;
            case 0x19: 
                opName = 'DAD D';
                dad(DE);
                break;
            case 0x1A: 
                opName = 'LDAX D';
                ldAXD();
                break;
            case 0x1B: 
                opName = 'DCX D';
                dcxDE();
                break;
            case 0x1C: 
                opName = 'INR E';
                inrE();
                break;
            case 0x1D: 
                opName = 'DCR E';
                dcrE();
                break;
            case 0x1E: 
                opName = 'MVI E';
                mviE();
                break;
            case 0x1F: 
                opName = 'RAR';
                rar();
                break;
            //0x2X
            case 0x21: 
                opName = 'LXI H';
                lxiHL();
                break;
            case 0x22: 
                opName = 'SHLD';
                sHLd();
                break;
            case 0x23: 
                opName = 'INX H';
                inxHL();
                break;
            case 0x24: 
                opName = 'INR H';
                inrH();
                break;
            case 0x25: 
                opName = 'DCR H';
                dcrM();
                break;
            case 0x26: 
                opName = 'MVI H';
                mviH();
                break;
            case 0x27: 
                opName = 'DAA';
                daA();
                break;
            case 0x29: 
                opName = 'DAD H';
                dad(HL);
                break;
            case 0x2A: 
                opName = 'LHLD';
                lHLd();
                break;
            case 0x2B: 
                opName = 'DCX H';
                dcxHL();
                break;
            case 0x2C: 
                opName = 'INR L';
                inrL();
                break;
            case 0x2D: 
                opName = 'DCR L';
                dcrL();
                break;
            case 0x2E: 
                opName = 'MVI L';
                mviL();
                break;
            case 0x2F: 
                opName = 'CMA';
                cmA();
                break;
            //0x3X
            case 0x31: 
                opName = 'LXI SP';
                lxiSP();
                break;
            case 0x32: 
                opName = 'STA';
                stA();
                break;
            case 0x33: 
                opName = 'INX SP';
                inxSP();
                break;
            case 0x34: 
                opName = 'INR M';
                inrM();
                break;
            case 0x35: 
                opName = 'DCR M';
                dcrM();
                break;
            case 0x36: 
                opName = 'MVI M';
                mviM();
                break;
            case 0x37: 
                opName = 'STC';
                stCF();
                break;
            case 0x39: 
                opName = 'DAD SP';
                dad(SP);
                break;
            case 0x3A: 
                opName = 'LDA';
                ldA();
                break;
            case 0x3B: 
                opName = 'DCX SP';
                dcxSP();
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
                mviA();
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
                w8(getB(), HL);
                break;
            case 0x71: 
                opName = 'MOV M,C';
                w8(getC(), HL);
                break;
            case 0x72: 
                opName = 'MOV M,D';
                w8(getD(), HL);
                break;
            case 0x73: 
                opName = 'MOV M,E';
                w8(getE(), HL);
                break;
            case 0x74: 
                opName = 'MOV M,H';
                w8(getH(), HL);
                break;
            case 0x75: 
                opName = 'MOV M,L';
                w8(getL(), HL);
                break;
            case 0x76: 
                opName = 'HLT';
                hlt();
                break;
            case 0x77: 
                opName = 'MOV M,A';
                w8(getA(), HL);
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
                addA(getB());
                break;
            case 0x81: 
                opName = 'ADD C';
                addA(getC());
                break;
            case 0x82: 
                opName = 'ADD D';
                addA(getD());
                break;
            case 0x83: 
                opName = 'ADD E';
                addA(getE());
                break;
            case 0x84: 
                opName = 'ADD H';
                addA(getH());
                break;
            case 0x85: 
                opName = 'ADD L';
                addA(getL());
                break;
            case 0x86: 
                opName = 'ADD M';
                addA(r8(HL));
                break;
            case 0x87: 
                opName = 'ADD A';
                addA(getA());
                break;
            case 0x88: 
                opName = 'ADC B';
                adcA(getB());
                break;
            case 0x89: 
                opName = 'ADC C';
                adcA(getC());
                break;
            case 0x8A: 
                opName = 'ADC D';
                adcA(getD());
                break;
            case 0x8B: 
                opName = 'ADC E';
                adcA(getE());
                break;
            case 0x8C: 
                opName = 'ADC H';
                adcA(getH());
                break;
            case 0x8D: 
                opName = 'ADC L';
                adcA(getL());
                break;
            case 0x8E: 
                opName = 'ADC M';
                adcA(r8(HL));
                break;
            case 0x8F: 
                opName = 'ADC A';
                adcA(getA());
                break;
            //0x9X
            case 0x90:
                opName = 'SUB B';
                subA(getB());
                break;
            case 0x91: 
                opName = 'SUB C';
                subA(getC());
                break;
            case 0x92: 
                opName = 'SUB D';
                subA(getD());
                break;
            case 0x93: 
                opName = 'SUB E';
                subA(getE());
                break;
            case 0x94: 
                opName = 'SUB H';
                subA(getH());
                break;
            case 0x95: 
                opName = 'SUB L';
                subA(getL());
                break;
            case 0x96: 
                opName = 'SUB M';
                subA(r8(HL));
                break;
            case 0x97: 
                opName = 'SUB A';
                subA(getA());
                break;
            case 0x98: 
                opName = 'SBB B';
                sbbA(getB());
                break;
            case 0x99: 
                opName = 'SBB C';
                sbbA(getC());
                break;
            case 0x9A: 
                opName = 'SBB D';
                sbbA(getD());
                break;
            case 0x9B: 
                opName = 'SBB E';
                sbbA(getE());
                break;
            case 0x9C: 
                opName = 'SBB H';
                sbbA(getH());
                break;
            case 0x9D: 
                opName = 'SBB L';
                sbbA(getL());
                break;
            case 0x9E: 
                opName = 'SBB M';
                sbbA(r8(HL));
                break;
            case 0x9F: 
                opName = 'SBB A';
                sbbA(getA());
                break;
            //0xAX
            case 0xA0:
                opName = 'ANA B';
                anA(getB());
                break;
            case 0xA1: 
                opName = 'ANA C';
                anA(getC());
                break;
            case 0xA2: 
                opName = 'ANA D';
                anA(getD());
                break;
            case 0xA3: 
                opName = 'ANA E';
                anA(getE());
                break;
            case 0xA4: 
                opName = 'ANA H';
                anA(getH());
                break;
            case 0xA5: 
                opName = 'ANA L';
                anA(getL());
                break;
            case 0xA6: 
                opName = 'ANA M';
                anA(r8(HL));
                break;
            case 0xA7: 
                opName = 'ANA A';
                anA(getA());
                break;
            case 0xA8: 
                opName = 'XRA B';
                xrA(getB());
                break;
            case 0xA9: 
                opName = 'XRA C';
                xrA(getC());
                break;
            case 0xAA: 
                opName = 'XRA D';
                xrA(getD());
                break;
            case 0xAB: 
                opName = 'XRA E';
                xrA(getE());
                break;
            case 0xAC: 
                opName = 'XRA H';
                xrA(getH());
                break;
            case 0xAD: 
                opName = 'XRA L';
                xrA(getL());
                break;
            case 0xAE: 
                opName = 'XRA M';
                xrA(r8(HL));
                break;
            case 0xAF: 
                opName = 'XRA A';
                xrA(getA());
                break;
            //0xBX
            case 0xB0:
                opName = 'ORA B';
                orA(getB());
                break;
            case 0xB1: 
                opName = 'ORA C';
                orA(getC());
                break;
            case 0xB2: 
                opName = 'ORA D';
                orA(getD());
                break;
            case 0xB3: 
                opName = 'ORA E';
                orA(getE());
                break;
            case 0xB4: 
                opName = 'ORA H';
                orA(getH());
                break;
            case 0xB5: 
                opName = 'ORA L';
                orA(getL());
                break;
            case 0xB6: 
                opName = 'ORA M';
                orA(r8(HL));
                break;
            case 0xB7: 
                opName = 'ORA A';
                orA(getA());
                break;
            case 0xB8: 
                opName = 'CMP B';
                cmp(getB());
                break;
            case 0xB9: 
                opName = 'CMP C';
                cmp(getC());
                break;
            case 0xBA: 
                opName = 'CMP D';
                cmp(getD());
                break;
            case 0xBB: 
                opName = 'CMP E';
                cmp(getE());
                break;
            case 0xBC: 
                opName = 'CMP H';
                cmp(getH());
                break;
            case 0xBD: 
                opName = 'CMP L';
                cmp(getL());
                break;
            case 0xBE: 
                opName = 'CMP M';
                cmp(r8(HL));
                break;
            case 0xBF: 
                opName = 'CMP A';
                cmp(getA());
                break;
            //0xCX
            case 0xC0:
                opName = 'RNZ';
                rnz();
                break;
            case 0xC1: 
                opName = 'POP B';
                popBC();
                break;
            case 0xC2: 
                opName = 'JNZ';
                jnz();
                break;
            case 0xC3: 
            case 0xCB: 
                opName = 'JMP MM';
                jmp();
                break;
            case 0xC4: 
                opName = 'CNZ MM';
                cnz();
                break;
            case 0xC5: 
                opName = 'PUSH B';
                pushBC();
                break;
            case 0xC6: 
                opName = 'ADI M';
                adiA();
                break;
            case 0xC7: 
                opName = 'RST 0';
                rst(0);
                break;
            case 0xC8: 
                opName = 'RZ';
                rz();
                break;
            case 0xC9: 
            case 0xD9: 
                opName = 'RET';
                ret();
                break;
            case 0xCA: 
                opName = 'JZ MM';
                jz();
                break;
            case 0xCC: 
                opName = 'CZ MM';
                cz();
                break;
            case 0xCD: 
            case 0xDD: 
            case 0xED: 
            case 0xFD: 
                opName = 'CALL MM';
                call();
                break;
            case 0xCE: 
                opName = 'ACI M';
                aciA();
                break;
            case 0xCF: 
                opName = 'RST 1';
                rst(1);
                break;
            //0xDX
            case 0xD0:
                opName = 'RNC';
                rnc();
                break;
            case 0xD1: 
                opName = 'POP D';
                popDE();
                break;
            case 0xD2: 
                opName = 'JNC';
                jnc();
                break;
            case 0xD3: 
                opName = 'OUT M';
                _out();
                break;
            case 0xD4: 
                opName = 'CNC MM';
                cnc();
                break;
            case 0xD5: 
                opName = 'PUSH D';
                pushDE();
                break;
            case 0xD6: 
                opName = 'SUI M';
                suiA();
                break;
            case 0xD7: 
                opName = 'RST 2';
                rst(2);
                break;
            case 0xD8: 
                opName = 'RC';
                rc();
                break;
            case 0xDA: 
                opName = 'JC MM';
                jc();
                break;
            case 0xDB: 
                opName = 'IN M';
                _in();
                break;
            case 0xDC: 
                opName = 'CC MM';
                cc();
                break;
            case 0xDE: 
                opName = 'SBI M';
                sbiA();
                break;
            case 0xDF: 
                opName = 'REST 3';
                rst(3);
                break;
            //0xEX
            case 0xE0:
                opName = 'RPO';
                rpo();
                break;
            case 0xE1: 
                opName = 'POP H';
                popHL();
                break;
            case 0xE2: 
                opName = 'JPO MM';
                jpo();
                break;
            case 0xE3: 
                opName = 'XTHL';
                xthl();
                break;
            case 0xE4: 
                opName = 'CPO MM';
                cpo();
                break;
            case 0xE5: 
                opName = 'PUSH H';
                pushHL();
                break;
            case 0xE6: 
                opName = 'ANI M';
                aniA();
                break;
            case 0xE7: 
                opName = 'RST 4';
                rst(4);
                break;
            case 0xE8: 
                opName = 'RPE';
                rpe();
                break;
            case 0xE9: 
                opName = 'PCHL';
                pcHL();
                break;
            case 0xEA: 
                opName = 'JPE MM';
                jpe();
                break;
            case 0xEB: 
                opName = 'XCHG';
                xchg();
                break;
            case 0xEC: 
                opName = 'CPE MM';
                cpe();
                break;
            case 0xEE: 
                opName = 'XRI M';
                xriA();
                break;
            case 0xEF: 
                opName = 'RST 5';
                rst(5);
                break;
            //0xFX
            case 0xF0:
                opName = 'RP';
                rp();
                break;
            case 0xF1: 
                opName = 'POP PSW';
                popPSW();
                break;
            case 0xF2: 
                opName = 'JP MM';
                jp();
                break;
            case 0xF3: 
                opName = 'DI';
                di();
                break;
            case 0xF4: 
                opName = 'CP MM';
                cp();
                break;
            case 0xF5: 
                opName = 'PUSH PSW';
                pushPSW();
                break;
            case 0xF6: 
                opName = 'ORI M';
                oriA();
                break;
            case 0xF7: 
                opName = 'RST 6';
                rst(6);
                break;
            case 0xF8: 
                opName = 'RM';
                rm();
                break;
            case 0xF9: 
                opName = 'SPHL';
                sphl();
                break;
            case 0xFA: 
                opName = 'JM MM';
                jm();
                break;
            case 0xFB: 
                opName = 'EI';  //ENABLE INTERUPT
                ei();
                break;
            case 0xFC: 
                opName = 'CM MM';
                cm();
                break;
            case 0xFE: 
                opName = 'CPI M';
                cpiA();
                break;
            case 0xFF: 
                opName = 'RST 7';
                rst(7);
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
    var defaultSF = function(value) {
        if(checkBit(value, 7)) { stSF(); }
        else { clearSF(); }
    };
    var stSF = function() { 
        movF(setBit(getF(), 7));
    };
    var clearSF = function() {
        movF(clearBit(getF(), 7));
    };
    var getSF = function() {
        return getF() >> 7;
    };
    var defaultZF = function(value) { 
        if(value === 0x0) { stZF(); }
        else if(clearBit(value, 7) === 0x0) { stZF(); } //BCD mode (assumed), negative values
        else { clearZF(); }
    };
    var stZF = function() { 
        movF(setBit(getF(), 6));
    };
    var clearZF = function() {
        movF(clearBit(getF(), 6));
    };
    var getZF = function() {
        return getF() >> 6;
    };
    var defaultPF = function(value) {
        var counter = 0;
        for(var pI = 0; pI <= 7; pI++) {
            if(checkBit(value, pI)) { counter++ };
        }
        if(counter === 0 || (counter % 2) === 0) { stPF(); }
        else { clearPF(); }
    };
    var stPF = function() { 
        movF(setBit(getF(), 2));
    };
    var clearPF = function() {
        movF(clearBit(getF(), 2));
    };
    var getPF = function()  {
        return getF() >> 2;
    };
    //AC handled in DAA
    var stACF = function() { 
        movF(setBit(getF(), 4));
    };
    var clearACF = function() {
        movF(clearBit(getF(), 4));
    };
    //C handled in arth.
    var stCF = function() { 
        movF(setBit(getF(), 0));
    };
    var clearCF = function() {
        movF(clearBit(getF(), 0));
    };
    var getCF = function() {
        return getF() >> 0;
    };

    //standard opcodes
    var NOP = function() {  };

    var movA = function(value)  { AF = ((value & 0xFF) << 8) + (AF & 0x00FF); };
    var getA = function()       { return (AF & 0xFF00) >> 8; };
    var addA = function(value)  {
        var data = getA() + value;
        var half = (getA() & 0x0F) + (value & 0x0F);
        if(data > 0xFF) stCF();
        if(half > 0x0F) stACF();
        data = data & 0xFF;
        defaultZF(data);
        defaultPF(data);
        defaultSF(data);
        movA(data);
    };
    var adcA = function(value)  {
        var data = getA() + value + getCF();
        var half = (getA() & 0x0F) + (value & 0x0F) + getCF();
        if(data > 0xFF) stCF();
        if(half > 0x0F) stACF();
        data = data & 0xFF;
        defaultZF(data);
        defaultPF(data);
        defaultSF(data);
        movA(data);
    };
    var subA = function(value)  {
        // var upperNibbleA = getA() >> 4;
        // var lowerNibbleA = getA() & 0x0F;
        // var resUpperNibble = 0x0;
        // var upperNibbleV = value >> 4;
        // var lowerNibbleV = value & 0x0F;
        // var resLowerNibble = 0x0;

        // if(upperNibbleV > upperNibbleA) {
        //     stCF();
        //     resUpperNibble = (0xF + upperNibbleA) - upperNibbleV;
        // } else {
        //     resUpperNibble = upperNibbleA - upperNibbleV
        // }
        // if(lowerNibbleV > lowerNibbleA) {
        //     stACF();
        //     resLowerNibble = (0xF + lowerNibbleA) - lowerNibbleV;
        // } else {
        //     resLowerNibble = lowerNibbleA - lowerNibbleV
        // }
        // var data = (resUpperNibble << 4) + resLowerNibble;
        // movA(data);
        // defaultZF(data);
        // defaultPF(data);
        // defaultSF(data);
        //documentation solution, compliment value and use ADD. (unable to fetch carry, unless inverse is expected)
        addA((0xFF-value) + 0x01);
    };
    var sbbA = function(value)  {
        addA(((0xFF-value) + 0x01)+getCF());
    };
    var anA = function(value)   {
        movA(getA() & value);
        clearCF();
        //clearANA();
        defaultZF(getA());
        defaultSF(getA());
        defaultPF(getA());
    };
    var xrA = function(value)   {
        movA(getA() ^ value);
        clearCF();
        //clearANA();
        defaultZF(getA());
        defaultSF(getA());
        defaultPF(getA());
    };
    var orA = function(value)   {
        movA(getA() | value);
        clearCF();
        //clearANA();
        defaultZF(getA());
        defaultSF(getA());
        defaultPF(getA());
    };
    var inrA = function()       {
        movA(inr(getA()));
    };
    var dcrA = function()       {
        movA(dcr(getA()));
    };
    var cmA = function()        {
        movA(0xFF - getA());
    };
    var daA = function()        {
        if((getA() & 0x0F) > 0x09){
            movA(getA() + 0x06);
            stACF();
        }
        if((getA() >> 4) > 0x09){
            movA(getA() + (0x06 << 4));
            stCF();
        }
        defaultSF(getA());
        defaultZF(getA());
        defaultPF(getA());
    };
    var stAX = function(loc)    {
        w8(getA(), loc);
    };
    var stAXB = function()      {
        stAX(this.BC);
    };
    var stAXD = function()      {
        stAX(this.DE);
    };
    var ldAX = function(loc)    {
        movA(r8(loc));
    }
    var ldAXB = function()      {
        ldAX(this.BC);
    }
    var ldAXD = function()      {
        ldAX(this.DE);
    }
    var mviA = function()       { movA(fetch8(getPC())); };
    var adiA = function()       { addA(fetch8(getPC())); };
    var aciA = function()       { adcA(fetch8(getPC())); };
    var suiA = function()       { subA(fetch8(getPC())); };
    var sbiA = function()       { sbbA(fetch8(getPC())); };
    var aniA = function()       { anA(fetch8(getPC())); };
    var xriA = function()       { xrA(fetch8(getPC())); };
    var oriA = function()       { orA(fetch8(getPC())); };
    var cpiA = function()       { cmp(fetch8(getPC())); };
    var stA = function()        { w8(getA(), (fetch8(getPC()) & 0x00FF) + (fetch8(getPC()) << 8)); };
    var ldA = function()        { movA(r8((fetch8(getPC()) & 0x00FF) + (fetch8(getPC()) << 8))); };
    var sHLd = function()       { 
        var loc = (fetch8(getPC()) & 0x00FF) + (fetch8(getPC()) << 8);
        w8(getL(), loc); 
        w8(getH(), loc + 0x01); 
    };
    var lHLd = function()       {
        var loc = (fetch8(getPC()) & 0x00FF) + (fetch8(getPC()) << 8);
        movL(r8(loc)); 
        movH(r8(loc + 0x01)); 
    }

    var movF = function(value)  { AF = (AF & 0xFF00) + (value & 0xFF); };
    var getF = function()       { return AF & 0x00FF; };
    
    var movB = function(value)  { BC = ((value & 0xFF) << 8) + (BC & 0x00FF); };
    var mviB = function()       { movB(getPC()); };
    var inrB = function()       {
        movB(inr(getB()));
    };
    var dcrB = function()       {
        movB(dcr(getB()));
    };
    var getB = function()       { return (BC & 0xFF00) >> 8; };
    
    var movC = function(value)  { BC = (BC & 0xFF00) + (value & 0xFF); };
    var mviC = function()       { movC(getPC()); };
    var inrC = function()       { movC(inr(getC())); };
    var dcrC = function()       { movC(dcr(getC())); };
    var getC = function()       { return BC & 0x00FF; };

    var lxiBC = function()      { BC = fetch16(getPC()); };
    var inxBC = function()      { BC = inx(BC); }
    var dcxBC = function()      { BC = dcx(BC); }
    
    var movD = function(value)  { DE = ((value & 0xFF) << 8) + (DE & 0x00FF); };
    var mviD = function()       { movD(getPC()); };
    var inrD = function()       { movD(inr(getD())); };
    var dcrD = function()       { movD(dcr(getD())); };
    var getD = function()       { return (DE & 0xFF00) >> 8; };
    
    var movE = function(value)  { DE = (DE & 0xFF00) + (value & 0xFF); };
    var mviE = function()       { movE(getPC()); };
    var inrE = function()       { movA(inr(getE())); };
    var dcrE = function()       { movA(dcr(getE())); };
    var getE = function()       { return DE & 0x00FF; };

    var lxiDE = function()      { DE = fetch16(getPC()); };
    var inxDE = function()      { DE = inx(DE); }
    var dcxDE = function()      { DE = dcx(DE); }
    
    var movH = function(value)  { HL = ((value & 0xFF) << 8) + (HL & 0x00FF); };
    var mviH = function()       { movH(getPC()); };
    var inrH = function()       { movH(inr(getH())); };
    var dcrH = function()       { movH(dcr(getH())); };
    var getH = function()       { return (HL & 0xFF00) >> 8; };
    
    var movL = function(value)  { HL = (HL & 0xFF00) + (value & 0xFF); };
    var mviL = function()       { movL(getPC()); };
    var inrL = function()       { movL(inr(getL())); };
    var dcrL = function()       { movL(dcr(getL())); };
    var getL = function()       { return HL & 0x00FF; };

    var mviM = function()       { w8(getPC(), HL); };
    var inrM = function()       { w8(inr(r8(),HL),HL); };
    var dcrM = function()       { w8(dcr(r8(),HL),HL); };
    var lxiHL = function()      { HL = fetch16(getPC()); };
    var inxHL = function()      { HL = inx(HL); };
    var dcxHL = function()      { HL = dcx(HL); };

    var lxiSP = function()      { SP = fetch16(getPC()); };
    var inxSP = function()      { SP = inx(SP); };
    var dcxSP = function()      { SP = dcx(SP); };
    var getSP = function()      { return SP & 0xFFFF; };

    var cmc = function()        { if(checkBit(getF(), 7)){ clearCF(); } else { stCF(); } };
    var cmp = function(value)   {
        var data = (0xFF - value + 0x01) + getA();
        var half = (0xF - (value & 0x0F)) + (getA() & 0x0F);
        if(data > 0xFF) clearCF(); else stCF();
        if(half > 0xF) clearACF(); else stACF();
        data &= 0xFF;
        defaultPF(data);
        defaultZF(data);
        defaultSF(data);
    };
    var rlc = function()        {
        var data = checkBit(getA(), 7);
        movA(((getA() << 1) & 0xFF) + data);
        if(data) stCF(); else clearCF();
    };
    var rrc = function()        {
        var data = checkBit(getA(), 0);
        movA((getA() >> 1) + (data << 7));
        if(data) stCF(); else clearCF();
    };
    var ral = function()        {
        var data = checkBit(getA(), 7);
        var c = getCF();
        movA(((getA() << 1) & 0xFF) + c);
        if(data) stCF(); else clearCF();
    };
    var rar = function()        {
        var data = checkBit(getA(), 0);
        var c = getCF();
        movA((getA() >> 1) + (c << 7));
        if(data) stCF(); else clearCF();
    };
    var push = function(loc)    {
        var pt1 = loc >> 8; //H-byte
        var pt2 = loc & 0xFF; //L-byte
        _bus.memory.pushSP(pt1, getSP() - 1);
        _bus.memory.pushSP(pt2, getSP() - 2);
        dcxSP();
        dcxSP();
    };
    var pop = function()        {
        var pt2 = _bus.memory.popSP(getSP()) & 0xFF; //L-byte
        var pt1 = _bus.memory.popSP(getSP() + 1) >> 8; //H-byte
        inxSP();
        inxSP();
        return pt1 + pt2;
    };
    var pushPSW = function()    {
        push(AF);
    };
    var pushBC = function()     {
        push(BC);
    };
    var pushDE = function()     {
        push(DE);
    };
    var pushHL = function()     {
        push(HL);
    };
    var popPSW = function()     {
        var data = pop();
        movA(data >> 8);
        movF(data & 0x0F);
    };
    var popBC = function()      {
        var data = pop();
        movB(data >> 8);
        movC(data & 0x0F);
    };
    var popDE = function()      {
        var data = pop();
        movD(data >> 8);
        movE(data & 0x0F);
    };
    var popHL = function()      {
        var data = pop();
        movH(data >> 8);
        movL(data & 0x0F);
    };
    var dad = function(value)   {
        var data = value + HL;
        if(data > 0xFFFF) stCF(); else clearCF();
        data &= 0xFFFF;
        movH(data >> 8);
        movL(data & 0x00FF);
    };
    var inx = function(value)   {
        value++; if(value>0xFFFF) value = 0x00;
        return value;
    };
    var dcx = function(value)   {
        value--; if(0xFFFF - value + 0x0001 > 0xFFFF) value = 0xFFFF;
        return value;
    };
    var xchg = function()       {
        HL = DE;
    };
    var xthl = function()       {
        var data = HL;
        HL = r16(SP, SP + 0x0001);
        w16(data, SP, SP + 0x0001);
        console.log(`SP(${SP}):${HL} <= ${data} :: ${ r16(SP, SP + 0x0001)}`);
    };
    var sphl = function()       {
        SP = HL;
    };
    var inr = function(value)   {
        if(value === 0xFF) {
            value = 0x00;
            stACF();
        } else {
            value += 0x01;
            clearACF(); 
        }
        defaultZF(value);
        defaultSF(value);
        defaultPF(value);
        return value;
    };
    var dcr = function(value)   {
        if(value === 0x00) {
            value = 0xFF;
            stACF();
        } else {
            value -= 0x01;
            clearACF(); 
        }
        defaultZF(value);
        defaultSF(value);
        defaultPF(value);
        return value;
    };
    var pcHL = function()       {
        PC=HL;
    };
    var jmp = function()        {
        var data = fetch16(getPC());
        PC = r16(data, data + 0x0001);
    };
    var jmpIf = function(value) {
        var data = fetch16(getPC());
        if(value === true) { PC = r16(data, data + 0x0001); }
    };
    var jc = function()         {
        if(getCF() === 0x01) { jmpIf(true); } else { jmpIf(false); }
    };
    var jnc = function()        {
        if(getCF() === 0x00) { jmpIf(true); } else { jmpIf(false); }
    };
    var jz = function()         {
        if(getZF() === 0x01) { jmpIf(true); } else { jmpIf(false); }
    };
    var jnz = function()        {
        if(getZF() === 0x00) { jmpIf(true); } else { jmpIf(false); }
    };
    var jm = function()         {
        if(getSF() === 0x01) { jmpIf(true); } else { jmpIf(false); }
    };
    var jp = function()         {
        if(getSF() === 0x00) { jmpIf(true); } else { jmpIf(false); }
    };
    var jpe = function()        {
        if(getPF() === 0x01) { jmpIf(true); } else { jmpIf(false); }
    };
    var jpo = function()        {
        if(getPF() === 0x00) { jmpIf(true); } else { jmpIf(false); }
    };
    var call = function()       {
        push(getPC()); //next instr.
    };
    var callIf = function(value)     {
        if(value === true) {
            call();
        }
    };
    var cc = function()         {
        if(getCF() === 0x01) { callIf(true); } else { callIf(false); }
    };
    var cnc = function()        {
        if(getCF() === 0x00) { callIf(true); } else { callIf(false); }
    };
    var cz = function()         {
        if(getZF() === 0x01) { callIf(true); } else { callIf(false); }
    };
    var cnz = function()        {
        if(getZF() === 0x00) { callIf(true); } else { callIf(false); }
    };
    var cm = function()         {
        if(getSF() === 0x01) { callIf(true); } else { callIf(false); }
    };
    var cp = function()         {
        if(getSF() === 0x00) { callIf(true); } else { callIf(false); }
    };
    var cpe = function()        {
        if(getPF() === 0x01) { callIf(true); } else { callIf(false); }
    };
    var cpo = function()        {
        if(getPF() === 0x00) { callIf(true); } else { callIf(false); }
    };
    var ret = function()       {
        PC = pop();
    };
    var retIf = function(value)     {
        if(value === true) {
            ret();
        }
    };
    var rc = function()         {
        if(getCF() === 0x01) { retIf(true); } else { retIf(false); }
    };
    var rnc = function()        {
        if(getCF() === 0x00) { retIf(true); } else { retIf(false); }
    };
    var rz = function()         {
        if(getZF() === 0x01) { retIf(true); } else { retIf(false); }
    };
    var rnz = function()        {
        if(getZF() === 0x00) { retIf(true); } else { retIf(false); }
    };
    var rm = function()         {
        if(getSF() === 0x01) { retIf(true); } else { retIf(false); }
    };
    var rp = function()         {
        if(getSF() === 0x00) { retIf(true); } else { retIf(false); }
    };
    var rpe = function()        {
        if(getPF() === 0x01) { retIf(true); } else { retIf(false); }
    };
    var rpo = function()        {
        if(getPF() === 0x00) { retIf(true); } else { retIf(false); }
    };
    var ei = function()         {
        I_FLIPFLOP = true;
    };
    var di = function()         {
        I_FLIPFLOP = false;
    };
    var _in = function()         {
        movA(_bus.devices(getPC()).read8());
    };
    var _out = function()        {
        _bus.devices(getPC()).write8(getA());
    };
    var hlt = function()        {
        getPC();
        halted = true;
    };
    var rst = function(scale)   {
        var currPC = PC;
        call();
        PC = 8 * scale;
    };

    //RAM ACCESS
    var r8 = function(loc)                      {
        cycles++;
        return _bus.memory.read8(loc);
    };
    var r16 = function(loc1, loc2)              { //littleEndian
        return (r8(loc2) << 8) + (r8(loc1) & 0x00FF);
    };
    var w8 = function(value, loc)               {
        cycles++;
        _bus.memory.write8(value, loc);
    };
    var w16 = function(value, loc1, loc2)   {
        w8(value >> 8, loc2);
        w8(value & 0x00FF, loc1);
    };
};

var BUS = function(rom) {
    this.rom = rom; //to be loaded into ram(?)
    this.memory = null; //used by cpu
    this.cpu = null; //used by ppu, spu
    this.ppu = null;
    this.spu = null;

    this.devices = null;
    this.deviceIndex = 0;
    this.addDevice = function(index, type){
        this.devices[index] = DEVICE(type);
    };
    this.removeDevice = function(index){
        this.devices[index] = DEVICE();
    };

    this.loadROM = function(){
        if(this.rom.length > this.memory.data.length){
            for(var iROM = 0; iROM < this.memory.data.length; iROM++){
                this.memory.write8(this.rom[iROM], iROM);
            }
        } else {
            for(var iROM = 0; iROM < this.rom.length; iROM++){
                this.memory.write8(this.rom[iROM], iROM);
            }
        }
    };
    
    this.initDevices = function(){
        this.devices = [];
        for(var iD = 0x100; iD > 0; iD--){
            this.devices.push(new DEVICE());
            console.log(this.devices);
        } 
    };
}

var DEVICE = function(type){
    this.type = 'NOP';
    this.byteStream = 0x00;
    this.read8 = function(){
        handleType_GET();
    }; //current data
    this.write8 = function(value){
        handleType_SET(value);
    }

    var handleType_GET = function(){
        if(type === 'NOP'){ byteStream = 0x00; return byteStream; }
        if(type === 'KEYBOARD') {
            //todo: keyboard read logic
            return byteStream;
        }
    };

    var handleType_SET = function(value){
        byteStream = value;
        if(type === 'NOP') { }
        if(type === 'KEYBOARD') { }
    };

    if(typeof type != 'undefined' && type != null){
        this.type = type;
    }
};

var RAM = function (size) {
    this.data = []; //create array object for RAM (contains STACK)

    //this.stack = []; //can't find default location for STACK (temp solution), same size as stack
    for(var dI = 0; dI < size; dI++){
        this.data.push(0x00); //clear default data
        // this.stack.push(0); //clear default data
    }

    this.read8 = function(loc){
        return this.data[loc];
    }

    this.write8 = function(value, loc){
        this.data[loc] = value;
    }

    this.pushSP = function(value, loc){
        this.data[loc] = value;
    }
    this.popSP = function(loc){
        var data = this.data[loc];
        //this.data[loc] = 0xFF; //clear(?)
        return data;
    }
}