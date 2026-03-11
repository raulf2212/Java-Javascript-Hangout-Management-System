package hangout.model;

import hangout.interfaces.Identifiable;

public class HangoutEvent implements Identifiable {
    private String id;
    private String title;
    private String leader_id;
    private String date_time;
    private String location;
    private String max_participants;
    private String description;
    private String category;

    public HangoutEvent(String id, String title, String leader_id, String date_time, String location, String max_participants, String description, String category) {
        this.id = id;
        this.title = title;
        this.leader_id = leader_id;
        this.date_time = date_time;
        this.location = location;
        this.max_participants = max_participants;
        this.description = description;
        this.category = category;
    }

    @Override
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getLeader_id() { return leader_id; }
    public String getDate_time() { return date_time; }
    public String getLocation() { return location; }
    public String getMax_participants() { return max_participants; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
}