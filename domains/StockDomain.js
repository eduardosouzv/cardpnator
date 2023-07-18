const MenuDomain = require('./MenuDomain');

class StockDomain extends MenuDomain {
    constructor(domain) {
        super(domain);
        this.hasStock = this.checkHasStock();
    }

    checkHasStock() {
        if (!StockConfiguration.stockIsEnabled)
            return true;

        if (StockConfiguration.shouldPauseWhenStockIs && this.stockQuantity <= StockConfiguration.pauseStockAt)
            return false;

        return true;
    }
}

module.exports = StockDomain;
