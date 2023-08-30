import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../test-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  projectList: any[] = [];
  userList: any[] = [];
  tickets: any[] = [];
  ticketForm: FormGroup;
  createForm: FormGroup;
  issueType: string[] = ['Bug', 'Support'];
  date = new Date();

  constructor(
    private service: TestServiceService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    const formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.ticketForm = this.fb.group({
      ticketId: [0],
      createdDate: formattedDate,
      summary: ['', Validators.required],
      status: ['Pending'],
      issueType: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: [0],
      projectId: [0],
    });
    this.createForm = this.fb.group({
      projectId: [0],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      goal: [''],
      key: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit() {
    this.getUsers();
    this.getProjects();
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

  fetchTickets() {
    this.service.getTickets().subscribe((res: any) => {
      this.tickets = res;
    });
  }

  setProject(obj: any) {
    this.service.selectedProjectId = obj.id;
    this.service.onProjectChange.next(obj.id);
  }

  keyGenerator(event: any) {
    const input = event.target.value;
    let inp: string;
    if (input.includes(' ')) {
      const words = input.split(/\s+/); // Split input into words using whitespace as separator
      const initials = words.map((word: any) => word.charAt(0)).join(''); // Get first letter of each word and join them
      inp = initials.substring(0, 10).toUpperCase(); // Limit and convert to uppercase
    } else {
      inp = input.substring(0, 10).toUpperCase();
    }

    this.createForm.get('key')?.setValue(inp);
  }
  onStartDateChange(event: any, controlName: string) {
    const selectedDate = new Date(event.target.value); // Assuming the input value is a valid date

    // Format the selected date using DatePipe
    const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');

    // Set the formatted date as the value of the corresponding form control
    this.createForm.get(controlName)?.setValue(formattedDate);
  }

  onProjectSubmit() {
    let dat = this.createForm.value;
    this.service.createProject(dat).subscribe((res: any) => {
      if (res.result) {
        alert(res.message);
      } else {
        alert(res.message);
      }
      this.getProjects();
    });
  }

  onSubmit() {
    let data = this.ticketForm.value;

    if (this.ticketForm.valid) {
      alert('wow');
      this.service.createTicket(data).subscribe((res: any) => {});
    } else {
      alert('no');
      alert(this.ticketForm.value);
    }
  }
}
