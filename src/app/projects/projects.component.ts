import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../test-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projectList: any[] = [];
  createForm: FormGroup;
  keyy: string;

  constructor(private service: TestServiceService) {}

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.service.getProjects().subscribe((res: any) => {
      this.projectList = res;
    });
  }

  setProject(obj: any) {
    this.service.selectedProjectId = obj.id;
    this.service.onProjectChange.next(obj.id);
  }

  removeProject(id: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteProject(id).subscribe((res) => this.getProjects());
    }
  }
}
