import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TaskDetailComponent } from "../../containers/task-detail/task-detail.component";
import { gsap } from "gsap";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    TaskDetailComponent
],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit{

  @ViewChild('taskId') taskId!: ElementRef;
  @Input() task!: Task;
  @Output() deleted = new EventEmitter<string>();
  visible: boolean = false;
  taskClass: string = '';

  constructor() { }

  ngOnInit(): void {
    this.taskClass = 'rounded-xl border border-zinc-300 shadow-xl p-3 task'+this.task.id;
  }

  onDelete(): void {
    console.log('Delete a task', this.task.id);
    this.deleted.emit(this.task.id);
  }

    showDialog() {
      this.visible = true;
      this.transitionChange();
    }

    transitionChange(){
      const screenMiddleX = window.innerWidth / 2;
      const screenMiddleY = window.innerHeight / 2;
      if (this.taskId) {
        const rect = this.taskId.nativeElement.getBoundingClientRect();
        console.log("Position",rect.top, rect.right, rect.bottom, rect.left);
        gsap.to(".task"+this.task.id, 
          { transform: "scale(2)", 
            x: screenMiddleX - rect.left,
            y: screenMiddleY - rect.top,
            duration: 0.7, 
            ease: "back", 
            position: "center",
            cursor: "zoom-out" 
          }).reverse(0);
      }
    }
    
}
