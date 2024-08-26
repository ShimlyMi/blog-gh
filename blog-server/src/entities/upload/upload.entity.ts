import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Upload {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}
export default Upload;
