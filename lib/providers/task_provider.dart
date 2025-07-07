import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/task.dart';

class TaskListNotifier extends StateNotifier<List<Task>> {
  TaskListNotifier () : super([]);

  void addTask(String description) {
    final newTask = Task(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      description: description
     );
     state = [...state, newTask];
  }

  void toggleTask(String id) {
    state = state.map((task) {
      return task.id == id ? task.toggle() : task;
    }).toList();
  }

  void removeTask(String id) {
    state = state.where((task) => task.id != id).toList();
  }

  final taskListProvider = StateNotifierProvider<TaskListNotifier, List<Task>>((ref) {
    return TaskListNotifier();
  });
}