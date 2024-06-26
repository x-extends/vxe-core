import VXEStore from './store'

import { VxeGlobalValidators } from '../../types'

export const validators = new VXEStore() as VxeGlobalValidators

if (process.env.VUE_APP_VXE_ENV === 'development') {
  Object.assign(validators, { _name: 'Validators' })
}
