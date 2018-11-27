export const RestApi = {
  Login: {
    endPoint: 'https://declarcbenefapi.azurewebsites.net/',
    methods:{
      ValidarRut:'api/Empresa/ValidarRut/',
      ValidarPassword :'api/Empresa/ValidarClave',
    }
  },
  Declarante :{
    endPoint :'https://declarcbenefapi.azurewebsites.net/',
    methods:{
      obtenerPropietario: 'api/Declaracion/ObtenerPropietarios',
      GuardarPropietario :'api/Declaracion/GuardarPropietario'
    }
  },
  Headers:{
    headerJson: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    },
    headerUrlEncoded: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
};
