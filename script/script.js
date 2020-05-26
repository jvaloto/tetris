$(document).ready(function(){
    let COLUMNS = 10;
    let ROWS = 20;
    let HORIZONTAL_START = 0;
    let VERTICAL_START = 4;
    let TIME = 800;

    let table = $("#table");

    for(let r = 0; r < ROWS; r ++){
        let tr = $("<tr>", {"class":"row"});

        for(let c = 0; c < COLUMNS; c ++){
            let td = $("<td>", {"class":"col"});

            tr.append(td);
        }

        table.append(tr);
    }

    let add = function(h,v){
        $($(table.children()[v]).children()[h]).addClass("active");
    }

    let remove = function(h,v){
        $($(table.children()[v]).children()[h]).removeClass("active");
    }

    let block = new Block(HORIZONTAL_START, VERTICAL_START);

    setInterval(function(){
        remove(block.h - 1, block.v);
        add(block.h, block.v);

        block.moveVertical(1);
    }, TIME);

    $("body").keydown(function(evt){
        let KEY_LEFT = 37;
        let KEY_RIGHT = 39;
        // let KEY_UP = 38;
        // let KEY_DOWN = 40;

        let key = evt.keyCode;

        if(key == KEY_LEFT){
            if(block.v != 0){
                remove(block.h, block.v);
                
                block.moveHorizontal(-1);

                add(block.h, block.v);
            }
        }else if(key == KEY_RIGHT){
            if(block.v != COLUMNS){
                remove(block.h, block.v);

                block.moveHorizontal(1);

                add(block.h, block.v);
            }
        }
    });
});