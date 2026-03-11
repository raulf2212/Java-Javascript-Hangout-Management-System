package hangout.exceptions;

public class StudentNotFoundException extends Exception {
    public StudentNotFoundException(String studentId) {
        super("No student found with id: " + studentId);
    }
}
