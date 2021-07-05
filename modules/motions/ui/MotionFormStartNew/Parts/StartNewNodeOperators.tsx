import { InputControl } from 'modules/shared/ui/Controls/Input'
import { Fieldset } from '../CreateMotionFormStyle'

import { MotionType } from 'modules/motions/types'
import { createMotionFormPart } from './createMotionFormPart'

export const formParts = createMotionFormPart({
  motionType: MotionType.NodeOperatorLimit,
  onSubmit: async ({ evmScriptFactory, formData, contract }) => {
    console.log('Node Operator Increase Limit', formData, contract)
    await contract.createMotion(evmScriptFactory, [Number(formData.newLimit)], {
      gasLimit: 120000,
    })
  },
  getDefaultFormData: () => ({
    newLimit: '',
  }),
  getComponent: ({ getFieldName }) =>
    function StartNewMotionNodeOperators() {
      return (
        <Fieldset>
          <InputControl name={getFieldName('newLimit')} label="New limit" />
        </Fieldset>
      )
    },
})
