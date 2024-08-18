declare namespace Express {
  export interface Request {
    file?: Express.Multer.File | undefined; // Assuming you're using Multer
  }
}
