import { flatArrayToTree, getTokenFromHeader } from './functions';

describe('flatArrayToTree', () => {
  it('should be defined', () => {
    const rawData = [
      {
        name: 'parent1',
        id: 1,
      },
      {
        name: 'chil1',
        id: 2,
        parentId: 1,
      },
      {
        name: 'chil2',
        id: 3,
        parentId: 2,
      },
    ];
    const result = flatArrayToTree(rawData)[0];

    expect(result).toBeDefined();
    expect(result.children).toBeDefined();
    expect(result.pathName).toEqual('parent1');
    const child1 = result.children[0];

    expect(child1).toBeDefined();
    expect(child1.id).toEqual(2);
    expect(child1.pathName).toEqual('parent1 / chil1');
    expect(child1.children).toBeDefined();

    const child2 = child1.children[0];

    expect(child2).toBeDefined();
    expect(child2.id).toEqual(3);
    expect(child2.pathName).toEqual('parent1 / chil1 / chil2');
    expect(child2.children).toBeDefined();
  });

  it('getTokenFromHeader should return token', () => {
    const headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6IkFkbWluIiwicGVybWlzc2lvbnMiOlsidXNlcnNfY3JlYXRlIiwidXNlcnNfdXBkYXRlIiwidXNlcnNfbGlzdCIsInVzZXJzX2RldGFpbCIsInVzZXJzX2RlbGV0ZSIsInVzZXJzX2V4cG9ydCIsInVzZXJzX2ltcG9ydCIsImJ1c2luZXNzLXVuaXRzX2NyZWF0ZSIsImJ1c2luZXNzLXVuaXRzX3VwZGF0ZSIsImJ1c2luZXNzLXVuaXRzX2xpc3QiLCJidXNpbmVzcy11bml0c19kZXRhaWwiLCJidXNpbmVzcy11bml0c19kZWxldGUiLCJidXNpbmVzcy11bml0c19leHBvcnQiLCJidXNpbmVzcy11bml0c19pbXBvcnQiLCJmaWxlc19jcmVhdGUiLCJmaWxlc19kZWxldGUiLCJyb2xlcy1tYXN0ZXJfbGlzdCIsIm9yZ2FuaXphdGlvbi10eXBlcy1tYXN0ZXJfbGlzdCIsImRhc2hib2FyZF9yZXBvcnQiLCJ1c2Vyc19hY3RpdmF0ZSIsInVzZXJzX2RlYWN0aXZhdGUiXSwiaWF0IjoxNjE5NTE2NDA1LCJleHAiOjE2MjAxMjEyMDUsImF1ZCI6IlJlZFBsYXRlX3dlYiIsImlzcyI6ImxvY2FsaG9zdCIsInN1YiI6IngyZWJrN2I3UW8iLCJqdGkiOiJKU2pPOXQ3SSJ9.3LDyTF0QnMT4vaHtaZa1QzUg-euKJDYkVbj3R3jt490',
    };
    const token = getTokenFromHeader(headers);

    expect(token).toBeDefined();

    expect(token).toEqual(headers.authorization.replace('Bearer ', ''));
  });

  it('getTokenFromHeader should return null', () => {
    const headers = {};

    const token = getTokenFromHeader(headers);

    expect(token).toEqual(null);
  });
});
