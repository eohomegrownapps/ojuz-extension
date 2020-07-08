chrome.storage.sync.get("hideCount", function(data) {
    if (data.hideCount){
        hideText();
    }
});


hidden_message = "Hidden";

function hideText(){
    // hide on https://oj.uz/problem/view/ and https://oj.uz/problems
    if (location.href.includes("oj.uz/problem/view")){
        let texts_to_hide = [
            "# of submissions",
            "# of accepted",
            "Ratio"
        ];

        let statementDiv = document.getElementById("statement");
        let thead_tr = statementDiv.parentNode.getElementsByTagName("thead")[0].firstElementChild;
        let tbody_tr = statementDiv.parentNode.getElementsByTagName("tbody")[0].firstElementChild;
        let headings = thead_tr.childNodes;
        let values = tbody_tr.childNodes;

        for (let i = 0; i < headings.length; i++){
            if (texts_to_hide.includes(headings[i].innerText)){
                values[i].innerText = hidden_message;
            }
        }

    } else if (location.href.includes("oj.uz/problems")){
        let head = document.getElementsByTagName("thead")[0];
        let solved_index = -1;

        for (let i = 0; i < head.rows[0].cells.length; i++){
            if (head.rows[0].cells[i].innerText == "Solved"){
                solved_index = i;
                break;
            }
        }

        if (solved_index != -1){
            let body = document.getElementsByTagName("tbody")[0];
            for (let i = 0; i < body.rows.length; i++){
                body.rows[i].cells[solved_index].innerText = hidden_message;
            }
        }
    }   
}