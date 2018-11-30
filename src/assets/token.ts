export const Token = {
    TokenLogin: {
        UserName:"febo",
        Password:"P2ssw0rd"
    },
    LoginAuth:{
        EndPoint:"https://declarcbenefapi.azurewebsites.net/",
        Method: "api/Auth/Login"
    },
    Headers:{
        headerJsonToken: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '
        },
        headerJson: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': 'bffe8683-380c-4bbf-8351-75cf98ef1a35'
        }
      }
};
