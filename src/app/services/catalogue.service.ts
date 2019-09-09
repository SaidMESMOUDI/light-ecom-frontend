import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string = "http://localhost:8080";

  constructor(private http: HttpClient) {  }

  public getResource(url){
    return this.http.get(this.host + url);
  }

  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);
    // if(this.jwtToken == null) this.loadToken();

    const req = new HttpRequest("POST", this.host + "/uploadPhoto/"+idProduct, formData, {
      reportProgress: true,
      responseType: "text",
      // headers: new HttpHeaders({'Authorization' : this.jwtToken})
    });
    return this.http.request(req);
  }
}
