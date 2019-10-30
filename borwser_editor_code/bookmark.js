//북마크가 삽입된 좌표를 배열로 만들기 
var bookMarkArrayX = new Array();//x좌표
var bookMarkArrayY = new Array();//y좌표


i=0; // 북마크 배열의 갯수와 현재 위치
i2=-1; // 페이지 업 다운 관련 


//클릭과 버튼에 반응하기. 
document.addEventListener("keydown", bookmark_reaction, false)


// caret 함수 3 : 신호에 따라 selection 위치를 바꾼다. caret update 함수에서 사용됨.
function bookmark_reaction(event){
    let key = event.keyCode;
  	// 받은 입력이 무엇인가.
    try{
        if(key == 66){
            i2 = bookMark()-1; //i1과 i2가 같아야해서 -0부터 시작
            //console.log(i2 + "==>> Nowi2");
        }
        else if(key ==78||key==77){
            //console.log("N or M !!");
            i2 = BookPageUpDown(key,i2);
            window.scrollTo(bookMarkArrayX[i2],bookMarkArrayY[i2]);
 
             }
    }
    catch(error){
        console.log("bookmark error.");
    }

}

//북마크 새로 또 만드는 함수
function bookMark(){
    var jbBook = document.createElement('img');

    jbBook.src= "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/book.png?raw=true";//--
    jbBook.style = "opacity:0.5; position: absolute; z-index: 999; width: 20px; height: 20px";

    jbBook.style.top = String(absoluteTop) + "px";
    jbBook.style.left = String(x) + "px";

    //완성된 img 태그를 실제 tree 에 적용.
    document.body.appendChild(jbBook);//--

    //배열에 추가
    bookMarkArrayY.push(String(absoluteTop));
    bookMarkArrayX.push(String(x));
    //console.log(bookMarkArrayX+"bookX");
    //console.log(bookMarkArrayY+"bookY");
    

    //현재 배열의 번호 
    //console.log(i+"-> The number of i ");
    i = i+1;
    return i;
    
}

//n과 m버튼으로 북마크 위아래 스크롤
function BookPageUpDown(key,i2){
    //console.log(i2+" +VALUE i+");
    //console.log((bookMarkArrayX[i2])+"==> Now X");
    //console.log((bookMarkArrayY[i2])+"==> Now Y");
    //console.log(key+" +key+");


    if(key==78){//아스키 N입력 시
        //이전 북마크로 커서가 이동하도록!
        //console.log(i2+" +VALUE i+");
        
        if(i2>=0){//배열이 첫번째가 아니면    
            //console.log("-----------Up Movit!-----------");
            if(i2==0){
                console.log("It's First!");
                return i2;
            }

            i2 = i2-1;
            return i2;
        }
        else if(i2<0){
            console.log("It's First!");
            return i2;
        }
    }

    else{//M입력시
        //이후 북마크로 커서가 이동하도록!
        if(bookMarkArrayY[i2+1]==null){
            console.log("It's Last!");
            return i2;
        }
        else{
            //console.log("-----------Down Movit!-----------");
            if(i2>i){
                //console.log("-> i2 > i");
                return i2;   
            }
            else{
                i2 = i2+1;
                return i2;
            }
        }
    }
}