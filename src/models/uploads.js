module.exports = (sequelize, datatypes)=>{
    const Uploads = sequelize.define("uploads", {
        id:{
            type: datatypes.INTEGER,
            primaryKey: true,               //always keep forgetting  this imp topic
            autoIncrement: true,
            allowNull: false
        },
        userId:{
            type: datatypes.INTEGER,
            allowNull: false,
            references: {         //new concept
                model: "users",
                key: "id"
            }
        },
        type:{
            type: datatypes.STRING,
            allowNull: false,
            defaultValue: "general",
            validate: {
                isIn: [["profile", "cover", "general"]]
            }
        },
        filename:{
            type: datatypes.STRING,
            allowNull: false
        },
        originalName:{
            type: datatypes.STRING
        },
        size:{
            type: datatypes.INTEGER
        },
        path:{
            type: datatypes.STRING
        }
    },{
        timestamps: true
    })

    Uploads.associate = (models)=>{
        Uploads.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        })
    }

    return Uploads
}