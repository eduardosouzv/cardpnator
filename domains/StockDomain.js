const MenuDomain = require('./MenuDomain');

class StockDomain extends MenuDomain {
    constructor(domain) {
        super(domain);

        this.available = this.isAvailable();
    }

    isAvailable() {
        if (!this.available)
            return false;

        if (!globalThis.StockConfiguration.stockIsEnabled)
            return true;

        if (globalThis.StockConfiguration.shouldPauseWhenStockIs && this.stockQuantity <= globalThis.StockConfiguration.pauseStockAt)
            return false;

        return true;
    }
}

module.exports = StockDomain;
