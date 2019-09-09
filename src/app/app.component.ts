import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private categories;
  private currentCategory;
  constructor(private catalogueService:CatalogueService,
              private router: Router ){}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.catalogueService.getResource("/categories")
      .subscribe(data=>{
        this.categories = data;
      }, err => {
        console.error(err);
      });
  }

  onSelectedProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  getProductsByCat(c) {
    this.currentCategory = c;
    this.router.navigateByUrl('/products/2/'+ c.id);
  }

  onPromotionalProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onAvailableProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/4/0');
  }

  onSearchProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/5/0');
  }

  onLogOut() {
    this.router.navigateByUrl('/login');
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }
}
