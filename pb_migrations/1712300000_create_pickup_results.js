/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = new Collection({
      type: 'base',
      name: 'pickup_results',
      fields: [
        { name: 'buildingType', type: 'number', required: true },
        { name: 'streetId', type: 'number', required: true },
        { name: 'houseNumber', type: 'text', required: true },
        { name: 'fetchedAt', type: 'autodate', onCreate: true, onUpdate: true },
        { name: 'results', type: 'json', required: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_pickup_lookup ON pickup_results (buildingType, streetId, houseNumber)',
      ],
    })

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pickup_results')
    app.delete(collection)
  }
)
