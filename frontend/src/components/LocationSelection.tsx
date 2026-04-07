import { useState, useMemo } from 'preact/hooks'
import { Button } from '@/components/Button'
import { IconHouse } from '@/components/IconHouse'
import { IconBuilding } from '@/components/IconBuilding'
import { streets } from '@/metadata'
import type { BuildingType, Municipality, Location } from '@/types'

interface Props {
  onSubmit: (location: Location) => void
}

export function LocationSelection({ onSubmit }: Props) {
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
      houseNumber: houseNumber.trim().toLowerCase(),
    })
  }

  return (
    <div class="space-y-6">
      <div>
        <label class="block text-base font-medium mb-2">Tip stavbe</label>
        <div class="flex gap-2">
          <Button
            variant="outline"
            active={buildingType === 'hisa'}
            onClick={() => setBuildingType('hisa')}
            class="flex-1"
          >
            <IconHouse class="w-4 h-4 mr-1.5" />
            Hiša
          </Button>
          <Button
            variant="outline"
            active={buildingType === 'blok'}
            onClick={() => setBuildingType('blok')}
            class="flex-1"
          >
            <IconBuilding class="w-4 h-4 mr-1.5" />
            Blok
          </Button>
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
          placeholder="npr. 12b"
          class={`w-full h-12 px-3 rounded-lg border border-border text-base ${!municipality ? 'bg-gray-100 opacity-60 cursor-not-allowed' : 'bg-white'}`}
          disabled={!municipality}
        />
      </div>

      <Button disabled={!canSubmit} onClick={submit} class="w-full h-13">
        Poišči termine odvoza
      </Button>
    </div>
  )
}
