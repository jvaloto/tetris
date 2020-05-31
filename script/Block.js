class Block{

    constructor(row, col, isActive){
        this._row = row;
        this._col = col;
        this._isActive = isActive;

        let color = '#';
        let letters = '0123456789ABCDEF';

        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        this._color = color;
    }

    get col(){
        return this._col;
    }

    get row(){
        return this._row;
    }

    get color(){
        if(this._isActive){
            return this._color;
        }else{
            return "#fff";
        }
    }

    set isActive(value){
        this._isActive = value;
    }

    get isActive(){
        return this._isActive;
    }

    moveCol(qtd){
        this._col += qtd;
    }

    moveRow(qtd){
        this._row += qtd;
    }
}