import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent{

  /**
   * Mensaje a mostrar en el modal
   */
  @Input() message: string;

  /**
   * Texto a mostrar en el botón 'OK'
   */
  @Input() okMessage = '';

  /**
   * Texto a mostrar en el botón 'Cancel'
   */
  @Input() cancelMessage = '';

  /**
   * Constructor del componente.
   * @param modalService Maneja la aparición de los distintos modales.
   */
  constructor(private modalService: ModalService) {    
   }

  /**
   * Lanza un nuevo evento en el observable cancelEvent.
   */
  cancelButton() {
    this.modalService.cancelEvent.next(true);
    this.closeModal();
  }

  /**
   * Lanza un nuevo evento en el observable okEvent.
   */
  okButton() {
    this.modalService.okEvent.next(true);
    this.closeModal();
  }

  /**
   * Cierra el modal y lo elimina del DOM.
   */
  closeModal() {
    this.modalService.destroy();
  }

}
