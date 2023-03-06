import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { IonicModule } from '@ionic/angular';
import { ControlDirective } from './control.directive';
import { CustomComponent } from './custom.component';
import { KebabPipe } from './kebab.pipe';
import { NodeComponent } from './node/node.component';
import { SocketDirective } from './socket.directive';
import { SocketComponent } from './socket/socket.component';

@NgModule({
  declarations: [
    NodeComponent,
    SocketComponent,
    CustomComponent,
    ControlDirective,
    SocketDirective,
    KebabPipe,
  ],
  imports: [CommonModule, IonicModule],
  providers: [KebabPipe, ControlDirective],
  exports: [
    NodeComponent,
    CustomComponent,
    SocketComponent,
    ControlDirective,
    SocketDirective,
    KebabPipe,
  ],
  entryComponents: [NodeComponent, SocketComponent, CustomComponent],
})
export class ReteModule {
  constructor(injector: Injector) {
    // StaticInjectorError due to 'npm link'
    const CustomElement = createCustomElement(CustomComponent, { injector });
    if (!customElements.get('rete-element'))
      customElements.define('rete-element', CustomElement);
  }
}
