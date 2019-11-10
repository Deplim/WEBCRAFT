var textarea_html_array=new Array()

var st_button = document.createElement('button');
st_button.innerHTML=("storage");
st_button.style="position: fixed; top: 5px; left: 400px;";
document.body.appendChild(st_button);
st_button.addEventListener('click', createURL);

var rc_button = document.createElement('button');
rc_button.innerHTML=("recieve");
rc_button.style="position: fixed; top: 30px; left: 400px;";
document.body.appendChild(rc_button);
rc_button.addEventListener('click', recieveURL);

var space=document.createElement('p')
space.id="Element";
document.body.appendChild(space);



function recieveURL(){
	chrome.storage.sync.get("data", function(items) {
		if (!chrome.runtime.error) {
	    	document.getElementById('Element').innerHTML=items.data;
		}
	});
}

function createURL() {
	for(var i=0 in textarea_array){
		var temp=textarea_array[i].getElementsByTagName("TEXTAREA")
		temp[0].innerHTML=temp[0].value
		textarea_html_array[i]=textarea_array[i].outerHTML;
	}
	console.log("storage : ")
    console.log(textarea_array)
    chrome.storage.sync.set({ "data" : textarea_html_array }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
}

