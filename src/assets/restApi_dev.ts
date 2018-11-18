export const RestApi = {
  Suscripcion: {
    urlEstado : 'https://190.243.30.34:4000/vs-desarrollo/co/REST/Cli/SuscripcionVirtual/DetalleSuscripcion/Estado',
    urlDetalle: 'http://10.240.45.71:7800/REST/suscripcionVirtual/DetalleSuscripcion/{0}',
    urlPost: 'http://10.240.45.71:7800/REST/suscripcionVirtual/DetalleSuscripcion',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Asegurable: {
    urlGet: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Asegurable/{0}',
    urlPostPut: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Asegurable',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  GrupoFamiliar: {
    urlIsMember: 'http://10.240.45.71:7800/REST/suscripcionVirtual/GrupoFamiliar/{0}/Asegurable/{1}/Rut/{2}',
    urlGetOne: 'http://10.240.45.71:7800/REST/suscripcionVirtual/GrupoFamiliar/{0}/token/{1}/Asegurable/{2}',
    urlGet: 'http://10.240.45.71:7800/REST/suscripcionVirtual/GrupoFamiliar/{0}/Asegurable/{1}',
    urlPostPut: 'http://10.240.45.71:7800/REST/suscripcionVirtual/GrupoFamiliar',
    urlDel: 'http://10.240.45.71:7800/REST/suscripcionVirtual/GrupoFamiliar/{0}/token/{1}/usuario/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Beneficiario: {
    urlGetAll: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Beneficiario/{0}/Asegurable/{1}',
    urlGet: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Beneficiario/{0}/Asegurable/{1}/Beneficiario/{2}',
    urlPostPut: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Beneficiario',
    urlDel: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Beneficiario/{0}/token/{1}/usuario/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Preexistencia: {
    urlGet: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Preexistencia/{0}/Asegurable/{1}',
    urlPostPut: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Preexistencia',
    urlDel: 'http://10.240.45.71:7800/REST/suscripcionVirtual/Preexistencia/{0}/token/{1}/usuario/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Enfermedades: {
    urlGet: 'http://10.240.45.71:7800/REST/declaracionSalud/enfermedades/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Deportes: {
    urlGet: 'http://10.240.45.71:7800/REST/declaracionSalud/actividadesdeportesriesgosos/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  ActividadRiesgosa: {
    urlGet: 'http://10.240.45.71:7800/REST/suscripcionVirtual/ActividadRiesgosa/{0}/Asegurable/{1}',
    urlPostPut: 'http://10.240.45.71:7800/REST/suscripcionVirtual/ActividadRiesgosa',
    urlDel: 'http://10.240.45.71:7800/REST/suscripcionVirtual/ActividadRiesgosa/{0}/token/{1}/usuario/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Parentesco: {
    urlGetParentesco: 'http://10.240.45.71:7800/REST/parentesco/COLECTIVO/usuario/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  serviciosComunes: {
    urlGetTipoCuentasBancariasColectivo: 'http://10.240.45.71:7800/REST/tipoCuenta/COLECTIVO/usuario/{0}',
    urlGetEstadoCivilColectivo: 'http://10.240.45.71:7800/REST/estadoCivil/COLECTIVO/usuario/{0}',
    urlGetBancos: 'http://10.240.45.71:7800/REST/banco/{0}/Colectivo',
    urlSistemaSalud: 'http://10.240.45.71:7800/REST/sistemaSalud/COLECTIVO/usuario/{0}',
    urlGetRegiones: 'http://10.240.45.71:7800/REST/ubicaciones/region/{0}',
    urlGetCiudades: 'http://10.240.45.71:7800/REST/ubicaciones/ciudad/{0}',
    urlGetComunas: 'http://10.240.45.71:7800/REST/ubicaciones/comuna/{0}',
    urlGetGenero: 'http://10.240.45.71:7800/REST/genero/{0}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Equifax: {
    urlGetDatosPersonales: 'http://10.240.45.71:7800/REST/equifax/rut/{0}/usuario/{1}/app/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Poliza: {
    urlGetPolizaPlanParentesco: 'http://10.240.45.71:7800/REST/parentesco/poliza/{0}/plan/{1}/usuario/{2}',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  },
  Token: {
    urlValidaToken: 'http://10.240.45.71:7800/REST/suscripcionVirtual/validaToken',
    urlValidaTokenUsuario: 'http://10.240.45.71:7800/REST/suscripcionVirtual/validaTokenUsuario',
    headers: {
      'Content-Type': 'application/json',
      'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
    }
  }
};
