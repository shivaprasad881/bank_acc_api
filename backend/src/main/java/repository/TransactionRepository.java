package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import model.Transaction;
import java.util.List;

@Repository 
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByAccno(String accno);
}