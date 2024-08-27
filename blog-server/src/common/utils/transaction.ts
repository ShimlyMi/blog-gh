import {
  DeleteResult,
  EntityTarget,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';
import { ResultData } from './result';
import { BaseColumn } from '../../business/baseColumnAbstract/base';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export const create = async (
  repository: Repository<BaseColumn>,
  entity: EntityTarget<ObjectLiteral>,
  column: QueryDeepPartialEntity<unknown>,
): Promise<ResultData> => {
  const result = await repository.manager.transaction(async (entityManager) => {
    return await entityManager
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(column)
      .execute();
  });
  // console.log('result.identifiers.length', result.identifiers.length);
  if (result.identifiers.length > 0) {
    return ResultData.messageSuccess('', '新增成功');
  }
  return ResultData.messageFail(500, '新增失败', '');
};

export const remove = async (
  multiple: boolean = false,
  repository: Repository<BaseColumn>,
  entity: EntityTarget<BaseColumn>,
  condition: string,
  parameters?: ObjectLiteral | [],
): Promise<ResultData> => {
  const result: DeleteResult = await repository.manager.transaction(
    async (entityManager) => {
      const deleteBuilder = entityManager
        .createQueryBuilder()
        .delete()
        .from(entity);

      if (multiple) {
        deleteBuilder.whereInIds(parameters);
      } else {
        deleteBuilder.where(condition, parameters);
      }
      return await deleteBuilder.execute();
    },
  );
  console.log('result.affected', result.affected);
  if (result.affected > 0) {
    return ResultData.messageSuccess('', '删除成功');
  }
  return ResultData.messageFail(500, '删除失败', '');
};

export const update = async (
  repository: Repository<BaseColumn>,
  column: QueryDeepPartialEntity<unknown>,
  entity: EntityTarget<BaseColumn>,
  condition: string,
  parameters?: ObjectLiteral,
): Promise<ResultData> => {
  const result: UpdateResult = await repository.manager.transaction(
    async (entityManager) => {
      return await entityManager
        .createQueryBuilder()
        .update(entity)
        .set(column)
        .where(condition, parameters)
        .execute();
    },
  );
  // console.log('result.raw', result.affected);
  if (result.affected > 0) {
    return ResultData.messageSuccess('', '修改成功');
  }

  return ResultData.messageFail(500, '修改失败', '');
};
