package controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import model.User;
import repository.UserRepository;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody Map<String, Object> jsonBody) {

        String uname = (String) jsonBody.get("uname");
        Integer age = Integer.parseInt((String) jsonBody.get("age"));
        String city = (String) jsonBody.get("city");
        String phonenumber = (String) jsonBody.get("phonenumber");

        User newUser = new User(uname, age, city, phonenumber);
        User savedUser = userRepository.save(newUser);

        String accno = "ACC" + String.format("%08d", savedUser.getUserid());
        String pin = String.format("%04d", savedUser.getUserid() % 10000);
        
        savedUser.setAccno(accno);
        savedUser.setPin(pin);
        userRepository.save(savedUser);

        return "Account Number: " + accno + " | PIN: " + pin;
    } 

    @GetMapping("/check")
    public String check(@RequestParam String accno, @RequestParam String pin) {
        User user = userRepository.findByAccnoAndPin(accno, pin);

        if(user == null){
            return "false";
        }
        else{
            return "true";
        }
    }

    @GetMapping("/check_accno")
    public String checkAccno(@RequestParam String accno) {
        User user = userRepository.findByAccno(accno);

        if(user==null){
            //the user is not present
            return "false";
        }
        else{
            return "true";
        }
        
    }

    @GetMapping("/check_balance")
    public String checkBalance(@RequestParam String accno) {
        User user = userRepository.findByAccno(accno); //we are finding the user record based on the user accno - once we got the user record we can fetechand update any of the fields of that user

        return ""+user.getBalance();
    }


    @PatchMapping("/updatepin") 
        public String updatePin(@RequestBody Map<String, Object> jsonBody) {
            String accno = (String) jsonBody.get("accno");
            String newpin = (String) jsonBody.get("newpin");
            // fill your code here
            User user = userRepository.findByAccno(accno);

            //now we got the record - just update the pin by using setter
            user.setPin(newpin);
            userRepository.save(user);

            return "pin updated successfully!!";
            
        }


    @PatchMapping("/deposit")
        public String deposit(@RequestBody Map<String, Object> jsonBody) {
            String accno = (String) jsonBody.get("accno");
            Double amt = Double.parseDouble((String) jsonBody.get("amount"));

            
            User user = userRepository.findByAccno(accno);

            
            user.setBalance( user.getBalance() + amt );

            userRepository.save(user);

            return "Amount deposited succesfully!!";
            
        }



    @PatchMapping("/withdrawl")
        public String withdrawl(@RequestBody Map<String, Object> jsonBody) {
            String accno = (String) jsonBody.get("accno");
            Double amt = Double.parseDouble((String) jsonBody.get("amount"));

            
            User user = userRepository.findByAccno(accno);
            
            if(user.getBalance()<amt){
                return "Insuffient balance!!";
            }
            else{
                user.setBalance( user.getBalance() - amt );

                userRepository.save(user);

                return "Amount Withdrawl succesfully!!";
            }
            
            
        }

}