import { EntitySchema } from 'typeorm';
import { Config } from '../entities/config.entity';

export const TaskSchema = new EntitySchema<Config>({
  name: 'TBSSO_ONETIMEPASSWORD',
  target: Config,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    config_name: {
        type: String,
        nullable: false
    },
    value: {
        type: Number,
        nullable: false
    }
  },
});