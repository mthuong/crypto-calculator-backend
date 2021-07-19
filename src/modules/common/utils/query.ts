import { Connection, In, ObjectLiteral, Repository } from 'typeorm';
import { safeKey } from '.';
import { camelCaseToSnakeCase } from './functions';
import { format } from 'date-fns';
import { validateOrReject } from 'class-validator';

// ex: sort = createdAt|ASC
export function orderByBuilder(
  sort: string,
  alias?: string,
): Record<string, 'ASC' | 'DESC'>[] {
  const sorts = sort.split(',');

  return sorts.map((sort) => {
    const orderBy = {};
    const arrOrder = sort.split('|');

    if (arrOrder.length == 2) {
      const field =
        arrOrder[0].indexOf('.') !== -1
          ? arrOrder[0]
          : alias
          ? `${alias}.${arrOrder[0]}`
          : arrOrder[0];
      const order = arrOrder[1];

      orderBy[safeKey(field)] = order;
    }

    return orderBy;
  });
}

// ex: sort = createdAt|ASC
export function esOrderByBuilder(sort: string): Record<string, string>[] {
  const ordersBy = orderByBuilder(sort);

  return ordersBy
    .map((orderBy) => {
      const ret = Object.entries(orderBy).map(([k, v]) => {
        return { [camelCaseToSnakeCase(k)]: v.toLocaleLowerCase() };
      });

      return ret.length > 0 ? ret[0] : undefined;
    })
    .filter((v) => v !== undefined);
}

// ex: value = value1,value2 -> In([value1, value2, ...])
export function inQueryBuilder(value: string) {
  const arrStatus = value.split(',');

  return In(arrStatus);
}

export async function cleanTable(
  connection: Connection,
  tableName: string,
  isCheckId: boolean = true,
): Promise<void> {
  const queryRunner = connection.createQueryRunner();

  await queryRunner.query(`DELETE FROM ${tableName}`);

  if (isCheckId) {
    await queryRunner.query(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`);
  }
}

const tableForeignKeys: Record<string, any>[] = [];

export async function dropForeignKeys(
  connection: Connection,
  tableNames: string[],
): Promise<void> {
  const queryRunner = connection.createQueryRunner();

  for (let i = 0; i < tableNames.length; i++) {
    const tableName = tableNames[safeKey(i)];
    const table = await queryRunner.getTable(tableName);

    const foreignKeys = Object.assign([], table.foreignKeys);

    if (foreignKeys && foreignKeys.length > 0) {
      await queryRunner.dropForeignKeys(tableName, foreignKeys);
      tableForeignKeys.push({ tableName, foreignKeys: foreignKeys });
    }
  }
}

export async function createForeignKeys(connection: Connection): Promise<void> {
  const queryRunner = connection.createQueryRunner();

  for (let i = tableForeignKeys.length - 1; i >= 0; i--) {
    const tableForeignKey = tableForeignKeys[safeKey(i)];
    const tableName = tableForeignKey.tableName;

    const foreignKeys = tableForeignKey.foreignKeys;

    if (foreignKeys.length > 0) {
      await queryRunner.createForeignKeys(tableName, foreignKeys);
    }
  }
}

export function dateTimeQuery(
  repo: Repository<any>,
  inputDate: Date,
  alias: string, //field alias - ex: user.created_at
  paramAlias: string = ':date',
  condition: string = '=',
  formatStr: string = 'date',
): Record<string, any> {
  const mapFormat = {
    date: {
      mssql: {
        db: 20,
        js: 'yyyy-MM-dd',
      },
      sqlite: {
        db: '%Y%m%d',
        js: 'yyyyMMdd',
      },
    },
    dateTime: {
      mssql: {
        db: 23,
        js: 'yyyy-MM-dd HH:mm:ss',
      },
      sqlite: {
        db: '%Y%m%d%H%M%S',
        js: 'yyyyMMddHHmmss',
      },
    },
  };
  const dbDriver = repo.manager.connection.options.type;
  const formatObj = mapFormat[safeKey(formatStr)][safeKey(dbDriver)];

  let dateParam = format(inputDate, formatObj.js);
  let dateQuery = `CONVERT(VARCHAR, ${alias}, ${formatObj.db}) ${condition} '${paramAlias}'`;

  // handle date format for sqlite
  if (dbDriver === 'sqlite') {
    dateParam = format(inputDate, formatObj.js);
    dateQuery = `strftime("${formatObj.db}", ${alias}) ${condition} ${paramAlias}`;
  }

  return {
    dateQuery,
    dateParam,
  };
}

export const countByConditions = async (
  conditions: ObjectLiteral,
  repo: Repository<any>,
) => {
  const queryBuilder = repo.createQueryBuilder();

  const [{ count }] = await queryBuilder
    .select('COUNT(id) AS count')
    .where(conditions)
    .execute();

  return count;
};

export const validateClass = async (
  entity: ObjectLiteral,
): Promise<string[]> => {
  return await validateOrReject(entity).catch((errs) => {
    if (!errs.length) {
      return [errs.message];
    }

    return errs.map((err) => {
      return Object.values(err.constraints)[0];
    });
  });
};
