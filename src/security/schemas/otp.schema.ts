import { EntitySchema } from 'typeorm';
import { OTP } from '../entities/otp.entity';

export const TaskSchema = new EntitySchema<OTP>({
  name: 'TBSSO_ONETIMEPASSWORD',
  target: OTP,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    cod_client: {
        type: String,
        nullable: false
    },
    auth_count: {
        type: Number
    },
    date_create: {
        type: Date
    },
    date_expiration: {
        type: Date
    },
    date_validation: {
        type: Date
    }
  },
});
