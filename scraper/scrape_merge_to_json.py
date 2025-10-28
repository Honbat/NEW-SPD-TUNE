# Scraper placeholder: implement scraping logic to merge Inteleria + HellHades and write frontend/public/champions.json
import json, time
from pathlib import Path
OUT = Path('frontend/public/champions.json')
OUT.parent.mkdir(parents=True, exist_ok=True)
# This is a placeholder sample write. Replace with real scraper if desired.
sample = {
  "meta": {"snapshot":"generated-sample","updated": time.time()},
  "champions": [
    {"id":"arbiter","name":"Arbiter","faction":"High Elves","rarity":"Legendary","base_spd":110,"a1_cd":0,"a2_cd":3,"a3_cd":4,"passive_cd":None,"aura_spd":30}
  ]
}
OUT.write_text(json.dumps(sample, indent=2))
print('Wrote sample champions to', OUT)
