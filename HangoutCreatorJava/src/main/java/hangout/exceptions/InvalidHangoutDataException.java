package hangout.exceptions;

public class InvalidHangoutDataException extends Exception {
    public InvalidHangoutDataException(String message) {
        super(message);
    }

    public InvalidHangoutDataException(String message, Throwable cause) {
        super(message, cause);
    }
}
