module.exports = (sequelize, DataTypes) => {
    const Blogs = sequelize.define("Blogs", {
        id: {
            type: DataTypes.INTEGER(25),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        published: {
            type: DataTypes.STRING(25),
            allowNull: false,
        }
    });
    return Blogs;
};