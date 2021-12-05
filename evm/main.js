let memory,cpu,display;
let bus = { rw:true, abus:0, dbus:0 }; 
class Memory {
  constructor(bus,size) {
    this.bus  = bus;
    this.size = size;
    this.memory = new Array(size).fill(0);
    this.exec = function () {
      if ( this.bus.rw ) {
        this.bus.dbus = this.memory[this.bus.abus];
      } else {
        this.memory[this.bus.abus] = this.bus.dbus;
      }
    }
  }
}
class ALU {
  constructor(bus,flags) {
    this.bus   = bus;
    this.flags = flags;
    this.nop  = function () {};
    this.add  = function () { bus.a = bus.a + bus.b; };
    this.sub  = function () { bus.a = bus.a - bus.b; };
    this.mult = function () { bus.a = bus.a * bus.b; };
    this.div  = function () { bus.a = (bus.a - bus.a % bus.b) / bus.b; };
    this.mod  = function () { bus.a = bus.a % bus.b; };
    this.exec = function () {
      switch ( bus.instruction ) {
        case 0 : this.nop(); break;
        case 1 : this.add(); break;
        case 2 : this.sub(); break;
        case 3 : this.mult();break;
        case 4 : this.div(); break;
        case 5 : this.mod(); break;
      }
      flags.minus = bus.a <  0;
      flags.zero  = bus.a == 0;
    }
  }
}
class CPU {
  constructor(bus) {
    this.memory_bus = bus;
    this.alu_bus    = { a:0, b:0, instruction:0 };
    this.flags      = { minus:false, zero:false };
    this.alu = new ALU(this.alu_bus,this.flags)
    this.state    = 0; // 0:fetch, 1:decode, 2:execute
    this.pc       = 0;
    this.ir       = 0;
    this.op1      = 0;
    this.op2      = 0;
    this.op3      = 0;
    this.jmp      = false;
    this.instructionKind = 0;
    this.register = new Array(16).fill(0);
    this.fetch      = function () {
      this.memory_bus.rw   = true;
      this.memory_bus.abus = this.pc++;
    }
    this.decode     = function () {
      this.ir  = ( this.memory_bus.dbus & 61440 ) >> 12;
      this.op1 = ( this.memory_bus.dbus &   240 ) >>  4;
      this.op2 = ( this.memory_bus.dbus &    15 ) >>  0;
      this.op3 = ( this.memory_bus.dbus &  4080 ) >>  4;
      if ( this.ir & 8 ) {
        // 8-15 : alu instructions
        //    8 : nop
        //    9 : add
        //   10 : sub
        //   11 : mult
        //   12 : div
        //   13 : mod
        this.instructionKind = 0;
        this.alu_bus.a = this.register[this.op1];
        this.alu_bus.b = this.register[this.op2];
        this.alu_bus.instruction = this.ir & 7;
      } else {
        if ( this.ir & 4 ) {
          // 4-7 : load-store instruction
          //   4 : store(direct  : from operand3 address)
          //   5 : store(indirect: from register address)
          //   6 : load (direct  : from operand3 address)
          //   7 : load (indirect: from register address)
          this.instructionKind = 1;
          this.memory_bus.rw = (this.ir & 2) == 2;
          this.memory_bus.abus = (this.ir&1) == 1 ? this.register[this.op1] : this.op3;
          this.memory_bus.dbus = this.register[this.op2];
        } else {
          // 0-3 : jump instruction
          //   0 : jump (always)
          //   1 : jump if zero   
          //   2 : jump if negative   
          //   3 : jump if zero or negative   
          this.instructionKind = 2;
          this.jmp = (this.ir==0) || this.flags.minus && ((this.ir&2)!=0) || this.flags.zero && ((this.ir&1)!=0);
        }
      }
    }
    this.execute    = function () {
      switch ( this.instructionKind ) {
        case 0 : this.alu.exec(); this.register[this.op1] = this.alu_bus.a; break;
        case 1 : if ( this.memory_bus.rw ) this.register[this.op2] = this.memory_bus.dbus; break;
        case 2 : if(this.jmp) this.pc = this.op3; break;
      }
    }
    this.exec = function () {
      switch ( this.state ) {
        case 0 : this.fetch();   break;
        case 1 : this.decode();  break;
        case 2 : this.execute(); break;
      }
      this.state = ( this.state + 1 ) % 3;
    }
  }
}
class Display {
  constructor (bus,offset) {
    this.bus    = bus;
    this.offset = offset;
    let canvas    = document.getElementById('canvas');
    let context   = canvas.getContext('2d');
    let imagedata = context.getImageData(0,0,canvas.width, canvas.height);
    function exec () {
      if ( this.bus.rw ) {
        this.bus.dbus = this.imagedata.data[this.bus.abus+this.offset];
      } else {
        this.imagedata.data[this.bus.abus+this.offset] = this.bus.dbus;
      }
      context.putImageData(imagedata,0,0);
    }
  }
}
function calc_prime_number() {
  // ir  = ( this.memory_bus.dbus & 61440 ) >> 8;
  // op1 = ( this.memory_bus.dbus &   240 ) >> 4;
  // op2 = ( this.memory_bus.dbus &    15 ) >> 0;
  // op3 = ( this.memory_bus.dbus &  4080 ) >> 4;
  //memory = new Memory(bus,65536);
  memory = new Memory(bus,128);
  cpu    = new CPU(bus);
  display= new Display(bus,32768);
  cpu.pc=0;
  memory.memory[ 0] = (  6 << 12 ) | (    39 << 4 ) | 7; //        load #51 7
  memory.memory[ 1] = (  6 << 12 ) | (    35 << 4 ) | 0; // P_BGN: load XXX 0
  memory.memory[ 2] = (  6 << 12 ) | (    37 << 4 ) | 1; //        load #100 1
  memory.memory[ 3] = ( 10 << 12 ) | (     1 << 4 ) | 0; //        sub 1 0
  memory.memory[ 4] = (  3 << 12 ) | (    34 << 4 );     //        jmp  P_END if zero or negative
  memory.memory[ 5] = (  6 << 12 ) | (    41 << 4 ) | 1; //        load #3 1
  memory.memory[ 6] = (  4 << 12 ) | (    36 << 4 ) | 1; //        store XXX 1
  memory.memory[ 7] = (  6 << 12 ) | (    36 << 4 ) | 1; // N_BGN: load XXX 1
  memory.memory[ 8] = (  6 << 12 ) | (    36 << 4 ) | 2; //        load XXX 2
  memory.memory[ 9] = ( 11 << 12 ) | (     2 << 4 ) | 1; //        mult 2 1
  memory.memory[10] = (  6 << 12 ) | (    35 << 4 ) | 3; //        load XXX 3
  memory.memory[11] = ( 10 << 12 ) | (     3 << 4 ) | 2; //        sub  3 2
  memory.memory[12] = (  2 << 12 ) | (    20 << 4 );     //        jmp N_END if negative
  memory.memory[13] = (  6 << 12 ) | (    35 << 4 ) | 2; //        load XXX 2
  memory.memory[14] = ( 13 << 12 ) | (     2 << 4 ) | 1; //        mod 2 1
  memory.memory[15] = (  1 << 12 ) | (    20 << 4 );     //        jmp N_END if zero
  memory.memory[16] = (  6 << 12 ) | (    38 << 4 ) | 2; //        load #2 2
  memory.memory[17] = (  9 << 12 ) | (     1 << 4 ) | 2; //        add 1 2
  memory.memory[18] = (  4 << 12 ) | (    36 << 4 ) | 1; //        store XXX 1
  memory.memory[19] = (  0 << 12 ) | (     7 << 4 );     //        jmp N_BGN
  memory.memory[20] = (  6 << 12 ) | (    35 << 4 ) | 0; // N_END: load XXX 0
  memory.memory[21] = (  6 << 12 ) | (    36 << 4 ) | 1; //        load XXX 1
  memory.memory[22] = (  6 << 12 ) | (    36 << 4 ) | 2; //        load XXX 2
  memory.memory[23] = ( 11 << 12 ) | (     2 << 4 ) | 1; //        mult 2 1
  memory.memory[24] = ( 10 << 12 ) | (     2 << 4 ) | 0; //        sub  2 0
  memory.memory[25] = (  3 << 12 ) | (    29 << 4 );     //        jmp NOT_P if zero ornegative
  memory.memory[26] = (  5 << 12 ) | (     7 << 4 ) | 0; //        store reg[7] 0
  memory.memory[27] = (  6 << 12 ) | (    40 << 4 ) | 2; //        load #1 2
  memory.memory[28] = (  9 << 12 ) | (     7 << 4 ) | 2; //        add 7 2
  memory.memory[29] = (  6 << 12 ) | (    35 << 4 ) | 0; // NOT_P: load XXX 0
  memory.memory[30] = (  6 << 12 ) | (    38 << 4 ) | 2; //        load #2 2
  memory.memory[31] = (  9 << 12 ) | (     0 << 4 ) | 2; //        add 0 2
  memory.memory[32] = (  4 << 12 ) | (    35 << 4 ) | 0; //        store XXX 0
  memory.memory[33] = (  0 << 12 ) | (     1 << 4 );     //        jmp P_BGN
  memory.memory[34] = (  0 << 12 ) | (    34 << 4 );     // P_END: jmp P_END
  memory.memory[35] = 3; // p
  memory.memory[36] = 3; // n
  memory.memory[37] = 100;
  memory.memory[38] = 2;
  memory.memory[39] = 51;
  memory.memory[40] = 1;
  memory.memory[41] = 3;

  memory.memory[50] = 2;
}

let init = calc_prime_number;

function exec () {
  memory.exec();
  cpu.exec();
  console.log("pc : " + cpu.pc);
  console.log("reg: " + cpu.register);
  console.log("mem: " + memory.memory);
}
