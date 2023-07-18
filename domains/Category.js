const MenuDomain = require('./MenuDomain');
const Product = require('./Product');

class Category extends MenuDomain {
    constructor(domain) {
        super(domain);
        this.products = this.products.map(p => new Product(p));
    }
}

module.exports = Category;