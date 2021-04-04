'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "department" from table "leaves"
 * addColumn "departmentId" to table "leaves"
 * changeColumn "status" on table "leaves"
 *
 **/

var info = {
    "revision": 2,
    "name": "first-migration",
    "created": "2021-04-04T20:59:17.056Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "leaves",
                "department",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "leaves",
                "departmentId",
                {
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
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "leaves",
                "status",
                {
                    "type": Sequelize.ENUM('PENDING', 'APPROVED', 'ON-GOING', 'CANCELLED', 'COMPLETED', 'REJECTED'),
                    "field": "status"
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "removeColumn",
            params: [
                "leaves",
                "departmentId",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addColumn",
            params: [
                "leaves",
                "department",
                {
                    "type": Sequelize.STRING,
                    "field": "department"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "leaves",
                "status",
                {
                    "type": Sequelize.ENUM('NOT-APPLIED', 'PENDING', 'APPROVED', 'ON-GOING', 'CANCELLED', 'COMPLETED', 'REJECTED'),
                    "field": "status"
                },
                {
                    transaction: transaction
                }
            ]
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
