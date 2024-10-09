import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class CoreModule { }
