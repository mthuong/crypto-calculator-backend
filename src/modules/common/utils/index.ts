import * as crypto from 'crypto';
import { SelectQueryBuilder } from 'typeorm';

export const createPasswordHash = (password: string): string => {
  const sha256 = crypto.createHash('sha256');

  return sha256.update(password, 'utf8').digest('hex');
};

export const checkSigninType = (signinUser: string): 'email' | 'username' => {
  const emailRegex =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(String(signinUser).toLowerCase())) {
    return 'email';
  } else {
    return 'username';
  }
};

export const generateID = (count: number) => {
  const sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';

  for (let i = 0; i < count; i++) {
    const idx = Math.random() * sym.length;

    str += sym.charAt(idx);
  }

  return str;
};

export const randomNo = (count: number) => {
  const sym = '1234567890';
  let str = '';

  for (let i = 0; i < count; i++) {
    const idx = Math.random() * sym.length;

    str += sym.charAt(idx);
  }

  return str;
};

// use safeKey = for easy tinkering in the console.
export const safeKey = (() => {
  // Safely allocate plainObject's inside iife
  // Since this function may get called very frequently -
  // I think it's important to have plainObject's
  // statically defined
  const obj = {};
  const arr = [];

  // ...if for some reason you ever use square brackets on these types...
  // const fun = function() {}
  // const bol = true;
  // const num = 0;
  // const str = '';
  return (key) => {
    // eslint-disable-next-line security/detect-object-injection
    if (obj[key] !== undefined || arr[key] !== undefined) {
      return `SAFE_${key}`;
    } else {
      return key;
    }
  };
})();

/**
 * Generate pagination link header
 * @param baseUrl - base url of the link
 * @param page - current page
 * @param totalPage - number of pages
 */
export function generatePaginationLinks(baseUrl: string, page: number, perPage: number, totalPage: number): string {
  const items = [];

  if (page > 1) {
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=1`,
      rel: 'first',
    });
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=${page - 1}`,
      rel: 'prev',
    });
  }

  if (page < totalPage) {
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=${parseInt(page.toString(), 10) + 1}`,
      rel: 'next',
    });
    items.push({
      link: `${baseUrl}?perPage=${perPage}&page=${totalPage}`,
      rel: 'last',
    });
  }

  return items.map((item) => `<${item.link}>; rel="${item.rel}"`).join(', ');
}

export function generatePaginationLinksWithQuery(baseUrl: string, query: any, totalPage: number): string {
  const items = [];
  const { page = 1 as number, perPage = 10 as number } = query;

  delete query.page;
  delete query.perPage;

  const keys = Object.keys(query);
  const extraParams = [`perPage=${perPage}`];

  keys.forEach((key) => {
    extraParams.push(`${key}=${encodeURI(query[`${key}`])}`);
  });

  const params = extraParams.join('&');

  if (page > 1) {
    items.push({
      link: `${baseUrl}?${params}&page=1`,
      rel: 'first',
    });
    items.push({
      link: `${baseUrl}?${params}&page=${page - 1}`,
      rel: 'prev',
    });
  }

  if (page < totalPage) {
    items.push({
      link: `${baseUrl}?${params}&page=${(page as number) + 1}`,
      rel: 'next',
    });
    items.push({
      link: `${baseUrl}?${params}&page=${totalPage}`,
      rel: 'last',
    });
  }

  return items.map((item) => `<${item.link}>; rel="${item.rel}"`).join(', ');
}

export const addCustomProperties = (
  baseAlias: string,
  queryBuilder: SelectQueryBuilder<any>,
  properties: string[],
): SelectQueryBuilder<any> => {
  queryBuilder = queryBuilder.select(`${baseAlias}.id`);
  let joinProperties: string[] = [];
  let selectProperties: string[] = [];

  for (const property of properties) {
    if (property.indexOf('.') === -1) {
      selectProperties.push(`${baseAlias}.${property}`);
      continue;
    }

    const aliases = [baseAlias, ...property.split('.')];

    for (let i = 1; i < aliases.length; i += 1) {
      const propertyWithTableAlias = `${aliases[safeKey(i - 1)]}.${aliases[safeKey(i)]}`;

      if (i < aliases.length - 1) {
        joinProperties.push(propertyWithTableAlias);
      } else {
        selectProperties.push(propertyWithTableAlias);
      }
    }
  }

  joinProperties = Array.from(new Set(joinProperties));
  selectProperties = Array.from(new Set(selectProperties));

  for (const property of joinProperties) {
    queryBuilder = queryBuilder.leftJoin(property, property.substring(property.lastIndexOf('.') + 1));
  }

  for (const property of selectProperties) {
    queryBuilder = queryBuilder.addSelect(property);
  }

  return queryBuilder;
};
