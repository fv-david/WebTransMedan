import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { EqualsDirective } from './equals.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ EqualsDirective ],
  exports: [
  	CommonModule,
    FormsModule,
    TranslateModule,
    EqualsDirective
  ]
})
export class SharedModule { }
