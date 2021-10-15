import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Products } from '../products';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  depProdName: string = '';
  depValor: number = 0;
  depEdit: Products = null;
  departments: Products[] = [];

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private productsService: ProductService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.productsService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.departments = deps);
  };
//, valor: this.depValor
  save() {
    if (this.depEdit) {
      this.productsService.update(
        { prodName: this.depProdName, _id: this.depEdit._id }
      ).subscribe(
        (dep) => {
          this.notify('UPDATED!')
        },
        (err) => {
          this.notify('ERROR')
          console.error(err)
        }
      )
    }
    else {
      this.productsService.add({ prodName: this.depProdName })
        .subscribe(
          (dep) => {
            console.log(dep)
            this.notify('INSERTED!')
          },
          (err) => {
            console.error(err)
          }
        )
    }
    this.clearFields()
  }

  edit(dep: Products) {
    this.depProdName = dep.prodName;
    this.depEdit = dep;
  }

  delete(dep: Products) {
    this.productsService.del(dep)
      .subscribe(
        () => this.notify('REMOVED!'),
        (err) => this.notify(err.error.msg)
      )
  }

  clearFields() {
    this.depProdName = '';
    this.depEdit = null;
  };

  cancel() {
    this.clearFields();
  };

  notify(msg: string) {
    this.snackbar.open(msg, 'OK', { duration: 3000 });
  };

  ngOnDestroy() {
    this.unsubscribe$.next();
  };

};