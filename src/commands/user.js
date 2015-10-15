var _ = require('underscore');
var _s = require('underscore.string');
var print = require('../core/print');
var api = require('../core/api');

module.exports = function() {
    var args = Array.prototype.slice.call(arguments),
        action = args.shift();

    switch(action) {
        case 'lookup':
            api.searchForUser(args.join(' '))
                .then(
                    function(response) {
                        var users = response.data;
                        var rows = _.map(users, function(user) {
                            return [user.displayName, user.name, user.emailAddress];
                        });
                        print.table([ 'Name', 'Username', 'Email' ], rows, {
                            widths: [ 30, 30, 60 ]
                        });
                    },
                    function(e) {
                        print.error('There was a problem looking up users ' + e ? e.message : '');
                    }
                );
        break;
        default:
            print.error('Command not supported: ' + action);
        break;
    }
};

module.exports.moduleDescription = 'User commands';
module.exports.moduleDescriptionExtra = 'Example: jira user lookup foobar';
