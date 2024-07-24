import * as Joi from 'joi';
import { BadRequestException } from '../../domain/http/errors';

export class Credential {
  constructor(public username: string, public password: string, public role: string) {
    this.validate();
  }

  private validate(): void {
    const doctorSchema = Joi.object().keys({
      username: Joi.number().required().label('username CRM'),
      password: Joi.string().required(),
      role: Joi.string().valid('doctor').required(),
    }).required();

    const patientSchema = Joi.object().keys({
      username: Joi.string().email().required().label('username email'),
      password: Joi.string().required(),
      role: Joi.string().valid('patient').required(),
    }).required();

    const schema = this.role === 'doctor' ? doctorSchema : patientSchema;

    const { error } = schema.validate({ username: this.username, password: this.password, role: this.role });
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}



