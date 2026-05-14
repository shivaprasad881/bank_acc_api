//these parameters we would get from the redirection url ,because in the redirection url along with the dest html file we also included these parameters as key value pairs ,so by using the key we can access the values , this is called parameter chaining 
const params = new URLSearchParams(window.location.search);
const accno = params.get("accno");

function update_pin() {
    let pin1 = document.getElementById("pin1").value; //old pin
    let pin2 = document.getElementById("pin2").value; //new pin

    if(accno == "" || pin1 == "" || pin2 == "") {
        showToast("please enter all fields !!");
    } else if (pin1.length != 4 || pin2.length != 4) {
        showToast("please enter the pin of valid length !!");
    } else {
        //first we would validate the user old pin - then we would update it - get true/false
        let url = "http://localhost:8080/validatepin?accno=" + accno + "&user_pin=" + pin1;
        
        fetch(url, {
            method: 'get'
        })
        .then(response => response.text())
        .then(data => {
            if(data == "true") {
                //user pin matched with the original pin 
                //now update the pin
                url = "http://localhost:8080/updatepin";
                // body - accno and newpin , patch
                let userdata = {
                    accno: accno,
                    newpin: pin2
                };
                
                fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userdata)
                })
                .then(response => response.text())
                .then(data => {
                    showToast(data);
                })
                .catch(error => {
                    showToast("error in updating the pin !!");
                });
            } else {
                //mismatch
                showToast("please enter your correct 'old pin' ");
            }
        })
        .catch(error => {
            showToast("error in validating the pin !!");
        });
    }//else
}

function showToast(msg) {
    let toast = document.createElement("div");
    toast.innerHTML = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#333";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "5px";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}