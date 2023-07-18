const StockDomain = require('./StockDomain');

class Product extends StockDomain {
    constructor(domain) {
        super(domain);
        this.price = globalThis.MenuTypeConfiguration === 'table' ? this.tablePrice : this.price;
        this.oldPrice = globalThis.MenuTypeConfiguration === 'table' ? this.tableOldPrice : this.oldPrice;
    }
}

module.exports = Product;
