import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class CreateEntryFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception.code === 11000) {
      response
        .status(400)
        .json({ message: 'Entry with same email already exists.' });
    } else {
      response.status(500).json({ message: 'Internal error.' });
    }
  }
}
