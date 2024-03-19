
export class ApplicationError extends Error {
    status: any;
  
    constructor(name: any, msg: any) {
      super(msg.message);
      this.name = name;
      this.status = msg.statusCode;
    }
  }
  