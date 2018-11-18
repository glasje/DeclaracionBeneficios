export const RestApi = {

  SSO :{
    urlTokenClient : 'https://10.62.4.76:8543/auth/realms/VS-Clients/protocol/openid-connect/token',
    urlTokenClientLogout : 'https://10.62.4.76:8543/auth/realms/VS-Clients/protocol/openid-connect/logout',
    urlTokenPotentials : 'https://10.62.4.76:8543/auth/realms/VS-Potentials/protocol/openid-connect/token',
    urlTokenPotentialsLogout : 'https://10.62.4.76:8543/auth/realms/VS-Potentials/protocol/openid-connect/logout',
    headers : {
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    form :{
      grant_type : 'password',
      grant_type_refresh_token : 'refresh_token',
      client_id : 'suscrip-col'
    }    
  },
  FirmaDigital :{
    urlFirma : 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/com/REST/Servicios/FirmaDigital',
    headers : {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  ValueWeb :{
    urlUpload : 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Upload'
  },
  SuscripcionProceso :{
    urlEstado : "https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/ProcesoSuscripcionVirtual/Existe",
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Suscripcion: {
    urlEstado : 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/DetalleSuscripcion/Estado',
    urlDetalle: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/DetalleSuscripcion/{0}',
    urlPost: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/DetalleSuscripcion',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Asegurable: {
    urlGet: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Asegurable/{0}',
    urlPostPut: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Asegurable',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  GrupoFamiliar: {
    urlIsMember: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/GrupoFamiliar/{0}/Rut/{1}',
    urlGetOne: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/GrupoFamiliar/{0}/Asegurable/{1}',
    urlGet: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/GrupoFamiliar/{0}',
    urlPostPut: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/GrupoFamiliar',
    urlDel: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/GrupoFamiliar/{0}/usuario/{1}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Beneficiario: {
    urlGetAll: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Beneficiarios/{0}',
    urlGet: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Beneficiario/{0}/Beneficiario/{1}',
    urlPostPut: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Beneficiario',
    urlDel: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Beneficiario/{0}/usuario/{1}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Preexistencia: {
    urlGet: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Preexistencia/{0}',
    urlPostPut: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Preexistencia',
    urlDel: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Preexistencia/{0}/usuario/{1}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Resumen : {
    urlGet : 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/SuscripcionVirtual/Resumen/PDF',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Enfermedades: {
    urlGet: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Col/DeclaracionSalud/enfermedades/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Deportes: {
    urlGet: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Col/DeclaracionSalud/actividadesdeportesriesgosos/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Parentesco: {
    urlGetParentesco: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Parentesco/usuario/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  serviciosComunes: {
    urlGetTipoCuentasBancariasColectivo: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Bancos/TipoCuentas',
    urlGetEstadoCivilColectivo: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/EstadoCivil/usuario/{0}',
    urlGetBancos: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Bancos',
    urlSistemaSalud: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/SistemaSalud/usuario/{0}',
    urlGetRegiones: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Ubicaciones/region/{0}',
    urlGetCiudades: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Ubicaciones/ciudad/{0}',
    urlGetComunas: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Ubicaciones/comuna/{0}',
    urlGetGenero: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/com/REST/Per/Genero/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Equifax: {
    urlGetDatosPersonales: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/com/REST/Per/Equifax/rut/{0}/usuario/{1}/app/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Poliza: {
    urlGetPolizaPlanParentesco: 'https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Com/Parentesco/poliza/{0}/plan/{1}/usuario/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  ActivarAsegurable : {
    URL : "https://api-des.vidasecurity.cl:4000/vs-desarrollo/col/REST/Cli/ProcesoActivarAsegurable/Activar",
    headers :{
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  }  
};
