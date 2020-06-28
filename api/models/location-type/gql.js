import { objectType } from '@nexus/schema'

const LocationType = objectType({
  name: 'LocationType',
  definition (t) {
    t.model.id()
    t.model.name()
    t.model.locations()
  }
})

export const types = [LocationType]

export const defineQueries = t => {
  t.crud.location({ filtering: true })
}

