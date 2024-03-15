
interface connection {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}

export interface IProducer extends connection {
    produce: (message: any) => Promise<void>;
}
