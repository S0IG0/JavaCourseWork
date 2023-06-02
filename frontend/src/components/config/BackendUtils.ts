// const backendAddress: string = '192.168.1.83';
const backendAddress: string = 'localhost';
export const secretKeyForAuthorization = 'Bearer';
enum Paths {
    GRAPHQL = 'graphql',
    IMAGES = 'images'
}

enum Protocols {
    HTTP = 'http',
    HTTPS = 'https'
}

export enum Roles {
    user = "ROLE_USER",
    admin = "ROLE_ADMIN",
    publisher = "ROLE_PUBLISHER",
}

class BackendUtils {
    private static protocol: string = Protocols.HTTP;
    private static address: string = backendAddress;
    private static port: number = 8080;

    private readonly url: string;

    constructor() {
        this.url = this.createUrl();
    }

    private createUrl(): string {
        return `${BackendUtils.protocol}://${BackendUtils.address}:${BackendUtils.port}`;
    }


    public graphql(): string {
        return `${this.url}/${Paths.GRAPHQL}`;
    }

    public getImagesById(id: number): string {
        return `${this.url}/${Paths.IMAGES}/${id}`;
    }

    public postImages(): string {
        return `${this.url}/${Paths.IMAGES}`;
    }

}

export const backend: BackendUtils = new BackendUtils();