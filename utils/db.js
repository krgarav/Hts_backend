import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();  // Loads environment variables from the .env file


export const sequelize = new Sequelize("hts", "root", "root", {
    dialect: "mysql",
    // host: "database",
    // port: 3307
    host: "localhost",
});

async function fun() {
    try {
        await sequelize.authenticate();
        console.log('Db connection established successfully');
    } catch (error) {
        console.log("Unable to create db connection", error);
    }
}
fun();

export default sequelize;
