import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseColumnSchema = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp',
    comment: '创建时间',
    createDate: true,
    default: () => 'CURRENT_TIMESTAMP',
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp',
    comment: '创建时间',
    createDate: true,
    default: () => 'CURRENT_TIMESTAMP',
  } as EntitySchemaColumnOptions,
};
