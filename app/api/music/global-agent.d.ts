declare module 'global-agent' {
  interface ProxyAgentConfigurationInputType {
    environmentVariableNamespace?: string;
    forceGlobalAgent?: boolean;
    defaultProxy?: string;
  }

  export function createGlobalProxyAgent(configuration: ProxyAgentConfigurationInputType): void;
}
