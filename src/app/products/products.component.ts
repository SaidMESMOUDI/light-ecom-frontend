import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  private timestamp: number = 0;
  private products;
  private title: string;
  private editPhoto: boolean = false;
  private currentProduct: any;
  private selectedFiles: any;
  private progress: number;
  private currentFileUpload: any;
  private nameOfTheSelectedFile: any;

  constructor(private catalogueService: CatalogueService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);

        let p1 = this.route.snapshot.params.p1;
        if(p1 == 1) {
          this.title = "Featured (Selected) products"
          // p1=1 : Affiche les produits sélectionnés
          // càd avec l'attribut selected = true
          this.getProducts('/products/search/selectedProducts');
          this.title = "Featured (Selected) products"
        }
        else if(p1 == 2){
          // p1=2 : Affiche les produits par catégorie
          let idCategory = this.route.snapshot.params.p2;
          this.getProducts('/categories/'+ idCategory +'/products');
          // this.title = "Category " + idCategory + " products";
          this.title = "Products of the category  " + idCategory;
        }
        else if(p1 == 3){
          this.title = "Promotional products";
          this.getProducts('/products/search/promotionalProducts');
        }
        else if(p1 == 4){
          this.title = "Available products";
          this.getProducts('/products/search/availableProducts');
        }
        else if(p1 == 5){
          this.title = "Products found with the keyword";
          this.getProducts('/products/search/searchProducts');
        }
      }
    });

    let p1 = this.route.snapshot.params.p1;
    if(p1 == 1) {
      this.getProducts('/products/search/selectedProducts');
    }
  }

  private getProducts(url) {
    this.catalogueService.getResource(url)
      .subscribe(data=>{
        this.products = data;
      }, err => {
        console.error(err);
      });
  }

  onEditPhoto(p) {
    let idCategory = this.route.snapshot.params.p2;
    if (idCategory == 0){
      alert("Veuillez tout d'abord sélectionner la catégorie de produits " +
        "\nque vous voulez modifier sur le menu de gauche.");
    }
    this.currentProduct = p;
    this.editPhoto = true;
    this.progress = 0;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files; //console.log(this.selectedFiles.item(0));
    this.nameOfTheSelectedFile = this.selectedFiles.item(0).name; //console.log(this.nameOfTheSelectedFile);
    this.progress = 0;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
      .subscribe(event =>{
        if(event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }else if(event instanceof HttpResponse){

          this.timestamp = Date.now();
          //alert("Photo successfully loaded"); //Photo chargée avec succès
          // let idCat = this.route.snapshot.params.p2;
          // this.getProducts('/categories/'+ idCat +'/products');
        }
      }, err => {
        alert("Problème de chargement "+ JSON.parse(err.error).message);
      });
      this.selectedFiles = undefined;

  }

}
