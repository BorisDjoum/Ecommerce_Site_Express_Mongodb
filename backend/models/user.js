//mongoose représente l'orm de mongodb
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    //required true rend le champ obligatoire dans la base de données
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true}
});

//améliore les messages d'erreur lors de l'enregistrement des données uniques
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)