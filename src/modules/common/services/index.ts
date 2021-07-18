import { EntityManager, ObjectLiteral, DeepPartial } from 'typeorm';

export interface FindService<Entity extends ObjectLiteral> {
  findById(id: number, manager?: EntityManager): Promise<Entity | undefined>;
  findByHashId(hashId: string, manager?: EntityManager): Promise<Entity | undefined>;
}

export interface FindAllService<Entity extends ObjectLiteral> {
  findAll(params: { [key: string]: any }, manager?: EntityManager): Promise<[Entity[], number]>;
}

export interface CreateService<Entity extends ObjectLiteral> {
  create(entity: Entity, manager?: EntityManager): Promise<Entity>;
}

export interface UpdateService<Entity extends ObjectLiteral> {
  update<T extends DeepPartial<Entity>>(entity: Entity, data: T, manager?: EntityManager): Promise<Entity>;
  updateById<T extends DeepPartial<Entity>>(id: number, data: T, manager?: EntityManager): Promise<Entity>;
  updateByHashId<T extends DeepPartial<Entity>>(hashId: string, data: T, manager?: EntityManager): Promise<Entity>;
}

export interface DeleteService<Entity extends ObjectLiteral> {
  softDelete(entity: Entity, manager?: EntityManager): Promise<Entity>;
  softDeleteById(id: number, manager?: EntityManager): Promise<Entity>;
  softDeleteByHashId(hashId: string, manager?: EntityManager): Promise<Entity>;
}

export interface FindAllService<Entity extends ObjectLiteral> {
  findAll(params: { [key: string]: any }, manager?: EntityManager): Promise<[Entity[], number]>;
}

export type Service<Entity extends ObjectLiteral> = FindService<Entity> &
  FindAllService<Entity> &
  CreateService<Entity> &
  UpdateService<Entity> &
  DeleteService<Entity>;
