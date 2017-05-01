var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const User = db.define('user', {
   name: {
       type: Sequelize.STRING,
       allowNull: false
   },
   email: {
       type: Sequelize.STRING,
       allowNull: false,
       validate: {
            isEmail: true
       }
   }});

const Page = db.define('page', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        urlTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('open', 'closed')
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        }
    },
    {
        getterMethods: {
            route: function() {
                return '/wiki/' + this.urlTitle;
            }
        },
        hooks: {
            beforeValidate: function(page) {
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/(\d+|\W+)/g, '');
            }
        },
        classMethods: {
            findByTag: function(tags) {
                return Page.findAll({
                    // $overlap matches a set of possibilities
                    where : {
                        tags: {
                            $overlap: [tags]
                        }
                    }    
                });
            }
        }
    }
);

Page.belongsTo(User, { as: 'author' });

module.exports = {
    User,
    Page,
    db
}