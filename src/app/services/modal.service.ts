import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  /**
   * Constructor del servicio.
   * @param domService Servicio que manipula el DOM.
   */
  constructor(private domService: DomService) { }

  /**
   * ID del background del modal.
   */
  private modalBgElementId = 'bg_modal';

  /**
   * ID del elemento que contiene al modal.
   */
  private modalElementId = 'modal';

  /**
   * Subject para gatillar los eventos de OK
   */
  okEvent = new Subject<boolean>();

  /**
   * Subject para gatillar los eventos de CANCEL
   */
  cancelEvent = new Subject<boolean>();

  /**
   * Inicializa el elemento y lo agrega al DOM.
   * @param component Componente que será incrustado.
   * @param inputs Inputs que recibe el componente.
   * @param outputs Outpus que envía el componente
   */
  init(component: any, inputs: object, outputs: object) {
    console.log('component',component,'inputs',inputs,'out',outputs);
    const componentConfig = {
      inputs: inputs,
      outputs: outputs
    };    
    this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
    document.getElementById(this.modalBgElementId).classList.add('bg_modal--active');
  }

  /**
   * Elimina el componente del DOM.
   */
  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalBgElementId).classList.remove('bg_modal--active');
  }
}
