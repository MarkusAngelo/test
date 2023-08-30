import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  base_api = environment.baseUrl;
  baseApi: string;
  public selectedProjectId: number;

  public onProjectChange = new Subject<number>();

  constructor(private http: HttpClient) {
    this.baseApi = environment.base_url;
  }

  log_in(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseApi}/rest/auth/1/session/authenticate`, {
      email,
      password,
    });
  }
  login(data: any) {
    return this.http.post(this.base_api + 'Login', data);
  }

  getProjects() {
    return this.http.get(this.baseApi + '/project');
  }

  addUser(data: any) {
    return this.http.post(this.base_api + 'CreateUser', data);
  }

  createProject(data: any) {
    return this.http.post(this.baseApi + '/project/add', data);
  }

  deleteProject(id: any) {
    return this.http.delete(`${this.baseApi}/project/${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete(this.base_api + 'DeleteUserById?id=' + id);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.baseApi + '/user');
  }

  createTicket(data: any): Observable<any> {
    return this.http.post<any>(this.baseApi + '/tickets/add', data);
  }

  getTickets(): Observable<any> {
    return this.http.get<any>(
      `${this.baseApi}/project/${this.selectedProjectId}/tickets`
    );
  }

  updateTicket(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseApi}/${id}`, data);
  }
  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseApi}/${id}`);
  }
}
