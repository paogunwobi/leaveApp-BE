'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "leaveTypes", deps: []
 * createTable "staffLevels", deps: []
 * createTable "departments", deps: [staffs]
 * createTable "staffs", deps: [departments, staffLevels, staffLevels]
 * createTable "leaves", deps: [staffs, staffs, leaveTypes, staffs]
 *
 **/

var info = {
    "revision": 1,
    "name": "first-migration",
    "created": "2021-04-03T08:39:50.437Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "leaveTypes",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "type": {
                        "type": Sequelize.STRING,
                        "field": "type"
                    },
                    "code": {
                        "type": Sequelize.STRING,
                        "field": "code"
                    },
                    "isPreAllocated": {
                        "type": Sequelize.BOOLEAN,
                        "field": "isPreAllocated"
                    },
                    "maxDays": {
                        "type": Sequelize.INTEGER,
                        "field": "maxDays"
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "staffLevels",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "levelName": {
                        "type": Sequelize.STRING,
                        "field": "levelName"
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "departments",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name"
                    },
                    "code": {
                        "type": Sequelize.STRING,
                        "field": "code"
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "lineManager": {
                        "type": Sequelize.INTEGER,
                        "field": "lineManager",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "staffs",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "staffs",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "firstName": {
                        "type": Sequelize.STRING,
                        "field": "firstName"
                    },
                    "lastName": {
                        "type": Sequelize.STRING,
                        "field": "lastName"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "staffCode": {
                        "type": Sequelize.STRING,
                        "field": "staffCode"
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password"
                    },
                    "phoneNumber": {
                        "type": Sequelize.STRING,
                        "field": "phoneNumber"
                    },
                    "eligible": {
                        "type": Sequelize.BOOLEAN,
                        "field": "eligible"
                    },
                    "status": {
                        "type": Sequelize.ENUM('ACTIVE', 'DISABLED', 'REMOVED'),
                        "field": "status"
                    },
                    "role": {
                        "type": Sequelize.ENUM('ADMIN', 'LINE-MANAGER', 'STAFF'),
                        "field": "role"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "departmentId": {
                        "type": Sequelize.INTEGER,
                        "field": "departmentId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "departments",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "staffLevelId": {
                        "type": Sequelize.INTEGER,
                        "field": "staffLevelId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "staffLevels",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "staffId": {
                        "type": Sequelize.INTEGER,
                        "field": "staffId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "staffLevels",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "leaves",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "code": {
                        "type": Sequelize.STRING,
                        "field": "code"
                    },
                    "totalLeaveDays": {
                        "type": Sequelize.INTEGER,
                        "field": "totalLeaveDays"
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description"
                    },
                    "department": {
                        "type": Sequelize.STRING,
                        "field": "department"
                    },
                    "status": {
                        "type": Sequelize.ENUM('NOT-APPLIED', 'PENDING', 'APPROVED', 'ON-GOING', 'CANCELLED', 'COMPLETED', 'REJECTED'),
                        "field": "status"
                    },
                    "leaveStartDate": {
                        "type": Sequelize.STRING,
                        "field": "leaveStartDate"
                    },
                    "leaveEndDate": {
                        "type": Sequelize.STRING,
                        "field": "leaveEndDate"
                    },
                    "resumptionDate": {
                        "type": Sequelize.STRING,
                        "field": "resumptionDate"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "staffId": {
                        "type": Sequelize.INTEGER,
                        "field": "staffId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "staffs",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "approverId": {
                        "type": Sequelize.INTEGER,
                        "field": "approverId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "staffs",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "leaveTypeId": {
                        "type": Sequelize.INTEGER,
                        "field": "leaveTypeId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "leaveTypes",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "leaveId": {
                        "type": Sequelize.INTEGER,
                        "field": "leaveId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "staffs",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["departments", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["leaves", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["leaveTypes", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["staffs", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["staffLevels", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
