function saveGame(master, world) {
    const saveData = {
      saved_on: new Date().toISOString(),
      JohnemonMaster: {
        name: master.name,
        johnemonCollection: master.johnemonCollection.map(j => ({
          name: j.name,
          level: j.level,
          experienceMeter: j.experienceMeter,
          attackRange: j.attackRange,
          defenseRange: j.defenseRange,
          healthPool: j.healthPool,
          catchPhrase: j.catchPhrase
        })),
        healingItems: master.healingItems,
        reviveItems: master.reviveItems,
        JOHNEBALLS: master.JOHNEBALLS
      },
      day: world.day,
      logs: world.logs
    };
  
    fs.writeFileSync('save.json', JSON.stringify(saveData, null, 2));
    console.log("Game saved successfully.");
  }