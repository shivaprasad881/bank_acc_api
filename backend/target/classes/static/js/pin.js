const params_pin = new URLSearchParams(window.location.search);
const user_acc = params_pin.get("accno");
const action = params_pin.get("action");


function check_pin(){
    // check whether user pin is valid or not - get request - pass userpin in url
    const userpin = document.getElementById("userpin").value

    if(userpin=="" || userpin.length!=4){
        showToast("Please enter the valid pin !!")
    }
    else{
        //valid pin format 


            let url = "http://localhost:8080/validate_pin?accno=" + user_acc + "&userpin=" + userpin;

            console.log("pin page ->    useracc: " + useracc + " userpin: " + userpin);
            
            fetch(url, {
                method: 'get'
            })
            .then(response => response.text())

            .then(data => {
                if(data=="true"){
                    //valid pin - now fetch the user bal and display - now what task should i do - should i check the bla or deposit orupdate pinor else something - the one who called me to check the pin need to specify the task to do when the p;in is valid 
                    if(action=="checkbalance"){
                        //the task is to chekc blanace - call that funtion with the useracc
                        check_balance(false);// false parameter restricts the reexecution of redirection to pin page
                    }
                    else if(action=="updatepin"){
                        update_pin_dash(false);
                    }
                    else if(action=="deposit"){

                        const amt = params_pin.get("amount");

                        deposit(false,amt);
                    }
                    else if(action=="withdrawl"){

                        const amt = params_pin.get("amount");

                        withdrawl(false,amt);
                    }
                    else{
                        showToast("The action is not matched with any option !!")
                    } 
                    
                }
                else{
                    showToast("Invalid pin !!")
                }
            })

        .catch(error => {
            showToast("Error in validating the pin !!");
        });

    }//else  
}



