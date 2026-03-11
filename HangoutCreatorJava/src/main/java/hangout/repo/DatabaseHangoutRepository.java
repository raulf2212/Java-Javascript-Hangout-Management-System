package hangout.repo;

import hangout.model.HangoutEvent;
import java.sql.*;
import java.util.*;

public class DatabaseHangoutRepository {
    private String url = "jdbc:mysql://localhost:3306/hangout_db";
    private String user = "root";
    private String password = "";

    public List<HangoutEvent> loadAll(Map<String, String> params) {
        List<HangoutEvent> list = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            ResultSet rs = conn.createStatement().executeQuery("SELECT * FROM hangouts");
            while (rs.next()) {
                list.add(new HangoutEvent(rs.getString("id"), rs.getString("title"), rs.getString("leader_id"), rs.getString("date_time"), rs.getString("location"), rs.getString("max_participants"), rs.getString("description"), rs.getString("category")));
            }
        } catch (Exception ex) {}
        return list;
    }

    public List<HangoutEvent> loadJoined(String uid) {
        List<HangoutEvent> list = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            PreparedStatement st = conn.prepareStatement("SELECT h.* FROM hangouts h JOIN participants p ON h.id = p.hangout_id WHERE p.student_id = ?");
            st.setString(1, uid);
            ResultSet rs = st.executeQuery();
            while (rs.next()) {
                list.add(new HangoutEvent(rs.getString("id"), rs.getString("title"), rs.getString("leader_id"), rs.getString("date_time"), rs.getString("location"), rs.getString("max_participants"), rs.getString("description"), rs.getString("category")));
            }
        } catch (Exception ex) {}
        return list;
    }

    public int getParticipantCount(String hangoutId) {
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            PreparedStatement st = conn.prepareStatement("SELECT COUNT(*) FROM participants WHERE hangout_id = ?");
            st.setString(1, hangoutId);
            ResultSet rs = st.executeQuery();
            if (rs.next()) return rs.getInt(1);
        } catch (Exception ex) {}
        return 0;
    }

    public void save(HangoutEvent e) {
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            PreparedStatement st = conn.prepareStatement("INSERT INTO hangouts VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), date_time=VALUES(date_time), location=VALUES(location), description=VALUES(description), category=VALUES(category), max_participants=VALUES(max_participants)");
            st.setString(1, e.getId());
            st.setString(2, e.getTitle());
            st.setString(3, e.getLeader_id());
            st.setString(4, e.getDate_time());
            st.setString(5, e.getLocation());
            st.setString(6, e.getMax_participants());
            st.setString(7, e.getDescription());
            st.setString(8, e.getCategory());
            st.executeUpdate();
        } catch (Exception ex) {}
    }

    public boolean addParticipant(String hId, String uId) {
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            PreparedStatement st = conn.prepareStatement("INSERT IGNORE INTO participants VALUES (?, ?)");
            st.setString(1, hId);
            st.setString(2, uId);
            return st.executeUpdate() > 0;
        } catch (Exception ex) { return false; }
    }

    public void ensureStudentExists(String id, String name) {
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            PreparedStatement st = conn.prepareStatement("INSERT IGNORE INTO students VALUES (?, ?)");
            st.setString(1, id);
            st.setString(2, name);
            st.executeUpdate();
        } catch (Exception ex) {}
    }

    public void delete(String id) {
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            PreparedStatement st = conn.prepareStatement("DELETE FROM hangouts WHERE id = ?");
            st.setString(1, id);
            st.executeUpdate();
        } catch (Exception ex) {}
    }
}