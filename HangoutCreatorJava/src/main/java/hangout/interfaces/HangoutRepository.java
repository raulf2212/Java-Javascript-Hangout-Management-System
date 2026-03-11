package hangout.interfaces;

import hangout.model.HangoutEvent;
import java.io.IOException;
import java.util.List;

public interface HangoutRepository {
    void saveHangouts(List<HangoutEvent> events) throws IOException;
    void deleteHangout(String id) throws IOException;
}