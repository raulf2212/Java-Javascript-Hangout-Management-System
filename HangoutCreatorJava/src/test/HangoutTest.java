package test;

import hangout.model.HangoutEvent;
import hangout.model.Student;
import hangout.repo.DatabaseHangoutRepository;
import hangout.service.HangoutManager;
import java.util.*;

public class HangoutTest {
    public static void main(String[] args) {
        testHangoutEventConstructor();
        testStudentConstructor();
        testManagerConstructor();
        testFunctionality();
    }

    public static void testHangoutEventConstructor() {
        System.out.println("--- Testing HangoutEvent Constructor ---");
        HangoutEvent event = new HangoutEvent("1", "Test", "314", "2026-01-20", "Home", "10", "Desc", "Social");
        if (event.getId().equals("1") && event.getLeader_id().equals("314")) {
            System.out.println("PASSED");
        } else {
            System.out.println("FAILED");
        }
    }

    public static void testStudentConstructor() {
        System.out.println("\n--- Testing Student Constructor ---");
        try {
            Student s = new Student("S1", "John");
            if (s.getName().equals("John")) System.out.println("Valid Student: PASSED");
        } catch (Exception e) { System.out.println("Valid Student: FAILED"); }

        try {
            new Student(null, "John");
            System.out.println("Invalid Student (Null ID): FAILED (Should have thrown exception)");
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid Student (Null ID): PASSED");
        }
    }

    public static void testManagerConstructor() {
        System.out.println("\n--- Testing HangoutManager Constructor ---");
        DatabaseHangoutRepository repo = new DatabaseHangoutRepository();
        HangoutManager manager = new HangoutManager(repo);
        if (manager != null) System.out.println("PASSED");
        else System.out.println("FAILED");
    }

    public static void testFunctionality() {
        System.out.println("\n--- Testing Functionality ---");
        DatabaseHangoutRepository repo = new DatabaseHangoutRepository();
        HangoutManager manager = new HangoutManager(repo);
        
        HangoutEvent e = manager.createHangoutEvent("101", "Unit Test", "999", "2026-01-20", "Lab", "5", "Test", "Social");

        if (e != null && e.getTitle().equals("Unit Test")) {
            System.out.println("Test 1 (Create Event): PASSED");
        } else {
            System.out.println("Test 1 (Create Event): FAILED");
        }

        try {
            manager.joinHangout(e.getId(), "user_test_001");
            System.out.println("Test 2 (Join Method Execution): PASSED");
        } catch (Exception ex) {
            System.out.println("Test 2 (Join Method Execution): FAILED");
        }

        manager.loadExistingEvents(Arrays.asList(e));
        List<HangoutEvent> filtered = manager.findEventsByLeader("999");
        if (filtered.size() > 0 && filtered.get(0).getLeader_id().equals("999")) {
            System.out.println("Test 3 (Filter by Leader): PASSED");
        } else {
            System.out.println("Test 3 (Filter by Leader): FAILED");
        }
    }
}