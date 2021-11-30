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

const min_quality: number = 0
const max_quality: number = 50
const conjured_delta_quality_multiplier: number = 2
const expired_delta_quality_multiplier = 2
const normal_sellin_reduction: number = -1

function getDeltaQualityMultiplier(item: Item): number{
    var delta_quality_multiplier: number = 1
    if (item.name.includes('Conjured')){
        delta_quality_multiplier *= conjured_delta_quality_multiplier
    }
    if (item.sellIn <= 0){
        delta_quality_multiplier *= expired_delta_quality_multiplier
    }
    return delta_quality_multiplier
}

function fixItemQuality(item): void {
    item.quality = Math.max(item.quality, min_quality)
    item.quality = Math.min(item.quality, max_quality)
}

function processSulfuras(item: Item): void {
}

function processAgedBrie(item: Item): void {
    const delta_quality: number = getDeltaQualityMultiplier(item)
    item.quality += delta_quality
    item.sellIn += normal_sellin_reduction
    fixItemQuality(item)
}

function processBackstage(item: Item): void {
    const expired_sellin: number = 0
    const hot_sellin: number = 5
    const hot_quality_change = 3
    const increased_sellin: number = 10
    const increaed_quality_change = 2
    const normal_quality_change = 1
    
    var delta_quality = 0
    if (item.sellIn <= expired_sellin) {
        item.quality = 0
    }else if (item.sellIn <= hot_sellin) {
        delta_quality = hot_quality_change
    }else if (item.sellIn <= increased_sellin) {
        delta_quality = increaed_quality_change
    }else{
        delta_quality = normal_quality_change
    }
    delta_quality *= getDeltaQualityMultiplier(item)
    
    item.quality += delta_quality
    item.sellIn += normal_sellin_reduction
    fixItemQuality(item)
}

function processAny(item: Item): void {
    const delta_quality: number = getDeltaQualityMultiplier(item)
    item.quality -= delta_quality
    item.sellIn += normal_sellin_reduction
    fixItemQuality(item)
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if(this.items[i].name.includes('Sulfuras')){
                processSulfuras(this.items[i])
            }
            else if(this.items[i].name.includes('Aged Brie')){
                processAgedBrie(this.items[i])
            }
            else if(this.items[i].name.includes('Backstage')){
                processBackstage(this.items[i])
            }
            else {
                processAny(this.items[i])
            }
        }
        return this.items;
    }
}
