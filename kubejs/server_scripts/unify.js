//priority: 10000

onEvent('recipes', event => {

  function unifyOre(isTCsupported, isGem, nameUnify, oreItem, purifiedOreItem, ingotItem, dustItem, dirtyDustItem, blockItem, nuggetItem, coinItem, gearItem, plateItem, crushedItem, rodItem, wireItem, moltenFluid, castingBlockTime, castingIngotTime, castingNuggetTime, castingGearTime, crusherBonusChance, crusherBonus, tinyCrusherBonus, oreDoublingOutput, oreDoublingBonus, orePieceItem, clumpItem, shardItem, crystalItem, alchemicalDustItem, alchemicalInfuseType, dirtySlurry, cleanSlurry, chunkItem, purifiedCrushedItem, tinyDustItem, sheetmetalItem) {

  //-----------------------------------------------------
  //unifyOre Ingot
  //-----------------------------------------------------

  if (ingotItem !== null && isGem == false) {
  
    //Crafting Remove
    event.remove({ output: `#forge:ingots/${nameUnify}`, type: 'minecraft:crafting_shapeless'});
    event.remove({ output: `#forge:ingots/${nameUnify}`, type: 'minecraft:crafting_shaped'});
  
    //Smelting Remove
    event.remove({ output: `#forge:ingots/${nameUnify}`, type: 'minecraft:smelting'});
    event.remove({ output: `#forge:ingots/${nameUnify}`, type: 'minecraft:blasting'});
  
    //Alloy Kiln Remove
    event.remove({id: `immersiveengineering:alloysmelter/${nameUnify}`})
  
    //Arc Furnace Remove
    event.remove({id: `immersiveengineering:arcfurnace/alloy_${nameUnify}`})
  
    //Thermal Induction Smelter
    event.remove({id: `thermal:machine/smelter/smelter_alloy_${nameUnify}`})
    event.remove({id: `thermal:compat/create/smelter_create_alloy_${nameUnify}`})
    event.remove({id: `thermal:compat/tconstruct/smelter_alloy_tconstruct_${nameUnify}_ingot`})

    //Blast Chiller
    event.remove({id: `thermal:compat/tconstruct/chiller_tconstruct_${nameUnify}_ingot`});

  }

  if (ingotItem !== null && isGem == true) {

    event.remove({id: `mekanism:processing/${nameUnify}/from_dust`})

    //Crafting Remove
    event.remove({ output: `#forge:gems/${nameUnify}`, type: 'minecraft:crafting_shapeless'});
    event.remove({ output: `#minecraft:${nameUnify}s`, type: 'minecraft:crafting_shapeless'});
    event.remove({ output: `#forge:${nameUnify}`, type: 'minecraft:crafting_shapeless'});
    event.remove({ output: `#forge:gems/${nameUnify}`, type: 'minecraft:crafting_shaped'});
    event.remove({ output: `#minecraft:${nameUnify}s`, type: 'minecraft:crafting_shaped'});
    event.remove({ output: `#forge:${nameUnify}`, type: 'minecraft:crafting_shaped'});

    //Smelting Remove
    event.remove({ output: `#forge:gems/${nameUnify}`, type: 'minecraft:smelting'});
    event.remove({ output: `#minecraft:${nameUnify}s`, type: 'minecraft:smelting'});
    event.remove({ output: `#forge:${nameUnify}`, type: 'minecraft:smelting'});
    event.remove({ output: `#forge:gems/${nameUnify}`, type: 'minecraft:blasting'});
    event.remove({ output: `#minecraft:${nameUnify}s`, type: 'minecraft:blasting'});
    event.remove({ output: `#forge:${nameUnify}`, type: 'minecraft:blasting'});

  }

  if (ingotItem !== null && blockItem !== null && nameUnify !== 'quartz' && nameUnify !== 'ender_pearl') {

  event.shapeless(item.of(ingotItem, 9), [blockItem])

  }

  if (ingotItem !== null && nuggetItem !== null) {

  event.shaped(ingotItem, ['III', 'III', 'III'], {
      I: nuggetItem
  })

  }

  if (oreItem !== null && ingotItem !== null) {

  event.smelting(ingotItem, oreItem).xp(0.5)
  event.recipes.minecraft.blasting(ingotItem, oreItem).xp(0.5)

  }

  if (crushedItem !== null && ingotItem !== null) {

  event.smelting(ingotItem, crushedItem).xp(0.1)
  event.recipes.minecraft.blasting(ingotItem, crushedItem).xp(0.1)

  }

  if (purifiedCrushedItem !== null && ingotItem !== null) {

    event.smelting(ingotItem, purifiedCrushedItem).xp(0.1)
    event.recipes.minecraft.blasting(ingotItem, purifiedCrushedItem).xp(0.1)
  
  }

  if (dustItem !== null && ingotItem !== null && isGem == false) {

  event.smelting(ingotItem, dustItem).xp(0.35)
  event.recipes.minecraft.blasting(ingotItem, dustItem).xp(0.35)

  }

  if (moltenFluid !== null && ingotItem !== null && isGem == false) {

  //Tinker's Casting
  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/ingot_gold_cast`})
  event.custom({
      "type": "tconstruct:casting_table",
      "cast": {
        "item": "tconstruct:ingot_cast"
      },
      "fluid": {
        "name": moltenFluid,
        "amount": 144
      },
      "result": ingotItem,
      "cooling_time": castingIngotTime
  })

  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/ingot_sand_cast`})
  event.custom({
      "type": "tconstruct:casting_table",
      "cast": {
        "tag": "tconstruct:casts/single_use/ingot"
      },
      "cast_consumed": true,
      "fluid": {
        "name": moltenFluid,
        "amount": 144
      },
      "result": ingotItem,
      "cooling_time": castingIngotTime
  })

  //Thermal Chiller
  event.custom({
    "type": "thermal:chiller",
    "input": [
      {
        "fluid": moltenFluid,
        "amount": 144
      },
      {
        "item": "thermal:chiller_ingot_cast"
      }
    ],
    "result": [
      {
        "item": ingotItem,
        "count": 1
      }
    ],
    "energy": 5000
  })

  }

  //Manual Recipe
  event.remove({id: `thermal:compat/tconstruct/smelter_alloy_tconstruct_pigiron_ingot`}) //Typo on Thermal side. Fixed on the Next Release.
  event.remove({id: `thermal:compat/tconstruct/smelter_alloy_tconstruct_soulsteel_ingot`}) //Secret Ingot. Probably removed in next release.
  event.remove({id: `thermal:compat/tconstruct/smelter_alloy_tconstruct_tinkers_bronze_ingot`}) //Secret Ingot. Probably removed in next release.

  //-----------------------------------------------------
  //unifyOre Nugget
  //-----------------------------------------------------

  if (nuggetItem !== null) {
  
    //Crafting
    event.remove({ output: `#forge:nuggets/${nameUnify}`, type: 'minecraft:crafting_shapeless'});
  
  }

  if (nuggetItem !== null && ingotItem !== null) {

    event.shapeless(item.of(nuggetItem, 9), [ingotItem])

  }

  if (nuggetItem !== null && crushedItem !== null) {

  //Create Washing
  event.remove({id: `create:splashing/crushed_${nameUnify}_ore`})
  event.remove({id: `create:splashing/crushed_${nameUnify}`})
  event.remove({id: `create:splashing/thermal/crushed_${nameUnify}_ore`})
  event.remove({id: `create:splashing/iceandfire/crushed_${nameUnify}_ore`})
  event.remove({id: `create:splashing/mekanism/crushed_${nameUnify}_ore`})
  event.remove({id: `create:splashing/immersiveengineering/crushed_${nameUnify}_ore`})
  event.remove({id: `create:splashing/eidolon/crushed_${nameUnify}_ore`})

  event.recipes.create.splashing([Item.of(nuggetItem, 10), Item.of(nuggetItem, 5).withChance(0.5)], crushedItem)

  }

  if (nuggetItem !== null && purifiedCrushedItem !== null) {

  event.recipes.create.splashing([Item.of(nuggetItem, 10), Item.of(nuggetItem, 5).withChance(0.5)], purifiedCrushedItem)

  }

  if (moltenFluid !== null && nuggetItem !== null && isGem == false) {

  //Tinker's Casting
  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/nugget_gold_cast`})
  event.custom({
      "type": "tconstruct:casting_table",
      "cast": {
        "item": "tconstruct:nugget_cast"
      },
      "fluid": {
        "name": moltenFluid,
        "amount": 16
      },
      "result": nuggetItem,
      "cooling_time": castingNuggetTime
  })

  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/nugget_sand_cast`})
  event.custom({
      "type": "tconstruct:casting_table",
      "cast": {
        "tag": "tconstruct:casts/single_use/nugget"
      },
      "cast_consumed": true,
      "fluid": {
        "name": moltenFluid,
        "amount": 16
      },
      "result": nuggetItem,
      "cooling_time": castingNuggetTime
  })

    //Thermal Chiller
    event.custom({
      "type": "thermal:chiller",
      "input": [
        {
          "fluid": moltenFluid,
          "amount": 16
        },
        {
          "item": "superpackutils:chiller_nugget_cast"
        }
      ],
      "result": [
        {
          "item": nuggetItem,
          "count": 1
        }
      ],
      "energy": 5000
    })

  }

  //Manual Recipe
  event.replaceOutput({}, 'iceandfire:copper_nugget', 'thermal:copper_nugget')
  event.replaceOutput({}, 'iceandfire:silver_nugget', 'thermal:silver_nugget')
  event.replaceOutput({}, 'immersiveengineering:nugget_steel', 'mekanism:nugget_steel')

  //-----------------------------------------------------
  //unifyOre Block
  //-----------------------------------------------------

  if (blockItem !== null && nameUnify !== 'quartz' && nameUnify !== 'ender_pearl') {

  //Crafting
  event.remove({ output: `#forge:storage_blocks/${nameUnify}`, type: 'minecraft:crafting_shaped'});
  event.remove({ output: `#forge:storage_blocks/${nameUnify}`, type: 'minecraft:crafting_shapeless'});
  event.shaped(blockItem, ['III', 'III', 'III'], {
      I: ingotItem
  })

  }

  if (moltenFluid !== null && blockItem !== null && isGem == false) {

  //Tinker's Casting
  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/block`})
  event.custom({
      "type": "tconstruct:casting_basin",
      "fluid": {
        "name": moltenFluid,
        "amount": 1296
      },
      "result": blockItem,
      "cooling_time": castingBlockTime
  })

  //Thermal Chiller
  event.custom({
    "type": "thermal:chiller",
    "input": [
      {
        "fluid": moltenFluid,
        "amount": 1296
      }
    ],
    "result": [
      {
        "item": blockItem,
        "count": 1
      }
    ],
    "energy": 5000
  })

  }

  //-----------------------------------------------------
  //unifyOre Dust & Crushed Ore
  //-----------------------------------------------------
  
  if (crushedItem !== null){

  //Create Milling Remove
  event.remove({ output: crushedItem, type: 'create:milling'});

  //Create Crushing Remove
  event.remove({ output: crushedItem, type: 'create:crushing'});

  }

  if (dustItem !== null && ingotItem !== null) {

  //Crafting
  event.remove({id: `immersiveengineering:crafting/hammercrushing_${nameUnify}`})
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'minecraft:crafting_shapeless'});

  //Thermal Pulverizer - Ingot into Dust
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'thermal:pulverizer'});
  event.remove({ output: `#forge:gems/${nameUnify}`, type: 'thermal:pulverizer'});
  event.remove({ output: `#minecraft:${nameUnify}s`, type: 'thermal:pulverizer'});
  event.recipes.thermal.pulverizer(dustItem, ingotItem).energy(4000)

  //Mekanism Crusher - 1 Ingot into Dust
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'mekanism:crushing'});
  event.remove({ output: `#forge:gems/${nameUnify}`, type: 'mekanism:crushing'});
  event.remove({ output: `#minecraft:${nameUnify}s`, type: 'mekanism:crushing'});
  event.recipes.mekanism.crushing(dustItem, ingotItem)

  //IE Crusher - Ingot into Dust
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'immersiveengineering:crusher'});
  event.remove({ output: `#forge:gems/${nameUnify}`, type: 'immersiveengineering:crusher'});
  event.remove({ output: `#minecraft:${nameUnify}s`, type: 'immersiveengineering:crusher'});
  event.recipes.immersiveengineering.crusher(dustItem, ingotItem)

  //Create Crusher
  event.remove({ output: `#forge:gems/${nameUnify}`, type: 'create:crushing'});
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'create:crushing'});
  event.remove({ output: `#minecraft:${nameUnify}s`, type: 'create:crushing'});

  //Create Milling - 1 Ingot into Dust
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'create:milling'});
  event.remove({ output: `#forge:gems/${nameUnify}`, type: 'create:milling'});
  event.remove({ output: `#minecraft:${nameUnify}s`, type: 'create:milling'});
  event.recipes.create.milling(dustItem, ingotItem)

  //Mekanism Enrichment Chamber
  event.remove({ output: `#forge:dusts/${nameUnify}`, type: 'mekanism:enriching'});
  event.remove({ output: `#forge:gems/${nameUnify}`, type: 'mekanism:enriching'});
  event.remove({ output: `#minecraft:${nameUnify}s`, type: 'mekanism:enriching'});

  //VE Crusher - 1 Ingot into Dust
  event.remove({id: `voluminousenergy:crushing/ores/vanilla/${nameUnify}_ore`})
  event.remove({id: `voluminousenergy:crushing/ores/vanilla/nether_${nameUnify}_ore`})
  event.remove({id: `voluminousenergy:crushing/${nameUnify}`})
  event.custom({
    "type": "voluminousenergy:crushing",
    "ingredient": {
      "item": ingotItem,
      "count": 1
    },
    "process_time": 200,
    "result": {
      "item": dustItem,
      "count": 1
    },
    "rng": {
      "item": "minecraft:air",
      "count": 0,
      "chance": 0
    }
  })

  //Induction Smelter
  event.remove({id: `thermal:machine/smelter/smelter_${nameUnify}_dust`})
  event.recipes.thermal.smelter(ingotItem, dustItem)

  }

  if (oreItem !== null && dustItem !== null && isGem == false && nameUnify !== 'starmetal') {

  //Thermal Pulverizer
  event.recipes.thermal.pulverizer(Item.of(dustItem, oreDoublingOutput), oreItem)

  //Mekanism Enrichment Chamber
  event.recipes.mekanism.enriching(Item.of(dustItem, oreDoublingOutput), oreItem)

  //IE Crusher
  event.recipes.immersiveengineering.crusher(Item.of(dustItem, oreDoublingOutput), oreItem)

  //VE Crusher
  event.custom({
    "type": "voluminousenergy:crushing",
    "ingredient": {
      "item": oreItem,
      "count": 1
    },
    "process_time": 200,
    "result": {
      "item": dustItem,
      "count": oreDoublingOutput
    },
    "rng": {
      "item": "minecraft:air",
      "count": 0,
      "chance": 0
    }
  })

  }

  if (oreItem !== null && ingotItem !== null && isGem == true && nameUnify !== 'charcoal') {

  //Thermal Pulverizer
  event.recipes.thermal.pulverizer(Item.of(ingotItem, oreDoublingOutput), oreItem)
  
  //Mekanism Enrichment Chamber
  event.recipes.mekanism.enriching(Item.of(ingotItem, oreDoublingOutput), oreItem)
  
  //IE Crusher
  event.recipes.immersiveengineering.crusher(Item.of(ingotItem, oreDoublingOutput), oreItem)

  //Create Crusher
  event.recipes.create.crushing([Item.of(ingotItem, oreDoublingOutput), Item.of(ingotItem, oreDoublingBonus).withChance(0.30), Item.of('minecraft:cobblestone').withChance(0.35)], oreItem, 350)
  
  //VE Crusher
  event.custom({
    "type": "voluminousenergy:crushing",
    "ingredient": {
      "item": oreItem,
      "count": 1
    },
    "process_time": 200,
    "result": {
      "item": ingotItem,
      "count": oreDoublingOutput
    },
    "rng": {
      "item": "minecraft:air",
      "count": 0,
      "chance": 0
    }
  })

  }

  if (oreItem !== null && crushedItem !== null && oreItem !== null && isGem == false) {

  //Create Crusher
  event.recipes.create.crushing([crushedItem, Item.of(dustItem).withChance(0.15), Item.of('minecraft:cobblestone').withChance(0.35)], oreItem, 350)

  }

  if (oreItem !== null && purifiedCrushedItem !== null && oreItem !== null && isGem == false) {

  //Create Crusher
  event.recipes.create.crushing([Item.of(purifiedCrushedItem), tinyDustItem, Item.of('minecraft:cobblestone').withChance(0.35)], purifiedOreItem, 200)
  
  }

  if (oreItem !== null && crushedItem !== null && oreItem !== null && isGem == false) {

  //IE Crusher
  event.recipes.immersiveengineering.crusher(Item.of(dustItem, 2), crushedItem, Item.of(crusherBonus).withChance(crusherBonusChance))

  }  

  if (tinyDustItem !== null && dustItem !== null) {

  //Dust
  event.shaped(dustItem, ['II', 'II'], {
      I: tinyDustItem
  })

  //Tiny Dust
  event.shapeless(item.of(tinyDustItem, 4), [dustItem])

  }

  //Manual Recipe
  event.remove({id: 'thermal:compat/create/pulverizer_create_zinc_ore'})
  event.remove({id: `voluminousenergy:crushing/ores/bauxiteore`})
  event.remove({id: `voluminousenergy:crushing/ores/cinnabarore`})
  event.remove({id: `voluminousenergy:crushing/ores/eighzo_ore`})
  event.remove({id: `voluminousenergy:crushing/ores/galena_ore`})
  event.remove({id: `voluminousenergy:crushing/ores/rutileore`})
  event.remove({id: `voluminousenergy:crushing/ores/saltpeterore`})
  event.remove({id: `voluminousenergy:crushing/ores/sulfur`})

  //-----------------------------------------------------
  //unifyOre Purified Crushed Ore
  //-----------------------------------------------------

  if (purifiedCrushedItem !== null && crushedItem !== null) {

  //Purified Crushed Ore
  event.custom({
        "type": "masterfulmachinery:machine_process",
        "structureId": "washer",
        "controllerId": "washer",
        "ticks": 100,
        "inputs": [
            {
                "type": "masterfulmachinery:energy",
                "data":{
                    "amount": 100
                }
            },
            {
                "type": "masterfulmachinery:items",
                "data":{
                    "item": `${crushedItem}`,
                    "count": 1
                }
            },
            {
                "type": "masterfulmachinery:fluids",
                "data":{
                    "fluid": "superpackutils:distilled_water",
                    "amount": 50
                }
            }
        ],
        "outputs":[
            {
                "type": "masterfulmachinery:items",
                "data":{
                    "item":  `${purifiedCrushedItem}`,
                    "count": 1
                }
            }
        ]
  })

  }

  //-----------------------------------------------------
  //unifyOre Mekanism Ore Processing
  //-----------------------------------------------------

  if (dirtyDustItem !== null && dustItem !== null && clumpItem !== null && shardItem !== null) {

    //Create Encased Fan
    event.recipes.create.splashing(dustItem, dirtyDustItem)

    //Crusher
    event.remove({id: `mekanism:processing/${nameUnify}/dirty_dust/from_clump`})
    event.recipes.mekanism.crushing(dirtyDustItem, clumpItem)

    //Purification Chamber
    event.remove({id: `mekanism:processing/${nameUnify}/clump/from_shard`})
    event.recipes.mekanism.purifying(clumpItem, shardItem, {gas: 'mekanism:oxygen', amount: 1})

    //Chemical Injection Chamber
    event.remove({id: `mekanism:processing/${nameUnify}/shard/from_crystal`})
    event.recipes.mekanism.injecting(shardItem, crystalItem, {gas: 'mekanism:hydrogen_chloride', amount: 1})

    //Chemical Crystallizer
    event.remove({id: `mekanism:processing/${nameUnify}/crystal/from_slurry`})
    event.custom({"type":"mekanism:crystallizing","chemicalType":"slurry","input":{"amount":200,"slurry":cleanSlurry},"output":{"item":crystalItem}})

    //Chemical Washer
    event.remove({id: `mekanism:processing/${nameUnify}/slurry/clean`})
    event.custom({"type":"mekanism:washing","fluidInput":{"amount":5,"tag":"minecraft:water"},"slurryInput":{"amount":1,"slurry":dirtySlurry},"output":{"slurry":cleanSlurry,"amount":1}})
  
    //Chemical Dissolution Chamber
    //event.custom({"type":"mekanism:dissolution","itemInput":{"ingredient":{"item":chunkItem}},"gasInput":{"amount":1,"gas":"superpackutils:pure_sulfuric_acid"},"output":{"slurry":dirtySlurry,"amount":200,"chemicalType":"slurry"}})

  }

  if (dirtyDustItem !== null && dustItem !== null && clumpItem !== null && shardItem !== null && oreItem !== null) {

    //Purification Chamber
    event.remove({id: `mekanism:processing/${nameUnify}/clump/from_ore`})
    event.recipes.mekanism.purifying(Item.of(clumpItem, 3), oreItem, {gas: 'mekanism:oxygen', amount: 1})

    //Chemical Injection Chamber
    event.remove({id: `mekanism:processing/${nameUnify}/shard/from_ore`})
    event.recipes.mekanism.injecting(Item.of(shardItem, 4), oreItem, {gas: 'mekanism:hydrogen_chloride', amount: 1})

    //Chemical Dissolution Chamber
    event.remove({id: `mekanism:processing/${nameUnify}/slurry/dirty`})
    event.custom({"type":"mekanism:dissolution","itemInput":{"ingredient":{"item":oreItem}},"gasInput":{"amount":1,"gas":"superpackutils:pure_sulfuric_acid"},"output":{"slurry":dirtySlurry,"amount":1000,"chemicalType":"slurry"}})
  
  }

  if (orePieceItem !== null && alchemicalDustItem !== null && alchemicalInfuseType !== null) {

    //Metallurgic Infuser
    event.recipes.mekanism.metallurgic_infusing(orePieceItem, 'superpackutils:crystal_shard', alchemicalInfuseType, 10)

    //Alchemical Dust into Infusion Type
    //event.custom({"type":"mekanism:infusion_conversion","input":{"ingredient":{"item":alchemicalDustItem}},"output":{"infuse_type":alchemicalInfuseType,"amount":10}})

  }

  if (orePieceItem !== null && nameUnify !== 'osmium' && nameUnify !== 'uranium') {

  }

  //-----------------------------------------------------
  //unifyOre Molten Fluid
  //-----------------------------------------------------

  if (moltenFluid !== null) {

  if (ingotItem !== null) {

  //Melting Ingot
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 144), ingotItem)

  } 

  if (nuggetItem !== null) {

  //Melting Nugget
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 16), nuggetItem)

  } 

  if (blockItem !== null && isTCsupported == false) {

  //Melting Block
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 1296), blockItem)

  }

  if (plateItem !== null) {

  //Melting Plate
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 144), plateItem)

  }

  if (gearItem !== null) {

  //Melting Gear
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 576), gearItem)

  }

  if (dustItem !== null) {

  //Melting Dust
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 144), dustItem)

  }

  if (coinItem !== null) {

  //Melting Coin
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 48), coinItem)

  }

  if (isTCsupported == true) {

  if (blockItem !== null) {

  //Melting Block
  event.recipes.thermal.crucible(fluid.of(moltenFluid, 1296), `#forge:storage_blocks/${nameUnify}`)
  
  }

  }

  }

  //-----------------------------------------------------
  //unifyOre Plate
  //-----------------------------------------------------

  if (plateItem !== null && isGem == false) {

  event.remove({ output:  `#forge:plates/${nameUnify}`});
    
  //IE Metal Press
  event.remove({ output: `#forge:plates/${nameUnify}`, type: 'immersiveengineering:metal_press'});
  event.recipes.immersiveengineering.metal_press(plateItem, ingotItem, 'immersiveengineering:mold_plate')

  //Create Press
  event.remove({ output: `#forge:plates/${nameUnify}`, type: 'create:pressing'});
  event.recipes.create.pressing(plateItem, ingotItem)

  //Advanced Rocketry Rolling Machine
  event.custom({
    "type": "advancedrocketry:rollingmachine",
    "itemingredients":
    [
        
        {
            "item": ingotItem
        }
    ],
    "fluidingredients":
    [
        {
            "fluid": "minecraft:water",
            "amount": 10
        }
    ],
    "time": 300,
    "energy": 20,
    "itemresults":
    {
            "item": plateItem,
            "count": 1
    }
  })

  }

  if (plateItem !== null && blockItem !== null && isGem == false) {

    //Advanced Rocketry Rolling Machine
    event.custom({
      "type": "advancedrocketry:rollingmachine",
      "itemingredients":
      [
          
          {
              "item": blockItem
          }
      ],
      "fluidingredients":
      [
          {
              "fluid": "minecraft:water",
              "amount": 10
          }
      ],
      "time": 300,
      "energy": 20,
      "itemresults":
      {
              "item": plateItem,
              "count": 9
      }
  })

  }

  if (plateItem !== null && moltenFluid !== null && isGem == false) {

  //Tinker's Casting
  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/plate_gold_cast`})
  event.custom({
      "type": "tconstruct:casting_table",
      "cast": {
        "item": "tconstruct:plate_cast"
      },
      "fluid": {
        "name": moltenFluid,
        "amount": 144
      },
      "result": plateItem,
      "cooling_time": castingIngotTime
  })

  event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/plate_sand_cast`})
  event.custom({
      "type": "tconstruct:casting_table",
      "cast": {
        "tag": "tconstruct:casts/single_use/plate"
      },
      "cast_consumed": true,
      "fluid": {
        "name": moltenFluid,
        "amount": 144
      },
      "result": plateItem,
      "cooling_time": castingIngotTime
  })

    //Thermal Chiller
    event.custom({
      "type": "thermal:chiller",
      "input": [
        {
          "fluid": moltenFluid,
          "amount": 144
        },
        {
          "item": "superpackutils:chiller_plate_cast"
        }
      ],
      "result": [
        {
          "item": plateItem,
          "count": 1
        }
      ],
      "energy": 5000
    })

  }

  //-----------------------------------------------------
  //unifyOre Gear
  //-----------------------------------------------------

  if (gearItem !== null) {

  event.remove({ output: `#forge:gears/${nameUnify}`});

  //IE Metal Press
  event.remove({ output: `#forge:gears/${nameUnify}`, type: 'immersiveengineering:metal_press'});
  event.recipes.immersiveengineering.metal_press(gearItem, Item.of(ingotItem, 4), 'immersiveengineering:mold_gear')

  }

  if (gearItem !== null && moltenFluid !== null) {

    //Tinker's Casting
    event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/gear_gold_cast`})
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": {
          "item": "tconstruct:gear_cast"
        },
        "fluid": {
          "name": moltenFluid,
          "amount": 576
        },
        "result": gearItem,
        "cooling_time": castingGearTime
    })
  
    event.remove({id: `tconstruct:smeltery/casting/metal/${nameUnify}/gear_sand_cast`})
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": {
          "tag": "tconstruct:casts/single_use/gear"
        },
        "cast_consumed": true,
        "fluid": {
          "name": moltenFluid,
          "amount": 576
        },
        "result": gearItem,
        "cooling_time": castingGearTime
    })

    //Thermal Chiller
    event.custom({
      "type": "thermal:chiller",
      "input": [
        {
          "fluid": moltenFluid,
          "amount": 576
        },
        {
          "item": "superpackutils:chiller_gear_cast"
        }
      ],
      "result": [
        {
          "item": gearItem,
          "count": 1
        }
      ],
      "energy": 5000
    })
  
    }
  
  //-----------------------------------------------------
  //unifyOre Rod
  //-----------------------------------------------------

  if (rodItem !== null) {
  
  event.remove({ output: `#forge:rods/${nameUnify}`});

  //IE Metal Press
  event.remove({ output: `#forge:rods/${nameUnify}`, type: 'immersiveengineering:metal_press'});
  event.recipes.immersiveengineering.metal_press(Item.of(rodItem, 2), ingotItem, 'immersiveengineering:mold_rod')

  //Create Additions Rolling
  event.remove({id: `createaddition:rolling/${nameUnify}_ingot`})
  event.custom({
      "type":"createaddition:rolling",
      "input": {
            "item": ingotItem
      },
      "result": {
          "item":  rodItem,
          "count": 1
      }
  })

  //Advanced Rocketry Lathe
  event.custom({
    "type": "advancedrocketry:lathe",
        "itemingredients":
        [
            
            {
                "item": ingotItem
            }
        ],
        "time": 300,
        "energy": 20,
        "itemresults":
        {
                "item": rodItem,
                "count": 2
        }
    })

  }

  if (rodItem !== null && moltenFluid !== null) {

  //Thermal Chiller
  event.custom({
    "type": "thermal:chiller",
    "input": [
      {
        "fluid": moltenFluid,
        "amount": 72
      },
      {
        "item": "thermal:chiller_rod_cast"
      }
    ],
    "result": [
      {
        "item": rodItem,
        "count": 1
      }
    ],
    "energy": 5000
  })

  }

  //-----------------------------------------------------
  //unifyOre Wire
  //-----------------------------------------------------

  if (wireItem !== null) {

  event.remove({ output: `#forge:wires/${nameUnify}`});

  //IE Metal Press
  event.remove({ output: `#forge:wires/${nameUnify}`, type: 'immersiveengineering:metal_press'});
  event.recipes.immersiveengineering.metal_press(Item.of(wireItem, 2), ingotItem, 'immersiveengineering:mold_wire')

  //Create Additions Rolling
  event.remove({id: `createaddition:rolling/${nameUnify}_plate`})
  event.custom({
      "type":"createaddition:rolling",
      "input": {
            "item": plateItem
      },
      "result": {
          "item":  wireItem,
          "count": 1
      }
  })

  }

  //Manual Recipe
  event.recipes.immersiveengineering.metal_press('superpackutils:redstone_wire', 'minecraft:redstone', 'immersiveengineering:mold_wire')

  //-----------------------------------------------------
  //unifyOre Coin
  //-----------------------------------------------------

  if (coinItem !== null && moltenFluid !== null) {

    //Thermal Chiller
    event.custom({
      "type": "thermal:chiller",
      "input": [
        {
          "fluid": moltenFluid,
          "amount": 48
        },
        {
          "item": "superpackutils:chiller_coin_cast"
        }
      ],
      "result": [
        {
          "item": coinItem,
          "count": 1
        }
      ],
      "energy": 5000
    })
  
  }

  }

  unifyOre(true, false, 'iron', 'superpackutils:raw_iron', 'superpackutils:purified_raw_iron', 'minecraft:iron_ingot', 'thermal:iron_dust', 'mekanism:dirty_dust_iron', 'minecraft:iron_block', 'minecraft:iron_nugget', 'thermal:iron_coin', 'thermal:iron_gear', 'thermal:iron_plate', 'create:crushed_iron_ore', 'immersiveengineering:stick_iron', 'createaddition:iron_wire', 'tconstruct:molten_iron', 180, 60, 20, 120, 0.15, 'thermal:nickel_dust', 'superpackutils:tiny_nickel_dust', 2, null, 'superpackutils:iron_ore_piece', 'mekanism:clump_iron', 'mekanism:shard_iron', 'mekanism:crystal_iron', 'superpackutils:alchemical_iron_dust', 'superpackutils:alchemical_iron', 'mekanism:dirty_iron', 'mekanism:clean_iron', null, 'superpackutils:purified_crushed_iron_ore', 'superpackutils:tiny_iron_dust', 'immersiveengineering:sheetmetal_iron');
  unifyOre(true, false, 'gold', 'superpackutils:raw_gold', 'superpackutils:purified_raw_gold', 'minecraft:gold_ingot', 'thermal:gold_dust', 'mekanism:dirty_dust_gold', 'minecraft:gold_block', 'minecraft:gold_nugget', 'thermal:gold_coin', 'thermal:gold_gear', 'thermal:gold_plate', 'create:crushed_gold_ore', 'createaddition:gold_rod', 'createaddition:gold_wire', 'tconstruct:molten_gold', 171, 57, 19, 114, 0.30, 'thermal:silver_dust', 'superpackutils:tiny_silver_dust', 2, null, 'superpackutils:gold_ore_piece', 'mekanism:clump_gold', 'mekanism:shard_gold', 'mekanism:crystal_gold', 'superpackutils:alchemical_gold_dust', 'superpackutils:alchemical_gold', 'mekanism:dirty_gold', 'mekanism:clean_gold', null, 'superpackutils:purified_crushed_gold_ore', 'superpackutils:tiny_gold_dust', 'immersiveengineering:sheetmetal_gold');    
  unifyOre(true, false, 'copper', 'superpackutils:raw_copper', 'superpackutils:purified_raw_copper', 'thermal:copper_ingot', 'thermal:copper_dust', 'mekanism:dirty_dust_copper', 'thermal:copper_block', 'thermal:copper_nugget', 'thermal:copper_coin', 'thermal:copper_gear', 'thermal:copper_plate', 'create:crushed_copper_ore', 'createaddition:copper_rod', 'immersiveengineering:wire_copper', 'tconstruct:molten_copper', 150, 50, 17, 100, 0.15, 'thermal:gold_dust', 'superpackutils:tiny_gold_dust', 2, null, 'superpackutils:copper_ore_piece', 'mekanism:clump_copper', 'mekanism:shard_copper', 'mekanism:crystal_copper', 'superpackutils:alchemical_copper_dust', 'superpackutils:alchemical_copper', 'mekanism:dirty_copper', 'mekanism:clean_copper', null, 'superpackutils:purified_crushed_copper_ore', 'superpackutils:tiny_copper_dust', 'immersiveengineering:sheetmetal_copper');
  unifyOre(true, false, 'tin', 'superpackutils:raw_tin', 'superpackutils:purified_raw_tin', 'thermal:tin_ingot', 'thermal:tin_dust', 'mekanism:dirty_dust_tin', 'thermal:tin_block', 'thermal:tin_nugget', 'thermal:tin_coin', 'thermal:tin_gear', 'thermal:tin_plate', 'create:crushed_tin_ore', null, null, 'tconstruct:molten_tin', 117, 39, 13, 78, 0.15, 'thermal:copper_dust', 'superpackutils:tiny_copper_dust', 2, null, 'superpackutils:tin_ore_piece', 'mekanism:clump_tin', 'mekanism:shard_tin', 'mekanism:crystal_tin', 'superpackutils:alchemical_tin_dust', 'superpackutils:alchemical_tin', 'mekanism:dirty_tin', 'mekanism:clean_tin', null, 'superpackutils:purified_crushed_tin_ore', 'superpackutils:tiny_tin_dust', null);
  unifyOre(true, false, 'lead', 'superpackutils:raw_lead', 'superpackutils:purified_raw_lead', 'thermal:lead_ingot', 'thermal:lead_dust', 'mekanism:dirty_dust_lead', 'thermal:lead_block', 'thermal:lead_nugget', 'thermal:lead_coin', 'thermal:lead_gear', 'thermal:lead_plate', 'create:crushed_lead_ore', 'immersiveposts:stick_lead', 'immersiveengineering:wire_lead', 'tconstruct:molten_lead', 130, 43, 14, 86, 0.15, 'thermal:silver_dust', 'superpackutils:tiny_silver_dust', 2, null, 'superpackutils:lead_ore_piece', 'mekanism:clump_lead', 'mekanism:shard_lead', 'mekanism:crystal_lead', 'superpackutils:alchemical_lead_dust', 'superpackutils:alchemical_lead', 'mekanism:dirty_lead', 'mekanism:clean_lead', null, 'superpackutils:purified_crushed_lead_ore', 'superpackutils:tiny_lead_dust', 'immersiveengineering:sheetmetal_lead');
  unifyOre(true, false, 'silver', 'superpackutils:raw_silver', 'superpackutils:purified_raw_silver', 'thermal:silver_ingot', 'thermal:silver_dust', null, 'thermal:silver_block', 'thermal:silver_nugget', 'thermal:silver_coin', 'thermal:silver_gear', 'thermal:silver_plate', 'create:crushed_silver_ore', 'immersiveposts:stick_silver', null, 'tconstruct:molten_silver', 179, 60, 20, 120, 0.15, 'thermal:lead_dust', 'superpackutils:tiny_lead_dust', 2, null, 'superpackutils:silver_ore_piece', null, null, null, 'superpackutils:alchemical_silver_dust', 'superpackutils:alchemical_silver', null, null, null, 'superpackutils:purified_crushed_silver_ore', 'superpackutils:tiny_silver_dust', 'immersiveengineering:sheetmetal_silver');
  unifyOre(true, false, 'nickel', 'superpackutils:raw_nickel', 'superpackutils:purified_raw_nickel', 'thermal:nickel_ingot', 'thermal:nickel_dust', 'superpackutils:dirty_dust_nickel', 'thermal:nickel_block', 'thermal:nickel_nugget', 'thermal:nickel_coin', 'thermal:nickel_gear', 'thermal:nickel_plate', 'create:crushed_nickel_ore', 'immersiveposts:stick_nickel', null, 'tconstruct:molten_nickel', 194, 65, 22, 130, 0.15, 'superpackutils:platinum_dust', 'superpackutils:tiny_platinum_dust', 2, null, 'superpackutils:nickel_ore_piece', 'superpackutils:clump_nickel', 'superpackutils:shard_nickel', 'superpackutils:crystal_nickel', 'superpackutils:alchemical_nickel_dust', 'superpackutils:alchemical_nickel', 'superpackutils:dirty_nickel', 'superpackutils:clean_nickel', null, 'superpackutils:purified_crushed_nickel_ore', 'superpackutils:tiny_nickel_dust', 'immersiveengineering:sheetmetal_nickel');
  unifyOre(true, false, 'uranium', 'superpackutils:raw_uranium', 'superpackutils:purified_raw_uranium', 'mekanism:ingot_uranium', 'mekanism:dust_uranium', 'mekanism:dirty_dust_uranium', 'mekanism:block_uranium', 'mekanism:nugget_uranium', null, 'superpackutils:uranium_gear', 'immersiveengineering:plate_uranium', 'create:crushed_uranium_ore', 'immersiveposts:stick_uranium', null, 'tconstruct:molten_uranium', 183, 61, 20, 122, 0.15, 'superpackutils:zinc_dust', 'superpackutils:tiny_zinc_dust', 2, null, 'superpackutils:uranium_ore_piece', 'mekanism:clump_uranium', 'mekanism:shard_uranium', 'mekanism:crystal_uranium', 'superpackutils:alchemical_uranium_dust', 'superpackutils:alchemical_uranium', 'mekanism:dirty_uranium', 'mekanism:clean_uranium', null, 'superpackutils:purified_crushed_uranium_ore', 'superpackutils:tiny_uranium_dust', 'immersiveengineering:sheetmetal_uranium');
  unifyOre(true, false, 'aluminum', 'superpackutils:raw_aluminum', 'superpackutils:purified_raw_aluminum', 'immersiveengineering:ingot_aluminum', 'immersiveengineering:dust_aluminum', null, 'immersiveengineering:storage_aluminum', 'immersiveengineering:nugget_aluminum', null, 'voluminousenergy:aluminum_gear', 'immersiveengineering:plate_aluminum', 'create:crushed_aluminum_ore', 'immersiveengineering:stick_aluminum', 'immersiveengineering:wire_aluminum', 'tconstruct:molten_aluminum', 141, 47, 16, 94, 0.15, 'thermal:iron_dust', 'superpackutils:tiny_iron_dust', 2, null, 'superpackutils:aluminum_ore_piece', null, null, null, 'superpackutils:alchemical_aluminum_dust', 'superpackutils:alchemical_aluminum', null, null, null, 'superpackutils:purified_crushed_aluminum_ore', 'superpackutils:tiny_aluminum_dust', 'immersiveengineering:sheetmetal_aluminum');
  unifyOre(false, false, 'osmium', 'superpackutils:raw_osmium', 'superpackutils:purified_raw_osmium', 'mekanism:ingot_osmium', 'mekanism:dust_osmium', 'mekanism:dirty_dust_osmium', 'mekanism:block_osmium', 'mekanism:nugget_osmium', null, 'superpackutils:osmium_gear', null, 'create:crushed_osmium_ore', null, null, 'tconstruct:molten_osmium', 233, 78, 26, 156, 0.15, 'superpackutils:antimony_dust', 'superpackutils:tiny_antimony_dust', 2, null, 'superpackutils:osmium_ore_piece', 'mekanism:clump_osmium', 'mekanism:shard_osmium', 'mekanism:crystal_osmium', 'superpackutils:alchemical_osmium_dust', 'superpackutils:alchemical_osmium', 'mekanism:dirty_osmium', 'mekanism:clean_osmium', null, 'superpackutils:purified_crushed_osmium_ore', 'superpackutils:tiny_osmium_dust', null);
  unifyOre(false, false, 'zinc', 'superpackutils:raw_zinc', 'superpackutils:purified_raw_zinc', 'create:zinc_ingot', 'superpackutils:zinc_dust', null, 'create:zinc_block', 'create:zinc_nugget', null, null, 'createaddition:zinc_sheet', 'create:crushed_zinc_ore', null, null, 'tconstruct:molten_zinc', 141, 47, 16, 94, 0.15, 'thermal:tin_dust', 'superpackutils:tiny_tin_dust', 2, null, 'superpackutils:zinc_ore_piece', null, null, null, 'superpackutils:alchemical_zinc_dust', 'superpackutils:alchemical_zinc', null, null, null, 'superpackutils:purified_crushed_zinc_ore', 'superpackutils:tiny_zinc_dust', null);
  unifyOre(true, false, 'electrum', null, null, 'thermal:electrum_ingot', 'thermal:electrum_dust', null, 'thermal:electrum_block', 'thermal:electrum_nugget', 'thermal:electrum_coin', 'thermal:electrum_gear', 'thermal:electrum_plate', null, 'immersiveposts:stick_electrum', 'immersiveengineering:wire_electrum', 'tconstruct:molten_electrum', 177, 59, 20, 118, 0.15, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, 'immersiveengineering:sheetmetal_electrum');
  unifyOre(true, false, 'constantan', null, null, 'thermal:constantan_ingot', 'thermal:constantan_dust', null, 'thermal:constantan_block', 'thermal:constantan_nugget', 'thermal:constantan_coin', 'thermal:constantan_gear', 'thermal:constantan_plate', null, 'immersiveposts:stick_constantan', null, 'tconstruct:molten_constantan', 192, 64, 21, 128, 0.15, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, 'immersiveengineering:sheetmetal_constantan');
  unifyOre(false, false, 'invar', null, null, 'thermal:invar_ingot', 'thermal:invar_dust', null, 'thermal:invar_block', 'thermal:invar_nugget', 'thermal:invar_coin', 'thermal:invar_gear', 'thermal:invar_plate', null, null, null, 'tconstruct:molten_invar', 190, 63, 21, 126, 0.15, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'bronze', null, null, 'thermal:bronze_ingot', 'thermal:bronze_dust', null, 'thermal:bronze_block', 'thermal:bronze_nugget', 'thermal:bronze_coin', 'thermal:bronze_gear', 'thermal:bronze_plate', null, null, null, 'tconstruct:molten_bronze', 171, 57, 19, 114, 0.15, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'steel', null, null, 'mekanism:ingot_steel', 'mekanism:dust_steel', null, 'mekanism:block_steel', 'mekanism:nugget_steel', null, 'libvulpes:gearsteel', 'immersiveengineering:plate_steel', null, 'immersiveengineering:stick_steel', 'immersiveengineering:wire_steel', 'tconstruct:molten_steel', 217, 72, 24, 144, 0.15, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'platinum', 'superpackutils:raw_platinum', 'superpackutils:platinum_ore', 'superpackutils:platinum_ingot', 'superpackutils:platinum_dust', null, 'superpackutils:platinum_block', 'superpackutils:platinum_nugget', null, 'superpackutils:platinum_gear', 'superpackutils:platinum_plate', 'create:crushed_platinum_ore', null, null, 'tconstruct:molten_platinum', 196, 65, 22, 130, 0.20, 'thermal:gold_dust', 'superpackutils:tiny_gold_dust', 2, null, 'superpackutils:platinum_ore_piece', null, null, null, 'superpackutils:alchemical_platinum_dust', 'superpackutils:alchemical_platinum', null, null, null, 'superpackutils:purified_crushed_platinum_ore', 'superpackutils:tiny_platinum_dust', null);
  unifyOre(false, false, 'mythril', null, null, 'superpackutils:mythril_ingot', 'superpackutils:mythril_dust', null, 'superpackutils:mythril_block', 'superpackutils:mythril_nugget', null, 'superpackutils:mythril_gear', 'superpackutils:mythril_plate', null, null, null, null, null, 0, 0, 0, 0, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'enderium', null, null, 'thermal:enderium_ingot', 'thermal:enderium_dust', null, 'thermal:enderium_block', 'thermal:enderium_nugget', 'thermal:enderium_coin', 'thermal:enderium_gear', 'thermal:enderium_plate', null, null, null, null, null, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'signalum', null, null, 'thermal:signalum_ingot', 'thermal:signalum_dust', null, 'thermal:signalum_block', 'thermal:signalum_nugget', 'thermal:signalum_coin', 'thermal:signalum_gear', 'thermal:signalum_plate', null, null, null, null, null, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'lumium', null, null, 'thermal:lumium_ingot', 'thermal:lumium_dust', null, 'thermal:lumium_block', 'thermal:lumium_nugget', 'thermal:lumium_coin', 'thermal:lumium_gear', 'thermal:lumium_plate', null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'cobalt', 'superpackutils:raw_cobalt', 'superpackutils:purified_raw_cobalt', 'tconstruct:cobalt_ingot', 'superpackutils:cobalt_dust', null, 'tconstruct:cobalt_block', 'tconstruct:cobalt_nugget', null, null, null, 'superpackutils:crushed_cobalt_ore', null, null, 'tconstruct:molten_cobalt', 194, 65, 22, 0, 0.15, 'thermal:iron_dust', 'superpackutils:tiny_iron_dust', 2, null, 'superpackutils:cobalt_ore_piece', null, null, null, 'superpackutils:alchemical_cobalt_dust', 'superpackutils:alchemical_cobalt', null, null, null, 'superpackutils:purified_crushed_cobalt_ore', 'superpackutils:tiny_cobalt_dust', null);  
  unifyOre(true, false, 'rose_gold', null, null, 'tconstruct:rose_gold_ingot', null, null, 'tconstruct:rose_gold_block', 'tconstruct:rose_gold_nugget', null, null, null, null, null, null, 'tconstruct:molten_rose_gold', 155, 52, 17, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'pig_iron', null, null, 'tconstruct:pig_iron_ingot', null, null, 'tconstruct:pig_iron_block', 'tconstruct:pig_iron_nugget', null, null, null, null, null, null, 'tconstruct:molten_pig_iron', 181, 60, 20, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'silicon_bronze', null, null, 'tconstruct:tinkers_bronze_ingot', null, null, 'tconstruct:tinkers_bronze_block', 'tconstruct:tinkers_bronze_nugget', null, null, null, null, null, null, 'tconstruct:molten_tinkers_bronze', 171, 57, 19, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'titanium', 'libvulpes:orerutile', null, 'libvulpes:ingottitanium', 'libvulpes:dusttitanium', null, 'libvulpes:blocktitanium', 'libvulpes:nuggettitanium', null, 'libvulpes:geartitanium', 'libvulpes:platetitanium', null, 'libvulpes:sticktitanium', null, null, 0, 0, 0, 0, 0, 0, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'titaniumiridium', null, null, 'advancedrocketry:ingottitaniumiridium', 'advancedrocketry:dusttitaniumiridium', null, 'advancedrocketry:blocktitaniumiridium', 'advancedrocketry:nuggettitaniumiridium', null, 'advancedrocketry:geartitaniumiridium', 'advancedrocketry:platetitaniumiridium', null, 'advancedrocketry:sticktitaniumiridium', null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'titaniumaluminide', null, null, 'advancedrocketry:ingottitaniumaluminide', 'advancedrocketry:dusttitaniumaluminide', null, 'advancedrocketry:blocktitaniumaluminide', 'advancedrocketry:nuggettitaniumaluminide', null, 'advancedrocketry:geartitaniumaluminide', 'advancedrocketry:platetitaniumaluminide', null, 'advancedrocketry:sticktitaniumaluminide', null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'iridium', 'libvulpes:oreiridium', null, 'libvulpes:ingotiridium', 'libvulpes:dustiridium', null, 'libvulpes:blockiridium', 'libvulpes:nuggetiridium', null, null, 'libvulpes:plateiridium', null, 'libvulpes:stickiridium', null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'silicon', null, null, 'libvulpes:ingotsilicon', 'libvulpes:dustsilicon', null, null, 'libvulpes:nuggetsilicon', null, null, 'libvulpes:platesilicon', null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'manganese', null, null, 'superpackutils:manganese_ingot', 'superpackutils:manganese_dust', null, 'superpackutils:manganese_block', 'superpackutils:manganese_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, 'superpackutils:tiny_manganese_dust', null);
  unifyOre(false, false, 'cupronickel', null, null, 'superpackutils:cupronickel_ingot', null, null, 'superpackutils:cupronickel_block', 'superpackutils:cupronickel_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'slimesteel', null, null, 'tconstruct:slimesteel_ingot', null, null, 'tconstruct:slimesteel_block', 'tconstruct:slimesteel_nugget', null, null, null, null, null, null, 'tconstruct:molten_slimesteel', 190, 63, 21, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'queens_slime', null, null, 'tconstruct:queens_slime_ingot', null, null, 'tconstruct:queens_slime_block', 'tconstruct:queens_slime_nugget', null, null, null, null, null, null, 'tconstruct:molten_queens_slime', 212, 71, 24, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'manyullyn', null, null, 'tconstruct:manyullyn_ingot', null, null, 'tconstruct:manyullyn_block', 'tconstruct:manyullyn_nugget', null, null, null, null, null, null, 'tconstruct:molten_manyullyn', 216, 72, 24, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(true, false, 'hepatizon', null, null, 'tconstruct:hepatizon_ingot', null, null, 'tconstruct:hepatizon_block', 'tconstruct:hepatizon_nugget', null, null, null, null, null, null, 'tconstruct:molten_hepatizon', 233, 78, 26, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'compressed_iron', null, null, 'pneumaticcraft:ingot_iron_compressed', null, null, 'pneumaticcraft:compressed_iron_block', null, null, 'pneumaticcraft:compressed_iron_gear', null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'starmetal', 'astralsorcery:starmetal_ore', null, 'astralsorcery:starmetal_ingot', 'astralsorcery:stardust', null, 'astralsorcery:starmetal', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'tetraethyl', null, null, 'superpackutils:tetraethyl_lead_ingot', 'superpackutils:tetraethyl_lead_dust', null, 'superpackutils:tetraethyl_lead_block', 'superpackutils:tetraethyl_lead_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'vibrant_alloy', null, null, 'superpackutils:vibrant_alloy_ingot', 'superpackutils:vibrant_alloy_dust', null, 'superpackutils:vibrant_alloy_block', 'superpackutils:vibrant_alloy_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'energetic_alloy', null, null, 'superpackutils:energetic_alloy_ingot', 'superpackutils:energetic_alloy_dust', null, 'superpackutils:energetic_alloy_block', 'superpackutils:energetic_alloy_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'brass', null, null, 'create:brass_ingot', null, null, 'create:brass_block', 'create:brass_nugget', null, null, 'create:brass_sheet', 'create:crushed_brass', 'createaddition:brass_rod', null, 'tconstruct:molten_brass', 233, 78, 26, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'netherite', null, null, 'minecraft:netherite_ingot', 'mekanism:dust_netherite', null, 'minecraft:netherite_block', 'tconstruct:netherite_nugget', null, null, null, null, null, null, 'tconstruct:molten_netherite', 221, 74, 25, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'dark_steel', null, null, 'superpackutils:dark_steel_ingot', 'superpackutils:dark_steel_dust', null, 'superpackutils:dark_steel_block', 'superpackutils:dark_steel_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'depleted_dust', null, null, null, 'superpackutils:depleted_mythril_dust', null, null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, 'superpackutils:tiny_depleted_mythril_dust', null);
  unifyOre(false, false, 'lithium', null, null, 'superpackutils:lithium_ingot', 'superpackutils:lithium_dust', 'mekanism:dust_lithium', null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'beryllium', 'superpackutils:raw_beryllium', 'superpackutils:purified_raw_beryllium', 'superpackutils:beryllium_ingot', 'superpackutils:beryllium_dust', null, 'superpackutils:beryllium_block', 'superpackutils:beryllium_nugget', null, null, null, 'superpackutils:crushed_beryllium_ore', null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, 'superpackutils:beryllium_ore_piece', null, null, null, null, null, null, null, null, 'superpackutils:purified_crushed_beryllium_ore', 'superpackutils:tiny_beryllium_dust', null);
  unifyOre(false, false, 'vanadium', 'superpackutils:raw_vanadium', 'superpackutils:purified_raw_beryllium', 'superpackutils:vanadium_ingot', 'superpackutils:vanadium_dust', null, 'superpackutils:vanadium_block', 'superpackutils:vanadium_nugget', null, null, null, 'superpackutils:crushed_vanadium_ore', null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, 'superpackutils:vanadium_ore_piece', null, null, null, null, null, null, null, null, 'superpackutils:purified_crushed_vanadium_ore', 'superpackutils:tiny_vanadium_dust', null);
  unifyOre(false, false, 'chrome', 'superpackutils:raw_chrome', 'superpackutils:purified_raw_chrome', 'superpackutils:chrome_ingot', 'superpackutils:chrome_dust', null, 'superpackutils:chrome_block', 'superpackutils:chrome_nugget', null, null, null, 'superpackutils:crushed_chrome_ore', null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, 'superpackutils:chrome_ore_piece', null, null, null, null, null, null, null, null, 'superpackutils:purified_crushed_chrome_ore', 'superpackutils:tiny_chrome_dust', null);
  unifyOre(false, false, 'palladium', 'superpackutils:raw_palladium', 'superpackutils:purified_raw_palladium', 'superpackutils:palladium_ingot', 'superpackutils:palladium_dust', null, 'superpackutils:palladium_block', 'superpackutils:palladium_nugget', null, null, null, 'superpackutils:crushed_palladium_ore', null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, 'superpackutils:palladium_ore_piece', null, null, null, null, null, null, null, null, 'superpackutils:purified_crushed_palladium_ore', 'superpackutils:tiny_palladium_dust', null);
  unifyOre(false, false, 'gallium', 'superpackutils:raw_gallium', 'superpackutils:purified_raw_gallium', 'superpackutils:gallium_ingot', 'superpackutils:gallium_dust', null, 'superpackutils:gallium_block', 'superpackutils:gallium_nugget', null, null, null, 'superpackutils:crushed_gallium_ore', null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, 'superpackutils:gallium_ore_piece', null, null, null, null, null, null, null, null, 'superpackutils:purified_crushed_gallium_ore', 'superpackutils:tiny_gallium_dust', null);
  unifyOre(false, false, 'soularium', null, null, 'superpackutils:soularium_ingot', 'superpackutils:soularium_dust', null, 'superpackutils:soularium_block', 'superpackutils:soularium_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, false, 'zirconium', null, null, 'superpackutils:zirconium_ingot', 'superpackutils:zirconium_dust', null, 'superpackutils:zirconium_block', 'superpackutils:zirconium_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, 'superpackutils:tiny_zirconium_dust', null);
  unifyOre(false, false, 'indium', null, null, 'superpackutils:indium_ingot', 'superpackutils:indium_dust', null, 'superpackutils:indium_block', 'superpackutils:indium_nugget', null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, 'superpackutils:tiny_indium_dust', null);
  unifyOre(false, false, 'graphene', null, null, 'superpackutils:graphene_ingot', 'superpackutils:graphene_dust', null, null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, 'superpackutils:tiny_graphene_dust', null);
  unifyOre(false, false, 'magnesium', 'superpackutils:raw_magnesium', 'superpackutils:purified_raw_magnesium', 'superpackutils:magnesium_ingot', 'superpackutils:magnesium_dust', null, null, 'superpackutils:magnesium_nugget', null, null, 'superpackutils:magnesium_plate', null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, null, 'superpackutils:magnesium_ore_piece', null, null, null, null, null, null, null, null, null, 'superpackutils:tiny_magnesium_dust', null);

  unifyOre(false, true, 'diamond', 'minecraft:diamond_ore', null, 'minecraft:diamond', 'thermal:diamond_dust', null, 'minecraft:diamond_block', null, null, 'thermal:diamond_gear', null, null, null, null, 'tconstruct:molten_diamond', 237, 79, 0, 158, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'coal', 'minecraft:coal_ore', null, 'minecraft:coal', 'mekanism:dust_coal', null, 'minecraft:coal_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'coal_coke', null, null, 'thermal:coal_coke', 'immersiveengineering:dust_coke', null, 'thermal:coal_coke_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'coal_petcoke', null, null, 'immersivepetroleum:petcoke', 'immersivepetroleum:petcoke_dust', null, 'immersivepetroleum:petcoke_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'charcoal', '#minecraft:logs_that_burn', null, 'minecraft:charcoal', 'mekanism:dust_charcoal', null, 'thermal:charcoal_block', null, null, null, null, null,  null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'emerald', 'minecraft:emerald_ore', null, 'minecraft:emerald', 'thermal:emerald_dust', null, 'minecraft:emerald_block', null, null, 'thermal:emerald_gear', null, null, null, null, 'tconstruct:molten_emerald', 193, 64, 0, 128, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'lapis', 'minecraft:lapis_ore', null, 'minecraft:lapis_lazuli', 'thermal:lapis_dust', null, 'minecraft:lapis_block', null, null, 'thermal:lapis_gear', null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 12, 8, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'fluorite', 'mekanism:fluorite_ore', null, 'mekanism:fluorite_gem', 'mekanism:dust_fluorite', null, null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 6, 2, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'quartz', 'minecraft:nether_quartz_ore', null, 'minecraft:quartz', 'thermal:quartz_dust', null, 'minecraft:quartz_block', null, null, 'thermal:quartz_gear', null, null, null, null, 'tconstruct:molten_quartz', 110, 55, 0, 0, 0, null, null, 2, 2, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'apatite', 'thermal:apatite_ore', null, 'thermal:apatite', 'thermal:apatite_dust', null, 'thermal:apatite_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'cinnabar', 'thermal:cinnabar_ore', null, 'thermal:cinnabar', 'thermal:cinnabar_dust', null, 'thermal:cinnabar_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'niter', 'thermal:niter_ore', null, 'thermal:niter', 'thermal:niter_dust', null, 'thermal:niter_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'ruby', 'thermal:ruby_ore', null, 'thermal:ruby', 'thermal:ruby_dust', null, 'thermal:ruby_block', null, null, 'thermal:ruby_gear', null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'sapphire', 'thermal:sapphire_ore', null, 'thermal:sapphire', 'thermal:sapphire_dust', null, 'thermal:sapphire_block', null, null, 'thermal:sapphire_gear', null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'sulfur', 'thermal:sulfur_ore', null, 'thermal:sulfur', 'thermal:sulfur_dust', null, 'thermal:sulfur_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 2, 1, null, null, null, null, null, null, null, null, null, null, null, null);
  unifyOre(false, true, 'ender_pearl', null, null, 'minecraft:ender_pearl', 'thermal:ender_pearl_dust', null, 'architects_palette:ender_pearl_block', null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null);

});