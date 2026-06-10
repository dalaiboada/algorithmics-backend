export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    // Solución para que 'instanceof' funcione correctamente en TypeScript al heredar de Error
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
