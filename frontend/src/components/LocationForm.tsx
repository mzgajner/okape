import { useState, useMemo } from 'preact/hooks'
import { Button } from './Button'
import { Spinner } from './Spinner'
import { streets } from '../streets'
import type { BuildingType, Municipality, SavedLocation } from '../types'

interface Props {
  loading: boolean
  error: string
  onSubmit: (location: SavedLocation) => void
}

export function LocationForm({ loading, error, onSubmit }: Props) {
  const [buildingType, setBuildingType] = useState<BuildingType>('hisa')
  const [municipality, setMunicipality] = useState<Municipality | undefined>()
  const [streetId, setStreetId] = useState<number>()
  const [houseNumber, setHouseNumber] = useState('')

  const municipalities = useMemo(
    () => [...new Set(streets.map((s) => s.municipality))].sort((a, b) => a.localeCompare(b, 'sl')),
    [],
  )

  const filteredStreets = useMemo(
    () =>
      streets
        .filter((s) => s.municipality === municipality)
        .sort((a, b) => a.label.localeCompare(b.label, 'sl')),
    [municipality],
  )

  const canSubmit = streetId && houseNumber.trim()

  function handleMunicipalityChange(e: Event) {
    const val = (e.target as HTMLSelectElement).value as Municipality
    setMunicipality(val)
    setStreetId(undefined)
  }

  function handleStreetChange(e: Event) {
    const val = Number((e.target as HTMLSelectElement).value)
    setStreetId(val)
  }

  function submit() {
    if (!canSubmit) return
    onSubmit({
      buildingType,
      streetId,
      houseNumber: houseNumber.trim().toUpperCase(),
    })
  }

  return (
    <div class="space-y-6">
      <div>
        <label class="block text-base font-medium mb-2">Tip stavbe</label>
        <div class="flex gap-2">
          {(
            [
              ['hisa', 'Hiša'],
              ['blok', 'Blok'],
            ] as const
          ).map(([val, label]) => (
            <Button
              key={val}
              variant="outline"
              active={buildingType === val}
              onClick={() => setBuildingType(val)}
              class="px-5 py-2.5"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label class="block text-base font-medium mb-2">Občina</label>
        <select
          value={municipality}
          onChange={handleMunicipalityChange}
          class="w-full h-12 px-3 rounded-lg border border-border bg-white text-base"
        >
          <option value="" hidden>
            Izberi občino
          </option>
          {municipalities.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label class="block text-base font-medium mb-2">Ulica</label>
        <select
          value={streetId}
          onChange={handleStreetChange}
          class={`w-full h-12 px-3 rounded-lg border border-border text-base ${!municipality ? 'bg-gray-100 opacity-60 cursor-not-allowed' : 'bg-white'}`}
          disabled={!municipality}
        >
          <option value="" hidden>
            Izberi ulico
          </option>
          {filteredStreets.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label class="block text-base font-medium mb-2">Hišna številka</label>
        <input
          type="text"
          value={houseNumber}
          onInput={(e) => setHouseNumber((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="npr. 12B"
          class={`w-full h-12 px-3 rounded-lg border border-border text-base ${!municipality ? 'bg-gray-100 opacity-60 cursor-not-allowed' : 'bg-white'}`}
          disabled={!municipality}
        />
      </div>

      <Button disabled={!canSubmit || loading} onClick={submit} class="w-full h-13">
        {loading && <Spinner class="-ml-1 mr-2 h-5 w-5" />}
        Poišči termine odvoza
      </Button>

      {error && <p class="text-destructive text-base">{error}</p>}
    </div>
  )
}
