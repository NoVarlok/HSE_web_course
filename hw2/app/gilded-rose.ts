import { runInThisContext } from "vm";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if(this.items[i].name.includes('Sulfuras')){
                continue;
            }
            var delta_quality: number = -1
            if(this.items[i].name.includes('Aged Brie')){
                delta_quality = 1
            }
            if(this.items[i].name.includes('Backstage')){
                if(this.items[i].sellIn <= 0){
                    this.items[i].quality = 0
                    delta_quality = 0
                }else if(this.items[i].sellIn <= 5){
                    delta_quality = 3
                }else if(this.items[i].sellIn <= 10){
                    delta_quality = 2
                }else{
                    delta_quality = 1
                }
            }
            if(this.items[i].name.includes('Conjured')){
                delta_quality *= 2
            }
            if(this.items[i].sellIn <= 0){
                delta_quality *= 2
            }
            this.items[i].quality += delta_quality
            this.items[i].sellIn--

            this.items[i].quality = Math.max(this.items[i].quality, 0)
            this.items[i].quality = Math.min(this.items[i].quality, 50)

        }
        return this.items;
    }
}
