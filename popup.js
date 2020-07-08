let changeColor = document.getElementById('changeColor');

let hideText = "Hide solved count";
let showText = "Show solved count";

chrome.storage.sync.get('hideCount', function(data) {
    console.log(data.hideCount);
    if (data.hideCount){
        // hide the count
        changeColor.innerText = showText;
    } else {
        changeColor.innerText = hideText;
    }
});

changeColor.onclick = function(element) {
    let status = changeColor.innerText;
    let hideValue = false;
    if (status == showText){
        hideValue = true;
    }
    hideValue = !hideValue;
    changeColor.innerText = hideValue ? showText : hideText;
    chrome.storage.sync.set({hideCount: hideValue}, function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'window.location.reload();'} // TODO: this is hacky -- change it
            );
        });
    });
};