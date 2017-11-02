if (typeof validate !== "function") {
    validate = require('validate.js');
}

const Validators = {
    validateAppointment: function (data) {
        return validate(data, {
            initDate: {
                presence: {
                    message: "La fecha de inicio es requerida"
                }

            },
            endDate: {
                presence: {
                    message: "La fecha de fin es requerida"
                }
            },
            pet: {
                presence: {
                    message: "La mascota es requerida"
                }
            }
        });
    },
    validateCustomer: function (data) {
        return validate(data, {
            firstName: {
                presence: {
                    message: "El nombre es requerido"
                },
                length: {
                    minimum: 3,
                    maximum: 20,
                    message: "debe tener entre 3 y 20 caracteres"
                }
            },
            lastName: {
                presence: {
                    message: "El apellido es requerido"
                },
                length: {
                    minimum: 3,
                    maximum: 20,
                    message: "debe tener entre 3 y 20 caracteres"
                }
            },
            dni: {
                presence: {
                    message: "El apellido es requerido"
                },
                format: {
                    pattern: /^\d{8}[a-zA-Z]{1}$|^[a-zA-Z][0-9]{7}[a-zA-Z]$/,
                    message: "no cumple con el patron"
                }
            },
            phone: {
                presence: {
                    message: "El apellido es requerido"
                },
                numericality: {
                    onlyInteger: true,
                    message: "debe ser solo numero"
                }
            },
            email: {
                email: {
                    message: "no parece un mail valido"
                }
            }
        });
    },
    validatePet: function (data) {
        return validate(data, {
            name: {
                presence: { message: "El nombre es requerido" },
                length: {
                    minimum: 2,
                    maximum: 20,
                    message: "debe tener entre 2 y 20 caracteres"
                }
            },
            birthday: {
                presence: { message: "Debe especificar una fecha de nacimiento" }
            },
            specie: {
                presence: { message: "La especie es requerida" },
                length: {
                    minimum: 2,
                    maximum: 20,
                    message: "debe tener entre 2 y 20 caracteres"
                }
            },
            race: {
                presence: { message: "La raza es requerida" },
                length: {
                    minimum: 2,
                    maximum: 20,
                    message: "debe tener entre 2 y 20 caracteres"
                }
            },
            chipNumber: {
                presence: { message: "El numero de chip es requerido" },
                length: {
                    minimum: 2,
                    maximum: 20,
                    message: "debe tener entre 2 y 20 caracteres"
                }
            },
            owner: {
                presence: { message: "El dueño es requerido" }
            }
        });
    },
    validateVet: function (data) {
        return validate(data, {
            name: {
                presence: { message: "El nombre es requerido" },
                length: {
                    minimum: 3,
                    maximum: 20,
                    message: "debe tener entre 3 y 20 caracteres"
                },

            }
        });
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Validators;
}