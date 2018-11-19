export const RestApi = {
  Login: {
    urlLogin: 'https://coreapideclarcbenef20181118120007.azurewebsites.net/api/Empresa/',
    endPointValidarRut:'ValidarRut/',
    endPointValidarPassword :'ValidarClave',
    headersJson: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    },
    headerUrlEncoded: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
};
