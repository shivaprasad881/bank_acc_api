const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");

function transfer() {
    let tar_acc = document.getElementById("taracc").value;
    let tar_amt = document.getElementById("useramount").value;

    //the user want to transfer money from his account to another account 
    //note : user account would definetely exist as we are within the user itself
    // now check whether user had enough amount to transfer 
    // no : u dont have enought balance
    // yes : u can able to tranfer
    // but now we need to check whether the dest user exists
    //no : enter correct accno
    //yes : we can transfer money

    //now both users exist and the cur user had enough money to transfer - now start transaction
    
    // first debit money from the user
    //now credit money to the dest user

    //we would look at failure transactions afterwords

    let int_amt = parseInt(tar_amt);
    
    if(tar_acc == "" || tar_amt == "" || int_amt <= 0) {
        showToast("please enter valid details!!");
    } else if(useracc == tar_acc) {
        showToast("Cannot transfer to your own account!!");
    } else {
        // valid data

        // now get the user balance
        url = "http://localhost:8080/check_balance?accno=" + useracc;
    
        fetch(url, {
            method: 'get'
        })
        .then(response => response.text())
        .then(data => {
            //succesfully fetched user balance
            let bal = parseFloat(data);
            if(bal >= tar_amt) {
                //user had enough bal to transfer

                //now check whether dest user exists or not
                url = "http://localhost:8080/check_accno?accno=" + tar_acc;

                //get method - pass acc within url
                fetch(url, {
                    method: 'get'
                })
                .then(response => response.text())
                .then(data => {
                    if(data == "true") {
                        //tar acc is existing 
                        //now both acc existing and user had enough bal - we can do transaction

                        // 1.debit from cur user 
                        url = "http://localhost:8080/withdrawl";

                        //as we are updating an attribute it is patch - pass input accno and withdrawal amt as body
                        let userdata = {
                            accno: useracc,
                            amount: tar_amt
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
                            // withdrawal is successful 

                            //---- now deposit the amount in the tar acc----
                            url = "http://localhost:8080/deposit";

                            //as we are updating a attribute - this is patch - pass input in body
                            userdata = {// deposit into tar account
                                accno: tar_acc,
                                amount: tar_amt
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
                                // successfully credited the amt in tar acc

                                // we are done with the transaction - debited from user and credited into tar acc
                                showToast("Transaction successful !!");

                                // once the transaction is successful - we would create a transaction record
                                // it is a post http request - where we send the data in the body

                                // record - 1
                                let url = "http://localhost:8080/transaction_registration";

                                let transdata = {
                                    accno: useracc,
                                    tar_acc: tar_acc,
                                    amount: tar_amt,
                                    transaction_type: "debit"
                                };

                                fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(transdata)
                                })
                                .then(response => response.text())
                                .then(data => {
                                    showToast(data);

                                    // record - 2
                                    transdata = {
                                        accno: tar_acc,
                                        tar_acc: useracc,
                                        amount: tar_amt,
                                        transaction_type: "credit"
                                    };

                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(transdata)
                                    })
                                    .then(response => response.text())
                                    .then(data => {
                                        showToast(data);
                                        //we are done two records
                                    })
                                    .catch(error => {
                                        showToast("error in creating 2nd transaction record !!");
                                    });
                                })//record 1
                                .catch(error => {
                                    showToast("error in creating the 1st transaction record !!");
                                });
                            })// then -> data
                            .catch(error => {
                                showToast("error in crediting amount to target account !!");

                                //hoo the money has debited from user account but not credited to the target account
                                //now we need to maintain atomicity - so the money which i had - iam unable to send to tar account - so instead of keeping with me it would transfer the money to the user account itself - then it may be a failed transaction but which obeys atomicity - at last each would have their initial money with them

                                //credit tar_amt to useracc
                                //this is patch http request as we are modifying the data
                                url = "http://localhost:8080/deposit";

                                let rollbackData = {
                                    accno: useracc,
                                    amount: tar_amt
                                };

                                fetch(url, {
                                    method: 'PATCH',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(rollbackData)
                                })
                                .then(() => {
                                    showToast("Transaction failed! Amount rolled back to your account.");
                                })
                                .catch(() => {
                                    showToast("Critical error! Please contact support.");
                                });
                            });
                        })
                        .catch(error => {
                            showToast("error in withdrawing amount from user !!");
                        });
                    } else {
                        showToast("Destination account not existing !!");
                    }
                })
                .catch(error => {
                    showToast("error in checking the presence of destination user !!");
                });
            } else {
                showToast("Insufficient balance !!");
            }
        })
        .catch(error => {
            showToast("error in fetching the user balance !!");
        });
    }
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#333';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '14px';
    toast.style.fontFamily = 'system-ui, sans-serif';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    // Add to body
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}