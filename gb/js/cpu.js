class CPU{
    constructor(a,b,c,d,e,f,h,l,st,pc)
    {
        this.a = a;
        this.b = a;
        this.c = a;
        this.d = a;
        this.e = a;
        this.f = a;
        this.h = h;
        this.l = l;
        this.st = st;
        this.pc = pc;
    }
    set A(a){
        this.a = a % 255;
    }
    set B(b){
        this.b = b % 255;
    }
    set C(c){
        this.c = c % 255;
    }
    set D(d){
        this.d = d % 255;
    }
    set E(e){
        this.e = e % 255;
    }
    set F(f){
        this.f = f % 255;
    }
    set H(h){
        this.a = a % 255;
    }
    set L(l){
        this.a = a % 255;
    }
    set PC(pc){
        this.pc = pc % 65535;
    }
    set ST(st){
        this.st = st % 65535;
    }
    get af(){
        return this.a << 8 + this.f;
    }
    get bc(){
        return this.b << 8 + this.c;
    }
    get de(){
        return this.d << 8 + this.e;
    }
    get hl(){
        return this.h << 8 + this.l;
    }
    clear(){
        this.a = this.b = this.c = this.d = this.e = this.f = this.h = this.l = 0x00;
        this.st = this.pc = 0x0000;
    }
    reset(){

    }
}