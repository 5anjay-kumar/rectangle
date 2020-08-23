import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit {
  rectanglePointsForm: FormGroup;
  rectangles: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.pointsForm();
  }

  pointsForm() {
    this.rectanglePointsForm = new FormGroup({
      pointX: new FormControl(null, Validators.required),
      pointY: new FormControl(null, Validators.required),
      width: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
    });
  }

  isRectangle() {
    if (
      this.rectanglePointsForm.get('pointX').value < 0 ||
      this.rectanglePointsForm.get('pointY').value < 0 ||
      this.rectanglePointsForm.get('width').value < 0 ||
      this.rectanglePointsForm.get('height').value < 0
    ) {
      console.log('Points should be positive');
      return false;
    } else {
      return true;
    }
  }

  addRectangle() {
    if (this.isRectangle()) {
      const formData = this.rectanglePointsForm.value;
      this.rectangles.push(formData);
      this.rectanglePointsForm.reset();
    } else {
      alert('Not a rectangle');
    }
  }

  valueInRange(value: number, min: number, max: number) {
    return value >= min && value <= max;
  }

  isOverlapped() {
    const rectangle1 = this.rectangles[0];
    const rectangle2 = this.rectangles[1];

    const xOverlap =
      this.valueInRange(rectangle1.pointX, rectangle2.pointX, rectangle2.pointX + rectangle2.width) ||
      this.valueInRange(rectangle2.pointX, rectangle1.pointX, rectangle1.pointX + rectangle1.width);

    const yOverlap =
      this.valueInRange(rectangle1.pointY, rectangle2.pointY, rectangle2.pointY + rectangle2.height) ||
      this.valueInRange(rectangle2.pointY, rectangle1.pointY, rectangle1.pointY + rectangle1.height);

    alert('is Overlapped: ' + (xOverlap && yOverlap));
    return xOverlap && yOverlap;
  }

  clear() {
    this.rectangles = [];
    this.rectanglePointsForm.reset();
  }
}
