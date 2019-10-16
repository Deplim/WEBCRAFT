//북마크 삽입 함수 
//(B키-북마크 ,N키-전 북마크,M키-다음 북마크)

 // 1.북마크 이미지를 좌표에 삽입    
 // 2.북마크를 박은 좌표를 bookMarkArray[]에 삽입   
 // 3.n 또는 m 다운 버튼을 누르면 북마크 박은 좌표 위아래 이동


document.addEventListener("click", caret_update, false)
document.addEventListener("keydown", caret_update, false)
//document.addEventListener("")

//북마크가 삽입된 좌표를 배열로 만들기 
var bookMarkArrayX = new Array();//--
var bookMarkArrayY = new Array();//--


// 캐럿이 될 img 태그와 속성 생성.
var jbBtn = document.createElement('img');
var jbBtnAt = document.createAttribute("src");
var jbBtnAt2 = document.createAttribute("style");

var jbBook = document.createElement('img');//--
var jbBookAt = document.createAttribute("src");
var jbBookAt2 = document.createAttribute("style");

let range = document.createRange();

// 만든 속성 변수에 값 대입.
jbBtnAt.value = "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/123.PNG?raw=true";
jbBtnAt2.value = "opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 998; width: 10px; height: 20px";

jbBook.value = "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/book.png?raw=true";//--
jbBookAt2.value = "opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 999; width: 20px; height: 20px";

//실제 img 태그에 만들어 둔 속성 삽입.
jbBtn.setAttributeNode(jbBtnAt);
jbBtn.setAttributeNode(jbBtnAt2);

jbBook.setAttributeNode(jbBookAt);//--
jbBook.setAttributeNode(jbBookAt2);

//완성된 img 태그를 실제 tree 에 적용.
document.body.appendChild(jbBtn);
document.body.appendChild(jbBook);//--

//북마크 좌표값 저장할 곳 
absolteTop2=0;
x2=0;
var arr =[];

//북마크 배열 관련
i=0; // 북마크 배열의 갯수와 현재 위치
i2=-1; // 페이지 업 다운 관련 


function caret_update(event) {

    changeSelectionLocation(event);
    // 1. selection 좌표 뽑고 반올림 해서 변수에 저장하기
    let coords = getSelectionCoords();
    let x = Math.round(coords.x); // 캐럿 x 상대좌표
    let y = Math.round(coords.y); // 캐럿 y 상대좌표


    //현제 스크롤 
    const scrolledTopLength = window.pageYOffset;

    // y 절대 좌표
    const absoluteTop = scrolledTopLength + y;

    document.getElementById("coords").innerHTML = x + ", " + absoluteTop;
   // console.log(x + "," + absoluteTop)//

    let key = event.keyCode;
    try{
        if(key == 66){
            i2 = bookMark()-1; //i1과 i2가 같아야해서 -0부터 시작
            console.log(i2 + "==>> Nowi2");
        }
        if(key ==78||key==77){
            console.log("N or M !!");
            i2 = BookPageUpDown(key,i2);
            console.log(i2 + "==>> Nowi2");
            //console.log("---------------"+(bookMarkArrayX[i2])+"==> Now X");
            //console.log("---------------"+(bookMarkArrayY[i2])+"==> Now Y");
            
            jbBtn.style.top = String(bookMarkArrayY[i2]) + "px";
            jbBtn.style.left = String(bookMarkArrayX[i2]) + "px";
            
        }
        else{
           // console.log("Else value");
        }
    }
    catch{
        console.log("CATCH!!");
    }


    // 2. selection 자표로 캐럿 좌표 변환.
    jbBtn.style.top = String(absoluteTop) + "px";
    jbBtn.style.left = String(x) + "px";

}

function changeSelectionLocation(event){
    let sel = window.getSelection();
    let key = event.keyCode;
    // 방향키 입력
    try{
        if (key === 39) {
            range.setStart(sel.anchorNode, sel.anchorOffset + 1);
        } else if (key == 37)
            range.setStart(sel.anchorNode, sel.anchorOffset - 1);
        else if (key == 38) //위 추가구현 필요
            range.setStart(sel.anchorNode.previousSibling.previousSibling, sel.anchorOffset);
        else if (key == 40) //아래 추가구현 필요
            range.setStart(sel.anchorNode.nextSibling.nextSibling, sel.anchorOffset);
        else if (key == null) // 마우스 입력
            range.setStart(sel.anchorNode, sel.anchorOffset);
        else
          //  console.log("Nothing command");//
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    catch(error){
        console.log("The caret can no longer move.")
    }

}

function getSelectionCoords(win) {
    win = win || window;
    let doc = win.document;
    let sel = doc.selection, range, rects, rect;
    let x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                    x = rect.left;
                    y = rect.top;
                }

            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                let span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild(doc.createTextNode("\u200b"));
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    let spanParent = span.parentNode;
                    spanParent.removeChild(span);
                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return {x: x, y: y};
}

