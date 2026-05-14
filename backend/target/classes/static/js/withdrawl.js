//acc number passed from dashboard
const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");

function withdrawl() {
    let amt = document.getElementById("numberInput").value;
    let int_amt = parseInt(amt);

    if(amt == "" || int_amt <= 0) {
        showToast("Please enter valid amount");
    } else {
        // now we had valid amt - now we need to withdraw money from user acc
        url = "http://localhost:8080/withdrawl";

        //as we are updating an attribute it is patch - pass input accno and withdrawal amt as body
        let userdata = {
            accno: useracc,
            amount: amt
        };

        fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
        })
        .then(response => response.text())
        .then(data => {
            showToast(data);
        })
        .catch(error => {
            showToast("error in withdrawing amount !!");
        });
    }//else
}//withdrawl
