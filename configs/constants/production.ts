import { EevRecord } from './development'

const production: Partial<EevRecord> = {
  ENV_LABEL: 'PRODUCTION',

  PORT: 8016,

  SC_FILE_SERVER: 'http://192.168.1.154:8015',

  SC_WEB_URL: 'http://192.168.1.137:5002',
}

export default production
