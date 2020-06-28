import { objectType } from '@nexus/schema'

const LocationType = objectType({
  name: 'Location',
  definition (t) {
    t.model.id()
    t.model.title()
    t.model.locationType()
  }
})

export const types = [Location]

export const defineQueries = t => {
  t.crud.location({ filtering: true })
}

