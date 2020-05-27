class Block{

    constructor(h,v){
        this._h = h;
        this._v = v;

        let letters = '0123456789ABCDEF';
        let color = '#';

        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        this._color = color;
    }

    get h(){
        return this._h;
    }

    get v(){
        return this._v;
    }

    get color(){
        return this._color;
    }

    moveHorizontal(h){
        this._h += h;
    }

    moveVertical(v){
        this._v += v;
    }
}