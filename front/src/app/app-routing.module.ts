import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DepartmentRoutes } from "./department/department-routing.module";
import { ProductsRoutes } from "./products/products-routing.module";

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/departments',
        pathMatch: 'full'
    },
    ...ProductsRoutes,
    ...DepartmentRoutes
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class appRoutingModule{}
