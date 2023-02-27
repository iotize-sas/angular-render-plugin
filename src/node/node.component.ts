import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Node, NodeEditor } from 'rete';
import { NodeService } from '../node.service';
import { SocketComponent } from '../socket/socket.component';

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass'],
  providers: [NodeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent {
  @Input() editor!: NodeEditor;
  @Input() node!: Node;
  @Input() bindSocket!: Function;
  @Input() bindControl!: Function;

  @ViewChild('reteInputSocket') reteInputSocket?: SocketComponent;
  @ViewChild('reteOutputSocket') reteOutputSocket?: SocketComponent;

  constructor(
    protected service: NodeService,
    protected cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service.setBindings(this.bindSocket, this.bindControl);
    this.node.update = () => {
      this.cdr.detectChanges();
      this.reteOutputSocket?.cdr.detectChanges();
      this.reteInputSocket?.cdr.detectChanges();
    };
  }

  get inputs() {
    return Array.from(this.node.inputs.values());
  }

  get outputs() {
    return Array.from(this.node.outputs.values());
  }

  get controls() {
    return Array.from(this.node.controls.values());
  }

  selected() {
    return this.editor.selected.contains(this.node) ? 'selected' : '';
  }
}
