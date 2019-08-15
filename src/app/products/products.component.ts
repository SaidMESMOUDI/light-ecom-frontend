import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products;

  constructor(private catalogueService: CatalogueService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let p1 = this.route.snapshot.params.id;
    if(p1 == 1) {
      this.getProducts("/products/search/selectedProducts");
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

}