function bookMark(){
    var jbBook = document.createElement('img');
    var jbBookAt = document.createAttribute("src");
    var jbBookAt2 = document.createAttribute("style");

    let range = document.createRange();

    // 만든 속성 변수에 값 대입.
    jbBook.value = "https://github.com/Deplim/CWeb_browser_editor/blob/master/source/img/book.png?raw=true";//--
    jbBookAt2.value = "opacity:0.5; position: absolute; top: 0px; left: 0px; z-index: 999; width: 20px; height: 20px";

    //실제 img 태그에 만들어 둔 속성 삽입.
    jbBook.setAttributeNode(jbBookAt);//--
    jbBook.setAttributeNode(jbBookAt2); 

    //완성된 img 태그를 실제 tree 에 적용.
    document.body.appendChild(jbBook);//--

    
    jbBook.style.top = String(absoluteTop2) + "px";
    jbBook.style.left = String(x2) + "px";

    
    bookMarkArrayY.push(String(absoluteTop2));
    bookMarkArrayX.push(String(x2));
    console.log(bookMarkArrayX+"bookX");
    console.log(bookMarkArrayY+"bookY");
    
    
    //현재 배열의 번호 
    console.log(i+"-> The number of i ");
    i = i+1;
    return i;
    
}

function BookPageUpDown(key,i2){
    //수정 필요 사항 : 
    // jbBook.style.top = String(bookMarkArrayY[i2-1]) + "px";
    // jbBook.style.left = String(bookMarkArrayX[i2-1]) + "px";  이 두개가 정확히 뭔지와 
    // 좌표를 배열로 옮기면 커서만 옮기면 됨!
    //
    console.log(i2+" +VALUE i+");
    console.log((bookMarkArrayX[i2])+"==> Now X");
    console.log((bookMarkArrayY[i2])+"==> Now Y");
    if(key==78){//아스키 N입력 시
        //이전 북마크로 커서가 이동하도록!
        
        if(i2>0){//배열이 첫번째가 아니면
            //jbBook.style.top = String(bookMarkArrayY[i2-1]) + "px";
            //jbBook.style.left = String(bookMarkArrayX[i2-1]) + "px";
            jbBtn.style.top = String(bookMarkArrayY[i2-1]) + "px";
            jbBtn.style.left = String(bookMarkArrayX[i2-1]) + "px";
            console.log("-----------Up Movit!-----------");
            if(i2==0){
                console.log("It's First!");
             return i2;
             //return {x: bookMarkArrayX[i2], y: bookMarkArrayY[i2], i2: i2};
            }
           i2 = i2-1;
           
        }else{ //배열이 첫번째 깞이라면
            //jbBook.style.top = String(bookMarkArrayY[i2]) + "px";
            //jbBook.style.left = String(bookMarkArrayX[i2]) + "px";
            jbBtn.style.top = String(bookMarkArrayY[i2]) + "px";
            jbBtn.style.left = String(bookMarkArrayX[i2]) + "px";
            console.log("It's First!");
        }

        
    }
    else{//M입력시
        //이후 북마크로 커서가 이동하도록!
        if(bookMarkArrayY[i2+1]==null){
            console.log("It's Last!");
            return i2;
            //return {x: bookMarkArrayX[i2], y: bookMarkArrayY[i2], i2: i2};
        }
        else{
           // jbBook.style.top = String(bookMarkArrayY[i2+1]) + "px";
            //jbBook.style.left = String(bookMarkArrayX[i2+1]) + "px";
            jbBtn.style.top = String(bookMarkArrayY[i2+1]) + "px";
            jbBtn.style.left = String(bookMarkArrayX[i2+1]) + "px";
            console.log("-----------Down Movit!-----------");
            if(i2>i){
                console.log("-> i2 > i");
                return i2;
                //return {x: bookMarkArrayX[i2], y: bookMarkArrayY[i2], i2: i2};
            }else{
                i2 = i2+1;
            }
            
        }
    }
    return i2;
    //return {x: bookMarkArrayX[i2], y: bookMarkArrayY[i2], i2: i2};

}
