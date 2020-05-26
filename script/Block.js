class Block{

    constructor(h,v){
        this._h = h;
        this._v = v;
    }

    get h(){
        return this._h;
    }

    get v(){
        return this._v;
    }

    moveHorizontal(h){
        this._h += h;
    }

    moveVertical(v){
        this._v += v;
    }
}