import { EntitySchema } from 'typeorm';
import { OTP } from '../entities/otp.entity';

export const OTPSchema = new EntitySchema<OTP>({
  name: 'otp',
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
    }
  },
});
