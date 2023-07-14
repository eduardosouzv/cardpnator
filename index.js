class MenuDomain {
    constructor(domain) {
        Object.assign(this, domain);
    }
}

class Category extends MenuDomain {
    constructor(domain) {
        super(domain);
        this.products = this.products.map(p => new Product(p));
    }
}

class StockDomain extends MenuDomain {
    constructor(domain) {
        super(domain);

        this.available = this.isAvailable();
    }

    isAvailable() {
        if (this.available == false)
            return false;

        if (!StockConfiguration.stockIsEnabled)
            return true;

        if (StockConfiguration.shouldPauseWhenStockIs && this.stockQuantity <= StockConfiguration.pauseStockAt)
            return false;

        return true;
    }
}

class Product extends StockDomain {

}

class ExtraCategory extends MenuDomain {
    constructor(domain) {
        super(domain);
        this.options = this.options.map(o => new ExtraOption(o));
    }
}

class ExtraOption extends StockDomain {

}

var StockConfiguration = {};

class Cardapnator {
    constructor(cardapio) {
        this.cardapio = cardapio
        this.final_cardapio = cardapio
    }

    build() {
        StockConfiguration.stockIsEnabled = this.cardapio.info.has_stock;
        StockConfiguration.shouldPauseWhenStockIs = this.cardapio.info.stock_configuration.enable_pause_item_option;
        StockConfiguration.pauseStockAt = this.cardapio.info.stock_configuration.pause_item_when_stock_is;

        this.final_cardapio.menu.general = this.cardapio.menu.general.map(c => new Category(c))
        this.final_cardapio.menu.extras = this.cardapio.menu.extras.map(e => new ExtraCategory(e));

        return this.final_cardapio;
    };
}

module.exports = Cardapnator