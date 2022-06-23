import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService, CanvasWhiteboardShapeService, CanvasWhiteboardUpdate, CircleShape, LineShape, RectangleShape, SmileyShape, StarShape } from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-editor',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild(CanvasWhiteboardComponent) canvasWhiteboardComponent!: CanvasWhiteboardComponent;
  canvasOptions: CanvasWhiteboardOptions = {};

  constructor(private canvasWhiteboardService: CanvasWhiteboardService,
    private canvasWhiteboardShapeService: CanvasWhiteboardShapeService) {
    this.canvasWhiteboardShapeService.unregisterShapes([CircleShape, SmileyShape, StarShape, LineShape, RectangleShape]);
  }

  ngOnInit(): void {
  }

  saveToStorage(): void {
    // Get the current full update history
    const updates: Array<CanvasWhiteboardUpdate> = this.canvasWhiteboardComponent.getDrawingHistory();
    // Stringify the updates, which will return an Array<string>
    const stringifiedUpdatesArray: Array<string> = updates.map(update => update.stringify());
    // Stringify the Array<string> to get a "string", so we are now ready to put this item in the storage
    const stringifiedStorageUpdates: string = JSON.stringify(stringifiedUpdatesArray);
    // Save the item in storage of choice
    sessionStorage.setItem('canvasWhiteboardDrawings', stringifiedStorageUpdates);
  }

  loadFromStorage(): void {
    // Get the "string" from the storage
    const canvasDrawingsJson = sessionStorage.getItem('canvasWhiteboardDrawings');
    // Null check
    if (canvasDrawingsJson != null) {
      // Parse the string, and get an Array<string>
      const parsedStorageUpdates: Array<string> = JSON.parse(canvasDrawingsJson);
      // Parse each string inside the Array<string>, and get an Array<CanvasWhiteboardUpdate>
      const updates: Array<CanvasWhiteboardUpdate> = parsedStorageUpdates.map(updateJSON =>
        CanvasWhiteboardUpdate.deserializeJson(updateJSON));
      // Draw the updates onto the canvas
      this.canvasWhiteboardService.drawCanvas(updates);
    }
  }

  public changeOptions(): void {
    this.canvasOptions = {
      ...this.canvasOptions,
      fillColorPickerEnabled: false,
      colorPickerEnabled: false
    };
  }

}
