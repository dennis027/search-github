import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const api = 'https://api.github.com'
@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  private token = environment.githubToken
  
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Authorization': `token ${this.token}`
  });



  getUserData(userName: string){
    const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    return this.http.get(api+'/users/' + userName , { headers });
  }
  getRepositories(userName:string, range:string){
       const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    return this.http.get(api+'/users/' + userName+'/repos?per_page='+range, { headers });
  }
  getLanguages(userName:string,repoName:string){
       const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    return this.http.get(api+'/repos/'+userName+'/'+repoName+'/languages', { headers });
  }
  getFollowers(userName:string){
       const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    return this.http.get(api+'/users/'+userName+'/followers', { headers })
  }
  getFollowing(userName:string){
       const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    return this.http.get(api+'/users/'+userName+'/following', { headers })
  }

}