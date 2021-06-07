import { CORE_DIRECTIVES } from './directives';
import { CommonModule } from '@angular/common';
import { InterceptorModule } from './backend/interceptor.module';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [CommonModule, InterceptorModule],
  declarations: [...CORE_DIRECTIVES],
  exports: [InterceptorModule, ...CORE_DIRECTIVES]
})
export class CoreModule {}
