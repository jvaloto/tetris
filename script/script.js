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
    , ROWS: 10
    , HORIZONTAL_START: 2
    , VERTICAL_START: 0
    , table: null
    , block: null
    , blocks: null

    , init: function(){
        let that = this;

        that.table = $("#tetrisTable");
        that.blocks = new Array();

        that.newBlock();
        

        that.createTest();

        $("body").keydown(function() {
            that.move(event.keyCode);
        });

        that.drawTable();

        that.start();
    }
    , createTest: function(){
        let that = this;

        that.blocks.push(new Block(0, 0));
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
        that.blocks.push(new Block(3, 4));   
    }
    , newBlock: function(){
        let that = this;

        that.block = new Block(that.HORIZONTAL_START, that.VERTICAL_START);
    }
    , start: function(){
        let that = this;

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

        let td = $($(that.table.children()[that.block.v]).children()[that.block.h]);
        td.css("background-color", that.block.color);
        td.addClass("active"); //TODO: change to data-
    }
    , verifyLine: function(){
        let that = this;

        let newArray = new Array();
        let currentLine = 0;
        
        that.table.children().toArray().forEach( line =>{
            if($(line).find( $("td.active" )).length == that.COLUMNS){
                console.log(currentLine);

                newArray.unshift();
                
                // $(line).fadeOut(1000, function(){
                    //     that.addRowTable(1);
                    // });
            }else{

            }

            currentLine ++;
        });

        that.blocks = newArray;
    }
    , move: function(key){
        let that = this;

        let KEY_UP = 38;
        let KEY_LEFT = 37;
        let KEY_RIGHT = 39;
        let KEY_DOWN = 40;

        if(key == KEY_UP){
            if(that.block.v > 0){
                that.block.moveVertical(-1);
            }
        }else if(key == KEY_LEFT){
            if(that.block.h > 0){
                that.block.moveHorizontal(-1);
            }
        }else if(key == KEY_RIGHT){
            if(that.block.h < (that.COLUMNS-1)){
                that.block.moveHorizontal(1);
            }
        }else if(key == KEY_DOWN){
            if(that.block.v == (that.ROWS -1)){
                that.blocks.push(that.block);

                that.verifyLine();

                that.newBlock();
            }else{
                that.block.moveVertical(1);
            }
        }

        that.drawTable();
    }
}