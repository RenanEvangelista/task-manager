import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDepartmentUsersRelationTable1630127250313
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'departments_users_users',
        columns: [
          {
            name: 'departmentsId',
            type: 'uuid',
          },
          {
            name: 'usersId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'DepartmentsUsersUser',
            columnNames: ['usersId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'DepartmentsUsersDepartment',
            columnNames: ['departmentsId'],
            referencedTableName: 'departments',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('departments_users_users', true, true);
  }
}
