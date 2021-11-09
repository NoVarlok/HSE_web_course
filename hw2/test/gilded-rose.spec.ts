import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('normal items', function() {
        const gildedRose = new GildedRose([ new Item("+5 Dexterity Vest", 3, 6) ]);
        const sellIns = [2, 1, 0, -1, -2]
        const qualities = [5, 4, 3, 1, 0]
        
        for (let i = 0; i < sellIns.length; i++) {
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal('+5 Dexterity Vest');
            expect(items[0].sellIn).to.equal(sellIns[i])
            expect(items[0].quality).to.equal(qualities[i])
        }
    });

    it('Conjured', function() {
        const gildedRose = new GildedRose([ new Item("Conjured Mana Cake", 3, 13) ]);
        const sellIns = [2, 1, 0, -1, -2]
        const qualities = [11, 9, 7, 3, 0, 0]
        
        for (let i = 0; i < sellIns.length; i++) {
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal('Conjured Mana Cake');
            expect(items[0].sellIn).to.equal(sellIns[i])
            expect(items[0].quality).to.equal(qualities[i])
        }
    });

    it('Aged Brie', function() {
        const gildedRose = new GildedRose([ new Item("Aged Brie", 3, 48) ]);
        const sellIns = [2, 1, 0, -1]
        const qualities = [49, 50, 50, 50]
        
        for (let i = 0; i < sellIns.length; i++) {
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal('Aged Brie');
            expect(items[0].sellIn).to.equal(sellIns[i])
            expect(items[0].quality).to.equal(qualities[i])
        }
    });

    it('Sulfuras, Hand of Ragnaros', function() {
        const gildedRose = new GildedRose([ new Item("Sulfuras, Hand of Ragnaros", 2, 80) ]);
        const sellIns = [2, 2, 2, 2]
        const qualities = [80, 80, 80, 80]
        
        for (let i = 0; i < sellIns.length; i++) {
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal('Sulfuras, Hand of Ragnaros');
            expect(items[0].sellIn).to.equal(sellIns[i])
            expect(items[0].quality).to.equal(qualities[i])
        }
    });

    it('Backstage', function() {
        const gildedRose = new GildedRose([ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10) ]);
        const sellIns = [5, 4, 3, 2, 1, 0, -1, -2]
        const qualities = [12, 15, 18, 21, 24, 27, 0, 0]
        
        for (let i = 0; i < sellIns.length; i++) {
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
            expect(items[0].sellIn).to.equal(sellIns[i])
            expect(items[0].quality).to.equal(qualities[i])
        }
    });
});
