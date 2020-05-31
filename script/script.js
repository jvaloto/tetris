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
    , ROWS: 4
    , HORIZONTAL_START: 0
    , VERTICAL_START: 2
    , actualRow: null
    , actualCol: null
    , table: null
    , block: null
    , blocks: null

    , init: function(){
        let that = this;

        that.table = $("#tetrisTable");

        that.drawTable();

        that.createBlocks();

        that.createTest();

        $("body").keydown(function(){
            that.move(event.keyCode);
        });

        that.start();
    }
    , createBlocks: function(){
        let that = this;

        that.blocks = new Array();

        for(let r = 0; r < that.ROWS; r ++){
            that.blocks[r] = new Array();

            for(let c = 0; c < that.COLUMNS; c ++){
                that.blocks[r][c] = false;
            }
        }
    }
    , createTest: function(){
        let that = this;

        that.blocks[3][0] = true;
        that.blocks[3][1] = true;        
        that.blocks[3][3] = true;

       /* that.blocks.push(new Block(0, 0));
        that.blocks.push(new Block(1, 0));
        that.blocks.push(new Block(2, 0));
        that.blocks.push(new Block(3, 0));
        
        that.blocks.push(new Block(2, 1));

        that.blocks.push(new Block(0, 2));
        that.blocks.push(new Block(1, 2));
        that.blocks.push(new Block(2, 2));
        that.blocks.push(new Block(3, 2));

        that.blocks.push(new Block(0, 3));
        that.blocks.push(new Block(1, 3));
        that.blocks.push(new Block(3, 3));
        
        that.blocks.push(new Block(0, 4));
        that.blocks.push(new Block(1, 4));
        that.blocks.push(new Block(2, 4));
        that.blocks.push(new Block(3, 4));   */
    }
    , newBlock: function(){
        let that = this;

        that.blocks[that.HORIZONTAL_START][that.VERTICAL_START] = true;

        that.actualRow = that.HORIZONTAL_START;
        that.actualCol = that.VERTICAL_START;
    }
    , addBlock: function(){
        let that = this;

        //that.blocks.push(that.block);
    }
    , start: function(){
        let that = this;

        that.newBlock();

        that.drawBlocks();

        // let index = 0;

        // let refreshIntervalId = setInterval(function(){
        //     console.log("exec");

        //     index ++;
        //     if(index == 5){
        //         clearInterval(refreshIntervalId);
        //     }
        // }, 500);


    }
    , drawTable: function(){
        let that = this;

        that.table.empty();
        
        for(let r = 0; r < that.ROWS; r ++){
            let tr = $("<tr>", {"class":"row"});

            for(let c = 0; c < that.COLUMNS; c ++){
                let td = $("<td>", { "class":"col" });

                tr.append(td);
            }

            that.table.append(tr);
        }
    }
   /* , addRowTable: function(qtd){
        let that = this;

        for(let i = 0; i < qtd; i ++){   
            let tr = $("<tr>", {"class":"row"});
            
            for(let c = 0; c < that.COLUMNS; c ++){
                let td = $("<td>", { "class":"col" });
                
                tr.append(td);
            }

            that.table.prepend(tr);
        }
    }*/
    , drawBlocks: function(){
        let that = this;

        for(let r = 0; r < that.ROWS; r ++){
            for(let c = 0; c < that.COLUMNS; c ++){
                let isActive = that.blocks[r][c];

                let td = $($(that.table.children()[r]).children()[c]);
    
                if(isActive){
                    td.addClass("active"); //TODO: change to data-

                    td.css("background-color", "blue");
                }else{
                    td.removeClass("active"); //TODO: change to data-

                    td.css("background-color", "#fff");
                }
            }
        }        
    }
    , verifyLine: function(){
        let that = this;

        let currentRow = 0;

        that.table.children().toArray().forEach( forLine =>{
            if($(forLine).find( $("td.active" )).length == that.COLUMNS){
                 $(forLine).fadeOut(800, function(){
                    for(let c = 0; c < that.COLUMNS; c ++){
                        that.blocks[currentRow - 1][c] = false;
                    }

                    that.newBlock();

                    that.drawTable();

                    that.drawBlocks();
                });
            }

            currentRow ++;
        });

        
    }
    , move: function(key){
        let that = this;

        let KEY_UP = 38;
        let KEY_LEFT = 37;
        let KEY_RIGHT = 39;
        let KEY_DOWN = 40;

        let moved = false;
        let previousRow = that.actualRow;
        let previousCol = that.actualCol;

        if(key == KEY_UP){
            if(that.actualRow > 0){
                moved = true;

                that.actualRow --;
            }
        }else if(key == KEY_LEFT){
            if(that.actualCol > 0){
                moved = true;

                that.actualCol --;
            }
        }else if(key == KEY_RIGHT){
            if(that.actualCol < (that.COLUMNS-1)){
                moved = true;

                that.actualCol ++;
            }
        }else if(key == KEY_DOWN){
            if(that.actualRow < (that.ROWS -1)){
                moved = true;

                that.actualRow ++;
            }
        }

        if(moved){
            that.blocks[previousRow][previousCol] = false;

            that.blocks[that.actualRow][that.actualCol] = true;
        }

        that.check();
    }
    , check: function(){
        let that = this;

        that.drawBlocks();

        that.verifyColision();
    }
    , verifyColision: function(){
        let that = this;

        //TODO: check if is the last line = game over

        let newBlock = false;

        if(that.actualRow == (that.ROWS - 1)){
            newBlock = true;
        }else{
            if(that.blocks[that.actualRow + 1][that.actualCol]){
                newBlock = true;
            }
        }

        if(newBlock){
            that.newBlock();
        }

        that.verifyLine();
    }
    , print: function(){
        let that = this;

        for(let r = 0; r < that.ROWS; r ++){
            let s = "";

            for(let c = 0; c < that.COLUMNS; c ++){
                s += that.blocks[r][c] + "\t";
            }

            console.log(s);
        }
    }
}