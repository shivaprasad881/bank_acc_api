const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");
const userpin = params.get("pin");

function history(){
    window.location.href = "history.html?accno=" + useracc;
}

function update_Pin(){
    window.location.href = "updatepin.html?accno=" + useracc + "&pin=" + userpin;
}

function profile() {
    window.location.href = "profile.html?accno=" + useracc + "&pin=" + userpin;
}

function check_balance() {
    url = "http://localhost:8080/check_balance?accno=" + useracc;
    
    //it is get method
    fetch(url, {
        method: 'get'
    })
    .then(response => response.text())
    .then(data => {
        showToast(data);
    })
    .catch(error => {
        showToast("error in fetching the balance !!");
    });
}//checkbalance

function deposit_money() {
    window.location.href = "deposit.html?accno=" + useracc;
}

function withdrawl_money() {
    window.location.href = "withdrawl.html?accno=" + useracc;
}

function transfer() {
    window.location.href = "transfer.html?accno=" + useracc;
}