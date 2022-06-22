import { not } from "@angular/compiler/src/output/output_ast";

export class TrackBy {
    // tasks
    taskTrackById(idx: number, task: any) {
        return task.taskId;
    }

    taskTrackByTitle(idx: number, task: any) {
        return task.taskTitle;
    }

    // notes
    noteTrackById(idx: number, note: any) {
        return note.noteId;
    }

    noteTrackByTitle(idx: number, note: any) {
        return note.noteTitle;
    }
}