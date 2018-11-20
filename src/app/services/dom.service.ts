import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
/**
   * Referencia al elemento hijo.
   */
  private childComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }
   /**
   * Agrega un componente al DOM de manera dinámica.
   * @param parentId ID del padre dónde se va a inyectar un componente
   * @param child Hijo que será inyectado
   * @param childConfig Configuración del componente.
   */
  public appendComponentTo(parentId: string, child: any, childConfig?: ChildConfig) {
    // Create a component reference from the component
    const childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(child)
      .create(this.injector);

    // Attach the config to the child (inputs and outputs)
    this.attachConfig(childConfig, childComponentRef);

    this.childComponentRef = childComponentRef;
    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(childComponentRef.hostView);

    // Get DOM element from component
    const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.getElementById(parentId).appendChild(childDomElem);

  }

  /**
   * Elimina un componente del DOM
   */
  public removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  /**
   * Agrega la configuración a un pomponente específico
   * @param config Configuración del componente
   * @param componentRef Referencia al componente
   */
  private attachConfig(config, componentRef) {
    const inputs = config.inputs;
    const outputs = config.outputs;
    // tslint:disable-next-line:forin
    for (const key in inputs) {
      componentRef.instance[key] = inputs[key];
    }
    // tslint:disable-next-line:forin
    for (const key in outputs) {
      componentRef.instance[key] = outputs[key];
    }

  }
}
/**
 * Interfaz utilizada para manejar los inputs y outputs del componente.
 */
interface ChildConfig {
  /**
   * Inputs del componente
   */
  inputs: object;

  /**
   * Outputs del componente.
   */
  outputs: object;
}