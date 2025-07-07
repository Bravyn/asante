class Task {
  final String id;
  final String description;
  final bool isCompleted;

  Task({
    required this.id,
    required this.description,
    required this.isCompleted
  });

  Task toggle() {
    return Task(
     id: id,
     description: description, 
     isCompleted: isCompleted
     );
  }
}