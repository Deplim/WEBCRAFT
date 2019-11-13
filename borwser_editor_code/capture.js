//코드 참조 : https://sub0709.blogspot.com/2019/04/javascript_17.html

var cp_button = document.createElement('button');
cp_button.innerHTML=("capture");
cp_button.style="position: fixed; top: 30px; left: 200px;";
cp_button.id="capture"
document.body.appendChild(cp_button);

$("#capture").on('click', function(e) {  //캡쳐 기능 활성화
  console.log("capture start");
  var height = window.innerHeight;

  var width = $(document).width();

  var $mask = $('<div id="screenshot_mask"></div>').css("border-width", "0 0 " + height + "px 0");

  var $focus = $('<div id="screenshot_focus"></div>');

  $("body").append($mask);  //dimmed 추가

  $("body").append($focus);  //마우스 커서에 따라 캡쳐 영역을 만들 div



  var selectArea = false;

  $("body").one("mousedown", function(e) {  //캡쳐 영역 선택 시작

    e.preventDefault();

    selectArea = true;

    startX = e.clientX;

    startY = e.clientY;

  }).one('mouseup', function(e) {  //캡쳐 시작

    selectArea = false;



    $("body").off('mousemove', mousemove);  //이벤트 삭제

    $("#screenshot_focus").remove();  //마우스 포커스 삭제

    $("#screenshot_mask").remove();  //딤 삭제



    var x = e.clientX;

    var y = e.clientY;

    var top = Math.min(y, startY);

    var left = Math.min(x, startX);

    var width = Math.max(x, startX) - left;

    var height = Math.max(y, startY) - top;


    html2canvas(document.body).then(function(canvas) {  //전체 화면 캡쳐

      var img = canvas.getContext('2d').getImageData(left, top, width, height);  //선택 영역만큼 crop

      var c = document.createElement("canvas");

      c.width = width;

      c.height = height;

      c.getContext('2d').putImageData(img, 0, 0);

      save(c);  //crop한 이미지 저장

    });

  }).on("mousemove", mousemove);  //캡쳐 영역 크기 변경



  function mousemove(e) {

    var x = e.clientX;

    var y = e.clientY;

    $focus.css("left", x);  //마우스 커서 따라 좌표 포커스 이동

    $focus.css("top", y);



    if(selectArea) {  //캡쳐 영역 선택 그림

      var top = Math.min(y, startY);

      var right = width - Math.max(x, startX);

      var bottom = height - Math.max(y, startY);

      var left = Math.min(x, startX);

      $mask.css("border-width", [top + 'px', right + 'px', bottom + 'px', left + 'px'].join(' '));

    }

  }



  function save(canvas) {  //파일로 저장

    if (navigator.msSaveBlob) {

      var blob = canvas.msToBlob(); 

      return navigator.msSaveBlob(blob, '파일명.jpg'); 

    } else { 

      var el = document.getElementById("target");

      el.src = canvas.toDataURL("image/jpeg");

    }

  }

});


