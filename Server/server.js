require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();

const { sequelize } = require("./src/database");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

sequelize.query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))")
  .then(() => {
    console.log('ONLY_FULL_GROUP_BY mode has been removed');
})
  .catch(err => {
    console.error('Failed to remove ONLY_FULL_GROUP_BY mode:', err);
});

const userRoutes = require("./src/api/Users/Routes");
const restaurantRoutes = require("./src/api/Restaurants/Routes");
const responsableRoutes = require("./src/api/Responsables/Routes");
const reservationRoutes = require("./src/api/Reservations/Routes");
const avisRoutes = require("./src/api/Avis/Routes");


app.use("/api/user/", userRoutes);
app.use("/api/restaurant/", restaurantRoutes);
app.use("/api/responsable/", responsableRoutes);
app.use("/api/reservation/", reservationRoutes);
app.use("/api/avis/", avisRoutes);


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});