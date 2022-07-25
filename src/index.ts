import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { config } from 'dotenv'
config({ path: '.env' })
import env from './utils/env'

console.log(`InfluxDB`)
const influxDB = new InfluxDB({ url: env('INFLUXDB_URL'), token: env('INFLUXDB_ADMIN_TOKEN') })

// console.log(influxDB)

const writeApi = influxDB.getWriteApi(env('INFLUXDB_ORG'), env('INFLUXDB_BUCKET'))

// console.log(writeApi)

writeApi.useDefaultTags({ region: 'west' })

const point1 = new Point('temperature').tag('sensor_id', 'TLM010').floatField('value', 24)
console.log(` ${point1}`)

writeApi.writePoint(point1)

writeApi.close().then(() => {
  console.log('WRITE FINISHED')
})
