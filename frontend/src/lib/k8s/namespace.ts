import { apiFactory } from './apiProxy';
import { KubeObjectInterface, makeKubeObject } from './cluster';

export interface KubeNamespace extends KubeObjectInterface {
  status: {
    phase: string;
  };
}

class Namespace extends makeKubeObject<KubeNamespace>('namespace') {
  static apiEndpoint = apiFactory('', 'v1', 'namespaces');

  get status() {
    return this.jsonData!.status;
  }

  static isValidNamespaceFormat(namespace: string) {
    // We allow empty strings just because that's the default value in our case.
    if (!namespace) {
      return true;
    }

    // Validates that the namespace is a valid DNS-1123 label and returns a boolean.
    // https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names
    const regex = new RegExp('^[a-z0-9]([-a-z0-9]*[a-z0-9])?$');
    return regex.test(namespace);
  }
}

export default Namespace;
