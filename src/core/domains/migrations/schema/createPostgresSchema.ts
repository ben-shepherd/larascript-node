import Postgres from "@src/core/domains/database/providers-db/Postgres";
import { App } from "@src/core/services/App";
import { DataTypes } from "sequelize";

/**
 * Creates the migrations table in Postgres if it does not already exist
 *
 * @returns {Promise<void>}
 */
const createPostgresSchema = async () => {
    const sequelize = App.container('db').provider<Postgres>().getSequelize();
    const queryInterface = sequelize.getQueryInterface();

    if ((await queryInterface.showAllTables())?.includes('migrations')) {
        return;
    }

    await queryInterface.createTable('migrations', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: 'VARCHAR',
            allowNull: false
        },
        batch: {
            type: 'INT',
            allowNull: false
        },
        checksum: {
            type: 'VARCHAR',
            allowNull: false
        },
        appliedAt: {
            type: 'TIMESTAMPTZ',
            allowNull: false
        }
    })
}

export default createPostgresSchema