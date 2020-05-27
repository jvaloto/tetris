$(document).ready(function(){

    page.init();

});


    // let add = function(h,v){
    //     $($(table.children()[v]).children()[h]).addClass("active");
    // }

    // let remove = function(h,v){
    //     $($(table.children()[v]).children()[h]).removeClass("active");
    // }



    // // setInterval(function(){
    // //     remove(block.h - 1, block.v);
    // //     add(block.h, block.v);

    // //     block.moveVertical(1);
    // // }, TIME);

    
  

let page = {
    // COLUMNS: 10
    // , ROWS: 20
    COLUMNS: 4
    , ROWS: 5
    , HORIZONTAL_START: 4
    , VERTICAL_START: 0
    , table: null
    , block: null
    , blocks: null

    , init: function(){
        let that = this;

        that.table = $("#tetrisTable");
        that.blocks = new Array();
        that.block = new Block(that.HORIZONTAL_START, that.VERTICAL_START);

        that.createTest();

        $("body").keydown(function() {
            that.move(event.keyCode);
        });

        that.drawTable();
    }
    , createTest: function(){
        let that = this;
        
        that.blocks.push(new Block(0, 2));
        that.blocks.push(new Block(1, 2));
        that.blocks.push(new Block(2, 2));

        that.blocks.push(new Block(0, 3));
        that.blocks.push(new Block(1, 3));
        that.blocks.push(new Block(2, 3));
        that.blocks.push(new Block(3, 3));
        that.blocks.push(new Block(4, 3));
        
        that.blocks.push(new Block(0, 4));
        that.blocks.push(new Block(1, 4));
        that.blocks.push(new Block(2, 4));
        that.blocks.push(new Block(3, 4));
        that.blocks.push(new Block(4, 4));
    }
    , drawTable: function(){
        let that = this;
        
        for(let r = 0; r < that.ROWS; r ++){
            let tr = $("<tr>", {"class":"row"});

            for(let c = 0; c < that.COLUMNS; c ++){
                let td = $("<td>", { "class":"col" });

                tr.append(td);
            }

            that.table.append(tr);
        }

        that.drawBlocks();
    }
    , addRowTable: function(qtd){
        let that = this;

        for(let i = 0; i < qtd; i ++){   
            let tr = $("<tr>", {"class":"row"});
            
            for(let c = 0; c < that.COLUMNS; c ++){
                let td = $("<td>", { "class":"col" });
                
                tr.append(td);
            }

            that.table.prepend(tr);
        }
    }
    , drawBlocks: function(){
        let that = this;

        that.blocks.forEach(block =>{
            let td = $($(that.table.children()[block.v]).children()[block.h]);
            td.css("background-color", block.color);
            td.addClass("active"); //TODO: change to data-
        });
    }
    , verifyLine: function(){
        let that = this;
        
        that.table.children().toArray().forEach( line =>{
            if($(line).find( $("td.active" )).length == that.COLUMNS){
                $(line).fadeOut(1000, function(){
                    that.addRowTable(1);
                });
            }
        });
    }
    , move: function(key){
        let that = this;

        let KEY_LEFT = 37;
        let KEY_RIGHT = 39;
        let SPACE = 32;
        // let KEY_UP = 38;
        // let KEY_DOWN = 40;

        if(key == KEY_LEFT){
            console.log("esquerda");
        }else if(key == KEY_RIGHT){
            console.log("direita");
        }else if(key == SPACE){
            // TODO: rotate the block
        }
    }
}