package hangout.service;

import hangout.model.HangoutEvent;
import hangout.repo.DatabaseHangoutRepository;
import java.util.*;
import java.util.stream.Collectors;

public class HangoutManager {
    private DatabaseHangoutRepository repo;
    private List<HangoutEvent> events = new ArrayList<>();

    public HangoutManager(DatabaseHangoutRepository repo) {
        this.repo = repo;
    }

    public void loadExistingEvents(List<HangoutEvent> list) {
        this.events = new ArrayList<>(list);
    }

    public List<HangoutEvent> findEventsByLeader(String leaderId) {
        return events.stream()
                .filter(e -> e.getLeader_id().equals(leaderId))
                .collect(Collectors.toList());
    }

    public HangoutEvent createHangoutEvent(String id, String title, String leader_id, String date_time, String location, String max_participants, String description, String category) {
        HangoutEvent e = new HangoutEvent(id, title, leader_id, date_time, location, max_participants, description, category);
        repo.save(e);
        return e;
    }

    public boolean joinHangout(String hId, String uId) {
        return repo.addParticipant(hId, uId);
    }

    public void addStudent(String id, String name) {
        repo.ensureStudentExists(id, name);
    }
}