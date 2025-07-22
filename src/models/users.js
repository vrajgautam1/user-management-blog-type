module.exports = (Sequelize, datatypes)=>{
  const Users = Sequelize.define("Users", {
    id:{
      type: datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name:{
      type: datatypes.STRING,
      allowNull: false
    },
    role:{
      type: datatypes.STRING, 
      defaultValue: "user"
    },
    email:{
      type: datatypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: datatypes.STRING,
      allowNull: false
    }
  },{
    timestamps: true
  })
  return Users
}