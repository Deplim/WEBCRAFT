//B:북마크 추가 , V:북마크 삭제 , N:북마크위로 , M:북마크 아래로

//북마크가 삽입된 좌표를 배열로 만들기 
var bookMarkArrayX = new Array();//x좌표
var bookMarkArrayY = new Array();//y좌표


arrayLocation=-1; // 페이지 업 다운 관련 , 북마크 배열의 갯수와 현재 위치

//클릭과 버튼에 반응하기. 
document.addEventListener("keydown", bookmark_reaction, false)


// caret 함수 3 : 신호에 따라 selection 위치를 바꾼다. caret update 함수에서 사용됨.
function bookmark_reaction(event){
    let key = event.keyCode;
  	// 받은 입력이 무엇인가.
    try{
        if(key == 66){
            arrayLocation = bookMark(); //i1과 i2가 같아야해서 -0부터 시작
            console.log(arrayLocation + "==>> Nowi2");
        }
        else if(key ==78||key==77){
            //console.log("N or M !!");
            arrayLocation = BookPageUpDown(key,arrayLocation);
            console.log(arrayLocation+ "##Before arrayLocation###");
            //console.log(nodeCounter.length+ "##Before nodeCounter.length###");
            window.scrollTo(bookMarkArrayX[arrayLocation],bookMarkArrayY[arrayLocation]);
 
         }
        else if(key==86){//v입력시
            BookPageDelete(arrayLocation);
            console.log(arrayLocation +"now i2 In KEY");
            if(arrayLocation==0){//0번배열 넘어가는거 방지
                arrayLocation=0;
            }
            else{
                arrayLocation = arrayLocation-1;//마지막 북마크 삭제시 널값방지
            }
            //eventB = 1;
            window.scrollTo(bookMarkArrayX[arrayLocation],bookMarkArrayY[arrayLocation]);
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


    //배열에 추가
    bookMarkArrayY.push(String(absoluteTop));
    bookMarkArrayX.push(String(x));


    //배열의 인덱스 +1;
    arrayLocation = arrayLocation+1;    

    //노드에 앞부분 순서대로 arrayLocation 인덱스로 북마크 넣기
    document.body.insertBefore(jbBook,document.body.childNodes[arrayLocation])
        
    return arrayLocation;
    
}

function BookPageDelete(arrayLocation){
    
    var jbBook = document.createElement('img');

    jbBook.src= "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/book.png?raw=true";//--
    jbBook.style = "opacity:0.5; position: absolute; z-index: 999; width: 20px; height: 20px";

    jbBook.style.top = String(absoluteTop) + "px";
    jbBook.style.left = String(x) + "px";


    //널이 아니면 삭제 진행
    if(bookMarkArrayX[arrayLocation]=!null){

        //arrayLocation위치 인덱스 삭제
        document.body.removeChild(document.body.childNodes[arrayLocation]);
        
        //현재 배열 제거 
        bookMarkArrayX.splice(arrayLocation,1);
        bookMarkArrayY.splice(arrayLocation,1);
        console.log(arrayLocation+"-> delete");
    
        return arrayLocation;
    }
    else if(bookMarkArrayX[arrayLocation]==null){
        console.log("NULL");
        return arrayLocation;
    }
}




//n과 m버튼으로 북마크 위아래 스크롤
function BookPageUpDown(key,arrayLocation){
    //console.log(i2+" +VALUE i+");
    //console.log((bookMarkArrayX[i2])+"==> Now X");
    //console.log((bookMarkArrayY[i2])+"==> Now Y");
    //console.log(key+" +key+");


    if(key==78){//아스키 N입력 시
        //이전 북마크로 커서가 이동하도록!
        //console.log(i2+" +VALUE i+");
        
        if(arrayLocation>=0){//배열이 첫번째가 아니면    
            //console.log("-----------Up Movit!-----------");
            if(arrayLocation==0){
                console.log("It's First!");
                return arrayLocation;
            }

            arrayLocation = arrayLocation-1;
            return arrayLocation;
        }
        
    }

    else{//M입력시
        //이후 북마크로 커서가 이동하도록!
        if(bookMarkArrayY[arrayLocation+1]==null){
            console.log("It's Last!");
            return arrayLocation;
        }
        else{
            //console.log("-----------Down Movit!-----------");
            //if(i2>i){
                //console.log("-> i2 > i");
            //    return i2;   
            //}
           // else{
            //console.log("It's Last!");
            arrayLocation = arrayLocation+1;
            return arrayLocation;
            //}
        }
    }
}
