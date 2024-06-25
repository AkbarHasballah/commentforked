import { useState } from 'react';

function useModal(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  function actionModal() {
    setValue(!value);
  }
  return [value, actionModal, setValue];
}

export default useModal;
