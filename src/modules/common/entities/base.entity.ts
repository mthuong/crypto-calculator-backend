import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _entityName: string = '';

  public get entityName(): string {
    return this._entityName;
  }

  public set entityName(value: string) {
    this._entityName = value;
  }
}
