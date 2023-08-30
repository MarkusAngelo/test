import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../test-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  tickets: any[];
  projectTickets: any[];
  userList: any[] = [];
  projectList: any[] = [];
  status = ['Pending', 'In Progress', 'On Hold', 'Resolved'];
  issueType: string[] = ['Bug', 'Support'];
  updateForm: FormGroup;
  chosen_Id: number;
  selectedUser: string;
  chosenProject: number;
  selectedProject: string;

  constructor(private service: TestServiceService, private fb: FormBuilder) {
    this.service.onProjectChange.subscribe((res: any) => {
      this.status = [];
      this.fetchTickets();
    });
    this.updateForm = this.fb.group({
      summary: ['', Validators.required],
      status: [''],
      issueType: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: [0],
      projectId: [0],
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProjects();
    this.fetchTickets();
  }

  getUsers() {
    this.service.getUsers().subscribe((res: any) => {
      this.userList = res;
    });
  }

  getProjects() {
    this.service.getProjects().subscribe((res: any) => {
      this.projectList = res;
    });
  }

  filterTicket(status: string) {
    return this.tickets.filter((res: any) => res.status == status);
  }

  editTicket(info: any) {
    this.chosen_Id = info.id;

    this.selectedUser = info.createdBy;
    this.selectedProject = info.projectId;

    this.updateForm.patchValue({
      // Retrieves and Sets the value like ngModel
      summary: info.summary,
      status: info.status,
      issueType: info.issueType,
      description: info.description,
    });
  }

  updateTicket() {
    let data = this.updateForm.value;
    this.service.updateTicket(data, this.chosen_Id).subscribe();
  }

  deleteTicket(id: number) {
    if (confirm('Are you sure?')) {
      this.service.deleteTicket(id).subscribe();
    }
  }

  fetchTickets() {
    this.service.getTickets().subscribe((res: any) => {
      this.tickets = res;
      this.projectTickets = res;
    });
  }
}
