require('./globals');

const Category = require('./domains/Category');
const ExtraCategory = require('./domains/ExtraCategory');

class Cardapnator {
    constructor(cardapio) {
        this.cardapio = cardapio;
        this.final_cardapio = cardapio;
    }

    build() {
        try {
            globalThis.StockConfiguration.stockIsEnabled = this.cardapio.info.has_stock;
            globalThis.StockConfiguration.shouldPauseWhenStockIs = this.cardapio.info.stock_configuration.enable_pause_item_option;
            globalThis.StockConfiguration.pauseStockAt = this.cardapio.info.stock_configuration.pause_item_when_stock_is;
        } catch (error) {
            console.error('[Cardapnator] - Erro ao inicializar o stockConfiguration')
        }

        this.final_cardapio.menu.general = this.cardapio.menu.general.map(c => new Category(c))
        this.final_cardapio.menu.extras = this.cardapio.menu.extras.map(e => new ExtraCategory(e));

        return this.final_cardapio;
    };

    setInfo(info) {
        this.cardapio.info = info;
        return this;
    }

    setMenuType(type) {
        globalThis.MenuTypeConfiguration = type;
        return this;
    }

    getMenu() {
        this.cardapio.menu.general = this.cardapio.menu.general.map(c => new Category(c));
        this.cardapio.menu.extras = this.cardapio.menu.extras.map(e => new ExtraCategory(e));

        return this;
    }
}

module.exports = Cardapnator