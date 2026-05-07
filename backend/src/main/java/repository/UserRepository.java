package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByAccnoAndPin(String accno, String pin);
    User findByAccno(String accno);

    

}