package hangout.app;

import com.google.gson.Gson;
import hangout.model.HangoutEvent;
import hangout.repo.DatabaseHangoutRepository;
import hangout.service.HangoutManager;
import java.io.*;
import java.net.*;
import java.util.*;

public class HangoutApp {
    public static void main(String[] args) throws Exception {
        DatabaseHangoutRepository repo = new DatabaseHangoutRepository();
        HangoutManager manager = new HangoutManager(repo);
        Gson gson = new Gson();
        ServerSocket server = new ServerSocket(8080);

        List<String> validCats = Arrays.asList("Social", "Sports", "Study", "Gaming", "Food", "Other");

        while (true) {
            Socket client = server.accept();
            new Thread(() -> {
                try {
                    BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                    PrintWriter out = new PrintWriter(client.getOutputStream(), true);
                    String line = in.readLine();
                    if (line == null) return;

                    if (line.equals("GET_ALL")) {
                        out.println(gson.toJson(repo.loadAll(new HashMap<>())));
                    } else if (line.startsWith("GET_ACTIVITY|")) {
                        String uid = line.split("\\|")[1];
                        Map<String, List<HangoutEvent>> res = new HashMap<>();
                        res.put("hosted", repo.loadAll(new HashMap<>()).stream().filter(e -> e.getLeader_id().equals(uid)).toList());
                        res.put("joined", repo.loadJoined(uid));
                        out.println(gson.toJson(res));
                    } else if (line.startsWith("LOGIN|")) {
                        String uid = line.split("\\|")[1];
                        repo.ensureStudentExists(uid, "Student_" + uid);
                        out.println("SUCCESS");
                    } else if (line.startsWith("DELETE|")) {
                        repo.delete(line.split("\\|")[1]);
                        out.println("SUCCESS");
                    } else if (line.startsWith("JOIN|")) {
                        String[] p = line.split("\\|");
                        HangoutEvent event = repo.loadAll(new HashMap<>()).stream().filter(e -> e.getId().equals(p[1])).findFirst().orElse(null);
                        if (event != null && repo.getParticipantCount(p[1]) < Integer.parseInt(event.getMax_participants())) {
                            out.println(repo.addParticipant(p[1], p[2]) ? "SUCCESS" : "ALREADY_JOINED");
                        } else {
                            out.println("FULL");
                        }
                    } else if (line.startsWith("CREATE|")) {
                        String[] d = line.split("\\|");
                        if (d.length >= 9 && validCats.contains(d[8])) {
                            manager.addStudent(d[3], "Student_" + d[3]);
                            HangoutEvent e = manager.createHangoutEvent(d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);
                            out.println("SUCCESS|" + e.getId());
                        } else {
                            out.println("INVALID_DATA");
                        }
                    } else {
                        out.println("UNKNOWN_COMMAND");
                    }
                    client.close();
                } catch (Exception ex) {}
            }).start();
        }
    }
}