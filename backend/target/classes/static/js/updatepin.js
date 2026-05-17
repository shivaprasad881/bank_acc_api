//these parameters we would get from the redirection url ,because in the redirection url along with the dest html file we also included these parameters as key value pairs ,so by using the key we can access the values , this is called parameter chaining 
const params = new URLSearchParams(window.location.search);
const accno = params.get("accno");

function update_the_pin() {
    let newpin = document.getElementById("newpin").value; //old pin
    

    if(newpin == "") {
        showToast("please enter all fields !!");
    } else if (newpin.length != 4) {
        showToast("please enter the pin of valid length !!");
    } else {
            url = "http://localhost:8080/updatepin";
                
                let userdata = {
                    accno: accno,
                    newpin: newpin
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
                    showToast(data,2000);


                    setTimeout(() => {
                        window.location.href = "dashboard.html?accno=" + accno;
                    }, 2000);
                })
                .catch(error => {
                    showToast("error in updating the pin !!");
                });
    }//else
}
