import { CORE_DIRECTIVES } from './directives';
import { CommonModule } from '@angular/common';
import { InterceptorModule } from './backend/interceptor.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from './translation/translation.module';

@NgModule({
  imports: [CommonModule, TranslationModule, InterceptorModule],
  declarations: [...CORE_DIRECTIVES],
  exports: [TranslateModule, InterceptorModule, ...CORE_DIRECTIVES]
})
export class CoreModule {}
