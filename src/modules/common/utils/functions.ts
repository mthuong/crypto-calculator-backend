/* eslint-disable security/detect-object-injection */
import { environment } from '@env/environment';
import { Request } from 'express';
import { ObjectLiteral } from 'typeorm';
import { DEFAULT_PERPAGE } from '../constant';
import { generatePaginationLinks, safeKey } from './';

export const camelCaseToSnakeCase = (key: string) => {
  const result = key.replace(/([A-Z])/g, ' $1');

  return result.split(' ').join('_').toLowerCase();
};

/**
 * Pick object with none empty value
 * @param obj - The object you want to filter
 * @param isStrict - Exclude string of empty
 */
export const pickNotEmpty = (
  obj: Record<string, any> | string | number | boolean,
  isStrict: boolean = false,
) => {
  const newObj = {};

  if (
    typeof obj === 'string' ||
    typeof obj === 'number' ||
    typeof obj === 'boolean'
  ) {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    if (obj[safeKey(key)] && Array.isArray(obj[safeKey(key)])) {
      // isArray
      const arr = obj[safeKey(key)];

      newObj[safeKey(key)] = [];
      arr.forEach((d: string | number | boolean | Record<string, any>) => {
        newObj[safeKey(key)].push(pickNotEmpty(d, isStrict));
      });
    } else if (obj[safeKey(key)] && typeof obj[safeKey(key)] === 'object') {
      // isObject
      newObj[safeKey(key)] = pickNotEmpty(obj[safeKey(key)], isStrict);
    } else if (isStrict && obj[safeKey(key)] === '') {
      // pass
    } else if (obj[safeKey(key)] !== undefined && obj[safeKey(key)] !== null) {
      newObj[safeKey(key)] = obj[safeKey(key)];
    }
  });

  return newObj;
};

enum E {}

export function enumerate<T1 extends typeof E, T2 extends typeof E>(
  e1: T1,
  e2: T2,
) {
  return e1 as typeof e1 & typeof e2;
}

type FrontendUrlType = 'verify-email' | 'recover-password' | 'verify-account';

export const generateFrontendUrl = (
  type: FrontendUrlType,
  query?: string,
): string => {
  //TODO: need to correct frontend url
  let url = [environment.appUrl.frontendUrl];

  switch (type) {
    case 'verify-email':
      url.push('email/verify');
      break;
    case 'verify-account':
      url.push('account/verify');
      break;
    case 'recover-password':
      url.push('password/reset/new');
      break;
    default:
      url = ['#'];
  }

  const urlStr = url.join('/');

  return query ? `${urlStr}${query}` : urlStr;
};

type AdminConsoleUrlType = 'verify-email' | 'recover-password' | 'login';

export const generateAdminConsoleUrl = (
  type: AdminConsoleUrlType,
  query?: string,
): string => {
  let url = [environment.appUrl.adminConsoleUrl];

  switch (type) {
    case 'verify-email':
      url.push('email/verify');
      break;
    case 'recover-password':
      url.push('password/reset/new');
      break;
    case 'login':
      url.push('login');
      break;
    default:
      url = ['#'];
  }

  const urlStr = url.join('/');

  return query ? `${urlStr}${query}` : urlStr;
};

export const nameof = <T>(name: keyof T) => name;

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num) + '...';
};

export const isHashString = (str: string) => {
  const regex = /^[A-Za-z0-9]*$/g;

  return regex.exec(str) && environment.hashids.length === str.length;
};

//ex: xxx-x-x1234-x..
export const maskAccountNumber = (str: string) => {
  let result = '';
  const replace = 'x';

  for (let i = 0; i < str.length; i++) {
    if (i <= 2) {
      result += replace;
    }

    if (i === 3) {
      result += `-${replace}-`;
    }

    if (i === 4) {
      result += replace;
    }

    if (i > 4 && i <= 8) {
      result += str[safeKey(i)];
    }

    if (i === 8) {
      result += `-${replace}`;
    }

    if (i > 8) {
      result += replace;
    }
  }

  return result;
};

export const generatePagination = (
  req: Request,
  path: string,
  page: number = 1,
  perPage: number = DEFAULT_PERPAGE,
  total: number = 0,
  unread: number = 0,
) => {
  const baseUrl = `${environment.server.domainURL}/${path}`;
  const link: string = generatePaginationLinks(
    baseUrl,
    page,
    perPage,
    Math.ceil(total / perPage),
  );

  if (link.length > 0) {
    req.res.set('Link', link);
  }

  req.res.set('x-total-count', `${total}`);
  req.res.set('x-unread', `${unread}`);
};

export const flatArrayToTree = (arr: ObjectLiteral[]): any => {
  const tree = [],
    mappedArr = {};
  let arrElem, mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[safeKey(i)];
    // parent path RED-78
    arrElem.pathName = arrElem.name;
    mappedArr[safeKey(arrElem.id)] = arrElem;
    mappedArr[safeKey(arrElem.id)][safeKey('children')] = [];
  }

  for (const id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[safeKey(id)];

      if (!mappedElem) continue;

      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parentId) {
        // chilren path RED-78
        const parent = mappedArr[mappedElem[safeKey('parentId')]];

        if (parent) {
          mappedElem.pathName = `${parent.pathName} / ${mappedElem.name}`;
          parent[safeKey('children')].push(mappedElem);
        }
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }

  return tree;
};

export const getTokenFromHeader = (headers: any): string => {
  const authorization = headers?.authorization || null;

  if (authorization) return authorization.replace('Bearer ', '');

  return null;
};

export const randomNumberString = (numOfDigits: number): string => {
  return (
    Math.floor(Math.random() * Math.pow(10, numOfDigits)) +
    Math.pow(10, numOfDigits)
  )
    .toString()
    .substring(1);
};

export const padLeft = (
  number: number,
  numOfDigits: number,
  str?: string,
): string => {
  return `${Array(numOfDigits - String(number).length + 1).join(
    str || '0',
  )}${number}`;
};

export const getRandomIntInclusive = (min, max): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const sequencePromise = (funcs: any) =>
  funcs.reduce(
    (promise: any, func: any) =>
      promise.then((result: any) =>
        func().then(Array.prototype.concat.bind(result)),
      ),
    Promise.resolve([]),
  );
