package hangout.model;

import hangout.interfaces.Identifiable;

public class Student implements Identifiable {

    private final String id;
    private final String name;

    public Student(String id, String name) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Student id cannot be blank");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Student name cannot be blank");
        }
        this.id = id;
        this.name = name;
    }

    @Override
    public String getId() { return id; }

    public String getName() { return name; }
}
