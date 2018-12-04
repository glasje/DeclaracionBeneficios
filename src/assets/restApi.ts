export const RestApi = {
  Login: {
    endPoint: 'https://declarcbenefapi.azurewebsites.net/',
    methods:{
      ValidarRut:'api/Empresa/ValidarRut/',
      ValidarPassword :'api/Empresa/ValidarClave'
    }
  },
  Declarante :{
    endPoint :'https://declarcbenefapi.azurewebsites.net/',
    methods:{
      ObtenerPropietario : 'api/Declaracion/ObtenerPropietarios',
      GuardarPropietario : 'api/Declaracion/GuardarPropietario',
      EliminarPropietario: 'api/Declaracion/EliminarPropietario',
      EnviarDeclaracion  : 'api/Declaracion/EnviarDeclaracion',
      ObtenerDeclaracion : 'api/Declaracion/ObtenerDeclaracion'

    }
  },
  Headers:{
    headerJson: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    },
    headerJsonToken: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    },
    headerUrlEncoded: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
};
