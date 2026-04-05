import { useState, useMemo } from 'preact/hooks'
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
    <div class="space-y-5">
      <div>
        <label class="block text-sm font-medium mb-2">Tip stavbe</label>
        <div class="flex gap-2">
          {(
            [
              ['hisa', 'Hiša'],
              ['blok', 'Blok'],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setBuildingType(val)}
              class={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                buildingType === val
                  ? 'bg-primary text-primary-fg border-primary'
                  : 'bg-white text-inherit border-border hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Občina</label>
        <select
          value={municipality}
          onChange={handleMunicipalityChange}
          class="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
        >
          <option value="">Izberi občino...</option>
          {municipalities.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {municipality && (
        <div>
          <label class="block text-sm font-medium mb-2">Ulica</label>
          <select
            value={streetId}
            onChange={handleStreetChange}
            class="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
          >
            <option value="">Izberi ulico...</option>
            {filteredStreets.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {municipality && (
        <div>
          <label class="block text-sm font-medium mb-2">Hišna številka</label>
          <input
            type="text"
            value={houseNumber}
            onInput={(e) => setHouseNumber((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="npr. 12B"
            class="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm"
          />
        </div>
      )}

      <button
        type="button"
        disabled={!canSubmit || loading}
        onClick={submit}
        class="w-full h-11 rounded-lg bg-primary text-primary-fg font-medium text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-opacity"
      >
        {loading ? 'Nalagam...' : 'Poišči termine odvoza'}
      </button>

      {error && <p class="text-destructive text-sm">{error}</p>}
    </div>
  )
}
