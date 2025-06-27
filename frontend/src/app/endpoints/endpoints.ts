import { environment } from "src/environments/environment";

export enum EndpointsPaths {
  authRegister = '/auth/register',
  authLogin = '/auth/login',
  task = '/task',
  taskId = '/task/{idTask}'
}

export const endpointList: EndpointModel[] = [
  {
    endpoint: EndpointsPaths.authRegister,
    environment: environment.endpoint,
    variable: []
  },
  {
    endpoint: EndpointsPaths.authLogin,
    environment: environment.endpoint,
    variable: []
  },
    {
    endpoint: EndpointsPaths.task,
    environment: environment.endpoint,
    variable: []
  },
  {
    endpoint: EndpointsPaths.taskId,
    environment: environment.endpoint,
    variable: ['{idTask}']
  }
]


export class EndpointModel {
  constructor(
    public endpoint: string,
    public environment: string,
    public variable: string[]
  ) { }
}

export function getFullEndpoint(
  endpoint: EndpointsPaths,
  values: string[] = []
) {
  const endpointTemp = endpointList.find((it) => it.endpoint == endpoint);
  let endpointFinal = endpointTemp!.environment + endpointTemp!.endpoint;
  for (let index = 0; index < values.length; index++)
    endpointFinal = endpointFinal.replace(
      endpointTemp!.variable[index],
      values[index]
    );
  return endpointFinal;
}
