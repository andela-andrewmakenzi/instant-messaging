import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsModuleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-module',
  templateUrl: 'components-module.html'
})
export class ComponentsModuleComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsModuleComponent Component');
    this.text = 'Hello World';
  }

}
