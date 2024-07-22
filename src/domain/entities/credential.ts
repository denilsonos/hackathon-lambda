import * as Joi from 'joi';
import { BadRequestException } from '../../domain/http/errors';

export class Credential {
  constructor(public email: string, public password: string) {
    this.validate();
  }

  private validate(): void {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).required();

    const { error } = schema.validate({ email: this.email, password: this.password });
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}



