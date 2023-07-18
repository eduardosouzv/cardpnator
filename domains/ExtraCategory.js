const ExtraOption = require('./ExtraOption');
const MenuDomain = require('./MenuDomain');

class ExtraCategory extends MenuDomain {
    constructor(domain) {
        super(domain);
        this.options = this.options.map((o) => new ExtraOption(o));
    }
}

module.exports = ExtraCategory;
