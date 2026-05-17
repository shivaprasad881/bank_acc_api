const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");

function history(){
    window.location.href = "history.html?accno=" + useracc;
}

function update_pin_dash(redirect_page){
    // first use pin page to check the pin
    console.log("redirect page : "+redirect_page);
    if(redirect_page){
        let action = "updatepin"
        window.location.href = "pin.html?accno=" + useracc + "&action=" + action;
    }
    else{
        window.location.href = "updatepin.html?accno=" + useracc;
    }

    // if it is correct then use upate pin page to enter new pin



    
}

function profile() {
    window.location.href = "profile.html?accno=" + useracc;
}

function check_balance(redirect_page){

    //hoo i came here to check the blanace only - i dont know what is redirection and stuff -i just need blance

    if(redirect_page){
        let action = "checkbalance"
        //hoo the functions is being called from the frontend - so we would to redirect to pin page for pin validation
        window.location.href = "pin.html?accno=" + useracc + "&action=" + action;
    }

    // when the function call is made from the pin page , we would pass the redirectpage as false - so the page would not get repeated redirection

    // if we came here means in the pin page the pin is declared as valid - only then this function is called with redirectpage as false then only this line would executed

    
    
    url = "http://localhost:8080/check_balance?accno=" + useracc;

    fetch(url, {
        method: 'get'
    })
    .then(response => response.text())
    .then(data => {
        showToast(data,2000);

        //after showing balance on the pin page - we need to redirect ot the dashboard - as the user sees the balance only once
        setTimeout(() => {
           window.location.href = "dashboard.html?accno=" + useracc;
        }, 2000);


    })
    .catch(error => {
        showToast("Error in fetching the balance !!");
    });
}

function deposit_dash() {
    window.location.href = "deposit.html?accno=" + useracc;
}

function withdrawl_money() {
    window.location.href = "withdrawl.html?accno=" + useracc;
}

function transfer() {
    window.location.href = "transfer.html?accno=" + useracc;
}